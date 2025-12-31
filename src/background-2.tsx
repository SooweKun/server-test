'use client';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface Star {
  id: number;
  size: number;
  top: string;
  left: string;
  duration: number;
  delay: number;
}

interface ShootingStar {
  id: number;
  top: string;
  left: string;
  delay: number;
  duration: number;
  repeatDelay: number; // Теперь это тоже в стейте
}

interface StarryBackgroundProps {
  text?: string;
  children?: React.ReactNode;
}

const StarryBackground: React.FC<StarryBackgroundProps> = ({ text, children }) => {
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);

  useEffect(() => {
    // 1. Генерируем обычные звезды
    const generatedStars = [...Array(140)].map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 0.5,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    }));

    // 2. Генерируем падающие звезды со всеми параметрами заранее
    const generatedShootingStars = [...Array(3)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 40}%`,
      left: `${Math.random() * 40}%`,
      delay: Math.random() * 10,
      duration: Math.random() * 1 + 1.5,
      repeatDelay: Math.random() * 10 + 10, // Задержка между появлениями
    }));

    setStars(generatedStars);
    setShootingStars(generatedShootingStars);
  }, []);

  return (
    <div className='relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#020617]'>
      {/* --- BACKGROUND LAYER --- */}
      <div className='absolute inset-0 z-0 select-none pointer-events-none'>
        {/* Космический градиент */}
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1b2735_0%,_#090a0f_100%)]' />

        {/* Статичные мерцающие звезды */}
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className='absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]'
            style={{
              width: star.size,
              height: star.size,
              top: star.top,
              left: star.left,
            }}
            animate={{
              opacity: [0.1, 0.7, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Падающие звезды (метеоры) */}
        {shootingStars.map((sStar) => (
          <motion.div
            key={`shooting-${sStar.id}`}
            className='absolute h-[1px] w-[150px] bg-gradient-to-r from-transparent via-white/80 to-transparent'
            style={{
              top: sStar.top,
              left: sStar.left,
              rotate: '-40deg',
              opacity: 0,
            }}
            animate={{
              x: [0, 1200],
              y: [0, 900],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: sStar.duration,
              repeat: Infinity,
              delay: sStar.delay,
              repeatDelay: sStar.repeatDelay, // Используем значение из стейта
              ease: 'easeIn',
            }}
          />
        ))}
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className='relative z-10 px-6 text-center pointer-events-auto'>
        {text ? (
          <motion.div
            initial={{ opacity: 0, filter: 'blur(12px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 2, ease: 'easeOut' }}>
            <h1 className='text-white text-4xl md:text-7xl font-extralight tracking-[0.4em] uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]'>
              {text}
            </h1>
            <div className='mt-6 h-px w-16 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto' />
          </motion.div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default StarryBackground;
