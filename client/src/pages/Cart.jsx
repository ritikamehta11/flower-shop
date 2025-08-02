import { Footer } from '@/components/Footer';
import Header from '@/components/Header';
import { UserContext } from '@/context/UserContext';
import React, { useContext, useEffect, useState } from 'react';

const Cart = () => {

  const { cart, removeFromCart, increaseQuantity,decreaseQuantity } = useContext(UserContext);
  //const image = response.data.imageUrl;
 const { user } = useContext(UserContext);
  const getTotalPrice = () => {
    console.log("cart in gettotalpricefunction: ", cart);
    const cartTotal = cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
    console.log(cartTotal);
    return cartTotal;

  };

  return (

    <>
      <Header />
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg max-w-5xl">
          <h1 className="text-3xl font-bold mb-6 text-primary">Your Cart</h1>

{console.log(user._id)}

{console.log(cart)}

          {cart.items.length === 0 ? (
            <p className="text-center text-secondary">Your cart is empty.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Cart Items Section */}
              <div className="col-span-2">
                <ul className="space-y-4">
                  {console.log("cart in cart.jsx",cart)}
                  {cart.items.map((item, index) => (
                    <li
                      key={`${item.product._id}-${index}`}
                      className="flex items-center justify-between border-b py-4 border-gray-200"
                    >
                      <div className="flex items-center">
                        <img
                          src={item.product.image}  // Ensure you are getting the correct image URL
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="ml-4">
                          <p className="text-lg font-semibold text-primary">{item.product.name}</p>
                          
                          <p className="text-sm text-gray-500">Price: ${item.product.price}</p>
                        </div>
                      </div> 
                      <div className="flex space-x-2">
                        <button onClick={() => increaseQuantity(item.product._id)} className="sec-btn-increase px-2 border-1">+</button>
                        <p className="text-base text-gray-500"> {item.quantity}</p>
                        <button onClick={() => decreaseQuantity(item.product._id)} className="sec-btn-decrease px-2 border-1">-</button>
                        <button onClick={() => removeFromCart(item.product._id)} className="sec-btn-delete px-4 py-1 rounded-md text-sm col transition-colors">
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}

                </ul>
              </div>

              {/* Order Summary Section */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-primary mb-4">Order Summary</h2>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="font-semibold text-gray-800">${getTotalPrice()}</p>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-gray-600">Shipping</p>
                  <p className="font-semibold text-gray-800">$5.00</p>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between items-center text-xl font-bold">
                  <p>Total</p>
                  <p>${(parseFloat(getTotalPrice()) + 5).toFixed(2)}</p>
                </div>
                  <button className="sec-btn-update px-4 py-1 rounded-md text-sm">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer /></>
  );

};

export default Cart;
