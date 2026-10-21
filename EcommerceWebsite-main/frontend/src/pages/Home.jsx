import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Hero from "../components/Layout/Hero";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";

import { fetchProductByFilters } from "../redux/slices/productsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { products: womenProducts, loading } = useSelector(
    (state) => state.products
  );

  const [menProducts, setMenProducts] = useState([]);
  const [menLoading, setMenLoading] = useState(true);

  const [bestSellerProduct, setBestSellerProduct] = useState(null);
  const [bestSellerLoading, setBestSellerLoading] = useState(true);

  const [recommended, setRecommended] = useState([]);
  const [recommendedLoading, setRecommendedLoading] = useState(true);

  /* ---------- WOMEN TOP WEARS ---------- */
  useEffect(() => {
    dispatch(
      fetchProductByFilters({
        category: "Top Wear",
        gender: "Women",
        limit: 8,
      })
    );
  }, [dispatch]);

  /* ---------- MEN TOP WEARS ---------- */
  useEffect(() => {
    const fetchMenProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products`,
          {
            params: {
              category: "Top Wear",
              gender: "Men",
              limit: 8,
            },
          }
        );
        setMenProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch men products", err);
      } finally {
        setMenLoading(false);
      }
    };

    fetchMenProducts();
  }, []);

  /* ---------- BEST SELLER ---------- */
  useEffect(() => {
    const fetchBestSeller = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        setBestSellerProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch best seller", err);
      } finally {
        setBestSellerLoading(false);
      }
    };

    fetchBestSeller();
  }, []);

  /* ---------- YOU MAY ALSO LIKE ---------- */
  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products?limit=4`
        );
        setRecommended(res.data);
      } catch (err) {
        console.error("Failed to fetch recommendations", err);
      } finally {
        setRecommendedLoading(false);
      }
    };

    fetchRecommended();
  }, []);

  return (
    <div>
      <Hero />

      <GenderCollectionSection />

      <NewArrivals />

      {/* ================= BEST SELLER ================= */}
      <section className="container mx-auto mt-20 px-4">
        <h2 className="text-3xl text-center font-bold mb-8">
          Best Seller
        </h2>

        {bestSellerLoading ? (
          <p className="text-center text-gray-500">
            Loading best seller…
          </p>
        ) : bestSellerProduct ? (
          <ProductDetails productId={bestSellerProduct._id} />
        ) : (
          <p className="text-center text-gray-500">
            No best seller available
          </p>
        )}
      </section>

      {/* ================= YOU MAY ALSO LIKE ================= */}
      <section className="container mx-auto mt-24 px-4">
        <h2 className="text-3xl text-center font-bold mb-8">
          You May Like
        </h2>

        <ProductGrid
          products={recommended}
          loading={recommendedLoading}
        />
      </section>

      {/* ================= TOP WEARS FOR WOMEN ================= */}
      <section className="container mx-auto mt-24 px-4">
        <h2 className="text-3xl text-center font-bold mb-8">
          Top Wears for Women
        </h2>

        <ProductGrid products={womenProducts} loading={loading} />
      </section>

      {/* ================= TOP WEARS FOR MEN ================= */}
      <section className="container mx-auto mt-24 px-4">
        <h2 className="text-3xl text-center font-bold mb-8">
          Top Wears for Men
        </h2>

        <ProductGrid products={menProducts} loading={menLoading} />
      </section>

      <FeaturedCollection />

      <FeaturesSection />
    </div>
  );
};

export default Home;
