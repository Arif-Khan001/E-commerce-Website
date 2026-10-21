import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const scrollRef = useRef(null);

  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  /* ---------- Fetch New Arrivals ---------- */
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
        );
        setNewArrivals(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNewArrivals();
  }, []);

  /* ---------- Scroll Controls ---------- */
  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < maxScroll - 5);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons);

    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, [newArrivals]);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -400 : 400,
      behavior: "smooth",
    });
  };

  /* ---------- Drag Scroll ---------- */
  const onMouseDown = (e) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    dragStart.current = {
      x: e.pageX,
      scrollLeft: scrollRef.current.scrollLeft,
    };
  };

  const onMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    const dx = e.pageX - dragStart.current.x;
    scrollRef.current.scrollLeft = dragStart.current.scrollLeft - dx * 1.4;
  };

  const stopDragging = () => setIsDragging(false);

  /* ---------- UI ---------- */
  return (
    <section className="py-14 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto text-center mb-12 relative">
        <h2 className="text-4xl font-extrabold mb-3">New Arrivals</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Fresh drops curated for modern style and comfort.
        </p>

        {/* Scroll Buttons */}
        <div className="absolute right-4 -bottom-10 flex gap-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="p-2 rounded-full border bg-white shadow hover:bg-gray-100 disabled:opacity-30"
          >
            <FiChevronLeft size={22} />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="p-2 rounded-full border bg-white shadow hover:bg-gray-100 disabled:opacity-30"
          >
            <FiChevronRight size={22} />
          </button>
        </div>
      </div>

      {/* Slider */}
      <div
        ref={scrollRef}
        className={`container mx-auto flex gap-6 overflow-x-auto px-4 snap-x snap-mandatory no-scrollbar
          ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
        {(loading ? Array(4).fill(null) : newArrivals).map((product, i) => (
          <div
            key={product?._id || i}
            className="min-w-[85%] sm:min-w-[45%] lg:min-w-[28%] snap-start"
          >
            <div className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition">

              {loading ? (
                <div className="h-[420px] bg-gray-200 animate-pulse" />
              ) : (
                <>
                  <img
                    src={
                      product.images?.[0]?.url
                        ? `${import.meta.env.VITE_BACKEND_URL}${product.images[0].url}`
                        : "/placeholder.png"
                    }
                    alt={product.name}
                    draggable={false}
                    className="h-[420px] w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => (e.currentTarget.src = "/placeholder.png")}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  <div className="absolute bottom-0 p-5 text-white w-full">
                    <Link to={`/product/${product._id}`}>
                      <h4 className="text-lg font-semibold">
                        {product.name}
                      </h4>
                      <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-white text-black font-medium">
                        ${product.price}
                      </span>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
