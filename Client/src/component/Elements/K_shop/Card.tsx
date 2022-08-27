import { useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../../../interfaces/shop";

const Card: React.FC<Product> = ({
  id,
  name,
  description,
  price,
  image,
}): JSX.Element => {
  const [aomunt, setAmount] = useState<number>(0);
  return (
    <div className="card" key={`${id}`}>
      <div className="image">
        <Link to={`/${id}`}><img src={`${image}`} alt="product-image" /></Link>
      </div>
      <h2 className="title">
        <Link to={`/${id}`}>{`${name}`}</Link>
      </h2>
      <p className="description">{`${description}`}</p>
      <p className="price">{`${price}`}$</p>
      <input
        type="number"
        placeholder="0"
        onChange={(e) => {
          if (Number() > 0) setAmount(Number(e.target.value));
        }}
      />
      <button className="add">add to cart</button>
    </div>
  );
};

export default Card;
