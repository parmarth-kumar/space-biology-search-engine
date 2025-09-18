import React, { useEffect, useRef } from "react";

// --- Our set of thematic SVG icons ---
const iconSvgs = {
  dna: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.0" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.5A4.5 4.5 0 0 0 8.5 10A4.5 4.5 0 0 0 4 5.5"/><path d="M8.5 10A4.5 4.5 0 0 0 13 14.5"/><path d="M8.5 10A4.5 4.5 0 0 1 13 5.5"/><path d="M15.5 18.5A4.5 4.5 0 0 0 20 14A4.5 4.5 0 0 0 15.5 9.5"/><path d="M13 14.5A4.5 4.5 0 0 0 17.5 10"/><path d="M13 5.5A4.5 4.5 0 0 1 17.5 10"/></svg>`,
  atom: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.0" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-5.71-1.99-7.72-2.01-2.01-5.7-4.03-7.72-1.99"/><path d="M3.8 3.8c-2.04 2.03-.02 5.71 1.99 7.72 2.01 2.01 5.7 4.03 7.72 1.99"/></svg>`,
  microscope: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.0" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/></svg>`,
  heart: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.0" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
  leaf: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 21c.5 -4.5 2.5 -8 7 -10" /><path d="M9 18c6.218 0 10.5 -3.288 11 -12v-2h-4.014c-9 0 -11.986 4 -12.986 13c0 0 2.014 3 5 3z" /></svg>`,
  rocket: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3" /><path d="M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3" /><path d="M15 9m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>`,
  brain: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8" /><path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8" /><path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" /><path d="M14 9.5a3.5 3.5 0 0 1 -3.5 -3.5v-1a3.5 3.5 0 0 1 7 0v1.8" /><path d="M10.5 9.5a3.5 3.5 0 0 0 3.5 -3.5v-1a3.5 3.5 0 0 0 -7 0v1.8" /><path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5" /><path d="M12 3v2" /><path d="M12 19v2" /><path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /></svg>`,
  flask: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 3l6 0" /><path d="M10 9l4 0" /><path d="M10 3v6l-4 11a.7 .7 0 0 0 .5 1h11a.7 .7 0 0 0 .5 -1l-4 -11v-6" /></svg>`,
  virus: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" /><path d="M12 7l0 -4" /><path d="M7 12l-4 0" /><path d="M12 17l0 4" /><path d="M17 12l4 0" /></svg>`,
  planet: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18.816 13.58c2.292 2.138 3.546 5.441 3.099 8.68" /><path d="M6.618 5.632c2.256 -1.662 5.16 -1.992 7.822 -.96" /><path d="M12 12m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /></svg>`,
  satellite: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3.707 6.293l2.586 -2.586a1 1 0 0 1 1.414 0l5.586 5.586a1 1 0 0 1 0 1.414l-2.586 2.586a1 1 0 0 1 -1.414 0l-5.586 -5.586a1 1 0 0 1 0 -1.414z" /><path d="M6 10l-3 3l3 3l3 -3" /><path d="M14 4l3 -3l3 3l-3 3" /></svg>`,
};

interface IconParticle {
  x: number; y: number; vx: number; vy: number;
  rotation: number; rotationSpeed: number;
  size: number; opacity: number;
  image: HTMLImageElement;
}

const StarField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    // --- You can easily tweak the appearance by changing these values ---
    const ICON_COUNT = 250;
    const ICON_SIZE = { min: 30, max: 35 };
    const ICON_COLOR = "#22d3ee"; // A light, techy blue
    const ICON_PADDING = 20; // Extra space between icons

    let particles: IconParticle[] = [];
    const iconImages: HTMLImageElement[] = [];

    Object.values(iconSvgs).forEach(svgString => {
      const coloredSvg = svgString.replace('currentColor', ICON_COLOR);
      const img = new Image();
      img.src = `data:image/svg+xml;base64,${btoa(coloredSvg)}`;
      iconImages.push(img);
    });

    const createParticles = () => {
      particles = [];
      const maxAttempts = 100; // Prevents infinite loops

      for (let i = 0; i < ICON_COUNT; i++) {
        let attempts = 0;
        let positionIsValid = false;
        
        let candidate: IconParticle | null = null;

        while (!positionIsValid && attempts < maxAttempts) {
          attempts++;
          const size = Math.random() * (ICON_SIZE.max - ICON_SIZE.min) + ICON_SIZE.min;
          const candidateX = Math.random() * canvas.width;
          const candidateY = Math.random() * canvas.height;

          let hasCollision = false;
          // Check for collision with already placed particles
          for (const p of particles) {
            const distance = Math.sqrt(Math.pow(p.x - candidateX, 2) + Math.pow(p.y - candidateY, 2));
            const minDistance = (p.size / 2) + (size / 2) + ICON_PADDING;
            if (distance < minDistance) {
              hasCollision = true;
              break;
            }
          }

          if (!hasCollision) {
            positionIsValid = true;
            candidate = {
              x: candidateX, y: candidateY,
              vx: Math.random() * 0.2 - 0.1,
              vy: Math.random() * 0.2 - 0.1,
              rotation: Math.random() * Math.PI * 2,
              rotationSpeed: Math.random() * 0.002 - 0.001,
              size: size,
              opacity: Math.random() * 0.15 + 0.05,
              image: iconImages[i % iconImages.length],
            };
          }
        } // end while loop

        if (candidate) {
          particles.push(candidate);
        }
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    };

    const animate = () => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        if (p.x > canvas.width + p.size) p.x = -p.size;
        if (p.x < -p.size) p.x = canvas.width + p.size;
        if (p.y > canvas.height + p.size) p.y = -p.size;
        if (p.y < -p.size) p.y = canvas.height + p.size;
        
        ctx.globalAlpha = p.opacity;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.drawImage(p.image, -p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(animate);
    };

    const imageLoadPromises = iconImages.map(img => new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve;
    }));

    Promise.all(imageLoadPromises).then(() => {
        resizeCanvas(); // Initial creation of particles
        animate();
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
    />
  );
};

export default StarField;