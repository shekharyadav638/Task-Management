const addBtn = document.getElementById("add");
const addList = document.getElementById("addList");
const tasks = document.getElementById("tasks");

const data = [];

function renderData() {
  console.log(data);
  localStorage.setItem("data", JSON.stringify(data));
  tasks.innerHTML = "";
  data.forEach((list) => {
    const listContainer = document.createElement("div");
    listContainer.classList.add("list");
    listContainer.setAttribute("draggable", "true");
    listContainer.innerHTML = `
      <div class="list-header">
        <h3 class="list-name">${list.key}</h3>
      </div>
      <div class="list-items"></div>
      <button class="addItem">Add Card</button>
      <img src= "delete.png" alt = "del-icon" class="delete"/>
    `;

    const listItems = listContainer.querySelector(".list-items");
    listItems.style.minHeight = "20px";
    list.value.forEach((item) => {
      const itemContainer = document.createElement("div");
      itemContainer.classList.add("card");
      itemContainer.setAttribute("draggable", "true");
      itemContainer.textContent = item;
      listItems.appendChild(itemContainer);
    });

    tasks.appendChild(listContainer);
  });
}

addBtn.addEventListener("click", (e) => {
  addBtn.classList.add("active");
  const addContainer = document.createElement("div");
  addContainer.id = "add-container";
  addContainer.classList.add("list");
  addContainer.innerHTML = `
            <input type="text" id="list-name" placeholder="Type list title" />
            <div class="btns"> 
                <button id="add-list" class="addBtn">Add List</button> 
                <button id="cancel" class="addBtn">X</button>
            </div>
    `;
  addList.appendChild(addContainer);
});

addList.addEventListener("click", (e) => {
  if (e.target.id === "add-list") {
    const listName = document.getElementById("list-name").value;
    if (listName) {
      data.push({ key: listName, value: [] });
      renderData();
      addList.removeChild(document.getElementById("add-container"));
      addBtn.classList.remove("active");
    }
  } else if (e.target.id === "cancel") {
    addList.removeChild(document.getElementById("add-container"));
    addBtn.classList.remove("active");
  }
});

tasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("addItem")) {
    const listItems = e.target.previousElementSibling;
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("item-container");
    itemContainer.innerHTML = `
                <input type="text" class="item-name" placeholder="Type card title" />
                <div class="btns"> 
                    <button class="add-item addBtn">Save</button> 
                    <button class="cancel addBtn">X</button>
                </div>
        `;
    if (!listItems.querySelector(".item-container")) {
      listItems.appendChild(itemContainer);
    }
  } else if (e.target.classList.contains("delete")) {
    console.log("delete pressed");
    const listName = e.target
      .closest(".list")
      .querySelector(".list-name").textContent;
    const index = data.findIndex((list) => list.key === listName);
    data.splice(index, 1);
    renderData();
  }
});

tasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-item")) {
    const itemName = e.target.parentElement.previousElementSibling.value;
    if (itemName) {
      const listName = e.target
        .closest(".list")
        .querySelector(".list-name").textContent;
      const list = data.find((list) => list.key === listName);
      list.value.push(itemName);
      renderData();
      e.target.closest(".item-container").remove();
    }
  } else if (e.target.classList.contains("cancel")) {
    e.target.closest(".item-container").remove();
  }
});

tasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("card")) {
    const card = e.target.closest(".card");
    const cardName = card.textContent;
    const cardInput = document.createElement("input");
    cardInput.type = "text";
    cardInput.value = cardName;
    cardInput.classList.add("card-input");
    card.innerHTML = "";
    card.appendChild(cardInput);
    cardInput.focus();

    cardInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const updatedCardName = cardInput.value.trim();
        const listName = card

          .closest(".list")
          .querySelector(".list-name").textContent;
        const list = data.find((list) => list.key === listName);
        const index = list.value.indexOf(cardName);
        list.value[index] = updatedCardName;
        renderData();
        cardInput.remove();
      }
    });
  }
});

window.onload = () => {
  const localData = JSON.parse(localStorage.getItem("data"));
  if (localData) {
    data.push(...localData);
    renderData();
  }
};

let draggedCard = null;
let draggedFromList = null;

tasks.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("card")) {
    draggedCard = e.target;
    draggedFromList = e.target.closest(".list-items");
    e.target.style.opacity = "0.5";
    e.dataTransfer.effectAllowed = "move";
  }
});

tasks.addEventListener("dragend", (e) => {
  if (e.target.classList.contains("card")) {
    e.target.style.opacity = "1";
    draggedCard = null;
    draggedFromList = null;
  }
});

tasks.addEventListener("dragover", (e) => {
  e.preventDefault();
  const targetList = e.target.classList.contains("list-items")
    ? e.target
    : e.target.closest(".list-items");

  if (targetList) {
    targetList.style.border = "2px dashed #000";
  }
});

tasks.addEventListener("dragleave", (e) => {
  const targetList = e.target.classList.contains("list-items")
    ? e.target
    : e.target.closest(".list-items");

  if (targetList) {
    targetList.style.border = "none";
  }
});

tasks.addEventListener("drop", (e) => {
  e.preventDefault();

  const targetList = e.target.classList.contains("list-items")
    ? e.target
    : e.target.closest(".list-items");

  if (targetList && draggedCard) {
    targetList.style.border = "none";

    const cardName = draggedCard.textContent;
    const fromListName = draggedFromList
      .closest(".list")
      .querySelector(".list-name").textContent;
    const toListName = targetList
      .closest(".list")
      .querySelector(".list-name").textContent;

    const fromList = data.find((list) => list.key === fromListName);
    const toList = data.find((list) => list.key === toListName);
    if (fromList && toList) {
      const cardIndex = fromList.value.indexOf(cardName);
      if (cardIndex > -1) {
        fromList.value.splice(cardIndex, 1);
        toList.value.push(cardName);
      }
    }
    targetList.appendChild(draggedCard);
    renderData();
  }
});

let draggedList = null;
let draggedListIndex = null;

tasks.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("list")) {
    draggedList = e.target;
    draggedListIndex = Array.from(tasks.children).indexOf(draggedList);
    e.target.style.opacity = "0.5";
    e.dataTransfer.effectAllowed = "move";
  }
});

tasks.addEventListener("dragend", (e) => {
  if (e.target.classList.contains("list")) {
    e.target.style.opacity = "1";
    draggedList = null;
    draggedListIndex = null;
  }
});

tasks.addEventListener("dragover", (e) => {
  e.preventDefault();
  const targetList = e.target.classList.contains("list")
    ? e.target
    : e.target.closest(".list");

  if (targetList && targetList !== draggedList) {
    targetList.style.border = "2px dashed #000";
  }
});

tasks.addEventListener("dragleave", (e) => {
  const targetList = e.target.classList.contains("list")
    ? e.target
    : e.target.closest(".list");

  if (targetList) {
    targetList.style.border = "";
  }
});

tasks.addEventListener("drop", (e) => {
  e.preventDefault();
  const targetList = e.target.classList.contains("list")
    ? e.target
    : e.target.closest(".list");

  if (targetList && draggedList && targetList !== draggedList) {
    targetList.style.border = "";

    const targetIndex = Array.from(tasks.children).indexOf(targetList);
    if (draggedListIndex < targetIndex) {
      tasks.insertBefore(draggedList, targetList.nextSibling);
    } else {
      tasks.insertBefore(draggedList, targetList);
    }
    const [movedList] = data.splice(draggedListIndex, 1);
    data.splice(targetIndex, 0, movedList);
    renderData();
  }
});
