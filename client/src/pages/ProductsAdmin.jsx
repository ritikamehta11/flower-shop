import Header from '@/components/Header'
import { ProductCardAdmin } from '@/components/ProductCardsAdmin';
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'

export const ProductsAdmin = () => {
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
    <>
      <Header />
      <div className='hero  w-3/4 mx-auto my-10 flex flex-col gap-4  p-8'>
        <div>
          <h1 className='logo'>All Products</h1>
          <p><Link to='/admin/createproduct'>Add</Link></p>
        </div>
        {products.map((product) => (
          < ProductCardAdmin key={product._id} product={product} />
        ))}
      </div>
    </>
  )
}
