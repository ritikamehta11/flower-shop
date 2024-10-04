import { ProductCard } from '@/components/ProductCard';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
export const Mainpage = () => {

  const [products, setProducts] = useState([]);
  useEffect(() => {
    
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:8888/api/shop');
      setProducts(response.data);
    };
    fetchProducts();

  }, []);
  return (
    <div>Mainpage
      {products.map((product) => {
        < ProductCard key={product._id} product={product}></ProductCard>
      })}
    </div>
  )
}
