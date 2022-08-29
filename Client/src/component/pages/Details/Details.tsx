import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GetProductById } from "../../../Functions/ProductsFunctions";
import { Product } from "../../../interfaces/productsInterface";
import Loader from "../../Elements/Loader";

function Details() {
  const [product, setProduct] = useState<Product>();
  const [fetchState, setFetchState] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>();
  let { pathname } = useLocation();
  let id = Number(pathname.split("/")[2]);

  useEffect(() => {
    setFetchState(false);
    if (id)
      GetProductById(id).then(([item]) => {
        setProduct(item);
        setFetchState(true);
      });
  }, []);
  return (
    <main className="shop">
      <div className="space"></div>
      <section className="details container">
        {fetchState ? (
          <>
            <div className="image">
              <img src={product?.image} alt={product?.name} />
            </div>
            <div className="line"></div>
            <div className="detail">
              <h2 className="title">{product?.name}</h2>
              <p className="description">{product?.description}</p>
              <p className="price">{product?.price}$</p>
              <input
                type="number"
                placeholder="0"
                onChange={(e) => {
                  if (Number() > 0) setAmount(Number(e.target.value));
                }}
              />
              <button className="add">add to cart</button>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </section>
    </main>
  );
}

export default Details;
