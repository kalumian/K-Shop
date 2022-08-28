import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <div className="sign-up">Login</div>
      <div><Link to="/signup">I don't have account , Make one on Sign Up Page</Link></div>
    </>
  );
}

export default Login;
