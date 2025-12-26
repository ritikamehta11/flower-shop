// ProductDetails.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { UserContext } from '@/context/UserContext';
import API from '@/api/axios';

const ProductDetails = () => {
  const { productId } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const { user, addToCart } = useContext(UserContext);

  useEffect(() => {
    //   const fetchProductDetails = async () => {
    //     try {
    //       const response = await axios.get(`https://flower-shop-ochre.vercel.app/api/shop/${productId}`);
    //       setProduct(response.data);
    //     } catch (error) {
    //       console.error("Error fetching product details:", error);
    //     };
    //   };

    //   fetchProductDetails();
    // }, [productId]);
    API.get(`/api/shop/${productId}`).then((response) => {
      setProduct(response.data);
    }).catch((error) => {
      console.error('Error fetching product details:', error);
    });

  }, []);

  

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div>
      <Header />
      <div className=" p-4 w-1/3">
        <img src={product.image} alt={product.name} className="w-3/4 h-auto" />
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className="text-lg">{product.description}</p>
        <p className="text-xl font-semibold">{`Price: $${product.price}`}</p>
        <button className='sec-btn border-2 py-1' onClick={(e) => {
          e.stopPropagation();
          addToCart(product._id, 1);
        }}>Add to Cart</button>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
