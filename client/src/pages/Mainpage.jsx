import { useContext, useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { UserContext } from "@/context/UserContext";
import API from "@/api/axios";

export const Mainpage = () => {
  const { user } = useContext(UserContext);

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ---------------- FETCH PRODUCTS ---------------- */

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/api/shop");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* ---------------- FILTER PRODUCTS ---------------- */

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;

    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  /* ---------------- RENDER ---------------- */

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 ">
      <Header />

      {/* Search */}
      <section
        className="w-full max-w-xl mx-auto  px-4 py-10"
        role="search"
        aria-label="Product search"
      >
        <label htmlFor="product-search" className="sr-only">
          Search products
        </label>

        <input
          id="product-search"
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 "
        />
      </section>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-center mb-8">
        Products
      </h2>

      {/* Content */}
      <section className="flex-1 w-11/12 md:w-3/4 mx-auto my-10 ">
        {loading && (
          <p className="text-center text-gray-500">Loading products...</p>
        )}

        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <p className="text-center text-gray-500">
            No products found.
          </p>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center">
            {filteredProducts.map(product => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};
