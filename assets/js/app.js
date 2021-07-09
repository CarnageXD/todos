"use strict"

//Selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', controlButtonsInList)
filterOption.addEventListener('click', filterTodo)

//Functions
function addTodo(event) {
    //Preventing default behaviour by button click
    event.preventDefault()
    //Prevent void query
    if (todoInput.value) {
        //Todo DIV with nested elements 
        const todoDiv = document.createElement('div')
        todoDiv.classList.add("todo")
        //Create list-item
        const newTodo = document.createElement('li')
        newTodo.innerText = todoInput.value
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)
        //ADD TODO TO LOCALSTORAGE
        saveLocalTodos(todoInput.value)
        //CHECK MARK BUTTON
        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add('complete-btn')
        todoDiv.appendChild(completedButton)
        //CHECK TRASH BUTTON
        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add('trash-btn')
        todoDiv.appendChild(trashButton)
        //finnaly attend to list (ul)
        todoList.appendChild(todoDiv)

        //Clear Todo Input Value
        todoInput.value = ''
    }
}

function controlButtonsInList(e) {
    const item = e.target;
    //DELETE TODO
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        //Animation
        todo.classList.add('fall')
        removeLocalTodos(todo)
        addEventListener('transitionend', () => todo.remove())
    }

    //Toggle state of button
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement
        todo.classList.toggle('completed')
    }
}

function filterTodo(e) {
    //take node and hide\show by condition
    const todos = todoList.childNodes;
    todos.forEach(todo => {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex'
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    })
}


function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else todos = JSON.parse(localStorage.getItem('todos'))

    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
    //CHECK --- Do I have thing in there?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else todos = JSON.parse(localStorage.getItem('todos'))

    todos.forEach(todo => {
        //Todo DIV with nested elements 
        const todoDiv = document.createElement('div')
        todoDiv.classList.add("todo")
        //Create list-item
        const newTodo = document.createElement('li')
        newTodo.innerText = todo
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)
        //CHECK MARK BUTTON
        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add('complete-btn')
        todoDiv.appendChild(completedButton)
        //CHECK TRASH BUTTON
        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add('trash-btn')
        todoDiv.appendChild(trashButton)
        //finnaly attend to list (ul)
        todoList.appendChild(todoDiv)
    })
}

function removeLocalTodos(todo) {
    //CHECK --- Do I have thing in there?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else todos = JSON.parse(localStorage.getItem('todos'))

    const todosIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todosIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}