// Get todos
const getTodos = function() {
    const todoJSON = localStorage.getItem('todos')
    
    if(todoJSON !== null) {
        return JSON.parse(todoJSON)
    }
    else {
        return []
    }
}

// Save todos to localStorage
const saveTodos = function(todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Render application todos based on filters
const renderTodos = function(todos, filters) {
    const filteredTodos = todos.filter(function(todo) {
        let searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        // I want to show todo only when the hide completed is not checked or that todo is not completed.
        let hideCompleteMatch = filters.hideCompleted && todo.completed
        // return those text match and not hide completed
        return searchTextMatch && !hideCompleteMatch
    })

    document.querySelector('#todos').innerHTML = ''
    const incompleteTodos = filteredTodos.filter(function (todo) {
        return !todo.completed
    })

    document.querySelector('#todos').appendChild(generateSummary(incompleteTodos))

    filteredTodos.forEach(function (todo) { 
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    })
}

// Get DOM elements for individual note
const generateTodoDOM = function(todo) {
    const todoEle = document.createElement('div')
    const checkEle = document.createElement('input')
    const textEle = document.createElement('span')
    const deleteBtn = document.createElement('button')
    checkEle.setAttribute('type', 'checkbox')
    deleteBtn.textContent = 'x'

    if(todo.text.length > 0) {
        textEle.textContent = todo.text
    } else {
        textEle.textContent = 'Unnamed Todo'
    }

    todoEle.appendChild(checkEle)
    todoEle.appendChild(textEle)
    todoEle.appendChild(deleteBtn)

    return todoEle
}

// Get the DOM elements for list summary
const generateSummary = function(incompleteTodos) {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    return summary
}