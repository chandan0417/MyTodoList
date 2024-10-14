console.log('Welcome to my todo list app ');
const todolist = document.querySelector('.todo-list')
todolist.addEventListener("click", Add_and_delete)


document.addEventListener("DOMContentLoaded", (e) => {
    getTodos();
})

function Add_and_delete(e) {
    console.log(e.target)

    //    Deleting funtionality
    if (e.target.className == "delete") {
        const grandparentElement = e.target.parentElement.parentElement;
        grandparentElement.classList.add("fall")
        const todoText = grandparentElement.querySelector('.task1').textContent;
        console.log(`Todo text to be removed: ${todoText}`);
        removeTodo(todoText);
        grandparentElement.addEventListener("transitionend", () => {
            grandparentElement.remove()
        })
    }
    // Competing funtionality
    if (e.target.className == 'add') {
        const grandparentElement = e.target.parentElement.parentElement;
        grandparentElement.classList.toggle('completed')
    }

}

function AddTodoList(e) {
    const inputField = document.getElementById("enter")
    const inputFieldvalue = inputField.value.trim();
    setTodos(inputFieldvalue)
    if (inputFieldvalue) {
        const lists = `<div class="lists">
                <li class="task1">
                      ${inputFieldvalue}
                </li>
                <li ><img class="add" src="/assests/complete.svg" alt="" srcset=""></li>
                <li ><img class="delete" src="/assests/delete.svg" alt="" srcset=""></li>

            </div>`;
        // console.log('add list');
        // console.log(inputField.value)
        todolist.innerHTML += lists;
        inputField.value = " ";
    }
    else {
        alert("Input cannot be null")
    }

}



const add = document.querySelector("#add").addEventListener("click", AddTodoList);



function setTodos(todos) {
    let todoList;
    if (localStorage.getItem("todoList") === null) {
        todoList = []
    }
    else {
        todoList = JSON.parse(localStorage.getItem("todoList"))

    }
    todoList.push(todos)
    localStorage.setItem("todoList", JSON.stringify(todoList))
    console.log(todoList)

}

function getTodos() {
    let todoList;
    if (localStorage.getItem("todoList") === null) {
        todoList = []
    }
    else {
        todoList = JSON.parse(localStorage.getItem("todoList"))

    }
    todoList.forEach((todos) => {
        console.log(todos)
        const lists = `<div class="lists">
        <li class="task1">
              ${todos}
        </li>
        <li ><img class="add" src="/assests/complete.svg" alt="" srcset=""></li>
        <li ><img class="delete" src="/assests/delete.svg" alt="" srcset=""></li>

    </div>`;
        todolist.innerHTML += lists;

    });


}
function removeTodo(todoText) {
    console.log(`Removing todo item: ${todoText}`);
    let todoList;
    if (localStorage.getItem("todoList") === null) {
      todoList = [];
    } else {
      todoList = JSON.parse(localStorage.getItem("todoList"));
    }
  
    const trimmedTodoText = todoText.trim(); // Trim whitespace characters
    const todoIndex = todoList.indexOf(trimmedTodoText);
    console.log(`Todo index: ${todoIndex}`);
    if (todoIndex !== -1) {
      todoList.splice(todoIndex, 1);
      console.log(`Todo item removed: ${todoList}`);
      localStorage.setItem("todoList", JSON.stringify(todoList));
      console.log(`Current todo list: ${todoList}`);
    } else {
      console.log(`Todo item not found in list`);
    }
  }
