// Get todos
const getTodos = () => {
    const todoJSON = localStorage.getItem('todos')
    return todoJSON !== null ? JSON.parse(todoJSON) : []
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

    if(todoItem !== undefined) {
        todoItem.completed = !todoItem.completed
    }
}

// Render application todos based on filters
const renderTodos = (todos, filters) => {
    const filteredTodos = todos.filter((todo) => {
        let searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        // I want to show todo only when the hide completed is not checked or that todo is not completed.
        let hideCompleteMatch = filters.hideCompleted && todo.completed
        // return those text match and not hide completed
        return searchTextMatch && !hideCompleteMatch
    })

    document.querySelector('#todos').innerHTML = ''
    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)

    document.querySelector('#todos').appendChild(generateSummary(incompleteTodos))

    filteredTodos.forEach((todo) => { 
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    })
}

// Get DOM elements for individual note
const generateTodoDOM = (todo) => {
    const todoEle = document.createElement('div')
    const checkEle = document.createElement('input')
    const textEle = document.createElement('span')
    const deleteBtn = document.createElement('button')
    checkEle.setAttribute('type', 'checkbox')
    checkEle.checked = todo.completed
    checkEle.addEventListener('change', () => {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    deleteBtn.textContent = 'x'
    deleteBtn.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

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
const generateSummary = (incompleteTodos) => {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    return summary
}