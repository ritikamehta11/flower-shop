import { UserContext } from '@/context/UserContext';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';


export const ProductCard = ({ product }) => {

  const { addToCart } = useContext(UserContext);
  const { user } = useContext(UserContext);
  console.log(product);
 // const image = response.data.imageUrl;
  
  const handleAddToCart = () => {
 console.log(user);
    addToCart(product._id, 1); // Adding 1 quantity of the product
  };
  return (
    <>
      <div className='flex flex-col border-2 min-w-40 p-4'>
        <img src={product.image} alt="product image" />
      <p className='flex flex-row justify-between my-4'><span className='font-semibold'> {product.name} </span><span className='text-right'>{product.price}</span></p>
      <button className='sec-btn border-2 py-1' onClick={handleAddToCart}>Add to Cart</button>
      <Link to='/popup' className='text-xs mt-2 underline text-blue-700'>View Details</Link>
</div>
    </>
  )
};

