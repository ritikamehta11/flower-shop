import React from 'react'
import { Link } from 'react-router-dom';

export const ProductCard = ({ product }) => {
  return (
    <>
      <div className='flex flex-col border-2 min-w-40 p-4'>
        <img src="" alt="" />
      <p className='flex flex-row justify-between'><span className='font-semibold'> {product.name} </span><span className='text-right'>{product.price}</span></p>
      <button className='sec-btn border-2 py-1'>Add to Cart</button>
      <Link to='/popup' className='text-xs mt-2 underline text-blue-700'>View Details</Link>
</div>
    </>
  )
};

