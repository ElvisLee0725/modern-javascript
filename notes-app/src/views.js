import moment from 'moment'
import { getFilters } from './filters'
import { sortNotes, getNotes } from './notes'


// Generate DOM structure
const generateNoteDOM = (note) => {
    const noteEle = document.createElement('a')
    const textEle = document.createElement('p')
    const statusEle = document.createElement('p')

    if(note.title.length > 0) {
        textEle.textContent = note.title
    }
    else {
        textEle.textContent = 'Unnamed Note'
    }
    textEle.classList.add('list-item__title')
    noteEle.appendChild(textEle)

    noteEle.setAttribute('href', `/edit.html#${note.id}`)
    noteEle.classList.add('list-item')

    statusEle.textContent = getLastUpdate(note.updatedAt)
    statusEle.classList.add('list-item__subtitle')
    noteEle.appendChild(statusEle)

    return noteEle
}

// Render application notes
const renderNotes = () => {
    const notesEl = document.querySelector('#notes')
    const filters = getFilters()
    const notes = sortNotes(filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    notesEl.innerHTML = ''

    if(filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const noteEle = generateNoteDOM(note)
            notesEl.appendChild(noteEle)
        })
    }else {
        const emptyNotes = document.createElement('p')
        emptyNotes.classList.add('empty-message')
        emptyNotes.textContent = 'You have no notes.'
        notesEl.appendChild(emptyNotes)
    }
}

const initializeEditPage = (noteId) => {
    const titleElement = document.querySelector('#note-title')
    const bodyElement = document.querySelector('#note-body')
    const dateElement = document.querySelector('#last-edited')
    const notes = getNotes()
    const note = notes.find((n) => n.id === noteId)
    
    if(!note) {
        location.assign('/index.html')
    }
    
    titleElement.value = note.title
    bodyElement.value = note.body
    dateElement.textContent = getLastUpdate(note.updatedAt)
}

// Get the last update time
const getLastUpdate = (timestamp) => `Last edited at ${moment(timestamp).fromNow()}.`

export { generateNoteDOM, renderNotes, getLastUpdate, initializeEditPage }