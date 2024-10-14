import Header from '@/components/Header'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

export const UpdateProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: '',
    imageUrl: '',
    category: ''

  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://flower-shop-backend-81tw.onrender.com/api/shop/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();

  }, [id]);
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };


  const handleUpdate = async (e) => {
    e.preventDefault();

    try {

      const token = localStorage.getItem('token');
      console.log(token);
      const response = await axios.put(`https://flower-shop-backend-81tw.onrender.com/api/shop/update/${id}`, product, {
        headers: {
          Authorization: `Bearer ${token}`  // Pass the token in the headers
        }
      });
      navigate('/admin/allproducts');
      console.log(`Bearer ${token}`);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section >
      <Header></Header>
      <div className=' hero w-1/2 mx-auto my-10 flex flex-col gap-8  px-20 py-10'>Update Product
        <form onSubmit={handleUpdate} className=' flex flex-col gap-4'>
          <div className='flex flex-row '>
            <label className='labels' htmlFor="name">Name</label>
            <input className='input w-1/2 p-2' type="text" name='name' value={product.name} onChange={handleChange} placeholder={product.name} />
          </div>

          <div className='flex flex-row'>
            <label className='labels' htmlFor="price">Price</label>
            <input className='input  w-1/2  p-2' type="number" name='price' value={product.price} onChange={handleChange} placeholder="Price" />
          </div>

          <div className='flex flex-row'>
            <label className='labels' htmlFor="desc">Description</label>
            <input className='input  w-1/2  p-2' type="textarea" name='description' value={product.description} onChange={handleChange} placeholder="description"  />
          </div>

          <div className='flex flex-row'>
            <label className='labels' htmlFor="imageUrl">Image</label>
            <input className='input  w-1/2  p-2' type="text" name='imageUrl' value={product.imageUrl} onChange={handleChange} placeholder="url" />
          </div>
          <div className='flex flex-row'>
            <label className='labels' htmlFor="category">Category</label>
            <input className='input  w-1/2  p-2' type="text" name='category' value={product.category} onChange={handleChange} placeholder="Category" /></div>


          <button type="submit" className="pri-btn px-12 py-1 text-center font-thin mx-auto block">Update</button>
        </form>

      </div>
    </section>
  )
}
