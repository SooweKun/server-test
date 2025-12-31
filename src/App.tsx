import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import AnimatedGradient from '../src/background-1';
import StarryBackground from '../src/background-2';
import { PhotoBg } from '../src/background-3';
import { PhotoBg2 } from '../src/background-4';
import { End } from '../src/background-5';

// Импортируйте ваши компоненты здесь
// import AnimatedHero from './AnimatedHero';
// ... и так далее

const App = () => {
  const [step, setStep] = useState(0);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });

  // 1. Очередь: компонент и свайп, который НУЖНО сделать, чтобы уйти с этого экрана
  const screens = [
    { id: 0, component: <AnimatedGradient text='пиздец ?' />, requiredSwipe: 'RIGHT' },
    { id: 1, component: <StarryBackground text='наверное это можно исправить ?' />, requiredSwipe: 'DOWN' },
    { id: 2, component: <PhotoBg />, requiredSwipe: 'LEFT' },
    { id: 3, component: <PhotoBg2 />, requiredSwipe: 'UP' },
    { id: 4, component: <End />, requiredSwipe: null }, // Последний экран
  ];

  const handleTouchStart = (e) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const dx = touchEndX - touchStart.x;
    const dy = touchEndY - touchStart.y;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    // Минимальное расстояние для свайпа
    if (Math.max(absX, absY) < 30) return;

    let detectedDirection = '';
    if (absX > absY) {
      detectedDirection = dx > 0 ? 'RIGHT' : 'LEFT';
    } else {
      detectedDirection = dy > 0 ? 'DOWN' : 'UP';
    }

    // Проверяем, совпадает ли свайп с требуемым для текущего шага
    if (detectedDirection === screens[step].requiredSwipe) {
      if (step < screens.length - 1) {
        setStep(step + 1);
      }
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        backgroundColor: '#000',
        touchAction: 'none', // Важно: предотвращает стандартный скролл браузера
      }}>
      <AnimatePresence mode='wait'>
        <motion.div
          key={step}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }} // Плавность здесь
          style={{ height: '100%', width: '100%' }}>
          {screens[step].component}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default App;
