// Styles
import "./style/main.scss";

// Imports From Lib
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

// Pages
import ToDoListApp from "./component/pages/ToDoListApp/ToDoListApp";
import K_shop from "./component/pages/Home/Home";
import NotFoundPage from "./component/pages/NotFoundPage/NotFoundPage";
import Details from "./component/pages/Details/Details";
import Header from "./component/Elements/Header";
import Footer from "./component/Elements/Footer";
import SignUp from "./component/pages/SignUp/SignUp";
import Login from "./component/pages/Login/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<K_shop />} />
          <Route path="/product/:id" element={<Details />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/To-Do" element={<ToDoListApp />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
