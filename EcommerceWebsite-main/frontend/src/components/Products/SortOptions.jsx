import { useSearchParams } from "react-router-dom";

/*
  SortOptions
  ------------
  Responsibilities:
  - Update sorting via URL query params
  - Preserve existing filters
  - Trigger product refetch automatically (CollectionPage listens to URL)
*/
const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  /* ---------- Handle Sort Change ---------- */
  const handleSortChange = (e) => {
    const value = e.target.value;

    // Create a NEW instance (important)
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("sortBy", value);
    } else {
      // Reset sorting
      params.delete("sortBy");
    }

    setSearchParams(params, { replace: true });
  };

  return (
    <div className="mb-4 flex items-center justify-end">
      <label htmlFor="sort" className="sr-only">
        Sort products
      </label>

      <select
        id="sort"
        value={searchParams.get("sortBy") || ""}
        onChange={handleSortChange}
        className="
          border px-3 py-2 rounded-md text-sm
          bg-white text-gray-700
          focus:outline-none focus:ring-2 focus:ring-black
        "
      >
        <option value="">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default SortOptions;
