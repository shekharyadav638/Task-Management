const addBtn = document.getElementById("add");
const tasks = document.getElementById("tasks");
const addList = document.getElementById("addList");

addBtn.addEventListener("click", () => {
  addBtn.classList.add("active");
  const addContainer = document.createElement("div");
  addContainer.id = "add-container";
  addContainer.classList.add("list");
  addContainer.innerHTML = `
            <input type="text" id="list-name" placeholder="Type list title" />
            <div class = "btns"> 
                <button id="add-list" class = "addBtn">Add List</button> 
                <button id="cancel" class = "addBtn">X</button>
            </div>
    `;
  addList.appendChild(addContainer);
});

addList.addEventListener("click", (e) => {
  if (e.target.id === "add-list") {
    const listName = document.getElementById("list-name").value;
    if (listName) {
      const list = document.createElement("div");
      list.classList.add("list");
      list.innerHTML = `
                <div class="list-header">
                    <h3>${listName}</h3>
                </div>
                <div class="list-items" id="listItems"></div>
                <button id="addItem">Add Card</button>
            `;
      tasks.appendChild(list);
      addList.removeChild(document.getElementById("add-container"));
      addBtn.classList.remove("active");
    }
  }
});

document.getElementById("addItem").addEventListener("click", () => {
  const itemContainer = document.createElement("div");
  itemContainer.id = "item-container";
  itemContainer.innerHTML = `
                <input type="text" id="item-name" placeholder="Type card title" />
                <div class = "btns"> 
                    <button id="add-item" class = "addBtn">Save</button> 
                    <button id="cancel" class = "addBtn">X</button>
                </div>
        `;
  document.getElementById("listItems").appendChild(itemContainer);
});
