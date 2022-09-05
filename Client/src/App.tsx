// Styles
import "./style/main.scss";

// Imports From Lib
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
// import {} from "h"
// Pages
import ToDoListApp from "./component/pages/ToDoListApp/ToDoListApp";
import K_shop from "./component/pages/Home/Home";
import NotFoundPage from "./component/pages/NotFoundPage/NotFoundPage";
import Details from "./component/pages/Details/Details";
import Header from "./component/Elements/Header";
import Footer from "./component/Elements/Footer";
import SignUp from "./component/pages/SignUp/SignUp";
import Login from "./component/pages/Login/Login";
import ProtectedRoutes from "./component/Elements/ProtectedRoutes";
import CartContextProvider from "./Stores/cartContext";
import Carts from "./component/pages/Carts/Carts";

function App() {
  return (
    <div className="App">
      <CartContextProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            {/* ------- Protect Routes Start ------- */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/product/:id" element={<Details />} />
              <Route path="/carts" element={<Carts />} />
              {/* <Route path="/To-Do" element={<ToDoListApp />} /> */}
            </Route>
            {/* ------- Protect Routes End ------- */}
            <Route path="/" element={<K_shop />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartContextProvider>
    </div>
  );
}

export default App;
