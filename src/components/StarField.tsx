import React, { useEffect, useRef } from "react";

// --- Our set of thematic SVG icons ---
const iconSvgs = {
  dna: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.5A4.5 4.5 0 0 0 8.5 10A4.5 4.5 0 0 0 4 5.5"/><path d="M8.5 10A4.5 4.5 0 0 0 13 14.5"/><path d="M8.5 10A4.5 4.5 0 0 1 13 5.5"/><path d="M15.5 18.5A4.5 4.5 0 0 0 20 14A4.5 4.5 0 0 0 15.5 9.5"/><path d="M13 14.5A4.5 4.5 0 0 0 17.5 10"/><path d="M13 5.5A4.5 4.5 0 0 1 17.5 10"/></svg>`,
  atom: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-5.71-1.99-7.72-2.01-2.01-5.7-4.03-7.72-1.99"/><path d="M3.8 3.8c-2.04 2.03-.02 5.71 1.99 7.72 2.01 2.01 5.7 4.03 7.72 1.99"/></svg>`,
  leaf: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 4 13q0-4.5 7-10 7 5.5 7 10a7 7 0 0 1-7 7Z"/><path d="M11 20v-9"/></svg>`,
  microscope: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/></svg>`,
  rocket: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.05-3.05A7.3 7.3 0 0 0 5 5.5c0-1.5.5-2.5 2-3l2.5-2.5c.78-.78 2.05-.78 2.83 0l2.5 2.5c1.5.5 2 1.5 2 3a7.3 7.3 0 0 1-2.55 5.05c-.65.75-.66 2.21.05 3.05 1.26 1.5 5 2 5 2s-.74-3.5-2-5-2.5-2-5-2-3.74.5-5 2z"/><path d="M9 18a6 6 0 0 1 6 0"/></svg>`,
  heart: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
  brain: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15A2.5 2.5 0 0 1 9.5 22h-3A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2h3Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 2.5 2.5h3A2.5 2.5 0 0 0 20 19.5v-15A2.5 2.5 0 0 0 17.5 2h-3Z"/><path d="M9 12h6"/><path d="M9 16h6"/></svg>`,
  flask: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2v10.3A5.002 5.002 0 0 0 12 22a5 5 0 0 0 3-1.7V2"/><path d="M6 12h12"/></svg>`,
  virus: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="m12 8 2 2"/><path d="m12 16 2-2"/><path d="m12 8-2 2"/><path d="m12 16-2-2"/><path d="M7.6 7.6 6 6"/><path d="m18 6-1.6 1.6"/><path d="m6 18 1.6-1.6"/><path d="m16.4 16.4 1.6 1.6"/></svg>`,
  planet: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.83 14.24c1.17-2.12.7-4.8-1.08-6.58C16.03 5.95 13.46 5.5 12 6.05c-1.46.56-2.58 1.68-3.05 3.13-1.12 3.42.92 7.04 4.34 8.16 3.42 1.12 7.04-.92 8.16-4.34Z"/><path d="m15 15-.8-2.3-2.3-.8.8-2.3 2.3.8Z"/><path d="M9 6h.01"/><path d="M5 14h.01"/><path d="m20 18-.8-2.3-2.3-.8.8-2.3 2.3.8Z"/></svg>`,
  satellite: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 10.5c-2.5 2.5-2.5 6.5 0 9s6.5 2.5 9 0"/><path d="m18 12-6-6"/><path d="m13 7 5 5"/><path d="m22 2-3 1 1 4 2-3"/><path d="M11 13 8 10l-1.5 1.5 4.5 4.5 1.5-1.5Z"/></svg>`,
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
    const ICON_COUNT = 80;
    const ICON_SIZE = { min: 20, max: 40 };
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
              opacity: Math.random() * 0.08 + 0.05,
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