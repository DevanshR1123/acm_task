import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {
  const { LoginUser } = useContext(AuthContext);

  return (
    <div>
      <form action='POST' className='login-form' onSubmit={LoginUser}>
        <input type='text' name='username' placeholder='Enter Username' />
        <input type='password' name='password' placeholder='Enter Password' />
        <input type='submit' />
      </form>
    </div>
  );
};

export default LoginPage;
