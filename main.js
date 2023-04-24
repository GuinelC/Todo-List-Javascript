// startAPP
const appBtn = document.querySelector(".btn-app");
appBtn.addEventListener("click", () => {
  const app = document.querySelector(".todo");
  app.style.display = "flex";
});

class Todo {
  constructor(title) {
    this.title = title;
    this.items = [];
  }
}

class Item {
  constructor(text) {
    this.text = text;
  }
}

// FORM1
const form = document.querySelector("#form1");
const formInput = document.getElementById("form-input");
const listCat = document.getElementById("list-cat");

// FORM2
const containItem = document.getElementById("title-div");
containItem.innerHTML = `<h2 class="title-select">Faite votre selection...</h2>
<img class="img-select" src="listlogo.png" alt="logo home">`;

// Local storage
const todos = JSON.parse(localStorage.getItem("todos")) || [];
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}


// Create CAT in local storage
function addTodo() {
  const title = formInput.value;
  const todo = new Todo(title);
  todos.push(todo);
  saveTodos();
  form.reset();
}


// Submit TODO in local storage
form.addEventListener("submit", (event) => {
  event.preventDefault();
  addTodo();
  displayTodo();
});


// Delete Cat from local storage
function deleteTodo(id) {
  const index = id.split("-")[1];
  todos.splice(index, 1);
  saveTodos();
  console.log("index delete is: ", index);
  
  if (todos < 1){
    window.location.reload();
  }
  // Vider les éléments qui était afficher dans cette Todo
  setTimeout(() => {
    containItem.innerHTML = `<h2 class="title-select">Faite votre selection !</h2>
        <img class="img-select" src="listlogo.png" alt="logo home">`;
  }, 50); // ajoute une pause, en millisecondes
  displayTodo();
}


// Boucle sur la liste CAT à sortir.
function displayTodo() {
  listCat.innerText = "";
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    let todoCat = document.createElement("div");
    todoCat.classList.add("todoCat");
    todoCat.setAttribute("id", `todo-${i}`);

    todoCat.innerHTML = `${todo.title} <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>`;
    listCat.appendChild(todoCat);

    // Length of array
    const numberList = document.querySelector(".number-list");
    if (todos.length >= 1){
      numberList.innerText = todos.length;
    } else {
      numberList.innerText = "0";
    }

    // Create From item
    function formItem() {
      containItem.innerHTML = `
            <form id="form2">
                <h3 class="form2Title">${todo.title}</h3>
                <div class="form2-contain">
                  <h4 class="head-contain"><i class="fa-solid fa-circle-plus"></i> Ajouter de nouveaux élements</h4>
                  <input id="myName" placeholder="..." required><br>
                  <button type="submit" value="+" id="add-Item">AJOUTER !</button>
                </div>
            </form>
            <hr><h2 class="list-title"><i class="fa-solid fa-circle-chevron-down"></i> Vos tâches à accomplir</h2>
            <div id="list-item"></div> `;

      const form2 = document.getElementById("form2");
      const inputForm2 = document.getElementById("myName");

      // PUSH - item in local storage
      form2.addEventListener("submit", (event) => {
        event.preventDefault();
        function addItem() {
          const text = inputForm2.value;
          let item = new Item(text);
          todo.items.push(item);
          saveTodos();
          inputForm2.value = "";
          form2.reset();
          displayItem();
        }
        addItem();
      });

      function displayItem() {
        const listItem = document.getElementById("list-item");
        // Reset affichage list
        listItem.innerHTML = "";

        for (let j = 0; j < todo.items.length; j++) {
          const item = todo.items[j];
          let resultItem = document.createElement("div");
          resultItem.classList.add("div-items");
          resultItem.innerHTML = `
                    <div class="contain-item">
                      <div class="left-item">
                        <input type="checkbox" id="check-${j}" ${item.checked ? "checked" : ""}></input>
                        ${item.text}
                      </div>
                      <button class="delItem" id="deleteItem-${j}"><i class="fa-solid fa-xmark"></i></button>
                    </div>`;
          listItem.appendChild(resultItem);

          // Delete Item in local Storage
          const deleteItem = document.getElementById(`deleteItem-${j}`);
          deleteItem.addEventListener("click", () => {
            const index = todo.items.indexOf(item);
            todo.items.splice(index, 1);
            resultItem.remove();
            saveTodos();
          });

          // Si Checkbox est activer, change color
          const checkbox = document.getElementById(`check-${j}`);
          checkbox.addEventListener("change", (event) => {
            item.checked = event.target.checked;
            if (checkbox.checked) {
              resultItem.style.backgroundColor = "rgb(151, 255, 170)";
            } else {
              resultItem.style.backgroundColor = "";
            }
            saveTodos();
          });

          // Si bouton check actif, change color
          if (item.checked) {
            resultItem.style.backgroundColor = "rgb(151, 255, 170)";
          }
        }
      }
      displayItem();
    }


    // Event - Delete Cat
    let deleteBtn = todoCat.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      deleteTodo(todoCat.id);
    });

    // ajouter un écouteur d'événement de clic à todoCat
    todoCat.addEventListener("click", (event) => {
      formItem();
      // réinitialiser la couleur de fond des autres todoCat
      const allTodoCat = document.querySelectorAll(".todoCat");
      allTodoCat.forEach(cat => {
        cat.style.backgroundColor = "";
        cat.style.color = "";
      });
      // changer la couleur de fond du todoCat cliqué
      todoCat.style.backgroundColor = "rgb(70, 70, 70)";
      todoCat.style.color = "rgb(151, 255, 170)";
    });
  }
}

// Afficher list cat 
displayTodo();