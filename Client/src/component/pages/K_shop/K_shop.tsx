import Header from "../../Elements/K_shop/Header";
import Products from "../../Elements/K_shop/Products";
// import "./style.scss"
const K_shop = (): JSX.Element => {
  return (
    <main className="shop">
      <Header />
    <div className="space"></div>
      <Products />
    </main>
  );
};

export default K_shop;
