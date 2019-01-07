const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const removeElement = document.querySelector('#note-remove-btn')
const dateElement = document.querySelector('#last-edited')
const noteId = location.hash.substring(1)
let notes = getSavedNotes()
let note = notes.find(function(n) {
    return n.id === noteId
})

if(note === undefined) {
    location.assign('/index.html')
}

titleElement.value = note.title
bodyElement.value = note.body
dateElement.textContent = getLastUpdate(note.updatedAt)

titleElement.addEventListener('input', function(e) {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = getLastUpdate(note.updatedAt)
    saveNotes(notes)
})

bodyElement.addEventListener('input', function(e) {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = getLastUpdate(note.updatedAt)
    saveNotes(notes)
})

removeElement.addEventListener('click', function(e) {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/index.html')
})

// Update all tabs as long as the local storage data got updated
window.addEventListener('storage', function(e) {
    // The storage event has a key attribute with property 'notes'
    if(e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        note = notes.find(function(n) {
            return n.id === noteId
        })

        if(note === undefined) {
            location.assign('/index.html')
        }

        titleElement.value = note.title
        bodyElement.value = note.body
        dateElement.textContent = getLastUpdate(note.updatedAt)
    }
})