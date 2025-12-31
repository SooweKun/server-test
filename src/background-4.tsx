export const PhotoBg2 = () => {
  return (
    <div
      className='w-full h-screen flex justify-center items-center overflow-hidden 
      /* Цвета: Синий -> Фиолетовый -> Розовый -> Красный -> Желтый */
      bg-gradient-to-r from-blue-600 via-purple-600 via-pink-500 via-red-500 to-yellow-500 
      /* Применяем наш размер и анимацию */
      bg-300 animate-gradient-flow'>
      <h1
        className='z-10 px-8 text-[20px] md:text-[26px] text-white text-center 
        font-medium tracking-widest leading-relaxed drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)]'>
        я не смогу пообещать, что никогда не сделаю тебе больно, <br className='hidden md:block' />
        но я постараюсь сделать тебя счастливой.
      </h1>

      {/* Легкий оверлей, чтобы цвета не «резали» глаза и текст лучше читался */}
      <div className='absolute inset-0 bg-black/10 pointer-events-none'></div>

      {/* Виньетка для глубины */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)] pointer-events-none'></div>
    </div>
  );
};
