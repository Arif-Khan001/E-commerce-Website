import { useEffect, useRef, useState, useMemo } from "react";
import { FaFilter } from "react-icons/fa";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import FilterSideBar from "../components/Products/FilterSideBar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
import { fetchProductByFilters } from "../redux/slices/productsSlice";

const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.products
  );

  const queryParams = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (!collection) return;

    dispatch(
      fetchProductByFilters({
        collection,
        ...queryParams,
      })
    );

    setIsSidebarOpen(false);
  }, [dispatch, collection, queryParams]);

  useEffect(() => {
    if (!isSidebarOpen) return;

    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Mobile filter button */}
      <div className="lg:hidden p-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex items-center gap-2 border px-4 py-2 rounded bg-white shadow-sm"
        >
          <FaFilter />
          Filters
        </button>
      </div>

      {/* Layout */}
      <div className="flex">

        {/* Sidebar */}
        <aside
          ref={sidebarRef}
          className={`
            fixed inset-y-0 left-0 z-50 w-72 bg-white border-r
            transform transition-transform duration-300
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:static lg:translate-x-0
          `}
        >
          <FilterSideBar />
        </aside>

        {/* Main content */}
        <main className="flex-1 px-6 lg:px-10 py-6">
          <h1 className="text-2xl font-semibold uppercase mb-4">
            {collection.replace("-", " ")}
          </h1>

          <SortOptions />

          {error && (
            <p className="text-red-500 text-center mb-4">
              {error}
            </p>
          )}

          <ProductGrid
            products={products}
            loading={loading}
            error={error}
          />
        </main>
      </div>
    </div>
  );
};

export default CollectionPage;
