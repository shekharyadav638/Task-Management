import React from "react";

const AddCard = ({ onCardAdd, parent }) => {
  return (
    <div className="add-card">
      <input type="text" class="item-name" placeholder="Type card title" />
      <div class="btns">
        <button class="add-item addBtn">Save</button>
        <button class="cancel addBtn">X</button>
      </div>
    </div>
  );
};

export default AddCard;
