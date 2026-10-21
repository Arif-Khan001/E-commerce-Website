import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import login from "../assets/login.webp";

import { loginUser } from "../redux/slices/authSlice";
import { mergeCart } from "../redux/slices/cartSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSubmitted, setLoginSubmitted] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, guestId, loading, error } = useSelector(
    (state) => state.auth
  );
  const { cart } = useSelector((state) => state.cart);

  const redirect =
    new URLSearchParams(location.search).get("redirect") || "/";
  const safeRedirect = redirect.startsWith("/") ? redirect : `/${redirect}`;
  const isCheckoutRedirect = safeRedirect.includes("checkout");

  useEffect(() => {
    if (!loginSubmitted) return;

    if (error) {
      setLoginSubmitted(false);
      return;
    }

    if (!user) return;

    if (cart?.products?.length > 0 && guestId) {
      dispatch(mergeCart({ guestId, user })).then(() => {
        navigate(isCheckoutRedirect ? "/checkout" : safeRedirect);
      });
    } else {
      navigate(isCheckoutRedirect ? "/checkout" : safeRedirect);
    }
  }, [
    loginSubmitted,
    user,
    error,
    guestId,
    cart,
    dispatch,
    navigate,
    isCheckoutRedirect,
    safeRedirect,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginSubmitted(true);
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm"
        >
          <h2 className="text-2xl font-bold text-center mb-2">
            Rabbit
          </h2>

          <p className="text-center text-gray-600 mb-6">
            Enter your email and password to Login
          </p>

          {error && (
            <div className="mb-4 rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700 text-center">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your email address"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded transition text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            }`}
          >
            {loading ? "Loading..." : "Sign In"}
          </button>

          <p className="mt-6 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              to={`/register?redirect=${encodeURIComponent(
                safeRedirect
              )}`}
              className="text-blue-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>

      {/* Right Image */}
      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex items-center justify-center">
          <img
            src={login}
            alt="Login to Account"
            className="h-[750px] w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
