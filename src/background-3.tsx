import One from '../src/assets/1.jpg';
import Two from '../src/assets/2.jpg';
import Three from '../src/assets/3.jpg';
import Four from '../src/assets/4.jpg';

export const PhotoBg = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-[#121212]'>
      <div className='relative w-full h-[700px] justify-center items-center flex'>
        <div className=''>
          <img src={One} alt='' className='w-[200px] h-[200px] rotate-12 rounded-xl absolute top-0 left-[30px]' />
          <img src={Two} alt='' className='w-[200px] h-[200px] rotate-12 rounded-xl absolute top-0 left-[210px]' />
        </div>
        <h1 className='text-[20px] text-white'>смотри какие мы тут милые ❤️</h1>
        <div>
          <img src={Three} alt='' className='w-[200px] h-[200px] rotate-12 rounded-xl absolute bottom-0 left-[30px]' />
          <img src={Four} alt='' className='w-[200px] h-[200px] rotate-12 rounded-xl absolute bottom-0 left-[210px]' />
        </div>
      </div>
    </div>
  );
};
