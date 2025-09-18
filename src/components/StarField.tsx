import React, { useEffect, useRef } from "react";

const StarField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // --- Stars ---
    const stars: Array<any> = [];
    for (let i = 0; i < 500; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.6 + 0.4,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        layer: Math.random() < 0.7 ? "far" : "near", // depth layers
      });
    }

    // --- Shooting Stars ---
    const shootingStars: Array<any> = [];

    const spawnShootingStar = () => {
      if (Math.random() < 0.01) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.5,
          length: Math.random() * 80 + 100,
          speed: Math.random() * 8 + 5,
          life: 1,
          baseOpacity: 0.15 + Math.random() * 0.15, // faint opacity for depth
        });
      }
    };

    // --- Galaxies (faint glows) ---
    const galaxies: Array<any> = [];
    for (let i = 0; i < 3; i++) {
      galaxies.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 300 + 150,
        color: `rgba(${100 + Math.random() * 155}, ${100 + Math.random() * 155}, 255, 0.1)`,
      });
    }

    // --- Animation Loop ---
    const animate = () => {
      // Background gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        50,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height)
      );
      gradient.addColorStop(0, "rgba(10, 10, 30, 1)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 1)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw galaxies
      galaxies.forEach((g) => {
        const radial = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, g.radius);
        radial.addColorStop(0, g.color);
        radial.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = radial;
        ctx.beginPath();
        ctx.arc(g.x, g.y, g.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Stars
      stars.forEach((star) => {
        star.twinkle += star.twinkleSpeed;
        const twinkleOpacity =
          star.opacity * (0.6 + 0.4 * Math.sin(star.twinkle));
        ctx.beginPath();
        ctx.fillStyle =
          star.layer === "near"
            ? `rgba(255,255,255,${twinkleOpacity})`
            : `rgba(200,200,255,${twinkleOpacity * 0.6})`;
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Shooting stars
      spawnShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];

        // Faint opacity for depth
        const opacity = s.baseOpacity * s.life;

        ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
        ctx.lineWidth = 1.2; // thinner trail for distant look

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.length, s.y + s.length * 0.3);
        ctx.stroke();

        s.x += s.speed * -1;
        s.y += s.speed * 0.3;
        s.life -= 0.01;

        if (s.life <= 0) shootingStars.splice(i, 1);
      }

      requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default StarField;
