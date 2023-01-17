let toggleBtn = document.getElementById('toggle-btn');
let body = document.body;
let darkMode = localStorage.getItem('dark-mode');

const enableDarkMode = () =>{
    toggleBtn.classList.replace('fa-sun', 'fa-moon');
    body.classList.add('dark');
    localStorage.setItem('dark-mode', 'enabled');
}

const disableDarkMode = () =>{
    toggleBtn.classList.replace('fa-moon', 'fa-sun');
    body.classList.remove('dark');
    localStorage.setItem('dark-mode', 'disabled');
}

if(darkMode === 'enabled'){
    enableDarkMode();
}

toggleBtn.onclick = (e) =>{
    darkMode = localStorage.getItem('dark-mode');
    if(darkMode === 'disabled'){
        enableDarkMode();
    }else{
        disableDarkMode();
    }
}

let profile = document.querySelector('.header .flex .profile');

document.querySelector('#user-btn').onclick = () =>{
    profile.classList.toggle('active');
    search.classList.remove('active');
}

let search = document.querySelector('.header .flex .search-form');

document.querySelector('#search-btn').onclick = () =>{
    search.classList.toggle('active');
    profile.classList.remove('active');
}

let sideBar = document.querySelector('.side-bar');

document.querySelector('#menu-btn').onclick = () =>{
    sideBar.classList.toggle('active');
    body.classList.toggle('active');
}

document.querySelector('#close-btn').onclick = () =>{
    sideBar.classList.remove('active');
    body.classList.remove('active');
}

window.onscroll = () =>{
    profile.classList.remove('active');
    search.classList.remove('active');

    if(window.innerWidth < 1200){
        sideBar.classList.remove('active');
        body.classList.remove('active');
    }
}


const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const completed = document.querySelector('.completedOption')
const uncompleted = document.querySelector('.uncompletedOption')
const all = document.querySelector('.allOption')

const allTodos = [];

const addTodo = (event) => {
    // da ne se refresira stranata
    event.preventDefault();

    if (todoInput.value === "") {
        return;
    }

    const todoDivEl = document.createElement("div");
    todoDivEl.classList.add("todo");

    const liEl = document.createElement("li");
    liEl.innerHTML = todoInput.value;

    allTodos.push(todoInput.value);

    liEl.classList.add("todo-item");
    todoDivEl.appendChild(liEl);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDivEl.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDivEl.appendChild(trashButton);

    todoInput.value = "";
    todoList.appendChild(todoDivEl);
}

const deleteTodo = (event) => {
    const element = event.target;

    if (element.classList[0] === "trash-btn") {
        const todo = element.parentElement;
        todo.classList.add("fall");
        todo.addEventListener("transitionend", (e) => {
            todo.remove();
        });
    };

    if (element.classList[0] === "complete-btn") {
        const todo = element.parentElement;
        todo.classList.toggle("completed");
    }
}

const filterTodo = (event) => {
    const todos = todoList.childNodes;

    todos.forEach((todo) => {
        switch(event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    })
}

// events
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
completed.addEventListener("click", filterTodo);
uncompleted.addEventListener("click", filterTodo);
all.addEventListener("click", filterTodo);