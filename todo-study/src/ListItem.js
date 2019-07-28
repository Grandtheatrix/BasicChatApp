import React from "react";

export default function ListItem(props) {
  return (
    <div style={{ border: "5px black" }}>
      <label>{props.text} </label>
      <input
        type="checkbox"
        checked={props.checked}
        onChange={() => props.handleCheck(props.index)}
      />
      <button onClick={() => props.handleEditMode(props.index)}>Edit</button>
      <button onClick={() => props.handleDelete(props.index)}>Delete</button>
      <button onClick={() => props.handleMove(false, props.index)}>
        Move Up
      </button>
      <button onClick={() => props.handleMove(true, props.index)}>
        Move Down
      </button>
    </div>
  );
}
