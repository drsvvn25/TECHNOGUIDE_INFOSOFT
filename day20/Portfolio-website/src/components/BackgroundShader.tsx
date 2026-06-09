import { useEffect, useRef } from "react";

export default function BackgroundShader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl = canvas.getContext("webgl") || (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return;

    // Compile shaders and construct program
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      void main() {
        vec2 uv = v_texCoord;
        vec2 center = u_mouse / u_resolution;
        
        // Fluid ripple effect
        float color = 0.0;
        color += sin(uv.x * 8.0 + u_time * 0.4) * 0.5 + 0.5;
        color += sin(uv.y * 10.0 + u_time * 0.6) * 0.5 + 0.5;
        color += sin((uv.x + uv.y) * 6.0 + u_time * 0.25) * 0.5 + 0.5;
        
        // Mouse glow interaction
        float dist = distance(uv, center);
        float glow = smoothstep(0.25, 0.0, dist) * 0.35;
        
        // Match dark slate / indigo & cyan theme palette
        vec3 baseColor = vec3(0.04, 0.07, 0.15); // Deep Indigo
        vec3 accentColor = vec3(0.18, 0.16, 0.45); // Indigo
        vec3 secondaryColor = vec3(0.1, 0.7, 0.85); // Cyan Glow
        
        vec3 finalColor = mix(baseColor, accentColor, color * 0.25);
        finalColor = mix(finalColor, secondaryColor, glow);
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const compileShader = (type: number, source: string) => {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error("Shader compilation failed:", gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking failed:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Buffer position setup
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uMouse = gl.getUniformLocation(program, "u_mouse");

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (e.clientX - rect.left) / rect.width;
        const ny = 1.0 - (e.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Sync WebGL viewport and coordinate space size
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        const w = Math.floor(width) || 1280;
        const h = Math.floor(height) || 720;
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
          if (gl) gl.viewport(0, 0, w, h);
        }
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    let animationFrameId: number;
    const render = (time: number) => {
      if (!gl) return;
      gl.clearColor(0.04, 0.07, 0.15, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      if (uTime) gl.uniform1f(uTime, time * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (gl && program) {
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden -z-10 bg-[#060e20]">
      <canvas ref={canvasRef} className="block w-full h-full opacity-65 select-none pointer-events-none" />
    </div>
  );
}
