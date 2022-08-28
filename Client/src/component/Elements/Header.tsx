import { useState } from "react";
import { AiOutlineAppstoreAdd, AiOutlineHome , AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosPaperPlane } from "react-icons/io";
import { CgLogIn } from "react-icons/cg";
import { ImExit } from "react-icons/im";
import { FaBoxOpen } from "react-icons/fa";
import { Link } from "react-router-dom";
function Header() {
  const [stateNavbar, setStateNavbar] = useState<boolean>(false);
  return (
    <header className="header">
      <div className="container">
        <Link to="/" style={{textDecoration:"none"}}><div className="logo">K-shop</div></Link>
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
              <li><AiOutlineHome/>Home</li>
            </Link>
            <Link to={"/"}>
              <li><AiOutlineShoppingCart/>Cart</li>
            </Link>
            <Link to={"/"}>
              <li><IoIosPaperPlane/>Orders</li>
            </Link>
            <Link to={"/login"}>
              <li><CgLogIn/>Login</li>
            </Link>
            <Link to={"/"}>
              <li><AiOutlineAppstoreAdd/>Add Product</li>
            </Link>
            <Link to={"/"}>
              <li><FaBoxOpen/>Manage Orders</li>
            </Link>
            <Link to={"/"}>
              <li><ImExit/>Exit</li>
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
