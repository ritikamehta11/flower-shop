import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";


const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(UserContext);

  const subtotal = cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-100 py-10">
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg max-w-5xl">
          <h1 className="text-3xl font-bold mb-6 text-primary">Your Cart</h1>

          {cart.items.length === 0 ? (
            <p className="text-center text-secondary">Your cart is empty.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-2">
                <ul className="space-y-4">
                  {cart.items.map((item) => (
                    <li
                      key={item._id}
                      className="flex items-center justify-between border-b py-4 border-gray-200"
                    >
                      <div className="flex items-center">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />

                        <div className="ml-4">
                          <p className="text-lg font-semibold text-primary">
                            {item.product.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Price: ${item.product.price}
                          </p>
                        </div>
                      </div>

                      <div className="flex space-x-2 items-center">
                        <button
                          onClick={() => increaseQuantity(item.product._id)}
                          className="sec-btn-increase px-2"
                        >
                          +
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() => decreaseQuantity(item.product._id)}
                          className="sec-btn-decrease px-2"
                        >
                          -
                        </button>

                        <button
                          onClick={() => removeFromCart(item.product._id)}
                          className="sec-btn-delete px-4 py-1 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-primary mb-4">
                  Order Summary
                </h2>

                <div className="flex justify-between mb-2">
                  <p>Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>

                <div className="flex justify-between mb-4">
                  <p>Shipping</p>
                  <p>$5.00</p>
                </div>

                <hr className="my-4" />

                <div className="flex justify-between text-xl font-bold">
                  <p>Total</p>
                  <p>${(subtotal + 5).toFixed(2)}</p>
                </div>

                <button className="sec-btn-update mt-4">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};
export default Cart;