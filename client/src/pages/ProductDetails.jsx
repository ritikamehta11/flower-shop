import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { UserContext } from "@/context/UserContext";
import API from "@/api/axios";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { user, addToCart } = useContext(UserContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ---------------- FETCH PRODUCT ---------------- */

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/api/shop/${productId}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  /* ---------------- HANDLERS ---------------- */

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    addToCart(product._id, 1);
  };

  /* ---------------- STATES ---------------- */

  if (loading) {
    return (
      <>
        <Header />
        <p className="text-center mt-20 text-gray-500">
          Loading product...
        </p>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Header />
        <p className="text-center mt-20 text-red-500">
          {error || "Product not found."}
        </p>
        <Footer />
      </>
    );
  }

  /* ---------------- RENDER ---------------- */

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 rounded-2xl shadow-sm">
          {/* Image */}
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-80 object-contain rounded-xl"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-semibold">
              {product.name}
            </h1>

            <p className="text-gray-600">
              {product.description}
            </p>

            <p className="text-2xl font-bold">
              ${product.price}
            </p>

            <button
              onClick={handleAddToCart}
              className="prodCard mt-4 w-fit px-6 py-3 rounded-lg border text-sm font-medium  transition focus:outline-none focus:ring-2 focus:ring-black"
              aria-label={`Add ${product.name} to cart`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
