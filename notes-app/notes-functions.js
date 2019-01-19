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
    const noteEle = document.createElement('div')
    const textEle = document.createElement('a')
    const button = document.createElement('button')
    button.textContent = 'x'
    noteEle.appendChild(button)
    button.addEventListener('click', () =>  {
        removeNote(note.id)
        saveNotes(notes)
        renderNotes(notes, filters)
    })

    if(note.title.length > 0) {
        textEle.textContent = note.title
    }
    else {
        textEle.textContent = 'Unnamed Note'
    }
 
    textEle.setAttribute('href', `/edit.html#${note.id}`)
    noteEle.appendChild(textEle)

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
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    document.querySelector('#notes').innerHTML = ''

    filteredNotes.forEach((note) => {
        const noteEle = generateNoteDOM(note)
        document.querySelector('#notes').appendChild(noteEle)
    })
}

// Get the last update time
const getLastUpdate = (timestamp) => `Last edited at ${moment(timestamp).fromNow()}.`