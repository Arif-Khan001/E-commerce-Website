import { Link } from "react-router-dom";

/*
  ProductGrid
  -------------
  Responsibilities:
  - Display a grid of products
  - Handle loading, error, and empty states
  - Navigate to product details on click
*/
const ProductGrid = ({
  products = [],
  loading = false,
  error = null,
}) => {
  /* ---------- Loading State ---------- */
  if (loading) {
    return (
      <p className="text-center py-10 text-gray-500">
        Loading products...
      </p>
    );
  }

  /* ---------- Error State ---------- */
  if (error) {
    return (
      <p className="text-center py-10 text-red-500">
        {error}
      </p>
    );
  }

  /* ---------- Empty State ---------- */
  if (!products.length) {
    return (
      <p className="text-center py-10 text-gray-500">
        No products available
      </p>
    );
  }

  /* ---------- Helper: Image URL Resolver ---------- */
  const resolveImageUrl = (url) => {
    if (!url) return "/placeholder.png";

    // If backend already sends full URL
    if (url.startsWith("http")) return url;

    // Otherwise prefix backend URL
    return `${import.meta.env.VITE_BACKEND_URL}${url}`;
  };

  /* ---------- Product Grid ---------- */
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => {
        // Safe image access (prevents crashes)
        const imageUrl = resolveImageUrl(
          product?.images?.[0]?.url
        );

        return (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="group block"
          >
            <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">

              {/* Product Image */}
              <div className="w-full h-96 mb-4 overflow-hidden rounded-lg">
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.currentTarget.src = "/placeholder.png";
                  }}
                />
              </div>

              {/* Product Name */}
              <h3 className="text-sm font-medium mb-1 truncate">
                {product.name}
              </h3>

              {/* Product Price */}
              <p className="text-gray-500 font-medium text-sm">
                ${product.price}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductGrid;
