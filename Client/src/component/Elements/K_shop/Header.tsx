import { useState } from "react";
import { Link } from "react-router-dom";
function Header() {
  const [stateNavbar, setStateNavbar] = useState<boolean>(false);
  return (
    <header className="header">
      <div className="container">
        <div className="logo">K-shop</div>
        <button
          className="navbar-button"
          onClick={() => {
            setStateNavbar(!stateNavbar);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className={`navbar ${stateNavbar ? "active" : ""}`}>
          <ul>
            <Link to={"/"}>
              <li>Home</li>
            </Link>
            <Link to={"/"}>
              <li>Cart</li>
            </Link>
            <Link to={"/"}>
              <li>Orders</li>
            </Link>
            <Link to={"/"}>
              <li>Login</li>
            </Link>
            <Link to={"/"}>
              <li>Add Product</li>
            </Link>
            <Link to={"/"}>
              <li>Manage Orders</li>
            </Link>
            <Link to={"/"}>
              <li>Exit</li>
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
