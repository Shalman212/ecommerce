import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Login from './pages/Login'
import Register from './pages/Register'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import MemberPage from './pages/MemberPage'
import AdminPage from './pages/AdminPage'
import Navbar from './components/navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from "./context/AuthContext"
import PrivateRoute from "./components/PrivateRoute"
import AddProduct from "./pages/AddProduct";

const App = () => {
  return (
    <AuthProvider>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <ToastContainer />
        <Navbar />
        <SearchBar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/orders' element={<Orders />} />

          {/* Protected Member Route */}
          <Route
            path='/member'
            element={
              <PrivateRoute role="member">
                <MemberPage />
              </PrivateRoute>
            }
          />

          {/* Protected Admin Route */}
          <Route
            path='/admin'
            element={
              <PrivateRoute role="admin">
                <AdminPage />
              </PrivateRoute>
            }
          />

          {/* Add Product (Admin only) */}
          <Route
            path='/admin/add-product'
            element={
              <PrivateRoute role="admin">
                <AddProduct />
              </PrivateRoute>
            }
          />

          {/* Fallback: redirect unknown routes to home */}
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
