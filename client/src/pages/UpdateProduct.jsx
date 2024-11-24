import Header from '@/components/Header';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
  const [image, setImage] = useState(null); // State to hold the new image file
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://flower-shop-kny9um7ep-ritika-mehtas-projects.vercel.app//api/shop/${id}`);
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

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set the new image file
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // Create a FormData object for the request

    // Append the updated product details
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('description', product.description);
    formData.append('category', product.category);

    // Only append the image if it's selected
    if (image) {
      formData.append('image', image);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`https://flower-shop-kny9um7ep-ritika-mehtas-projects.vercel.app/api/shop/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Specify multipart/form-data for file uploads
        }
      });
      navigate('/admin/allproducts');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <Header />
      <div className='hero w-1/2 mx-auto my-10 flex flex-col gap-8 px-20 py-10'>
        <h1>Update Product</h1>
        <form onSubmit={handleUpdate} className='flex flex-col gap-4'>
          <div className='flex flex-row'>
            <label className='labels' htmlFor="name">Name</label>
            <input className='input w-1/2 p-2' type="text" name='name' value={product.name} onChange={handleChange} placeholder="Name" />
          </div>

          <div className='flex flex-row'>
            <label className='labels' htmlFor="price">Price</label>
            <input className='input w-1/2 p-2' type="number" name='price' value={product.price} onChange={handleChange} placeholder="Price" />
          </div>

          <div className='flex flex-row'>
            <label className='labels' htmlFor="description">Description</label>
            <textarea className='input w-1/2 p-2' name='description' value={product.description} onChange={handleChange} placeholder="Description"></textarea>
          </div>

          <div className='flex flex-row'>
            <label className='labels' htmlFor="image">Image</label>
            <input className='input w-1/2 p-2' type="file" onChange={handleImageChange} />
            {/* Display current image if it exists */}
            {product.imageUrl && <img src={product.imageUrl} alt="Current Product" className="h-24 w-24 ml-4" />}
          </div>

          <div className='flex flex-row'>
            <label className='labels' htmlFor="category">Category</label>
            <input className='input w-1/2 p-2' type="text" name='category' value={product.category} onChange={handleChange} placeholder="Category" />
          </div>

          <button type="submit" className="pri-btn px-12 py-1 text-center font-thin mx-auto block">Update</button>
        </form>
      </div>
    </section>
  );
}
