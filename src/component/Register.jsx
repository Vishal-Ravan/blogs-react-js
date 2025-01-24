import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signUpUser } from "./redux/authSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    rememberMe: false,
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUpUser(formData)); // Dispatch the action to the Redux store
    console.log("Data sent to Redux:", formData);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row main-content text-center">
          <div className="col-md-4 text-center company__info">
            <span className="company__logo">
              <h2>
                <span className="fa fa-android"></span>
              </h2>
            </span>
            <h4 className="company_title">Your Company Logo</h4>
          </div>
          <div className="col-md-8 col-xs-12 col-sm-12 login_form p-4">
            <div className="container-fluid">
              <div className="row">
                <h2>Register</h2>
              </div>
              <div className="row">
                <form onSubmit={handleSubmit} className="form-group">
                  <div className="row">
                    <input
                      type="text"
                      name="username"
                      className="form__input"
                      placeholder="Username"
                      required
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="row">
                    <input
                      type="email"
                      name="email"
                      className="form__input"
                      placeholder="Email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="row">
                    <input
                      type="password"
                      name="password"
                      className="form__input"
                      placeholder="Password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  {/* <div className="d-flex">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      id="remember_me"
                      className=""
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                    <label htmlFor="remember_me">Remember Me!</label>
                  </div> */}
                  <div className="d-flex justify-content-center">
                    <input type="submit" value="Submit" className="btn" />
                  </div>
                </form>
              </div>
              <div className="row">
                <p>
                  You have an account? <Link to="/login">Login Here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
