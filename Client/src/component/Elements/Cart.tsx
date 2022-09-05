import { useNavigate } from "react-router-dom";
import { DeleteCart } from "../../Functions/CartFunctions";
import { getCart } from "../../interfaces/cartInterfaces";

interface Props {
  name: string;
  timesStamp: string;
  price: number;
  image: string;
  productId: number;
  cartId: number;
  amount: number;
  updateCarts(): void;
}
function Cart({
  name,
  timesStamp,
  price,
  image,
  updateCarts,
  cartId,
  productId,
  amount,
}: Props) {
  const handleDelete = async () => {
    await DeleteCart(cartId);
    updateCarts();
  };
  const navigate = useNavigate();
  return (
    <article className="cart">
      <div className="about">
        <h3>{name}</h3>
        <h4 className="date">The Date: {timesStamp}</h4>
        <h4 className="date">Amount: {amount}</h4>
      </div>
      <div className="price">{price}$</div>
      <div className="control">
        <button onClick={handleDelete}>Delete</button>
        <button>Continue To Buy</button>
        <button
          onClick={() => {
            navigate("/product/" + productId);
          }}
        >
          Details
        </button>
      </div>
      <div className="image">
        <img src={image} alt="" />
      </div>
    </article>
  );
}

export default Cart;
