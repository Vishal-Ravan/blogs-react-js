import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "./redux/authSlice";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
  
	const dispatch = useDispatch();
	const navigate = useNavigate(); 
	const { loading, error,  token } = useSelector((state) => state.user);
	// console.log(token)
  
	const handleSubmit = (e) => {
  e.preventDefault();

  dispatch(loginUser({ email, password }))
    .unwrap()
    .then(() => {
      navigate("/", { replace: true }); // use replace to prevent going back to login
    })
    .catch((err) => {
      console.error("Login failed: ", err);
    });
};

  
  return (
   <>
   <div class="container-fluid">
		<div class="row main-content  text-center">
			<div class="col-md-4 text-center company__info">
				<span class="company__logo"><h2><span class="fa fa-android"></span></h2></span>
				<h4 class="company_title">Your Company Logo</h4>
			</div>
			<div class="col-md-8 col-xs-12 col-sm-12 login_form p-4">
				<div class="container-fluid">
					<div class="row">
						<h2>Log In</h2>
					</div>
					<div class="row">
					<form onSubmit={handleSubmit} className="form-group">
                 
                  <div className="row">
                    <input
                      type="email"
					  id="email"
					  value={email}
					  onChange={(e) => setEmail(e.target.value)}
                      className="form__input"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="row">
                    <input
                     type="password"
					 id="password"
					 value={password}
					 onChange={(e) => setPassword(e.target.value)}
                      className="form__input"
                      placeholder="Password"
                      required
                    />
                  </div>
                 
				  {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
                </form>
					</div>
					<div class="row">
						<p>Don't have an account? <Link to="/register">Register Here</Link></p>
					</div>
				</div>
			</div>
		</div>
	</div></>
  )
}

export default Login