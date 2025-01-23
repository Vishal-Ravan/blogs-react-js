import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
  <>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand" href="#">Navbar</a>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
       
      
      </ul>
      <form class="d-flex gap-3" role="search">
        <Link to="/register" class="btn btn-outline-success" type="submit">Register</Link>
        <Link to="/login" class="btn btn-outline-success" type="submit">Login</Link>
      </form>
    </div>
  </div>
</nav>
  </>
  
  )
}

export default Navbar