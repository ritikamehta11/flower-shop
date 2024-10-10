import Header from '@/components/Header'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const AddProduct = () => {

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [imageUrl, setUrl] = useState('');
  const [category, setCategory] = useState('');
const navigate = useNavigate(); 
  const handleCreate = async (e) => {
    e.preventDefault();
    
    try {
      
      const token = localStorage.getItem('token');
      console.log(token);
      const response = await axios.post("http://localhost:8888/api/shop/create", { name, price, description,imageUrl, category }, {
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
      <div className=' hero w-1/2 mx-auto my-10 flex flex-col gap-8  px-20 py-10'>AddProduct
        <form onSubmit={handleCreate} className=' flex flex-col gap-4'>
          <div className='flex flex-row '>
            <label className='labels' htmlFor="name">Name</label>
            <input className='input w-1/2 p-2' type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          </div>

          <div className='flex flex-row'>
            <label className='labels' htmlFor="price">Price</label>
            <input className='input  w-1/2  p-2' type="number" name='price' value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
          </div>

          <div className='flex flex-row'>
            <label className='labels' htmlFor="desc">Description</label>
            <input className='input  w-1/2  p-2' type="textarea" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="description" />
          </div>

          <div className='flex flex-row'>
            <label className='labels' htmlFor="url">Image</label>
            <input className='input  w-1/2  p-2' type="text" value={imageUrl} onChange={(e) => setUrl(e.target.value)} placeholder="url" />
          </div>
          <div className='flex flex-row'>
            <label className='labels' htmlFor="category">Category</label>
            <input className='input  w-1/2  p-2' type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" /></div>


          <button type="submit" className="pri-btn px-12 py-1 text-center font-thin mx-auto block">Add</button>
        </form>

      </div>
    </section>
  )
}
