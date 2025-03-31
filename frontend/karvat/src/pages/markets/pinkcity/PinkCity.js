import React from 'react';
import '../../../App.css';

import map from '../../../images/carousel/5.png';

const PinkCity = () => {
  return (
    <React.StrictMode>
      <div className='bg-krvt_cream h-full min-h-screen'>

        {/* Main text */}
        <div className='max-w-lg mx-auto'>
          <h1 className='flex'></h1>
          <h1 className='flex text-krvt_brick font-karvat text-6xl mt-5 justify-center text-center'>Pink City Bazaars</h1>
          <p className='flex text-krvt_moss font-body text-xl mb-5 justify-center text-center'>Jaipur is famous for its vibrant bazaars located in the historic Pink City. Some of the prominent markets include Johri Bazaar (known for jewellery), Bapu Bazaar (famous for textiles and handicrafts), and Chandpol Bazaar (renowned for marble sculptures and traditional Rajasthani artifacts).</p>
        </div>

        {/* Placeholder for Street View */}
        <div className='flex justify-center max-w-5/6 mx-auto'>
          <img src={map} alt='Bazaar Map View' className='rounded-2xl w-5/6' />
        </div>

        {/* Markets */}
        <div className='max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto mt-10'>
          <div className='grid grid-cols-6 gap-8 mt-5'>
            <a href='/markets/pinkcity_bazaar/shop1' className='col-span-6 sm:col-span-3'>
              <div className='group flex relative bg-krvt_brick p-5 rounded-2xl'>
                <div className='text-white text-left z-10'>
                    <h2 className='font-karvat text-4xl sm:text-3xl'>Shop 1</h2>
                    <p className='font-body text-md leading-tight'>Handcrafted silver jewelry, gemstone-studded ornaments, and traditional Rajasthani designs.</p>
                </div>
              </div>
            </a>

            <a href='/markets/pinkcity_bazaar/shop2' className='col-span-6 sm:col-span-3'>
              <div className='group flex relative bg-krvt_brick p-5 rounded-2xl'>
                <div className='text-white text-left z-10'>
                    <h2 className='font-karvat text-4xl sm:text-3xl'>Shop 2</h2>
                    <p className='font-body text-md leading-tight'>Colorful fabrics and block-printed textiles along with wooden carvings and Jaipur's famous blue pottery</p>
                </div>
              </div>
            </a>

            <a href='/markets/pinkcity_bazaar/shop3' className='col-span-6 sm:col-span-3'>
              <div className='group flex relative bg-krvt_brick p-5 rounded-2xl'>
                <div className='text-white text-left z-10'>
                    <h2 className='font-karvat text-4xl sm:text-3xl'>Shop 3</h2>
                    <p className='font-body text-md leading-tight'>Marble sculpures and traditional Rajasthani handicrafts like puppets, lac bangles, and camel leather items.</p>
                </div>
              </div>
            </a>
          </div>
        </div>
        <br></br>
      </div>
    </React.StrictMode>
  );
};

export default PinkCity;
