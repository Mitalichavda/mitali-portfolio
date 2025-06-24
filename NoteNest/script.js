const addBtn = document.getElementById('addBtn');
const noteInput = document.getElementById('noteInput');
const notesContainer = document.getElementById('notesContainer');

// Load notes on page load
window.onload = loadNotes;

function loadNotes() {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.forEach(note => renderNote(note.text, note.done));
}

function addNote() {
  const noteText = noteInput.value.trim();
  if (noteText === '') return alert('Please enter a note!');
  renderNote(noteText);
  saveNote(noteText, false);
  noteInput.value = '';
}

function renderNote(text, isDone = false) {
  const col = document.createElement('div');
  col.className = 'col-md-4 note-col';

  const card = document.createElement('div');
  card.className = `card ${isDone ? 'border-success' : ''}`;

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body d-flex flex-column';

  const noteContent = document.createElement('p');
  noteContent.className = `card-text flex-grow-1 ${isDone ? 'text-success text-decoration-line-through' : ''}`;
  noteContent.innerText = text;

  const btnGroup = document.createElement('div');
  btnGroup.className = 'btn-group mt-2';

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-sm btn-danger';
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.onclick = () => {
    col.remove();
    deleteNote(text);
  };

  // Edit button
  const editBtn = document.createElement('button');
  editBtn.className = 'btn btn-sm btn-warning';
  editBtn.innerHTML = '<i class="fas fa-edit"></i>';
  editBtn.onclick = () => {
    const newText = prompt('Edit your note:', noteContent.innerText);
    if (newText) {
      updateNote(text, newText);
      noteContent.innerText = newText;
    }
  };

  // Done toggle button
  const doneBtn = document.createElement('button');
  doneBtn.className = 'btn btn-sm btn-success';
  doneBtn.innerHTML = '<i class="fas fa-check"></i>';
  doneBtn.onclick = () => {
    const done = !noteContent.classList.contains('text-decoration-line-through');
    noteContent.classList.toggle('text-decoration-line-through');
    noteContent.classList.toggle('text-success');
    card.classList.toggle('border-success');
    markAsDone(text, done);
  };

  btnGroup.appendChild(editBtn);
  btnGroup.appendChild(doneBtn);
  btnGroup.appendChild(deleteBtn);

  cardBody.appendChild(noteContent);
  cardBody.appendChild(btnGroup);
  card.appendChild(cardBody);
  col.appendChild(card);
  notesContainer.appendChild(col);
}

// LocalStorage helpers
function saveNote(text, done) {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.push({ text, done });
  localStorage.setItem('notes', JSON.stringify(notes));
}

function deleteNote(text) {
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes = notes.filter(note => note.text !== text);
  localStorage.setItem('notes', JSON.stringify(notes));
}

function updateNote(oldText, newText) {
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes = notes.map(note => note.text === oldText ? { ...note, text: newText } : note);
  localStorage.setItem('notes', JSON.stringify(notes));
}

function markAsDone(text, done) {
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes = notes.map(note => note.text === text ? { ...note, done } : note);
  localStorage.setItem('notes', JSON.stringify(notes));
}

addBtn.addEventListener('click', addNote);

const toggle = document.getElementById('darkModeToggle');

toggle.addEventListener('change', () => {
  document.body.classList.toggle('bg-dark');
  document.body.classList.toggle('text-white');
  document.querySelector('footer').classList.toggle('bg-light');
  document.querySelector('footer').classList.toggle('text-dark');
});


doneBtn.style.color = '#FFAA0F';
