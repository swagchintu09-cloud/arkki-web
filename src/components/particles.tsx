'use client';
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

// Adapted from https://codepen.io/alphardex/pen/vYEYdQP
export function Particles({
  className,
  quantity = 150,
  ease = 50,
}: {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  connectDistance?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<any[]>([]);
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const requestAnimationFrameRef = useRef<number>(0);

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext('2d');
    }
    initCanvas();
    animate();
    window.addEventListener('resize', initCanvas);

    return () => {
      window.removeEventListener('resize', initCanvas);
      cancelAnimationFrame(requestAnimationFrameRef.current);
    };
  }, []);

  useEffect(() => {
    onMouseMove();
  }, []);

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  const onMouseMove = () => {
    if (canvasContainerRef.current) {
      canvasContainerRef.current.addEventListener(
        'mousemove',
        (event: MouseEvent) => {
          const rect = canvasContainerRef.current!.getBoundingClientRect();
          const { clientX, clientY } = event;
          mousePosition.current.x = clientX - rect.left;
          mousePosition.current.y = clientY - rect.top;
        }
      );
    }
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current.length = 0;
      canvasRef.current.width = canvasContainerRef.current.offsetWidth;
      canvasRef.current.height = canvasContainerRef.current.offsetHeight;
      context.current.fillStyle = `hsl(var(--primary))`;
    }
  };

  const drawParticle = (particle: any) => {
    if (context.current) {
      context.current.beginPath();
      context.current.arc(particle.x, particle.y, particle.R, 0, 2 * Math.PI);
      context.current.closePath();
      context.current.fillStyle = `hsla(var(--primary), ${particle.S})`;
      context.current.fill();
    }
  };

  const drawParticles = () => {
    clearContext();
    for (let i = 0; i < quantity; i++) {
      const R = Math.random() * 1.5 + 0.5;
      const S = (Math.random() * 0.5) + 0.1;
      const circle = {
        x: Math.random() * canvasRef.current!.width,
        y: Math.random() * canvasRef.current!.height,
        R,
        S,
        dX: (Math.random() - 0.5) * 0.3,
        dY: (Math.random() - 0.5) * 0.3,
      };
      circles.current.push(circle);
      drawParticle(circle);
    }
  };

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(
        0,
        0,
        canvasRef.current!.width,
        canvasRef.current!.height
      );
    }
  };

  const findDistance = (p1: any, p2: any) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }

  const animate = () => {
    clearContext();
    
    circles.current.forEach((particle, i) => {
      // Mouse interaction
      const distanceToMouse = findDistance(particle, mousePosition.current);
      if (distanceToMouse < ease) {
        particle.x += (mousePosition.current.x - particle.x) / (ease / 2);
        particle.y += (mousePosition.current.y - particle.y) / (ease / 2);
      } else {
        particle.x += particle.dX;
        particle.y += particle.dY;
      }
      
      // Boundary conditions
      if (particle.x < 0) particle.x = canvasRef.current!.width;
      if (particle.x > canvasRef.current!.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvasRef.current!.height;
      if (particle.y > canvasRef.current!.height) particle.y = 0;

      drawParticle(particle);
    });

    requestAnimationFrameRef.current = requestAnimationFrame(animate);
  };

  return (
    <div className={cn('h-full w-full', className)} ref={canvasContainerRef}>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
