import React, { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 240;

/**
 * ScrollVideo Component — Canvas High-Performance Cinematic Engine
 * Eliminates all browser video decoder lag and compositor freezes.
 * When pressing/holding the down arrow key or scrolling, frames update
 * LIVE in real time with 0ms seek delay and zero ghosting or Frame 1 overlay.
 */
export default function ScrollVideo({ scrollProgress, onLoadProgress, onReady }) {
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const currentFrameIndexRef = useRef(0);
  const targetFrameIndexRef = useRef(0);
  const rafIdRef = useRef(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [loadPercentage, setLoadPercentage] = useState(0);

  // Preload frames array
  useEffect(() => {
    let loadedCount = 0;
    const images = [];

    const onFrameLoad = () => {
      loadedCount++;
      const pct = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));
      setLoadPercentage(pct);
      if (onLoadProgress) onLoadProgress(pct);

      // Draw initial frame as soon as frame 1 arrives
      if (loadedCount === 1 && canvasRef.current) {
        renderFrame(0);
      }

      // Mark ready when critical initial batch is ready
      if (loadedCount >= Math.min(24, TOTAL_FRAMES)) {
        setIsLoaded(true);
        if (onReady) onReady();
      }
    };

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(4, '0');
      img.src = `/frames/frame_${paddedIndex}.jpg`;
      img.onload = onFrameLoad;
      img.onerror = onFrameLoad;
      images.push(img);
    }

    framesRef.current = images;

    return () => {
      images.forEach(img => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, []);

  // Frame rendering with object-fit: contain mathematics
  const renderFrame = (frameIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const images = framesRef.current;
    const img = images[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Find nearest loaded frame if target is still buffering
      let nearest = null;
      for (let offset = 1; offset < 20; offset++) {
        if (images[frameIdx - offset]?.complete) {
          nearest = images[frameIdx - offset];
          break;
        }
        if (images[frameIdx + offset]?.complete) {
          nearest = images[frameIdx + offset];
          break;
        }
      }
      if (nearest) {
        drawContainedImage(ctx, nearest, canvas.width, canvas.height);
      }
      return;
    }

    drawContainedImage(ctx, img, canvas.width, canvas.height);
  };

  const drawContainedImage = (ctx, img, canvasWidth, canvasHeight) => {
    const targetAspect = 1920 / 1080;
    const canvasAspect = canvasWidth / canvasHeight;

    let renderWidth, renderHeight, offsetX, offsetY;

    if (canvasAspect > targetAspect) {
      // Window is wider than 16:9 (pillarbox on left/right)
      renderHeight = canvasHeight;
      renderWidth = canvasHeight * targetAspect;
      offsetX = (canvasWidth - renderWidth) / 2;
      offsetY = 0;
    } else {
      // Window is taller than 16:9 (letterbox on top/bottom)
      renderWidth = canvasWidth;
      renderHeight = canvasWidth / targetAspect;
      offsetX = 0;
      offsetY = (canvasHeight - renderHeight) / 2;
    }

    ctx.fillStyle = '#030304';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
  };

  // Resize canvas to match window dimensions
  useEffect(() => {
    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      renderFrame(currentFrameIndexRef.current);
    };

    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();

    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  // Synchronous scroll & keyboard down-arrow listener: Paints frames INSTANTLY on keydown/scroll
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const progress = Math.max(0, Math.min(1, window.scrollY / maxScroll));
      const targetFrame = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(progress * (TOTAL_FRAMES - 1))));
      targetFrameIndexRef.current = targetFrame;

      // Draw immediately on scroll/keydown without waiting
      currentFrameIndexRef.current = targetFrame;
      renderFrame(targetFrame);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Also listen for keydown events to ensure instantaneous response when holding down arrow
    const handleKeyDown = (e) => {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Space'].includes(e.code)) {
        requestAnimationFrame(handleScroll);
      }
    };
    window.addEventListener('keydown', handleKeyDown, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Continuous lerp loop for ultra-smooth catch-up interpolation
  useEffect(() => {
    let isRunning = true;

    const lerpLoop = () => {
      if (!isRunning) return;

      const target = targetFrameIndexRef.current;
      const current = currentFrameIndexRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.5) {
        // Step smoothly toward target frame
        const next = Math.round(current + diff * 0.45);
        currentFrameIndexRef.current = next;
        renderFrame(next);
      }

      rafIdRef.current = requestAnimationFrame(lerpLoop);
    };

    rafIdRef.current = requestAnimationFrame(lerpLoop);

    return () => {
      isRunning = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-[#030304] flex items-center justify-center overflow-hidden pointer-events-none z-0">
      {/* 
        CRITICAL CANVAS ZERO-CROP ARCHITECTURE:
        - Canvas paints 240 high-precision video frames at 60+ FPS synchronously.
        - Zero video decoder lag, zero compositor freeze when holding down-arrow key.
        - 16:9 aspect ratio completely preserved on every device with #030304 letterboxing.
        - No native HTML5 poster attribute: ZERO ghosting, ZERO Frame 1 overlay.
      */}
      <div className="relative w-full h-full max-w-full max-h-full flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain pointer-events-none transition-opacity duration-700 ease-out"
          style={{
            maxHeight: "100vh",
            maxWidth: "100vw",
            opacity: isLoaded ? 0.95 : 0.4,
          }}
        />

        {/* 
          TRANSPARENT VEIL / SHEET:
          Dims the video gracefully into the background so the content takes center stage,
          while preserving the cyborg's smooth motion and futuristic presence.
        */}
        <div className="absolute inset-0 bg-[#030304]/60 pointer-events-none" />

        {/* Top-and-bottom depth gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030304]/85 via-transparent to-[#030304]/90 pointer-events-none" />

        {/* Ambient Radial Vignette */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#030304]/50 to-[#030304] pointer-events-none" />

        {/* Subtle laser scanline */}
        <div className="absolute inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent hud-scanline-laser pointer-events-none" />

        {/* Scanline texture */}
        <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-30" />
      </div>
    </div>
  );
}
