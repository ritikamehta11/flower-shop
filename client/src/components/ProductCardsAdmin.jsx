import axios from 'axios';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';


export const ProductCardAdmin = ({ product, onDelete }) => {
  //const image = response.data.image;
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      // Send DELETE request to the backend
      await axios.delete(`https://flower-shop-1qtms7z64-ritika-mehtas-projects.vercel.app/api/shop/delete/${product._id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Pass token if authentication is required
        }
      });
      // Call the onDelete prop function to update the UI after deletion
      onDelete(product._id);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  return (
    <section className='flex flex-row w-3/5'>
      <img src={product.image} className="w-3/4" alt="product image" />
      <div className='productInfo basis-2/3'>
      <p><span className='labels'>Name:</span>  {product.name}</p>
      <p><span className='labels'>Price: </span> {product.price}</p>
      <p><span className='labels'>Description: </span> {product.description}</p>
        <p><span className='labels '>Category:</span>  {product.category}</p>
        <div className=''><button className='sec-btn-update px-8 py-0.5 text-center mx-1 font-thin  text-xs' onClick={() => navigate(`/admin/updateproductbyid/${product._id}`)}>Update </button>
          <button className='sec-btn-delete px-8 py-0.5 text-center font-thin mx-1 text-xs' onClick={handleDelete}>Delete</button></div>
      </div>
    </section>
  )
};
