import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../redux/slices/cartSlice";

/*
  CartContents:
  - Displays cart items
  - Handles quantity updates
  - Handles item removal
*/
const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  /* ---------- Quantity Change ---------- */
  const handleQuantityChange = (
    productId,
    delta,
    quantity,
    size,
    color
  ) => {
    const newQuantity = quantity + delta;

    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        })
      );
    }
  };

  /* ---------- Remove Item ---------- */
  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(
      removeFromCart({ productId, guestId, userId, size, color })
    );
  };

  return (
    <div>
      {cart.products.map((product) => {
        const imageUrl = product?.image
          ? `${import.meta.env.VITE_BACKEND_URL}${product.image}`
          : "/placeholder.png";

        return (
          <div
            key={`${product.productId}-${product.size}-${product.color}`}
            className="flex items-start justify-between py-4 border-b"
          >
            <div className="flex items-start">
              {/* Image */}
              <img
                src={imageUrl}
                alt={product.name}
                className="w-20 h-24 object-cover mr-4 rounded"
                onError={(e) =>
                  (e.currentTarget.src = "/placeholder.png")
                }
              />

              {/* Info */}
              <div>
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-gray-500">
                  Size: {product.size} | Color: {product.color}
                </p>

                {/* Quantity */}
                <div className="flex items-center mt-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        product.productId,
                        -1,
                        product.quantity,
                        product.size,
                        product.color
                      )
                    }
                    className="border rounded px-3 py-1 text-lg"
                  >
                    −
                  </button>

                  <span className="mx-4">
                    {product.quantity}
                  </span>

                  <button
                    onClick={() =>
                      handleQuantityChange(
                        product.productId,
                        1,
                        product.quantity,
                        product.size,
                        product.color
                      )
                    }
                    className="border rounded px-3 py-1 text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Price + Delete */}
            <div className="text-right">
              <p className="font-medium">
                $
                {(product.price * product.quantity).toLocaleString()}
              </p>

              <button
                onClick={() =>
                  handleRemoveFromCart(
                    product.productId,
                    product.size,
                    product.color
                  )
                }
              >
                <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartContents;
