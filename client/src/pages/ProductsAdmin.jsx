import Header from '@/components/Header'
import { ProductCardAdmin } from '@/components/ProductCardsAdmin';
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'

export const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {

    const fetchProducts = async () => {
      const response = await axios.get('https://flower-shop-kny9um7ep-ritika-mehtas-projects.vercel.app/api/shop');
      setProducts(response.data);
    };
    fetchProducts();
    console.log(products);

  }, []);
//we are updating this page so function is defined here and then passed to the card
  const handleDeleteProduct = (deletedProductId) => {
    setProducts(products.filter((product) => product._id !== deletedProductId));
  };
  return (
    <>
      <Header />
      <div className='hero  w-4/5 mx-auto my-10 flex flex-col gap-4  p-8'>
        <div>
          <h1 className='logo'>All Products</h1>
          <p><Link to='/admin/createproduct'>Add</Link></p>
        </div>
        {products.map((product) => (
          < ProductCardAdmin key={product._id} product={product} onDelete={handleDeleteProduct}/>
        ))}
      </div>
    </>
  )
}
