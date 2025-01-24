import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from './redux/authSlice'

const Navbar = () => {
  const { token, loading } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate() // For redirecting after logout

  const handleLogout = () => {
    // Dispatch the logoutUser action to clear Redux state
    dispatch(logoutUser())
    navigate("/") // Adjust the route based on your app's structure
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="#">Navbar</a>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
            </ul>
            <form className="d-flex gap-3">
              {token ? (
                <div className="user-info">
                  <span className="username">rasik</span>
                  <button onClick={handleLogout} disabled={loading}>
                    {loading ? "Logging out..." : "Logout"}
                  </button>
                </div>
              ) : (
                <div className="d-flex gap-3">
                  <Link to="/register" className="btn btn-outline-success" type="submit">Register</Link>
                  <Link to="/login" className="btn btn-outline-success" type="submit">Login</Link>
                </div>
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
