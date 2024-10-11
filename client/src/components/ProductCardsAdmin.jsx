import React from 'react'
import { Link } from 'react-router-dom';


export const ProductCardAdmin = ({ product }) => {
  return (
    <section className='flex flex-row'>
      <img src={`http://localhost:8888/${product.image}`} alt="" />
      <div className='productInfo basis-2/3'>
      <p><span className='labels'>Name:</span>  {product.name}</p>
      <p><span className='labels'>Price: </span> {product.price}</p>
      <p><span className='labels'>Description: </span> {product.description}</p>
        <p><span className='labels '>Category:</span>  {product.category}</p>
        <div className=''><button className='sec-btn-update px-8 py-0.5 text-center mx-1 font-thin  text-xs'><Link to={`/admin/updateproductbyid/${product._id}`}>Update </Link></button>
          <button className='sec-btn-delete px-8 py-0.5 text-center font-thin mx-1 text-xs'><Link to='admin/deleteproduct'>Delete</Link></button></div>
      </div>
    </section>
  )
};
