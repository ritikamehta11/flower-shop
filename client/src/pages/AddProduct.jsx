import Header from '@/components/Header';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!name || !price || !description || !category || !image) {
      alert('Please fill out all fields including uploading an image.');
      return;
    }
    // Create a FormData object to handle file upload
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('image', image); // Add the image file
    formData.append('category', category);
console.log(Array.from(formData.entries()));

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post("https://flower-shop-1qtms7z64-ritika-mehtas-projects.vercel.app/api/shop/create", formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      console.log(formData);
      navigate('/admin/allproducts');
    } catch (error) {
      
      console.log(error.response.data);
    }
  };

  return (
    <section>
      <Header />
      <div className='hero w-1/2 mx-auto my-10 flex flex-col gap-8 px-20 py-10'>
        <h1>Add Product</h1>
        <form onSubmit={handleCreate} className='flex flex-col gap-4'>
          <div className='flex flex-row'>
            <label className='labels' htmlFor="name">Name</label>
            <input className='input w-1/2 p-2' type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          </div>

          <div className='flex flex-row'>
            <label className='labels' htmlFor="price">Price</label>
            <input className='input w-1/2 p-2' type="number" name='price' value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
          </div>

          <div className='flex flex-row'>
            <label className='labels' htmlFor="desc">Description</label>
            <textarea className='input w-1/2 p-2' name='description' value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
          </div>

          <div className='flex flex-row'>
            <label className='labels' htmlFor="image">Image</label>
            <input type="file" name='image' onChange={(e) => setImage(e.target.files[0])} />
          </div>

          <div className='flex flex-row'>
            <label className='labels' htmlFor="category">Category</label>
            <input className='input w-1/2 p-2' type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
          </div>

          <button type="submit" className="pri-btn px-12 py-1 text-center font-thin mx-auto block">Add</button>
        </form>
      </div>
    </section>
  );
};
