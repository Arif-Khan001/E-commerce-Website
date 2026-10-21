import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const FilterSideBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: [],
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const categories = ["Top Wear", "Bottom Wear"];
  const genders = ["Men", "Women"];
  const colors = [
    "Red","Blue","Black","Green","Yellow",
    "Gray","White","Pink","Beige","Navy",
  ];
  const sizes = ["XS","S","M","L","XL","XXL"];
  const materials = [
    "Cotton","Wool","Denim","Polyester",
    "Silk","Linen","Viscose","Fleece",
  ];
  const brands = [
    "Urban Threads","Modern Fit","Street Style",
    "Beach Breeze","Fashionista","ChicStyle",
  ];

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color ? params.color.split(",") : [],
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: Number(params.minPrice) || 0,
      maxPrice: Number(params.maxPrice) || 100,
    });
  }, [searchParams]);

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();

    Object.entries(newFilters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length) {
        params.set(key, value.join(","));
      } else if (!Array.isArray(value) && value !== "" && value !== 0) {
        params.set(key, value);
      }
    });

    setSearchParams(params, { replace: true });
  };

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFilters((prev) => {
      const updated =
        type === "checkbox"
          ? {
              ...prev,
              [name]: checked
                ? [...prev[name], value]
                : prev[name].filter((v) => v !== value),
            }
          : { ...prev, [name]: prev[name] === value ? "" : value };

      updateURLParams(updated);
      return updated;
    });
  };

  const handleColorChange = (color) => {
    setFilters((prev) => {
      const updated = {
        ...prev,
        color: prev.color.includes(color)
          ? prev.color.filter((c) => c !== color)
          : [...prev.color, color],
      };
      updateURLParams(updated);
      return updated;
    });
  };

  const handlePriceChange = (e) => {
    const updated = {
      ...filters,
      minPrice: 0,
      maxPrice: Number(e.target.value),
    };
    setFilters(updated);
    updateURLParams(updated);
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      gender: "",
      color: [],
      size: [],
      material: [],
      brand: [],
      minPrice: 0,
      maxPrice: 100,
    });
    setSearchParams({});
  };

  return (
    <div className="p-6 space-y-10">

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-gray-500 hover:text-black"
        >
          Clear
        </button>
      </div>

      {/* Category */}
      <section className="space-y-3">
        <h4 className="text-xs uppercase text-gray-500">Category</h4>
        {categories.map((cat) => (
          <label key={cat} className="flex items-center gap-3">
            <input
              type="radio"
              name="category"
              value={cat}
              checked={filters.category === cat}
              onChange={handleFilterChange}
              className="accent-black"
            />
            {cat}
          </label>
        ))}
      </section>

      {/* Gender */}
      <section className="space-y-3">
        <h4 className="text-xs uppercase text-gray-500">Gender</h4>
        {genders.map((g) => (
          <label key={g} className="flex items-center gap-3">
            <input
              type="radio"
              name="gender"
              value={g}
              checked={filters.gender === g}
              onChange={handleFilterChange}
              className="accent-black"
            />
            {g}
          </label>
        ))}
      </section>

      {/* Color */}
      <section>
        <h4 className="text-xs uppercase text-gray-500 mb-3">Color</h4>
        <div className="grid grid-cols-6 gap-3">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => handleColorChange(c)}
              className={`w-7 h-7 rounded-full border ${
                filters.color.includes(c)
                  ? "ring-2 ring-black"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: c.toLowerCase() }}
            />
          ))}
        </div>
      </section>

      {/* Size */}
      <section>
        <h4 className="text-xs uppercase text-gray-500 mb-3">Size</h4>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((s) => (
            <label
              key={s}
              className={`border rounded py-1 text-center cursor-pointer ${
                filters.size.includes(s)
                  ? "bg-black text-white"
                  : "hover:border-black"
              }`}
            >
              <input
                type="checkbox"
                name="size"
                value={s}
                checked={filters.size.includes(s)}
                onChange={handleFilterChange}
                className="hidden"
              />
              {s}
            </label>
          ))}
        </div>
      </section>

      {/* Material */}
      <section>
        <h4 className="text-xs uppercase text-gray-500 mb-3">Material</h4>
        <div className="space-y-2">
          {materials.map((m) => (
            <label key={m} className="flex items-center gap-3">
              <input
                type="checkbox"
                name="material"
                value={m}
                checked={filters.material.includes(m)}
                onChange={handleFilterChange}
                className="accent-black"
              />
              {m}
            </label>
          ))}
        </div>
      </section>

      {/* Brand */}
      <section>
        <h4 className="text-xs uppercase text-gray-500 mb-3">Brand</h4>
        <div className="space-y-2">
          {brands.map((b) => (
            <label key={b} className="flex items-center gap-3">
              <input
                type="checkbox"
                name="brand"
                value={b}
                checked={filters.brand.includes(b)}
                onChange={handleFilterChange}
                className="accent-black"
              />
              {b}
            </label>
          ))}
        </div>
      </section>

      {/* Price */}
      <section>
        <h4 className="text-xs uppercase text-gray-500 mb-3">Price</h4>
        <input
          type="range"
          min="0"
          max="100"
          value={filters.maxPrice}
          onChange={handlePriceChange}
          className="w-full accent-black"
        />
        <div className="flex justify-between text-sm mt-2">
          <span>$0</span>
          <span>${filters.maxPrice}</span>
        </div>
      </section>
    </div>
  );
};

export default FilterSideBar;
