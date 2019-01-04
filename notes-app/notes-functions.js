// Read existing notes from localStorage
const getSavedNotes = function() {
    const notesJSON = localStorage.getItem('notes')
    if(notesJSON !== null) {
        return JSON.parse(notesJSON)
    } else {
        // Return empty array if there is no notes in localStorage
        return []
    }
}

// Save the notes to localStorage
const saveNotes = function(notes) {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// Generate DOM structure
const generateNoteDOM = function(note) {
    const noteEle = document.createElement('div')
    const textEle = document.createElement('span')
    const button = document.createElement('button')
    button.textContent = 'x'
    noteEle.appendChild(button)

    if(note.title.length > 0) {
        textEle.textContent = note.title
    }
    else {
        textEle.textContent = 'Unnamed Note'
    }
    noteEle.appendChild(textEle)

    return noteEle
}

// Render application notes
const renderNotes = function(notes, filters) {
    const filteredNotes = notes.filter(function(note) {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    document.querySelector('#notes').innerHTML = ''

    filteredNotes.forEach(function(note) {
        const noteEle = generateNoteDOM(note)
        document.querySelector('#notes').appendChild(noteEle)
    })
}