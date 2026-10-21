import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  fetchAdminProductDetails,
  updateAdminProduct,
  clearSelectedProduct,
} from "../../redux/slices/adminProductSlice";

const EditProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { selectedProduct, loading, error } = useSelector(
    (state) => state.adminProducts
  );

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    countInStock: "",
    sku: "",
    colors: [],
    sizes: [],
    images: [],
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  /* ---------------- Fetch product ---------------- */
  useEffect(() => {
    dispatch(fetchAdminProductDetails(id));

    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  /* ---------------- Populate form ---------------- */
  useEffect(() => {
    if (!selectedProduct) return;

    setProductData({
      name: selectedProduct.name ?? "",
      description: selectedProduct.description ?? "",
      price: selectedProduct.price ?? "",
      countInStock: selectedProduct.countInStock ?? "",
      sku: selectedProduct.sku ?? "",
      colors: selectedProduct.colors ?? [],
      sizes: selectedProduct.sizes ?? [],
      images: selectedProduct.images ?? [],
    });
  }, [selectedProduct]);

  /* ---------------- Handlers ---------------- */
  const handleChange = (e) => {
    setProductData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      setProductData((prev) => ({
        ...prev,
        images: [...prev.images, { url: res.data.imageUrl }],
      }));
    } catch {
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await dispatch(
        updateAdminProduct({ id, productData })
      ).unwrap();

      navigate("/admin/products");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- UI states ---------------- */
  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-600">
        Loading product...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-10 font-medium">
        {error}
      </p>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 bg-white rounded-xl shadow">
      <h2 className="text-3xl font-bold mb-8 border-b pb-4">
        Edit Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Product Name</label>
          <input
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            rows={4}
            value={productData.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black"
            required
          />
        </div>

        {/* Price & Stock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Stock</label>
            <input
              type="number"
              name="countInStock"
              value={productData.countInStock}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>
        </div>

        {/* SKU */}
        <div>
          <label className="block font-medium mb-1">SKU</label>
          <input
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* Sizes */}
        <div>
          <label className="block font-medium mb-1">Sizes</label>
          <input
            value={productData.sizes.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                sizes: e.target.value.split(",").map((s) => s.trim()),
              })
            }
            className="w-full border rounded-lg px-4 py-2"
            placeholder="S, M, L"
          />
        </div>

        {/* Colors */}
        <div>
          <label className="block font-medium mb-1">Colors</label>
          <input
            value={productData.colors.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                colors: e.target.value.split(",").map((c) => c.trim()),
              })
            }
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Red, Blue"
          />
        </div>

        {/* Images */}
        <div>
          <label className="block font-medium mb-2">Images</label>
          <input type="file" onChange={handleImageUpload} />

          <div className="flex flex-wrap gap-3 mt-4">
            {productData.images.map((img, i) => (
              <img
                key={i}
                src={
                  img.url.startsWith("http")
                    ? img.url
                    : `${import.meta.env.VITE_BACKEND_URL}${img.url}`
                }
                alt="product"
                className="w-24 h-24 object-cover rounded-lg border"
              />
            ))}
          </div>

          {uploading && (
            <p className="text-sm text-gray-500 mt-2">
              Uploading image…
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          disabled={uploading || saving}
          className={`w-full py-3 rounded-lg font-semibold text-white transition ${
            uploading || saving
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:bg-gray-900"
          }`}
        >
          {saving ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
