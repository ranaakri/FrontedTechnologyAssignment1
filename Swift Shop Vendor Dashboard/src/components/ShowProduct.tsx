import { useState } from "react";
import type { Actions, Catagory, Products } from "../App";

interface Props {
  item: Products;
  action: Actions;
  setItems: (item: Products) => void;
}
export default function ShowProduct({ item, action, setItems }: Props) {
  const [newData, setNewData] = useState<Products>(item);
  const handleUpdate = () => {
    const val = confirm("Are you sure want to update?");
    if (val) {
      setItems(newData);
    }
  };
  const handleDelete = () => {
    const val = confirm("Are you sure want to delete?");
    if (val) {
      setItems(newData);
    }
  };
  switch (action) {
    case "Update":
      return (
        <div className="max-w-2xl border rounded-md shadow-md">
          <div className="flex items-center justify-center">
            <img src={item.image} className="w-48 h-48 object-cover" />
          </div>
          <div className="p-4 bg-green-500 text-white rounded-md">
            <h2>
              <input
                type="text"
                defaultValue={item.title}
                onChange={(e) =>
                  setNewData({ ...newData, title: e.target.value })
                }
              />
            </h2>
            <p>
              &#8377;
              <input
                type="text"
                defaultValue={item.price}
                onChange={(e) =>
                  setNewData({ ...newData, price: Number(e.target.value) })
                }
              />
            </p>
            <p>
              Catagory:{" "}
              <select
                name="cars"
                id="cars"
                className="text-black"
                defaultValue={item.catagory}
                onChange={(e) =>
                  setNewData({
                    ...newData,
                    catagory: e.target.value as Catagory,
                  })
                }
              >
                <option value="Food">Food</option>
                <option value="Furniture">Furniture</option>
                <option value="Electornics">Electornics</option>
              </select>
            </p>
            <p>
              Quentity:{" "}
              <input
                type="text"
                defaultValue={item.qty}
                onChange={(e) =>
                  setNewData({ ...newData, qty: Number(e.target.value) })
                }
              />
            </p>
            <div className="flex items-center justify-end">
              <button
                onClick={handleUpdate}
                className="bg-yellow-500 p-2 border rounded-md shadow-sm hover:bg-yellow-600 cursor-pointer duration-300"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      );
    case "Delete":
      return (
        <div className="max-w-2xl border rounded-md shadow-md">
          <div className="flex items-center justify-center">
            <img src={item.image} className="w-48 h-48 object-cover" />
          </div>
          <div className="p-4 bg-green-500 text-white rounded-md">
            <h2>{item.title}</h2>
            <p>&#8377;{item.price}</p>
            <p>Catagory: {item.catagory}</p>
            <p>Quentity: {item.qty}</p>
            <div className="flex items-center justify-end">
              <button
                onClick={handleDelete}
                className="bg-red-500 p-2 border rounded-md shadow-sm hover:bg-red-600 cursor-pointer duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      );
    case "Show":
      return (
        <div className="max-w-2xl border rounded-md shadow-md">
          <div className="flex items-center justify-center">
            <img src={item.image} className="w-48 h-48 object-cover" />
          </div>
          <div className="p-4 bg-green-500 text-white rounded-md">
            <h2>{item.title}</h2>
            <div className="grid grid-cols-2">
              <p>&#8377;{item.price}</p>
              {item.price > 500 && (
                <p className="bg-yellow-300 text-black border rounded-full text-center">
                  Expencive
                </p>
              )}
            </div>
            <p>Catagory: {item.catagory}</p>
            <div className="grid grid-cols-2">
              <p>Quentity: {item.qty}</p>
              {item.qty <= 5 && (
                <p className="bg-yellow-300 text-black border rounded-full text-center">
                  Limited
                </p>
              )}
            </div>
          </div>
        </div>
      );
    default:
      console.error("Invalid Action for Product");
      break;
  }
}
