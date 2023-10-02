import React from 'react';
import MenuItems from './MenuItems';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { userLogOut } from '../../features/auth/authSlice';
import { useState } from 'react';
import { addSearch } from '../../features/filter/filterSlice';
import { useEffect } from 'react';
const Navbar = () => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cartItems);

  const user = useSelector((state) => state.auth);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(addSearch(search));
  }, [dispatch, search]);
  const logOut = () => {
    dispatch(userLogOut());
  };

  return (
    <header className='bg-white shadow'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <Link to='/' className='text-2xl font-bold text-gray-800'>
              MiniCommerce
            </Link>
          </div>
          {/* Hamburger Menu for Mobile */}
          <div className='flex sm:hidden'>
            <button
              type='button'
              className='text-gray-700 hover:text-gray-900 focus:outline-none'>
              <svg
                className='h-6 w-6'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>
          </div>
          {/* Desktop Navigation and User Account */}
          <nav className='hidden sm:flex space-x-4'>
            <div className='hidden sm:block'>
              <div className='flex space-x-4 justify-center items-center mt-2'>
                <Link to='/purchase'>
                  <MenuItems title='purchases' />
                </Link>
              </div>
            </div>

            <div className="left-[601px] top-[37px] absolute text-black text-opacity-60 text-xs font-normal font-['Inter']">
              <input
                type='text'
                placeholder='Search products...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {/* Cart Summary */}
						<Link to='/cart'>
              <div className='w-[123px] h-10 left-[1059px] top-[25px] absolute justify-center items-center gap-2.5 inline-flex'>
                <div className='w-[123px] h-10 bg-pink-600 rounded-[42px] border border-pink-600' />
                <div className='grow shrink basis-0 self-stretch relative'>
                  <div className="left-[22px] top-[1px] absolute text-white text-sm font-medium font-['Inter']">
                    Cart (0)
                  </div>
                </div>
              </div>
            </Link>

            {user.username && user.token !== null ? (
              <div className='flex items-center gap-3'>
                <h3 className='text-indigo-700 text-xl '>{user.username}</h3>
                <button
                  className='text-rose-700 text-xl'
                  onClick={() => dispatch(userLogOut())}>
                  logout
                </button>
              </div>
            ) : (
              <Link to='/login'>
                <button className='px-3 py-2 bg-indigo-700 text-white rounded-md'>
                  Login
                </button>
              </Link>
            )}
          </nav>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      <div className='sm:hidden'>
        <div className='px-2 pt-2 pb-3 space-y-1 text-center'>
          <div className='flex justify-evenly'>
            <Link to='/purchase'>
              <MenuItems title='purchases' />
            </Link>
          </div>

          <div>
            {/* Search Bar */}
            <div className='relative'>
              <input
                type='text'
                className='w-64 py-2 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                placeholder='Search products...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className='flex justify-evenly'>
            {/* <Link to='/cart'>
              <div
                className='flex items-center mt-2
                                   '>
                <span className='bg-red-500 text-white rounded-full px-2 mb-2 shadow-md'>
                  {cartItem.cartProducts.length}
                </span>
              </div>
            </Link> */}
            <Link to='/cart'>
              <div className='w-[123px] h-10 left-[1059px] top-[25px] absolute justify-center items-center gap-2.5 inline-flex'>
                <div className='w-[123px] h-10 bg-pink-600 rounded-[42px] border border-pink-600' />
                <div className='grow shrink basis-0 self-stretch relative'>
                  <div className="left-[22px] top-[1px] absolute text-white text-sm font-medium font-['Inter']">
                    Cart (0)
                  </div>
                </div>
              </div>
            </Link>

            <div className='flex items-center gap-3'>
              <h3 className='text-indigo-700 text-sm '>{user.username}</h3>
              {user.username && user.null !== null ? (
                <div className='flex items-center gap-3'>
                  <h3 className='text-indigo-700 text-xl '>{user.username}</h3>
                  <button
                    className='text-rose-700 text-xl'
                    onClick={() => logOut()}>
                    logout
                  </button>
                </div>
              ) : (
                <Link to='/login'>
                  <button className='px-3 py-2 bg-indigo-700 text-white rounded-md'>
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
{/* <>
  <div className='w-[1280px] h-[90px] left-0 top-0 absolute bg-white border-b border-black border-opacity-25' />
  <div className='w-[360px] h-10 left-[559px] top-[25px] absolute bg-white rounded-[42px] border border-pink-500' />
  <div className='w-[18px] h-[18px] left-[577px] top-[36px] absolute opacity-60' />
  <div className='w-[200px] left-[94px] top-[14px] absolute'>
    <div className='w-[123px] h-[59px] left-[77px] top-0 absolute'>
      <div className='w-[123px] h-[59px] left-0 top-0 absolute'>
        <div className="left-[0.22px] top-[-0px] absolute text-pink-600 text-[42px] font-normal font-['Mintaka']">
          Anghorag
        </div>
      </div>
      <div className='w-[59.29px] h-[8.19px] left-[45px] top-[46px] absolute'></div>
      <div className='w-[59.29px] h-[8.19px] left-[45.20px] top-[46px] absolute'></div>
    </div>
    <img
      className='w-[77px] h-[62px] left-0 top-0 absolute'
      src='https://via.placeholder.com/77x62'
    />
  </div>
  <div className="left-[601px] top-[37px] absolute text-black text-opacity-60 text-xs font-normal font-['Inter']">
    Search for products...
  </div>
  <div className='h-5 left-[939px] top-[35px] absolute'>
    <div className="left-[24px] top-[1px] absolute text-black text-sm font-medium font-['Inter']">
      Account
    </div>
  </div>
  <div className='w-[123px] h-10 left-[1059px] top-[25px] absolute justify-center items-center gap-2.5 inline-flex'>
    <div className='w-[123px] h-10 bg-pink-600 rounded-[42px] border border-pink-600' />
    <div className='grow shrink basis-0 self-stretch relative'>
      <div className="left-[22px] top-[1px] absolute text-white text-sm font-medium font-['Inter']">
        Cart (0)
      </div>
    </div>
  </div>
</>; */}
