import { ProductCard } from '@/components/ProductCard';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Header from '@/components/Header';
export const Mainpage = () => {

  const [products, setProducts] = useState([]);
  const [searchTerm,setSearchTerm] = useState('');
  useEffect(() => {

    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:8888/api/shop');
      setProducts(response.data);
    };
    fetchProducts();
    

  }, []);
// console.log(products);
  const randomProduct = products[Math.floor(Math.random() * products.length)];
  // console.log(randomProduct);




  const filteredProducts = searchTerm
    ? products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : products;

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);

  };



  return (
    <div>
      <Header />
      <section className='featuredProducts'>
        <div className='featuredProductInfo h-max text-center py-24 text-3xl text-gray-50 bg-neutral-900'>
          {/* <p>{randomProduct.name}</p> */}
          <button></button>
        </div>
      </section>
      <section className='search-bar flex flex-row w-2/4 m-auto py-10 gap-2'>
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="input-search w-full p-2 mb-4"
        />
        <button onClick={handleSearchChange} className='pri-btn px-5 mb-4'>Search</button>
      </section>

      <h2 className='text-center'>Products</h2>
      {console.log(filteredProducts)};
      <div className='w-3/4 m-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center'>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard  key={product._id} product={product} />
        ))
      ) : (
        <p>No products found.</p> // Message for no matching products
      )} 
</div>

      {/* <h2 className='text-center'>Products</h2>
      <h3 className='border-b-2'>Bouquets</h3>
      {products.map((product) => (
        product.category === "bouquet" ?
        < ProductCard key={product._id} product={product} /> : null
      ))} */}
    </div>
  )
}
