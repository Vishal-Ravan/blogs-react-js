import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
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
                        <form control="" class="form-group">
                            <div class="row">
                                <input type="text" name="username" id="username" class="form__input" placeholder="Username"/>
                            </div>
                            <div class="row">
                                <input type="password" name="password" id="password" class="form__input" placeholder="Password"/>
                            </div>
                            <div class="d-flex">
                                <input type="checkbox" name="remember_me" id="remember_me" class=""/>
                                <label for="remember_me">Remember Me!</label>
                            </div>
                            <div class="d-flex justify-content-center">
                                <input type="submit" value="Submit" class="btn"/>
                            </div>
                        </form>
                    </div>
                    <div class="row">
                        <p>You have an account? <Link href="#">Login Here</Link></p>
                    </div>
                </div>
            </div>
        </div>
    </div></>
  )
}

export default Register