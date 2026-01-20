import { useEffect, useState } from "react";
import type { Actions, Products } from "../App";
import ShowProduct from "./ShowProduct";
import AddProduct from "./AddProduct";

interface Props {
  items: Products[];
  action: Actions;
  setItems: (item: Products[]) => void;
}
export default function ManageProducts({ items, action, setItems }: Props) {
  const [data, setData] = useState<Products | null>(null);

  useEffect(() => {
    if (data) {
      switch (action) {
        case "Update":
          let updatedList: Products[] = items.map((item) => {
            if (item.id === data.id) {
              return {
                ...item,
                id: item.id,
                title: data.title,
                qty: data.qty,
                catagory: data.catagory,
                price: data.price,
              };
            }
            return item;
          });

          setItems(updatedList);
          alert("Updated Successfully");
          break;
        case "Delete":
          setItems(items.filter((item) => item.id !== data.id) || null);
          alert("Deleted Successfully");
          break;
        case "Add":
          setItems([...items, data]);
          alert("Item Added Successfully");
          break;
        default:
          console.error("Invalid action");
          break;
      }
    }
  }, [data]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {action === "Add" ? (
        <AddProduct id={items.length + 1} setItems={setData} />
      ) : (
        items.map((data: Products, index) => (
          <ShowProduct
            item={data}
            action={action}
            key={index}
            setItems={setData}
          />
        ))
      )}
    </div>
  );
}
