import React from 'react'
import Blog from './component/Blog'
import Navbar from './component/Navbar'
import Login from './component/Login'
import { Route, Routes } from 'react-router-dom'
import Register from './component/Register';


const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App