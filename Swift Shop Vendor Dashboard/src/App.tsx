import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
// import ShowProduct from "./components/ShowProduct";
import ManageProducts from "./components/ManageProducts";

export type Catagory = "Food" | "Furniture" | "Electornics";
export interface Products {
  id: number;
  image: string;
  title: string;
  price: number;
  catagory: Catagory;
  qty: number;
}

export type Actions = "Update" | "Delete" | "Show" | "Add";
function App() {
  const [items, setItems] = useState<Products[]>([]);
  const [filtered, setFiltered] = useState<Products[]>([]);
  const [action, setAction] = useState<Actions>("Show");
  const actions: Actions[] = ["Show", "Add", "Update", "Delete"];
  const [catagory, setCatagory] = useState<string | null>("All");
  const [searchval, setSearchval] = useState<string>();
  const [searchitems, setSearchItems] = useState<Products[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("Data");
    if (data) setItems(JSON.parse(data));
    console.log(data);
  }, []);

  useEffect(() => {
    if (catagory != "All") {
      if (items) {
        setFiltered(items.filter((val) => val.catagory == catagory));
      }
      console.log(catagory);
    }
  }, [catagory]);

  useEffect(() => {
    if (searchval?.trim()) {
      if (items) {
        setSearchItems(
          items.filter(
            (val) =>
              searchval.toLowerCase() ==
              val.title.substring(0, searchval.length).toLocaleLowerCase(),
          ),
        );
      }
    }
  }, [searchval]);

  return (
    <div className="">
      <div
        typeof="none"
        className="flex flex-row px-4 py-1 font-semibold text-white bg-green-500 justify-center items-center"
      >
        {actions.map((val, index) => (
          <button
            className="hover:bg-white hover:text-black duration-300 rounded-md p-4"
            onClick={() => setAction(val)}
            key={index}
          >
            {val}
          </button>
        ))}
      </div>
      <div className="flex justify-center items-center p-2 flex-col md:flex-row gap-4">
        <input
          type="text"
          className="w-50 border rounded-md p-2"
          placeholder="search"
          onChange={(e) => setSearchval(e.target.value)}
        />
        <p>
          Catagory:{" "}
          <select
            name="cars"
            id="cars"
            onChange={(e) => setCatagory(e.target.value)}
            required
            defaultValue={"All"}
          >
            <option value="All">All</option>
            <option value="Food">Food</option>
            <option value="Furniture">Furniture</option>
            <option value="Electornics">Electornics</option>
          </select>
        </p>
      </div>
      <div className="p-4">
        <ManageProducts
          items={
            searchval?.trim()
              ? searchitems
              : catagory === "All"
                ? items
                : filtered
          }
          action={action}
          setItems={setItems}
        />
      </div>
      {filtered.length === 0 && catagory !== "All" && (
        <div className="font-semibold flex items-center justify-center text-gray-500 p-4">
          -- No items --
        </div>
      )}
    </div>
  );
}

export default App;
