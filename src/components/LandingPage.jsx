import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice';
import Loader from '../utils/Loader';

import { ToastContainer, toast } from 'react-toastify';

const LandingPage = () => {
  const dispatch = useDispatch();

  const { products, isLoading, isError } = useSelector(
    (state) => state.products,
  );
  const { search } = useSelector((state) => state.filter);
  const [cartItems, setCartItems] = useState([]);
  const [sortType, setSortType] = useState('');

  const sortProducts = (sortType) => {
    const sortedProducts = [...products];
    if (sortType === 'lowToHigh') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortType === 'highToLow') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    return sortedProducts;
  };

  useEffect(() => {
    // checking products
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  // Add product to cart
  const addToCartProduct = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);
    if (existingProduct) {
      // If the product already exists in the cart, update the quantity
      const updatedCartItems = cartItems.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      setCartItems(updatedCartItems);
      toast.success('Added to the Cart!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
        hideProgressBar: true,
      });
    } else {
      // If the product doesn't exist in the cart, add it with quantity 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      toast.success('Added to the Cart', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
        hideProgressBar: true,
      });
    }
  };

  useEffect(() => {
    dispatch(addToCart(cartItems));
  }, [dispatch, cartItems]);
  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);
  let content;
  // what to render
  if (isLoading) {
    content = <Loader></Loader>;
  }

  if (!isLoading && isError) {
    content = <p>Something is wrong!</p>;
  }

  if (!isError && !isLoading && products.length > 0) {
    content = (
      <>
        {sortProducts(sortType)
          .filter((product) =>
            product.title.toLowerCase().includes(search.toLowerCase()),
          )
          .map((product, i) => (
            <div key={i} className='w-64 h-[399px] relative'>
              <div className='w-64 h-[399px] left-0 top-0 absolute bg-white rounded-lg border border-pink-400' />
              <div className='w-[85px] h-[22px] left-[8px] top-[307px] absolute'>
                <div className="left-[17px] top-0 absolute text-black text-lg font-semibold font-['Inter']">
                  {product.price}
                </div>
                <div className='w-5 h-5 left-0 top-[1px] absolute'>
                  <div className='w-[8.75px] h-[11.67px] left-[5.83px] top-[4.17px] absolute'></div>
                </div>
              </div>
              <div className="left-[176px] top-[310px] absolute text-black text-xs font-medium font-['Inter']">
                (-45%)
              </div>
              <div className='w-[67px] h-[17px] left-[101px] top-[309px] absolute'>
                <div className='opacity-40 w-16 h-[17px] left-0 top-0 absolute'>
                  <div className="left-[13px] top-0 absolute text-black text-sm font-medium font-['Inter']">
                    {product.price}
                  </div>
                  <div className='w-4 h-4 left-0 top-[1px] absolute'>
                    <div className='w-[7px] h-[9.33px] left-[4.67px] top-[3.33px] absolute'></div>
                  </div>
                </div>
                <div className='w-[65px] h-[0px] left-[2px] top-[10px] absolute border border-neutral-400'></div>
              </div>
              <div className="w-[232px] left-[12px] top-[226px] absolute text-black text-base font-semibold font-['Inter'] leading-snug">
                {product.price}
              </div>
              <img
                className='w-[232px] h-[200px] left-[12px] top-[12px] absolute rounded-lg'
                src={product.image}
              />
              <div className='w-[132px] left-[12px] top-[278px] absolute'>
                <div className='w-[94px] h-3.5 left-0 top-[1px] absolute'>
                  <div className='w-3.5 h-3.5 left-0 top-0 absolute flex-col justify-start items-start inline-flex' />
                  <div className='w-3.5 h-3.5 left-[40px] top-0 absolute flex-col justify-start items-start inline-flex' />
                  <div className='w-3.5 h-3.5 left-[20px] top-0 absolute flex-col justify-start items-start inline-flex' />
                  <div className='w-3.5 h-3.5 left-[60px] top-0 absolute flex-col justify-start items-start inline-flex' />
                  <div className='w-3.5 h-3.5 left-[80px] top-0 absolute flex-col justify-start items-start inline-flex' />
                </div>
                <div className="w-[232px] text-black text-base font-semibold font-['Inter'] leading-snug">
                  {product.description.slice(0, 23)}{' '}
                </div>
              </div>
              <div className='w-[104px] h-9 left-[12px] top-[347px] absolute justify-center items-center inline-flex'>
                <div className='w-[104px] h-9 relative'>
                  <div className='w-[104px] h-9 left-0 top-0 absolute bg-white rounded border border-pink-600' />
                  <div className="left-[47.40px] top-[9px] absolute text-black text-sm font-medium font-['Inter']">
                    0
                  </div>
                  <div className='w-3 h-3 left-[80px] top-[12px] absolute'></div>
                  <div className='w-5 h-[0px] left-[36px] top-[8px] absolute origin-top-left rotate-90 border border-pink-600'></div>
                  <div className='w-5 h-[0px] left-[68px] top-[8px] absolute origin-top-left rotate-90 border border-pink-600'></div>
                </div>
              </div>
              <div className='w-[88px] h-9 left-[156px] top-[347px] absolute'>
                <div className='w-[88px] h-9 left-0 top-0 absolute bg-red-200 rounded' />
                <div
                  className='w-12 h-[18px] left-[20px] top-[9px] absolute cursor-pointer  '
                  onClick={() => addToCartProduct(product)}>
                  <div className="left-[24px] top-[1px] absolute text-pink-600 text-xs font-semibold font-['Inter'] cursor-pointer">
                    Add
                  </div>
                </div>
              </div>

              <div className="left-[13.90px] top-[39.60px] absolute origin-top-left rotate-[-47.16deg] text-white text-sm font-normal font-['Inter']">
                Sale
              </div>
            </div>
          ))}
      </>
    );
  }

  return (
    <div className='container mx-auto py-8'>
      <div className='flex md:justify-between justify-between mb-5'>
        <h2 className='md:text-2xl text-lg font-semibold mb-4'>
          Product Listing
        </h2>
        <div className='flex items-center space-x-4'>
          <label className='text-gray-700 hidden md:block'>Sort by:</label>
          <select
            id='sort'
            className='py-2 px-4 border sm:px-1 border-gray-300 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 rounded-md'
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}>
            <option value=''>Select Type</option>
            <option value='lowToHigh'>Price: Low to High</option>
            <option value='highToLow'>Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {content}
        <ToastContainer />
      </div>
      {/* <Pagination /> */}
    </div>
  );
};

export default LandingPage;
