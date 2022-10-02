const LoginPage = () => {
  return (
    <form className='login-form' method='POST'>
      <input type='text' name='username' placeholder='Enter Username' />
      <input type='password' name='password' placeholder='Enter Password' />
      <input type='submit' />
    </form>
  );
};

export default LoginPage;
