import { useContext, useEffect, useRef, useState } from "react";
import {
  AiOutlineAppstoreAdd,
  AiOutlineHome,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosPaperPlane } from "react-icons/io";
import { CgLogIn } from "react-icons/cg";
import { ImExit } from "react-icons/im";
import { FaBoxOpen } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../Functions/services/auth.service";
import { useOnClickOutside } from "../../Functions/hooks";
import { CartContext } from "../../Stores/cartContext";
function Header() {
  const [stateNavbar, setStateNavbar] = useState<boolean>(false);
  const isUser = AuthService.isUser();
  const ref = useRef<HTMLDivElement>(null);
  const [amountOfCarts, setAmountOfCarts] = useState<number>(0);
  useOnClickOutside(ref, () => setStateNavbar(false));

  const context = useContext(CartContext);
  useEffect(() => {
    (async function () {
      await context?.getCarts();
      setAmountOfCarts(context?.carts.length);
    })();
  }, [context?.carts.length]);

  return (
    <header className="header" ref={ref}>
      <div className="container">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="logo">K-shop</div>
        </Link>
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
              <li
                onClick={() => {
                  setStateNavbar(false);
                }}
              >
                <AiOutlineHome />
                Home
              </li>
            </Link>
            {!isUser ? (
              <Link to={"/login"}>
                <li
                  onClick={() => {
                    setStateNavbar(false);
                  }}
                >
                  <CgLogIn />
                  Login
                </li>
              </Link>
            ) : (
              <>
                <Link to={"/"}>
                  <li
                    onClick={() => {
                      setStateNavbar(false);
                    }}
                  >
                    <AiOutlineAppstoreAdd />
                    Add Product
                  </li>
                </Link>
                <Link to={"/"}>
                  <li
                    onClick={() => {
                      setStateNavbar(false);
                    }}
                  >
                    <FaBoxOpen />
                    Manage Orders
                  </li>
                </Link>
                <Link to={"/carts"}>
                  <li
                    onClick={() => {
                      setStateNavbar(false);
                    }}
                  >
                    <AiOutlineShoppingCart />
                    Cart <small>({String(amountOfCarts)})</small>
                  </li>
                </Link>
                <Link to={"/"}>
                  <li
                    onClick={() => {
                      setStateNavbar(false);
                    }}
                  >
                    <IoIosPaperPlane />
                    Orders
                  </li>
                </Link>
                <Link to={"/"}>
                  <li
                    onClick={() => {
                      setStateNavbar(false);
                      AuthService.logout();
                      useNavigate()("/");
                    }}
                  >
                    <ImExit />
                    Logout
                  </li>
                </Link>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
