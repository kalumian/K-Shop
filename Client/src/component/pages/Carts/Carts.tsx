import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../Stores/cartContext";
import To_back_Page from "../../Elements/To_back_Page";
import { getCart } from "../../../interfaces/cartInterfaces";
import Cart from "../../Elements/Cart";
import { ClearCarts } from "../../../Functions/CartFunctions";
import AuthService from "../../../Functions/services/auth.service";
function Carts() {
  const context = useContext(CartContext);
  const [carts, setCarts] = useState<getCart[]>(context?.carts);
  useEffect(() => {
    (async function () {
      setCarts(await context?.getCarts());
      console.log(await context?.getCarts());
    })();
  }, []);
  const updateCarts = (): void => {
    context?.getCarts().then((i: getCart[]) => {
      setCarts(i);
    });
  };
  const clearCarts = (): void => {
    try {
      ClearCarts(AuthService.getUserAsObject().sub).then((i) => {
        updateCarts();
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="container carts">
      <To_back_Page />
      <h2 className="title">
        Carts <small>({carts.length})</small>
      </h2>
      <div className="buttons">
        <button>Continue to Buy All Carts</button>
        <button onClick={clearCarts}>Clear All</button>
        <button>Filter</button>
      </div>
      <div className="statactic">
        Total prices for all cars:{" "}
        {carts[0]
          ? carts
              .map((i) => {
                return i.price;
              })
              .reduce((total, num) => {
                return total + num;
              }) + "$"
          : 0 + "$"}
      </div>
      <section className="carts-list">
        {carts.map(
          ({ image, name, price, timesStamp, cartId, productId , amount}: getCart) => {
            return (
              <Cart
                key={cartId}
                image={image}
                name={name}
                amount={amount}
                price={price}
                cartId={cartId}
                productId={productId}
                timesStamp={timesStamp}
                updateCarts={updateCarts}
              />
            );
          }
        )}
      </section>
    </main>
  );
}

export default Carts;
