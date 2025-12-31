'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Blob {
  id: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  // Массивы для ключевых кадров анимации
  xValues: string[];
  yValues: string[];
  scaleValues: number[];
}

const AnimatedGradient = ({ text }: { text: string }) => {
  const [blobs, setBlobs] = useState<Blob[]>([]);

  useEffect(() => {
    // Выразительная палитра (Беж + акценты)
    const colors = [
      '#D4A373', // Глубокий песочный
      '#A3B18A', // Оливковый
      '#8E9AAF', // Пыльно-голубой
      '#BC6C25', // Терракотовый
      '#CCD5AE', // Шалфей
      '#FAEDCD', // Кремовый беж
    ];

    const generatedBlobs = [...Array(10)].map((_, i) => ({
      id: i,
      // Размер 200 или 400
      size: Math.random() > 0.5 ? 400 : 200,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 15 + 20, // Медленно и плавно
      delay: Math.random() * -20,
      // Генерируем случайный путь по экрану (в процентах)
      xValues: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
      yValues: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
      scaleValues: [1, 1.4, 0.8, 1.2, 1],
    }));

    setBlobs(generatedBlobs);
  }, []);

  return (
    <div className='relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#FEFAE0]'>
      {/* Контейнер для движущегося градиента */}
      <div className='absolute inset-0 z-0'>
        {/* Блюр здесь — это магия, которая превращает круги в градиент */}
        <div className='relative h-full w-full opacity-80 blur-[100px] md:blur-[120px]'>
          {blobs.map((blob) => (
            <motion.div
              key={blob.id}
              className='absolute rounded-full'
              style={{
                width: blob.size,
                height: blob.size,
                backgroundColor: blob.color,
                // Начальная точка не важна, так как animate берет массивы
                top: 0,
                left: 0,
              }}
              animate={{
                x: blob.xValues,
                y: blob.yValues,
                scale: blob.scaleValues,
              }}
              transition={{
                duration: blob.duration,
                repeat: Infinity,
                repeatType: 'mirror', // Движение туда-обратно для плавности
                ease: 'easeInOut',
                delay: blob.delay,
              }}
            />
          ))}
        </div>
      </div>

      {/* Текст строго по центру */}
      <div className='relative z-10 px-6 text-center select-none'>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className='text-6xl md:text-9xl font-black text-[#283618] tracking-tighter mix-blend-multiply opacity-90'>
          {text}
        </motion.h1>
      </div>
    </div>
  );
};

export default AnimatedGradient;
