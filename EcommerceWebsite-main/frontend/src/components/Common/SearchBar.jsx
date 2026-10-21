import { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFilters } from "../../redux/slices/productsSlice";

/*
  SearchBar handles product search from the navbar.
  Actual fetching should happen in CollectionPage.
*/
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    // Only update filters here
    dispatch(setFilters({ search: searchTerm }));

    // Navigate with query params
    navigate(`/collections/all?search=${searchTerm}`);

    setIsOpen(false);
  };

  return (
    <div className="relative flex items-center">
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} aria-label="Open search">
          <HiMagnifyingGlass className="h-6 w-6 text-gray-700" />
        </button>
      )}

      {isOpen && (
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              autoFocus
              placeholder="Search products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-40 sm:w-56 md:w-64 bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <HiMagnifyingGlass className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close search"
          >
            <HiMiniXMark className="h-6 w-6 text-gray-700" />
          </button>
        </form>
      )}
    </div>
  );
};

export default SearchBar;
