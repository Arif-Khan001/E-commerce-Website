import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/slices/productsSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import ProductGrid from "./ProductGrid";

const ProductDetails = ({ productId }) => {
  const { id: routeId } = useParams();
  const dispatch = useDispatch();

  const resolvedProductId = productId || routeId;

  const {
    selectedProduct,
    similarProducts,
    loading,
    error,
  } = useSelector((state) => state.products);

  const { user, guestId } = useSelector((state) => state.auth);

  const [mainImage, setMainImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  /* ---------- Image URL helper ---------- */
  const resolveImageUrl = (url) => {
    if (!url) return null;
    return url.startsWith("http")
      ? url
      : `${import.meta.env.VITE_BACKEND_URL}${url}`;
  };

  /* ---------- Fetch product & similar ---------- */
  useEffect(() => {
    if (!resolvedProductId) return;

    dispatch(fetchProductDetails(resolvedProductId));

    if (routeId) {
      dispatch(fetchSimilarProducts({ id: resolvedProductId }));
    }
  }, [dispatch, resolvedProductId, routeId]);

  /* ---------- Set default image ---------- */
  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(resolveImageUrl(selectedProduct.images[0].url));
    }
  }, [selectedProduct]);

  /* ---------- Guards ---------- */
  if (loading) {
    return <p className="text-center py-20">Loading product...</p>;
  }

  if (error) {
    return <p className="text-center py-20 text-red-500">{error}</p>;
  }

  if (!selectedProduct) {
    return <p className="text-center py-20">Product not found</p>;
  }

  /* ---------- Quantity ---------- */
  const increaseQty = () => {
    if (quantity < selectedProduct.countInStock) {
      setQuantity((q) => q + 1);
    }
  };

  const decreaseQty = () => {
    setQuantity((q) => (q > 1 ? q - 1 : 1));
  };

  /* ---------- Add to Cart ---------- */
  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color");
      return;
    }

    setIsAdding(true);

    try {
      await dispatch(
        addToCart({
          productId: resolvedProductId,
          quantity,
          size: selectedSize,
          color: selectedColor,
          guestId,
          userId: user?._id,
        })
      ).unwrap();

      toast.success("Added to cart");
    } catch {
      toast.error("Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  /* ---------- UI ---------- */
  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Images */}
          <div className="md:w-1/2">
            {mainImage && (
              <img
                src={mainImage}
                alt={selectedProduct.name}
                className="w-full h-[500px] object-cover rounded-lg"
                onError={(e) => (e.currentTarget.src = "/placeholder.png")}
              />
            )}

            <div className="flex gap-3 mt-4">
              {selectedProduct.images?.map((img, i) => {
                const imageUrl = resolveImageUrl(img.url);
                if (!imageUrl) return null;

                return (
                  <img
                    key={i}
                    src={imageUrl}
                    onClick={() => setMainImage(imageUrl)}
                    className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                      mainImage === imageUrl
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                    onError={(e) => (e.currentTarget.src = "/placeholder.png")}
                  />
                );
              })}
            </div>
          </div>

          {/* Details */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-semibold mb-2">
              {selectedProduct.name}
            </h1>

            <p className="text-xl text-gray-700 mb-4">
              ${selectedProduct.price}
            </p>

            <p className="text-gray-600 mb-6">
              {selectedProduct.description}
            </p>

            {/* Colors */}
            {selectedProduct.colors?.length > 0 && (
              <div className="mb-6">
                <p className="mb-2 font-medium">Color</p>
                <div className="flex gap-2">
                  {selectedProduct.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border ${
                        selectedColor === color
                          ? "border-4 border-black"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {selectedProduct.sizes?.length > 0 && (
              <div className="mb-6">
                <p className="mb-2 font-medium">Size</p>
                <div className="flex gap-2">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded ${
                        selectedSize === size
                          ? "bg-black text-white"
                          : "border-gray-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <p className="mb-2 font-medium">Quantity</p>
              <div className="flex items-center gap-4">
                <button onClick={decreaseQty}>−</button>
                <span>{quantity}</span>
                <button onClick={increaseQty}>+</button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              disabled={isAdding}
              onClick={handleAddToCart}
              className={`w-full py-3 rounded text-white ${
                isAdding ? "bg-gray-400" : "bg-black"
              }`}
            >
              {isAdding ? "Adding..." : "ADD TO CART"}
            </button>
          </div>
        </div>

        {/* Similar Products */}
        {routeId && similarProducts?.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl text-center font-medium mb-6">
              You May Also Like
            </h2>
            <ProductGrid products={similarProducts.slice(0, 4)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
