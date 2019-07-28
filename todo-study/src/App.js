import React, { useState } from "react";
import "./App.css";
import ListItem from "./ListItem";

function App() {
  const [itemText, setItemText] = useState("");
  const [items, setItems] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(0);

  function addUpdateItem() {
    if (editMode) {
      //if in edit mode, rebuild "items" array, modifying "itemText" of item at the "editIndex" position
      setItems([
        ...items.slice(0, editIndex),
        { ...items[editIndex], itemText: itemText },
        ...items.slice(editIndex + 1)
      ]);
      setEditMode(!editMode);
    } else {
      //if not in edit mode, add new item to end of array
      setItems([...items, { itemText: itemText, checked: false }]);
      setItemText("");
    }
  }

  function handleItemChange(e) {
    setItemText(e.target.value);
  }

  //The following 4 functions are handed down through props so ListItem can update Parent state

  function handleMove(down = true, index) {
    // // take selected item out of array,
    // // create new array without selected item,
    // // place selected item into new array in desired new index.
    // // viable but a little clunky

    // let movingItem = items[index];
    // let arrayPart = [...items.slice(0, index), ...items.slice(index + 1)];
    // let newIndex = (index + (down ? 1 : -1) + items.length) % items.length;
    // let newArray = [
    //   ...arrayPart.slice(0, newIndex),
    //   movingItem,
    //   ...arrayPart.slice(newIndex)
    // ];
    // setItems(newArray);

    // swap items at index and newIndex using destructuring assignment array. sexy
    let newIndex = (index + (down ? 1 : -1) + items.length) % items.length;
    let newArray = [...items];
    [newArray[index], newArray[newIndex]] = [
      newArray[newIndex],
      newArray[index]
    ];
    setItems(newArray);
  }

  function handleEditMode(index) {
    setEditMode(!editMode);
    setItemText(items[index].itemText);
    setEditIndex(index);
  }

  function handleDelete(index) {
    // rebuild "items" array without item at selected index
    setItems([...items.slice(0, index), ...items.slice(index + 1)]);
  }

  function handleCheck(index) {
    // rebuild "items" array, modifying "checked" attribute of item at selected index
    setItems([
      ...items.slice(0, index),
      { ...items[index], checked: !items[index].checked },
      ...items.slice(index + 1)
    ]);
  }

  return (
    <div className={"App"}>
      <h3>Todo List</h3>
      <br />
      <input
        placeholder="Enter Todo Item"
        value={itemText}
        onChange={handleItemChange}
      />
      <button onClick={addUpdateItem}>{editMode ? "Update" : "Add"}</button>
      {!editMode &&
        items.map((item, index) => (
          <ListItem
            key={index}
            text={item.itemText}
            checked={item.checked}
            index={index}
            handleCheck={handleCheck}
            handleEditMode={handleEditMode}
            handleDelete={handleDelete}
            handleMove={handleMove}
          />
        ))}
    </div>
  );
}

export default App;
