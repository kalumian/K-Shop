import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GetProducts } from "../../../Functions/Fetches_shop";
import { Product } from "../../../interfaces/shop";
import Card from "./Card";
import Categories from "./Categories";

function Products() {
  // ----------------
  const [products, setProducts] = useState<Product[]>([]);
  const [statefetch, setStatefetch] = useState<boolean>(true);
  const [stateCategories, setStateCategories] = useState<boolean>(false);
  const [categoryID, setCategoryID] = useState<number>();

  // ----------------
  useEffect(() => {
    try {
      //
      console.log(categoryID);

      setStatefetch(true);
      const fetchData = async () => {
        const data =  await GetProducts(categoryID) 
        setProducts(data);
        setStatefetch(false);
      };
      //
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [categoryID]);
  // ----------------

  return (
    <section className="products container">
      <div className="buttons">
        <Categories
          setCategoryID={setCategoryID}
          categoryID={categoryID}
          stateCategories={stateCategories}
          setStateCategories={setStateCategories}
        />
      </div>
      {/* <div>
        <input type="search" className="search" />
      </div> */}
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
