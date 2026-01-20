import { useState } from "react";
import type { Catagory, Products } from "../App";

interface Props {
  id: number;
  setItems: (item: Products) => void;
}
export default function AddProduct({ id, setItems }: Props) {
  const [image, setImage] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [catagory, setCatagory] = useState<string>();
  const [qty, setQty] = useState<number>();
  const handleUpdate = () => {
    if (!image?.trim()) {
      alert("Add Image Url");
      return;
    }
    if (!title?.trim()) {
      alert("Add Product Title");
      return;
    }
    if (!catagory?.trim()) {
      alert("Choose Product Catagory");
      return;
    }
    if (!price) {
      alert("Invalid Price");
      return;
    }
    if (price <= 0) {
      alert("Invalid Price");
      return;
    }
    if (!qty) {
      alert("Invalid Quentity");
      return;
    }
    if (qty < 0) {
      alert("Invalid Quentity");
      return;
    }
    const payload: Products = {
      id: id,
      title: title,
      image: image,
      catagory: catagory as Catagory,
      price: price,
      qty: qty,
    };
    setItems(payload);
  };
  return (
    <div className="flex items-center justify-center p-4">
      <div className="max-w-xl border rounded-md shadow-md">
        <div className="p-4 rounded-md">
          <p>
            <input
              type="text"
              required
              placeholder="Image url"
              onChange={(e) => setImage(e.target.value)}
            />
          </p>
          <h2>
            <input
              type="text"
              required
              placeholder="Product Name"
              onChange={(e) => setTitle(e.target.value)}
            />
          </h2>
          <p>
            &#8377;
            <input
              type="text"
              required
              placeholder="Price"
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </p>
          <p>
            Catagory:{" "}
            <select
              name="cars"
              id="cars"
              onChange={(e) => setCatagory(e.target.value)}
              required
              defaultValue={"Food"}
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
              required
              defaultValue={0}
              placeholder="Quentity"
              onChange={(e) => setQty(Number(e.target.value))}
            />
          </p>
          <div className="flex items-center justify-end">
            <button
              onClick={handleUpdate}
              className="bg-green-500 p-2 border rounded-md shadow-sm hover:bg-green-600 cursor-pointer duration-300"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
