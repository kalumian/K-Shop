import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GetProducts } from "../../Functions/ProductsFunctions";
import { Product } from "../../interfaces/productsInterface";
import Card from "./Card";
import Categories from "./Categories";
import { CartContext } from "../../Stores/cartContext";

function Products() {
  // ----------------
  const [products, setProducts] = useState<Product[]>([]);
  const [statefetch, setStatefetch] = useState<boolean>(true);
  const [stateCategories, setStateCategories] = useState<boolean>(false);
  const [categoryID, setCategoryID] = useState<number>();
  const [search, setSeacrh] = useState<string>("");
  // ----------------
  useEffect(() => {
    try {
      //
      setStatefetch(true);
      const fetchData = async () => {
        const data = await GetProducts(categoryID, search);
        setProducts(data);
        setStatefetch(false);
      };
      //
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [categoryID, search]);
  // ----------------

  return (
    <section className="products container">
      <div>
        <input
          type="search"
          className="search"
          value={search}
          placeholder="search"
          onChange={(i) => {
            setSeacrh(i.target.value);
          }}
        />
      </div>
      <div className="buttons">
        <Categories
          setCategoryID={setCategoryID}
          categoryID={categoryID}
          stateCategories={stateCategories}
          setStateCategories={setStateCategories}
        />
      </div>

      {!statefetch ? (
        <article className="cards">
          {products.map(({ name, description, category, id, image, price }) => {
            return (
              <Card
                name={name}
                description={description}
                price={price}
                image={image}
                category={category}
                id={id}
              />
            );
          })}
        </article>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Products;
