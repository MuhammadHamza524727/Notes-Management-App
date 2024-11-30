document.addEventListener("DOMContentLoaded", () => {
    const noteForm = document.getElementById("noteForm");
    const notesContainer = document.getElementById("notesContainer");

    // Load existing notes
    const loadNotes = () => {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        notesContainer.innerHTML = "";
        notes.forEach((note, index) => {
            const noteCard = document.createElement("div");
            noteCard.className = "note-card";
            noteCard.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.description}</p>
                <button onclick="deleteNote(${index})">Delete</button>
            `;
            notesContainer.appendChild(noteCard);
        });
    };

    // Add a new note
    noteForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("noteTitle").value.trim();
        const description = document.getElementById("noteDescription").value.trim();
        if (title && description) {
            const notes = JSON.parse(localStorage.getItem("notes")) || [];
            notes.push({ title, description });
            localStorage.setItem("notes", JSON.stringify(notes));
            loadNotes();
            noteForm.reset();
        } else {
            alert("Both fields are required.");
        }
    });

    // Delete a note
    window.deleteNote = (index) => {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        loadNotes();
    };

    loadNotes();
});
