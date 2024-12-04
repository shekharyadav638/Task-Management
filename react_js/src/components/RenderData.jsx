import React from "react";
import { useState } from "react";
import AddList from "./AddList";
import AddCard from "./AddCard";

const RenderData = () => {
  const [data, setData] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredList, setHoveredList] = useState(null);
  const [editingCard, setEditingCard] = useState(null);

  const addList = (list) => {
    setData([...data, list]);
  };

  const deleteList = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setHoveredList(null);
    setData(newData);
  };

  const addCard = (key) => {
    const newData = data.map((item) => {
      if (item.key === key) {
        item.showCardBox = true;
      }
      return item;
    });
    setData(newData);
  };

  const closeCardBox = (key) => {
    const newData = data.map((item) => {
      if (item.key === key) {
        item.showCardBox = false;
      }
      return item;
    });
    setData(newData);
  };

  const saveCard = (key) => {
    const card = document.querySelector(".add-card input").value;
    if (card !== "") {
      const newData = data.map((item) => {
        if (item.key === key) {
          item.value.push(card);
          item.showCardBox = false;
        }
        return item;
      });
      setData(newData);
    }
  };

  const deleteCard = (key, index) => {
    const newData = data.map((item) => {
      if (item.key === key) {
        item.value.splice(index, 1);
        setHoveredCard(null);
      }
      return item;
    });
    setData(newData);
  };

  const editCard = (key, index) => {
    setEditingCard({ key, index });
  };

  const saveEditedCard = (key, index, newValue) => {
    const newData = data.map((item) => {
      if (item.key === key) {
        item.value[index] = newValue;
      }
      return item;
    });
    setData(newData);
    setEditingCard(null);
  };

  return (
    <div className="flex gap-5 flex-wrap p-3">
      <div className="flex gap-5 flex-wrap">
        {data?.map((item, index) => (
          <div
            key={item.key}
            className="list"
            onMouseEnter={() => setHoveredList({ key: item.key })}
            onMouseLeave={() => setHoveredList(null)}
          >
            <div className="list-header">
              <h3 className="text-start font-bold text-l">{item.key}</h3>
            </div>
            <div className="list-items">
              {item.value?.map((card, index) => (
                <div
                  className="card"
                  key={index}
                  onMouseEnter={() => setHoveredCard({ key: item.key, index })}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {editingCard?.key === item.key &&
                  editingCard?.index === index ? (
                    <input
                      type="text"
                      defaultValue={card}
                      onBlur={(e) =>
                        saveEditedCard(item.key, index, e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          saveEditedCard(item.key, index, e.target.value);
                        }
                      }}
                      autoFocus
                    />
                  ) : (
                    <>
                      {card}
                      {hoveredCard?.key === item.key &&
                        hoveredCard?.index === index && (
                          <div className="modify">
                            <img
                              src="./edit.png"
                              alt="edit-icon"
                              onClick={() => editCard(item.key, index)}
                            />
                            <img
                              src="./delete.png"
                              alt="del-icon"
                              onClick={() => deleteCard(item.key, index)}
                            />
                          </div>
                        )}
                    </>
                  )}
                </div>
              ))}
            </div>
            {item.showCardBox && (
              <div className="add-card">
                <input type="text" placeholder="Type card title" />
                <div className="flex gap-3">
                  <button onClick={() => saveCard(item.key)}>Add Card</button>
                  <button onClick={() => closeCardBox(item.key)}>X</button>
                </div>
              </div>
            )}
            {!item.showCardBox && (
              <button onClick={() => addCard(item.key)}>Add Card</button>
            )}
            {hoveredList?.key === item.key && (
              <img
                src="./delete.png"
                alt="del-icon"
                className="delete"
                onClick={() => deleteList(item.key)}
              />
            )}
          </div>
        ))}
      </div>
      <AddList onAdd={addList} />
    </div>
  );
};

export default RenderData;
