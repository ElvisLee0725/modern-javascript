'use strict'

// Read existing notes from localStorage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')
    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch(e) {
        // If the data in localStorage is broke and effect notesJSON, return an empty array to solve it
        return []
    }
    
}

// Save the notes to localStorage
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// Remove a note from localStorage
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)

    if(noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

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

// Sort notes in one of the three ways in dropdown menu
const sortNotes = (notes, sortBy) => {
    if(sortBy === 'byEdited') {
        return notes.sort((a, b) => {
            if(a.updatedAt === b.updatedAt) {
                return 0
            }
            return a.updatedAt < b.updatedAt ? 1 : -1
        })
    }
    else if(sortBy === 'byCreated') {
        return notes.sort((a, b) => {
            if(a.createdAt === b.createdAt) {
                return 0
            }
            return a.createdAt < b.createdAt ? 1 : -1
        })
    }
    else if(sortBy === 'alphabetically') {
        return notes.sort((a, b) => {
            if(a.title.toLowerCase() === b.title.toLowerCase()) {
                return 0
            }
            return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1
        })
    }
    else {
        return notes
    }
}

// Render application notes
const renderNotes = (notes, filters) => {
    const notesEl = document.querySelector('#notes')
    notes = sortNotes(notes, filters.sortBy)
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

// Get the last update time
const getLastUpdate = (timestamp) => `Last edited at ${moment(timestamp).fromNow()}.`