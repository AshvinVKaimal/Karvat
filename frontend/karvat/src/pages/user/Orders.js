import React from 'react';
import '../../App.css';

const UserOrders = () => {
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
                    <div className='font-body text-krvt_brick text-left z-10 px-2'>
                        <h2 className='font-karvat text-4xl sm:text-3xl px-1'>My Orders</h2>
                    </div>

                    <div className="grid gap-5 p-3">
                        <div className="flex justify-between relative bg-white p-5 rounded-2xl">
                        <div className="text-gray-600">
                            <a href="#" className="font-karvat text-xl ml-5">
                            Order #0001
                            </a>
                            <p className="font-body text-md ml-5">Order Details</p>
                        </div>
                        <h1 className="font-karvat text-2xl text-gray-800 relative bottom-0.5 right-2">
                            ₹1000
                        </h1>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
          </div>
        </React.StrictMode>
      );
};

export default UserOrders;
