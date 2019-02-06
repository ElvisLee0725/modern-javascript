'use strict'

const todos = getTodos()

const filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos, filters)

// Use filter to search keyword in Todos
document.querySelector('#todo-filter').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

// Add a todo
document.querySelector('#add-todo').addEventListener('submit', (e) => {
    e.preventDefault()
    const todoContent = e.target.elements.todoItem.value.trim()
    if(todoContent.length > 0) {
        todos.push({
            id: uuidv4(),
            text: todoContent,
            completed: false
        })
        saveTodos(todos)
        renderTodos(todos, filters)
    }
    
    e.target.elements.todoItem.value = ''
})

// Use checkbox to hide completed todos
document.querySelector('#hide-completed').addEventListener('change', (e) => {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})