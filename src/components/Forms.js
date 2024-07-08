import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItems, removeItmes, updateItems } from "./Slice";

const Forms = () => {
  const [itemName, setItemName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const items = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleAddItems = (event) => {
    event.preventDefault();
    const newItem = {
      id: items.length + 1,
      name: itemName,
    };
    dispatch(addItems(newItem));
    setItemName("");
  };

  const handleDeleteItems = (id) => {
    dispatch(removeItmes(id));
  };

  const handleEditItem = (id, name) => {
    setItemName(name);
    setCurrentItemId(id);
    setEditMode(true);
  };

  const handleUpdateItem = (event) => {
    event.preventDefault();
    if (itemName.trim()) {
      dispatch(updateItems({ id: currentItemId, name: itemName }));
      setItemName("");
      setEditMode(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center mt-16 p-4">
    <form
      className="w-full max-w-md flex flex-col sm:flex-row"
      onSubmit={editMode ? handleUpdateItem : handleAddItems}
    >
      <input
        className="w-full bg-cyan-600 p-3 text-white border-none rounded-md sm:mr-3 mb-3 sm:mb-0"
        type="text"
        value={itemName}
        placeholder="Enter Your Name"
        onChange={(e) => setItemName(e.target.value)}
      />
      <button
        className="bg-green-700 text-white p-3 rounded-md w-full sm:w-20"
        type="submit"
      >
        {editMode ? "Update" : "+ Add"}
      </button>
    </form>
    <div className="w-full max-w-md mt-4">
      <ul className="list-none">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center bg-white p-3 mb-2 shadow-md rounded-md"
          >
            {item.name}
            <div className="flex space-x-2">
              <button
                className="bg-blue-500 text-white p-1 rounded-md"
                onClick={() => handleEditItem(item.id, item.name)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white p-1 rounded-md"
                onClick={() => handleDeleteItems(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
};

export default Forms;




