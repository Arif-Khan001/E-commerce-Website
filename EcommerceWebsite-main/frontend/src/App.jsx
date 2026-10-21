import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { Toaster } from "sonner"

import store from "./redux/store"

/* Layouts */
import UserLayout from './components/Layout/UserLayout'
import AdminLayout from './components/Admin/AdminLayout'

/* Common */
import ProtectedRoute from './components/Common/ProtectedRoute'

/* User Pages */
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import CollectionPage from './pages/CollectionPage'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import OrderDetailsPage from './pages/OrderDetailsPage'
import MyOrderPage from './pages/MyOrderPage'

/* User Components */
import ProductDetails from './components/Products/ProductDetails'
import Checkout from './components/Cart/Checkout'

/* Admin Pages */
import AdminHomePage from './pages/AdminHomePage'
import UserManagement from './components/Admin/UserManagement'
import ProductManagement from './components/Admin/ProductManagement'
import EditProductPage from './components/Admin/EditProductPage'
import OrderManagement from './components/Admin/OrderManagement'

export const App = () => {
  return (
    // Redux Provider makes the store available to the entire app
    <Provider store={store}>

      {/* BrowserRouter enables client-side routing */}
      <BrowserRouter>

        {/* Global toast notifications */}
        <Toaster position="top-right" />

        <Routes>

          {/* ================= USER ROUTES ================= */}
          {/* UserLayout wraps all public/user-facing pages */}
          <Route path="/" element={<UserLayout />}>

            {/* Home page */}
            <Route index element={<Home />} />

            {/* Auth pages */}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            {/* Protected user pages */}
            <Route path="profile" element={<Profile />} />
            <Route path="my-orders" element={<MyOrderPage />} />

            {/* Product & collection */}
            <Route path="collections/:collection" element={<CollectionPage />} />
            <Route path="product/:id" element={<ProductDetails />} />

            {/* Checkout & orders */}
            <Route path="checkout" element={<Checkout />} />
            <Route path="order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="order/:id" element={<OrderDetailsPage />} />
          </Route>

          {/* ================= ADMIN ROUTES ================= */}
          {/* Admin routes are wrapped with role-based protection */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminHomePage />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="products/:id/edit" element={<EditProductPage />} />
            <Route path="orders" element={<OrderManagement />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
