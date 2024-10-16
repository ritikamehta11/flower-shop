// ProductDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';

const ProductDetails = () => {
  const { productId } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);


  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://flower-shop-backend-81tw.onrender.com/api/shop/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      };
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = () => {
    console.log(user);
    addToCart(product._id, 1); // Adding 1 quantity of the product
  };

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div>
      <Header />
      <div className="product-details p-4 w-1/3">
        <img src={product.image} alt={product.name} className="w-3/4 h-auto" />
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className="text-lg">{product.description}</p>
        <p className="text-xl font-semibold">{`Price: $${product.price}`}</p>
        <button className='sec-btn border-2 py-1' onClick={handleAddToCart}>Add to Cart</button>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
