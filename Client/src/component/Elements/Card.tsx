import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AddCart } from "../../Functions/CartFunctions";
import AuthService from "../../Functions/services/auth.service";
import { setCart } from "../../interfaces/cartInterfaces";
import { Product } from "../../interfaces/productsInterface";
import { CartContext } from "../../Stores/cartContext";

const Card: React.FC<Product> = ({
  id,
  name,
  description,
  price,
  image,
}): JSX.Element => {
  const [amount, setAmount] = useState<number>(0);
  const context = useContext(CartContext);
  const [message, setMessage] = useState<string>("");
  const handleCart = async (e: React.BaseSyntheticEvent) => {
    if (!(amount <= 0)) {
      e.preventDefault();
      const cart: setCart = {
        amount,
        name,
        price,
        userId: AuthService.getUserAsObject().sub,
        productId: id,
        image,
      };
      try {
        AddCart(cart).then((i) => {
          context?.getCarts();
          console.log(i);

          setAmount(0);
          setMessage("Added successfully");

          setTimeout(() => {
            setMessage("");
          }, 2000);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="card" key={`${id}`}>
      <div className="image">
        <Link to={`/product/${id}`}>
          <img src={`${image}`} alt="product-image" />
        </Link>
      </div>
      <h2 className="title">
        <Link to={`/product/${id}`}>{`${name}`}</Link>
      </h2>
      <p className="description">{`${description}`}</p>
      <p className="price">{`${price}`}$</p>
      <input
        type="number"
        placeholder="0"
        value={amount}
        onChange={(e) => {
          setAmount(Number(e.target.value));
        }}
      />
      <button className={`add ${amount <= 0 && "hidden"}`} onClick={handleCart}>
        add to cart
      </button>
      <small style={{ color: "green", textAlign: "center" }}>{message}</small>
    </div>
  );
};

export default Card;
