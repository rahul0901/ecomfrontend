import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './AuthContext';
import Home from './Home';

const LandingPage = () => {

  const route = useNavigate();

  const { state } = useContext(AuthContext)

  if (state?.user?.name) {
    return <Home />;
  }

  return (
    <>
      <div className="main-landing">
        <h2>Welcome to Allure</h2>
        <h4>Are you looking for trending clothes</h4>
        <h4>Wardrobes are incomplete wihtout Winter Clothes..</h4>
        <a onClick={() => route('/register')} >Create a New Account</a>
        <a onClick={() => route('/login')} >Login Here</a>
      </div>
    </>
  )
}

export default LandingPage;