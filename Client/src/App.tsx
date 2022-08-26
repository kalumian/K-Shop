// Styles
import "./style/main.scss";

// Imports From Lib
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import ToDoListApp from "./component/pages/ToDoListApp/ToDoListApp";
import Home from "./component/pages/Home/Home";
import K_shop from "./component/pages/K_shop/K_shop";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/To-Do" element={<ToDoListApp />} />
          <Route path="/k-shop" element={<K_shop />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
