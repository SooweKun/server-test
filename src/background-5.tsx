import { useEffect, useRef } from 'react';

export const End = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Генерация игрушек
    const ornaments = [];
    const colors = ['#ff3b3b', '#ffeb3b', '#3bafff', '#ffffff', '#ff80ed'];

    // Создаем "карту" игрушек, чтобы они были привязаны к телу елки
    for (let i = 0; i < 50; i++) {
      ornaments.push({
        level: Math.random(), // Высота на дереве
        offset: Math.random() * 2 - 1, // Смещение от центра (-1 до 1)
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 3 + 2,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const drawTree = (ctx, cx, cy, width, height) => {
      // 1. Ствол с градиентом
      const trunkWidth = width * 0.1;
      const trunkHeight = height * 0.15;
      const trunkGrad = ctx.createLinearGradient(cx - trunkWidth, cy, cx + trunkWidth, cy);
      trunkGrad.addColorStop(0, '#2b1d10');
      trunkGrad.addColorStop(0.5, '#4a321f');
      trunkGrad.addColorStop(1, '#2b1d10');

      ctx.fillStyle = trunkGrad;
      ctx.fillRect(cx - trunkWidth / 2, cy - trunkHeight, trunkWidth, trunkHeight);

      // 2. Рисуем хвою (несколько слоев для пушистости)
      const layers = 6;
      for (let i = layers; i > 0; i--) {
        const layerY = cy - trunkHeight - (height / layers) * (layers - i);
        const layerW = width * (i / layers);
        const layerH = (height / layers) * 1.3;

        // Градиент для хвои (темнее к центру и низу)
        const treeGrad = ctx.createRadialGradient(cx, layerY - layerH / 2, 0, cx, layerY, layerW);
        treeGrad.addColorStop(0, '#0a5d34'); // Светлый центр
        treeGrad.addColorStop(0.8, '#063d22'); // Темные края
        treeGrad.addColorStop(1, '#042d19');

        ctx.fillStyle = treeGrad;
        ctx.beginPath();
        ctx.moveTo(cx, layerY - layerH); // Верхушка слоя

        // Рисуем "рваный" край ветки
        const segments = 12;
        // Левая сторона
        for (let j = 0; j <= segments; j++) {
          const currX = cx - (layerW / 2) * (j / segments);
          const currY = layerY - layerH + layerH * (j / segments) + (j % 2 === 0 ? 5 : 0);
          ctx.lineTo(currX, currY);
        }
        // Нижний волнообразный край
        for (let j = 0; j <= segments; j++) {
          const currX = cx - layerW / 2 + layerW * (j / segments);
          const currY = layerY + (j % 2 === 0 ? -10 : 5);
          ctx.lineTo(currX, currY);
        }
        // Правая сторона
        for (let j = segments; j >= 0; j--) {
          const currX = cx + (layerW / 2) * (j / segments);
          const currY = layerY - layerH + layerH * (j / segments) + (j % 2 === 0 ? 5 : 0);
          ctx.lineTo(currX, currY);
        }

        ctx.closePath();
        ctx.fill();
      }
    };

    const drawStar = (ctx, x, y, size, time) => {
      ctx.save();
      ctx.translate(x, y);
      const pulse = Math.sin(time * 0.005) * 0.2 + 1;
      ctx.scale(pulse, pulse);
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#fff700';
      ctx.fillStyle = '#ffed00';
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        ctx.rotate(Math.PI / 5);
        ctx.lineTo(0, 0 - size);
        ctx.rotate(Math.PI / 5);
        ctx.lineTo(0, 0 - size * 0.4);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const treeH = Math.min(canvas.height * 0.7, 500);
      const treeW = treeH * 0.8;
      const centerX = canvas.width / 2;
      const bottomY = canvas.height * 0.8;

      // Фон: легкое виньетирование
      const bgGrad = ctx.createRadialGradient(centerX, bottomY - treeH / 2, 100, centerX, bottomY - treeH / 2, canvas.width);
      bgGrad.addColorStop(0, '#1a1a1a');
      bgGrad.addColorStop(1, '#0c0c0c');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Снег на фоне
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      for (let i = 0; i < 50; i++) {
        const sx = (Math.sin(time * 0.0002 + i * 543) * 0.5 + 0.5) * canvas.width;
        const sy = (time * 0.03 + i * 100) % canvas.height;
        ctx.beginPath();
        ctx.arc(sx, sy, 1, 0, Math.PI * 2);
        ctx.fill();
      }

      // Отрисовка дерева
      drawTree(ctx, centerX, bottomY, treeW, treeH);

      // Звезда
      drawStar(ctx, centerX, bottomY - treeH - 10, 20, time);

      // Игрушки
      ornaments.forEach((orn) => {
        const y = bottomY - 100 - treeH * orn.level;
        const currentWidth = treeW * (orn.level * 0.9);
        const x = centerX + (orn.offset * currentWidth) / 2;

        const flicker = Math.abs(Math.sin(time * 0.003 + orn.phase));

        ctx.shadowBlur = 10 * flicker;
        ctx.shadowColor = orn.color;
        ctx.globalAlpha = 0.5 + 0.5 * flicker;
        ctx.fillStyle = orn.color;

        ctx.beginPath();
        ctx.arc(x, y, orn.size, 0, Math.PI * 2);
        ctx.fill();

        // Блик на игрушке
        ctx.fillStyle = '#fff';
        ctx.globalAlpha = 0.3 * flicker;
        ctx.beginPath();
        ctx.arc(x - orn.size / 3, y - orn.size / 3, orn.size / 4, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className='relative w-full h-screen overflow-hidden bg-[#0c0c0c] flex flex-col justify-center items-center text-center text-white px-5'>
      <canvas ref={canvasRef} className='absolute top-0 left-0 w-full h-full' style={{ pointerEvents: 'none' }} />

      <div className='relative z-10 flex flex-col gap-[15px] pointer-events-none mt-[20vh]'>
        <h1 className='text-[26px] font-bold text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.5)]'>с новым годом котя ❤️🎄❤️</h1>
        <p className='text-[18px] text-gray-300 italic'>я постараюсь сделать так, чтобы он не описывался фразой:</p>
        <div className='overflow-hidden'>
          <p className='text-[32px] font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400 uppercase tracking-[0.2em] animate-pulse'>
            пиздец
          </p>
        </div>
      </div>
    </div>
  );
};
