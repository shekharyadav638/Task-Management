import React from "react";
import { useState } from "react";

const AddList = ({ onAdd }) => {
  const [listName, setListname] = useState("");
  const showBox = () => {
    document.querySelector(".add-list").style.display = "flex";
    document.querySelector("#add").style.display = "none";
  };

  const saveList = () => {
    if (listName !== "") {
      onAdd({ key: listName, value: [], showCardBox: false });
      setListname("");
      document.querySelector(".add-list").style.display = "none";
      document.querySelector("#add").style.display = "block";
    }
  };

  const closeBox = () => {
    document.querySelector(".add-list").style.display = "none";
    document.querySelector("#add").style.display = "block";
  };

  return (
    <>
      <div className="add-list">
        <input
          type="text"
          id="list-name"
          placeholder="Type list title"
          value={listName}
          onChange={(e) => setListname(e.target.value)}
        />
        <div className="flex gap-2">
          <button id="add-list" onClick={saveList}>
            Add List
          </button>
          <button id="cancel" onClick={closeBox}>
            X
          </button>
        </div>
      </div>
      <button id="add" className="addBtn" onClick={showBox}>
        Add List
      </button>
    </>
  );
};

export default AddList;
