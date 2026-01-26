import { useRef, useEffect } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

export const LiquidChrome = ({
  baseColor = [0.1, 0.1, 0.1], // Unused in new shader but kept for props compat
  speed = 0.2,
  amplitude = 0.3,
  frequencyX = 3,
  frequencyY = 3,
  interactive = true,
  ...props
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Create Renderer
    const renderer = new Renderer({ 
        alpha: true,
        antialias: true,
        dpr: 1.5 // Limit DPR for performance
    });
    
    const gl = renderer.gl;
    // clearColor(r, g, b, a) - 0 alpha for transparent clean start
    gl.clearColor(0, 0, 0, 1);

    const vertexShader = `
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform float uTime;
      uniform vec3 uResolution;
      uniform float uAmplitude;
      uniform float uFrequencyX;
      uniform float uFrequencyY;
      uniform vec2 uMouse;
      varying vec2 vUv;

      vec4 renderImage(vec2 uvCoord) {
          vec2 fragCoord = uvCoord * uResolution.xy;
          vec2 uv = (2.0 * fragCoord - uResolution.xy) / min(uResolution.x, uResolution.y);

          // Liquid distortion loop
          for (float i = 1.0; i < 8.0; i++){
              uv.x += uAmplitude / i * cos(i * uFrequencyX * uv.y + uTime + uMouse.x * 3.14159);
              uv.y += uAmplitude / i * cos(i * uFrequencyY * uv.x + uTime + uMouse.y * 3.14159);
          }

          // Mouse interaction (ripple)
          vec2 diff = (uvCoord - uMouse);
          float dist = length(diff);
          float falloff = exp(-dist * 20.0);
          float ripple = sin(10.0 * dist - uTime * 2.0) * 0.03;
          uv += (diff / (dist + 0.0001)) * ripple * falloff;

          // Color Pattern: Black -> Blue -> Magenta
          float pattern = sin(uTime - uv.y - uv.x); 
          float t = (pattern + 1.0) * 0.5; // normalize to 0..1

          vec3 cBlack = vec3(0.0, 0.0, 0.0);
          vec3 cBlue = vec3(0.0, 0.3, 0.9);
          vec3 cMagenta = vec3(0.92, 0.2, 0.38);
        //   vec3 cWhite = vec3(0.9, 0.9, 0.9);
          
          vec3 col;
          if (t < 0.5) {
             // 0.0 to 0.5 -> Mix Black to Blue
             col = mix(cBlack, cBlue, t * 2.0);
          } else  {
             // 0.5 to 1.0 -> Mix Blue to Magenta
             col = mix(cBlue, cMagenta, (t - 0.5) * 2.0);
          } 

          // Specular highlights
          float highlight = pow(t, 8.0); 
          col += vec3(highlight * 0.8);
          
          return vec4(col, 1.0);
      }

      void main() {
          gl_FragColor = renderImage(vUv);
      }
    `;

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new Float32Array([gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height])
        },
        uAmplitude: { value: amplitude },
        uFrequencyX: { value: frequencyX },
        uFrequencyY: { value: frequencyY },
        uMouse: { value: new Float32Array([0.5, 0.5]) } // center default
      }
    });
    
    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      // Get container dimensions
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      
      renderer.setSize(width, height);
      
      const resUniform = program.uniforms.uResolution.value;
      resUniform[0] = gl.canvas.width; // drawing buffer width
      resUniform[1] = gl.canvas.height; // drawing buffer height
      resUniform[2] = gl.canvas.width / gl.canvas.height;
    }
    
    // Trigger initial resize
    resize();
    window.addEventListener('resize', resize);

    function handleMouseMove(event) {
      // Use window dimensions for full-screen background accuracy
      const x = event.clientX / window.innerWidth;
      const y = 1.0 - event.clientY / window.innerHeight; // flip Y for GL
      
      const mouseUniform = program.uniforms.uMouse.value;
      mouseUniform[0] = x;
      mouseUniform[1] = y;
    }

    function handleTouchMove(event) {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        const x = touch.clientX / window.innerWidth;
        const y = 1.0 - touch.clientY / window.innerHeight;
        
        const mouseUniform = program.uniforms.uMouse.value;
        mouseUniform[0] = x;
        mouseUniform[1] = y;
      }
    }

    if (interactive) {
      // Listen on window to capture mouse anywhere on screen
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);
    }

    let animationId;
    function update(t) {
      animationId = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.001 * speed;
      renderer.render({ scene: mesh });
    }
    animationId = requestAnimationFrame(update);

    container.appendChild(gl.canvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);
      }
      if (gl.canvas.parentElement) {
        gl.canvas.parentElement.removeChild(gl.canvas);
      }
      // Clean up GL context
      const ext = gl.getExtension('WEBGL_lose_context');
      if (ext) ext.loseContext();
    };
  }, [speed, amplitude, frequencyX, frequencyY, interactive]);

  return (
    <div 
      ref={containerRef} 
      style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          background: '#000', // Fallback
          overflow: 'hidden'
      }}
      {...props} 
    />
  );
};

export default LiquidChrome;
