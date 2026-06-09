import { useEffect, useRef } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

export default function AIModelMesh() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width;
    let height = canvas.height;

    const syncSize = () => {
      const parent = containerRef.current;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
        canvas.width = width;
        canvas.height = height;
      }
    };

    syncSize();
    const resizeObserver = new ResizeObserver(syncSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Define 3D points for an Icosahedron
    const t = (1 + Math.sqrt(5)) / 2; // Golden ratio
    const initialPoints: Point3D[] = [
      { x: -1, y: t, z: 0 },
      { x: 1, y: t, z: 0 },
      { x: -1, y: -t, z: 0 },
      { x: 1, y: -t, z: 0 },
      { x: 0, y: -1, z: t },
      { x: 0, y: 1, z: t },
      { x: 0, y: -1, z: -t },
      { x: 0, y: 1, z: -t },
      { x: t, y: 0, z: -1 },
      { x: t, y: 0, z: 1 },
      { x: -t, y: 0, z: -1 },
      { x: -t, y: 0, z: 1 },
    ];

    // Scale up original coordinate values to fit size nicely
    const radius = Math.min(width, height) * 0.18 || 120;
    const points: Point3D[] = initialPoints.map((p) => ({
      x: p.x * (radius / Math.sqrt(1 + t * t)),
      y: p.y * (radius / Math.sqrt(1 + t * t)),
      z: p.z * (radius / Math.sqrt(1 + t * t)),
    }));

    // Find edges by distance similarity
    const edges: [number, number][] = [];
    const edgeThreshold = radius * 1.1; // Strict distance threshold for icosahedron segments
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dz = points[i].z - points[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist <= edgeThreshold) {
          edges.push([i, j]);
        }
      }
    }

    // Particle nodes floating inside the center
    const innerPoints: { pos: Point3D; vel: Point3D }[] = [];
    for (let i = 0; i < 20; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = (0.2 + Math.random() * 0.45) * radius;
      innerPoints.push({
        pos: {
          x: r * Math.sin(phi) * Math.cos(theta),
          y: r * Math.sin(phi) * Math.sin(theta),
          z: r * Math.cos(phi),
        },
        vel: {
          x: (Math.random() - 0.5) * 0.4,
          y: (Math.random() - 0.5) * 0.4,
          z: (Math.random() - 0.5) * 0.4,
        },
      });
    }

    let angleX = 0.005;
    let angleY = 0.005;
    let currentXAngle = 0;
    let currentYAngle = 0;

    const rotateX = (p: Point3D, angle: number): Point3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: p.x,
        y: p.y * cos - p.z * sin,
        z: p.y * sin + p.z * cos,
      };
    };

    const rotateY = (p: Point3D, angle: number): Point3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: p.x * cos + p.z * sin,
        y: p.y,
        z: -p.x * sin + p.z * cos,
      };
    };

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseX = (e.clientX - cx) / (rect.width / 2);
      mouseY = (e.clientY - cy) / (rect.height / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle feedback from mouse coordinates to rotate speed
      const targetAngleX = 0.004 + mouseY * 0.006;
      const targetAngleY = 0.004 + mouseX * 0.006;

      // Friction translation
      angleX += (targetAngleX - angleX) * 0.05;
      angleY += (targetAngleY - angleY) * 0.05;

      currentXAngle += angleX;
      currentYAngle += angleY;

      const centerX = width / 2;
      const centerY = height / 2;

      // Rotate and project points
      const projected = points.map((p) => {
        let r = rotateY(p, currentYAngle);
        r = rotateX(r, currentXAngle);
        // Perspective factor
        const depthFactor = 400 / (400 - r.z);
        return {
          x: centerX + r.x * depthFactor,
          y: centerY + r.y * depthFactor,
          z: r.z,
        };
      });

      // Subtle float animation
      const floatOffsetY = Math.sin(Date.now() * 0.001) * 12;

      // Draw inside neural core structure
      innerPoints.forEach((node) => {
        // Move slightly
        node.pos.x += node.vel.x;
        node.pos.y += node.vel.y;
        node.pos.z += node.vel.z;

        // Bounce inside radius
        const dist = Math.sqrt(node.pos.x ** 2 + node.pos.y ** 2 + node.pos.z ** 2);
        if (dist > radius * 0.7) {
          node.vel.x *= -1;
          node.vel.y *= -1;
          node.vel.z *= -1;
        }

        let rotNode = rotateY(node.pos, currentYAngle * 0.7);
        rotNode = rotateX(rotNode, currentXAngle * 0.7);
        const depth = 400 / (400 - rotNode.z);

        const nx = centerX + rotNode.x * depth;
        const ny = centerY + rotNode.y * depth + floatOffsetY;

        // Draw inner node glowing particles
        ctx.fillStyle = `rgba(6, 182, 212, ${0.15 + (rotNode.z + radius) / (radius * 2)})`;
        ctx.beginPath();
        ctx.arc(nx, ny, 3 + depth, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw outer mesh edges
      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];

        const averageZ = (p1.z + p2.z) / 2;
        // Fade lines based on depth coordinate
        const opacity = 0.15 + (averageZ + radius) / (radius * 2.5);

        ctx.strokeStyle = `rgba(79, 70, 229, ${opacity * 0.8})`;
        ctx.lineWidth = 1 + (averageZ + radius) / (radius * 1.5);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y + floatOffsetY);
        ctx.lineTo(p2.x, p2.y + floatOffsetY);
        ctx.stroke();
      });

      // Draw outer nodes
      projected.forEach((p) => {
        const opacity = 0.35 + (p.z + radius) / (radius * 1.8);
        ctx.fillStyle = `rgba(195, 192, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y + floatOffsetY, 4.5 + (p.z + radius) / (radius * 0.8), 0, Math.PI * 2);
        ctx.fill();

        // Small glowing shadow on main nodes
        ctx.fillStyle = `rgba(76, 215, 246, ${opacity * 0.4})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y + floatOffsetY, 9 + (p.z + radius) / (radius * 0.4), 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw outer floating orbit ring
      ctx.strokeStyle = "rgba(76, 215, 246, 0.04)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY + floatOffsetY, radius * 1.25, radius * 0.4, Math.PI / 6, 0, Math.PI * 2);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center p-4">
      <canvas ref={canvasRef} className="block max-w-full max-h-full" />
    </div>
  );
}
