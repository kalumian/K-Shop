import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { GetCategories } from "../../Functions/ProductsFunctions";
import { Categoriess } from "../../interfaces/productsInterface";

function Categories({
  stateCategories,
  setCategoryID,
  categoryID,
  setStateCategories,
}: {
  stateCategories: boolean;
  categoryID: number | undefined;
  setCategoryID: React.Dispatch<React.SetStateAction<number | undefined>>;
  setStateCategories: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [categories, setCategories] = useState<Categoriess[]>([]);
  const [statefetch, setStatefetch] = useState<boolean>(true);
  const [select, setSelect] = useState<number>();
  // ----------------
  useEffect(() => {
    try {
      //
      const fetchData = async () => {
        const data = await GetCategories();
        setCategories(data);
        setStatefetch(false);
      };
      //
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  // ----------------
  return (
    <>
      <select
        name=""
        id=""
        className={` ${stateCategories ? "active" : ""}`}
        onChange={(i) => setSelect(Number(i.target.value))}
      >
        {statefetch ? (
          <>
            <option value="">Loading ...</option>
            <option value="">Loading ...</option>
            <option value="">Loading ...</option>
          </>
        ) : (
          <>
            <option>{"all"}</option>;
            {
            categories.map((i: Categoriess) => {
              return <option value={i.id}>{i.name}</option>;
            })
            }
          </>
        )}
      </select>
      <button onClick={() => setStateCategories(!stateCategories)}>
        <BiCategoryAlt/>  Categories
      </button>
      <button
        className="fillter"
        onClick={() => (select ? setCategoryID(select) : setCategoryID(0))}
      >
        <FaFilter/>  Fillter
      </button>
    </>
  );
}

export default Categories;
