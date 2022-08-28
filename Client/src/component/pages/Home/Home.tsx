import Header from "../../Elements/Header";
import Products from "../../Elements/Products";
// import "./style.scss"
const Home = (): JSX.Element => {
  return (
    <main className="shop">
      <div className="space"></div>
      <Products />
    </main>
  );
};

export default Home;
