'use strict'

// Get todos
const getTodos = () => {
    const todoJSON = localStorage.getItem('todos')
   
    try {
        return todoJSON ? JSON.parse(todoJSON) : []
    } catch(e) {
        return []
    }
}

// Save todos to localStorage
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Remove a todo
const removeTodo = (id) =>  {
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if(todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

// Toggle the completed value of a todo
const toggleTodo = (id) => {
    const todoItem = todos.find((todo) => todo.id === id)

    if(todoItem) {
        todoItem.completed = !todoItem.completed
    }
}

// Render application todos based on filters
const renderTodos = (todos, filters) => {
    const todoEl = document.querySelector('#todos')
    const filteredTodos = todos.filter((todo) => {
        let searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        // I want to show todo only when the hide completed is not checked or that todo is not completed.
        let hideCompleteMatch = filters.hideCompleted && todo.completed
        // return those text match and not hide completed
        return searchTextMatch && !hideCompleteMatch
    })

    todoEl.innerHTML = ''
    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)

    todoEl.appendChild(generateSummary(incompleteTodos))

    if(filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => { 
            todoEl.appendChild(generateTodoDOM(todo))
        })
    } else {
        const noTodoMessage = document.createElement('p')
        noTodoMessage.textContent = 'No to-dos to show'
        noTodoMessage.classList.add('empty-message')
        todoEl.appendChild(noTodoMessage)
    }
    
}

// Get DOM elements for individual note
const generateTodoDOM = (todo) => {
    const todoEle = document.createElement('label')
    const containerEle = document.createElement('div')
    const checkEle = document.createElement('input')
    const textEle = document.createElement('span')
    const deleteBtn = document.createElement('button')

    // Set up check box
    checkEle.setAttribute('type', 'checkbox')
    checkEle.checked = todo.completed
    checkEle.addEventListener('change', () => {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
    containerEle.appendChild(checkEle)

    // Set up todo text
    if(todo.text.length > 0) {
        textEle.textContent = todo.text
    } else {
        textEle.textContent = 'Unnamed Todo'
    }
    containerEle.appendChild(textEle)

    // Set up container
    todoEle.classList.add('list-item')
    containerEle.classList.add('list-item__container')
    todoEle.appendChild(containerEle)

    deleteBtn.textContent = 'remove'
    deleteBtn.classList.add('button', 'button--text')
    deleteBtn.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
  
    todoEle.appendChild(deleteBtn)

    return todoEle
}

// Get the DOM elements for list summary
const generateSummary = (incompleteTodos) => {
    const summary = document.createElement('h2')
    summary.classList.add('list-title')
    let pluralTodo = incompleteTodos.length == 1 ? 'todo' : 'todos'
    
    summary.textContent = `You have ${incompleteTodos.length} ${pluralTodo} left`
    return summary
}