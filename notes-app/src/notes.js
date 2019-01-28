import uuidv4 from 'uuid/v4'
import moment from 'moment'

let notes = []

const loadNotes = () => {
    const notesJSON = localStorage.getItem('notes')
    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch(e) {
        // If the data in localStorage is broke and effect notesJSON, return an empty array to solve it
        return []
    }
}

// Save the notes to localStorage
const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// Expose notes from module
const getNotes = () => notes

const createNote = () => {
    const id = uuidv4()
    const timestamp = moment().valueOf()

    notes.push({
        id: id,
        title: '',
        body: '',
        createdAt: timestamp,
        updatedAt: timestamp
    })
    saveNotes()
    return id
}

// Remove a note from localStorage
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)

    if(noteIndex > -1) {
        notes.splice(noteIndex, 1)
        saveNotes()
    }
}

// Sort notes in one of the three ways in dropdown menu
const sortNotes = (sortBy) => {
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

const updateNote = (id, updates) => {
    const note = notes.find((note) => note.id === id)

    if(!note) {
        return 
    }

    if(typeof updates.title === 'string') {
        note.title = updates.title
        note.updatedAt = moment().valueOf()
    }

    if(typeof updates.body === 'string') {
        note.body = updates.body
        note.updatedAt = moment().valueOf()
    }

    saveNotes()
    return note
}

notes = loadNotes()

export { getNotes, createNote, removeNote, sortNotes, updateNote }