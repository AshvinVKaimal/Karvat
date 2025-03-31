import React from 'react';
import '../../App.css';

const Settings = () => {
    return (
        <React.StrictMode>
          <div className='bg-krvt_cream h-full min-h-screen'>
    
            {/* Main text */}
            <div className='max-w-lg mx-auto'>
              <h1 className='flex'></h1>
              <h1 className='flex text-krvt_brick font-karvat text-6xl mt-5 justify-center text-center'>My Account</h1>
            </div>

            <div className='flex'>
                <div className='w-1/3 md:w-1/4 mt-5 mx-4 group flex relative bg-krvt_brick p-5 rounded-2xl'>
                    <div className='font-body text-white text-left z-10 px-2'>
                        <a href='/user/account' className='text-lg md:text-xl leading-tight'>Settings</a>
                        <h6 className='text-sm'><span>&#8203;</span></h6>
                        <a href='/user/orders' className='text-lg md:text-xl leading-tight'>My Orders</a>
                        <h6 className='text-sm'><span>&#8203;</span></h6>
                        <a href='/login' className='text-lg md:text-xl leading-tight'>Log Out</a>
                    </div>
                </div>
                <div className='w-2/3 md:w-3/4 mt-5 px-2 rounded-2xl'>
                  <h2 className='font-karvat text-krvt_brick text-4xl px-2 sm:text-3xl'>Settings</h2>
                  <div className='font-body text-krvt_brick text-left z-10 py-2'>
                    <h4 className='text-2xl sm:text-xl'>Change E-mail:</h4>
                    <input className='border-2 border-krvt_brick rounded-md p-2 w-2/3'></input>
                    <br></br>
                    <h4 className='relative top-2 text-2xl sm:text-xl'>Change Password:</h4>
                    <input className='relative top-2 border-2 border-krvt_brick rounded-md p-2 w-2/3'></input>
                  </div>
                  <br></br>
                  <button className="bg-krvt_mahogany px-4 py-2 rounded-xl font-karvat text-2xl text-white text-center hover:bg-krvt_brick">
                    Save Changes
                  </button>
                </div>
            </div>
            <br></br>
          </div>
        </React.StrictMode>
      );
};

export default Settings;
