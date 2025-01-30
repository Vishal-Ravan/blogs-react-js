import React, { useEffect } from 'react'
import Blog from './component/Blog'
import Navbar from './component/Navbar'
import Login from './component/Login'
import { Route, Routes } from 'react-router-dom'
import Register from './component/Register';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from './component/redux/authSlice'
import BlogDetails from './component/BlogDetails'


const App = () => {
  const dispatch = useDispatch();

  const {token , expirationTime} = useSelector((state)=> state.user)
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(loginUser({ token }));
      navigate("/"); 
    }
  }, [dispatch, navigate]);
  return (
    <>
    <Navbar/>
    <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
      </Routes>
    </>
  )
}

export default App