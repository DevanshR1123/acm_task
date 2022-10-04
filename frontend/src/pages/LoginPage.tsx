import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {
  const { user, LoginUser } = useContext(AuthContext);

  if (user) return <Navigate to='/' />;

  return (
    <div className='form-container container'>
      <form action='POST' className='login-form' onSubmit={LoginUser}>
        <input
          type='text'
          name='username'
          placeholder='Enter Username'
          className='input-field'
        />
        <input
          type='password'
          name='password'
          placeholder='Enter Password'
          className='input-field'
        />
        <input type='submit' className='input-btn' />
      </form>
    </div>
  );
};

export default LoginPage;
