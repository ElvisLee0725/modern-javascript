// Deconstruct an object
const todo = {
    id: 'adfsasfasfdas',
    text: 'Pay Credit card',
    completed: false
}

const { text: todoText, completed, detail = 'No details attached', ...others } = todo

console.log(todoText)
console.log(completed)
console.log(detail)
console.log(others) // Use the rest operator to grab the rest, which is 'id'

// Deconstruct an array
const age = [65, 21, 12, 4]
const [seniorAge, adultAge, ...otherAges] = age

console.log(seniorAge)
console.log(adultAge)
console.log(otherAges)

// Destructure in a function:
const printTodo = ({text, completed}) => {
    console.log(`${text}: ${completed}`)
}

printTodo(todo)