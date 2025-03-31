import React from 'react';
import Carousel from '../components/Carousel';
import '../App.css';

import car1 from '../images/carousel/1.png';
import car2 from '../images/carousel/2.png';
import car3 from '../images/carousel/3.png';
import car4 from '../images/carousel/4.png';
import car5 from '../images/carousel/5.png';
const images = [car1, car2, car3, car4, car5];

const Home = () => {
  return (
    <React.StrictMode>
      <div className='bg-krvt_cream h-full min-h-screen'>

        {/* Main text */}
        <div className='max-w-md mx-auto'>
          <h1 className='flex'></h1>
          <h1 className='flex text-krvt_brick font-karvat text-6xl mt-5 justify-center text-center'>Welcome to Karvat</h1>
          <p className='flex text-krvt_moss font-body text-xl mb-5 justify-center text-center'>Your digital gateway to discover and experience<br></br>the vibrant and diverse local markets of India</p>
        </div>

        {/* Carousel */}
        <Carousel images={images} />

        {/* Categories */}
        <div className='max-w-fit mx-auto'>
          <h1 className='flex text-krvt_brick font-karvat text-4xl mt-5 justify-center text-center'>Categories</h1>
          <div className='grid grid-cols-6 gap-4 mt-3'>
              <a href='/categories/clothing' className='text-center col-span-6 sm:col-span-3 lg:col-span-2'>
                <div className='bg-krvt_moss p-5 rounded-full hover:bg-krvt_vine'>
                  <h2 className='text-white font-karvat text-2xl'>Clothing</h2>
                </div>
              </a>
            <a href='/categories/jewellery' className='text-center col-span-6 sm:col-span-3 lg:col-span-2'>
              <div className='bg-krvt_moss p-5 rounded-full hover:bg-krvt_vine'>
                <h2 className='text-white font-karvat text-2xl'>Jewellery</h2>
              </div>
            </a>
            <a href='/categories/handicrafts' className='text-center col-span-6 sm:col-span-3 lg:col-span-2'>
              <div className='bg-krvt_moss p-5 rounded-full hover:bg-krvt_vine'>
                <h2 className='text-white font-karvat text-2xl'>Handicrafts</h2>
              </div>
            </a>
            <a href='/categories/books' className='text-center col-span-6 sm:col-span-3 lg:col-span-2'>
              <div className='bg-krvt_moss p-5 rounded-full hover:bg-krvt_vine'>
                <h2 className='text-white font-karvat text-2xl'>Books</h2>
              </div>
            </a>
            <a href='/categories/accessories' className='text-center col-span-6 sm:col-span-3 lg:col-span-2'>
              <div className='bg-krvt_moss p-5 rounded-full hover:bg-krvt_vine'>
                <h2 className='text-white font-karvat text-2xl'>Accessories</h2>
              </div>
            </a>
            <a href='/categories/houseware' className='text-center col-span-6 sm:col-span-3 lg:col-span-2'>
              <div className='bg-krvt_moss p-5 rounded-full hover:bg-krvt_vine'>
                <h2 className='text-white font-karvat text-2xl'>Houseware</h2>
              </div>
            </a>
          </div>
        </div>
        <br></br>
      </div>
    </React.StrictMode>
  );
};

export default Home;
