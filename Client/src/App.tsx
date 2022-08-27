// Styles
import "./style/main.scss";

// Imports From Lib
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

// Pages
import ToDoListApp from "./component/pages/ToDoListApp/ToDoListApp";
import Home from "./component/pages/Home/Home";
import K_shop from "./component/pages/K_shop/K_shop";
import Details from "./component/Elements/K_shop/Details";
import Header from "./component/Elements/K_shop/Header";
import Footer from "./component/Elements/K_shop/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/To-Do" element={<ToDoListApp />} />
          <Route path="/" element={<K_shop />} />
          <Route path="/:id" element={<Details />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
