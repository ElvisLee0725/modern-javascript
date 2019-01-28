import { initializeEditPage, getLastUpdate } from './views'
import { updateNote, removeNote } from './notes'

const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const removeElement = document.querySelector('#note-remove-btn')
const dateElement = document.querySelector('#last-edited')
const noteId = location.hash.substring(1)

initializeEditPage(noteId)

titleElement.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        title: e.target.value
    })
    dateElement.textContent = getLastUpdate(note.updatedAt)
})

bodyElement.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        body: e.target.value
    })
    dateElement.textContent = getLastUpdate(note.updatedAt)
})

removeElement.addEventListener('click', (e) => {
    removeNote(noteId)
    location.assign('/index.html')
})

// Update all tabs as long as the local storage data got updated
window.addEventListener('storage', (e) => {
    // The storage event has a key attribute with property 'notes'
    if(e.key === 'notes') {
        initializeEditPage(noteId)
    }
})