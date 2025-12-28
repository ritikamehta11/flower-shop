import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "@/context/UserContext";


export const ProductCard = ({ product }) => {
  const { addToCart, user } = useContext(UserContext);

  const handleAddToCart = () => {
    if (!user) {
      alert("Please log in to add items to cart.");
      return;
    }
    addToCart(product._id, 1);
  };

  return (
    <article
      className="flex flex-col bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition"
      aria-labelledby={`product-${product._id}`}
    >
      {/* Image */}
      <Link to={`/product/${product._id}`} className="mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-contain rounded-lg"
          loading="lazy"
        />
      </Link>

      {/* Info */}
      <div className="flex-1">
        <h3
          id={`product-${product._id}`}
          className="font-semibold text-sm mb-1 line-clamp-2"
        >
          {product.name}
        </h3>

        <p className="text-gray-700 font-medium mb-4">
          ₹{product.price}
        </p>
      </div>

      {/* Actions */}
      <button
        onClick={handleAddToCart}
        className="prodCard w-full py-2 rounded-lg border text-sm font-medium  transition focus:outline-none focus:ring-2 focus:ring-black"
        aria-label={`Add ${product.name} to cart`}
      >
        Add to Cart
      </button>

      <Link
        to={`/product/${product._id}`}
        className="text-xs text-center mt-3 text-indigo-600 hover:underline"
        aria-label={`View details for ${product.name}`}
      >
        View Details
      </Link>
    </article>
  );
};
