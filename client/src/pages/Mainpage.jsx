import { ProductCard } from '@/components/ProductCard';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Header from '@/components/Header';
export const Mainpage = () => {

  const [products, setProducts] = useState([]);
  useEffect(() => {
    
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:8888/api/shop');
      setProducts(response.data);
    };
    fetchProducts();
    console.log(products);

  }, []);
  return (
    <div>
      <Header></Header>
      {products.map((product) => (
        < ProductCard key={product._id} product={product}/>
      ))}
    </div>
  )
}
