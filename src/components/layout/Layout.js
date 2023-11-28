import React, { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';



const Layout = ({ }) => {

  const cookies = new Cookies();
  let adminEmail = cookies.get('auth');


  const navigate = useNavigate();


  const logoutHandler = () => {
    cookies.remove('auth');
    navigate('/login', { replace: true });

  }


  return (

    <div className='container mx-auto font-vazir'>
      <header className='flex justify-between bg-green-500 p-3 mt-2 rounded-full'>
        <div>
          <span className='text-white-100 font-medium'>
            {`${adminEmail} خوش آمدید`}
          </span>

        </div>
        <div>
          <span className='text-white-100 font-bold text-xl'>
            برنامه مدیریت کاربران
          </span>
        </div>
        <div>
          <span className='text-white-100 cursor-pointer hover:underline' onClick={logoutHandler}>
            خروج
          </span>
        </div>
      </header>
      <Outlet />
    </div>

  )
}

export default Layout;
