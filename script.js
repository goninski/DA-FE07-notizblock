
let notes = {
    "activeNotesTitles": [],
    "activeNotes": [],
    "archiveNotesTitles": [],
    "archiveNotes": [],
    "trashNotesTitles": [],
    "trashNotes": [],
}

function renderNotes(){
    renderActiveNotes();
    renderArchiveNotes();
    renderTrashNotes();
}

function showHideInput(){
    document.getElementById("btnInput").classList.toggle("active");
    document.getElementById("input").classList.toggle("active");
}

function showHideArchive(){
    document.getElementById("btnArchive").classList.toggle("active");
    document.getElementById("archive").classList.toggle("active");
    renderArchiveNotes();
    if(document.getElementById("archive").classList.contains("active")) {
        document.getElementById("archive").scrollIntoView();
    }
}

function showHideTrash(){
    document.getElementById("btnTrash").classList.toggle("active");
    document.getElementById("trash").classList.toggle("active");
    renderTrashNotes();
    if(document.getElementById("trash").classList.contains("active")) {
        document.getElementById("trash").scrollIntoView();
    }
}

function renderActiveNotes(){
    let activeInnerRef = document.getElementById('activeNotes');
    activeInnerRef.innerHTML = "";
    notes.activeNotesTitles = getFromLocalStorage("active", "titles");
    notes.activeNotes = getFromLocalStorage("active", "notes");
    if(notes.activeNotesTitles && notes.activeNotesTitles.length > 0) {
        for (let indexActiveNote = 0; indexActiveNote < notes.activeNotesTitles.length; indexActiveNote++) {
            activeInnerRef.innerHTML += getActiveNoteTemplate(indexActiveNote);
        }
    } else {
        notes.activeNotesTitles = [];
        notes.activeNotes = [];
        activeInnerRef.innerHTML = getEmptyActiveTemplate();
    }
}

function renderArchiveNotes(){
    let archiveInnerRef = document.getElementById('archiveNotes');
    archiveInnerRef.innerHTML = "";
    notes.archiveNotesTitles = getFromLocalStorage("archive", "titles");
    notes.archiveNotes = getFromLocalStorage("archive", "notes");
    if(notes.archiveNotesTitles && notes.archiveNotesTitles.length > 0) {
        document.getElementById("btnArchive").dataset.items = notes.archiveNotesTitles.length;
        for (let indexArchiveNote = 0; indexArchiveNote < notes.archiveNotesTitles.length; indexArchiveNote++) {
           archiveInnerRef.innerHTML += getArchiveNoteTemplate(indexArchiveNote);
        }
    } else {
        delete document.getElementById("btnArchive").dataset.items;
        notes.archiveNotesTitles = [];
        notes.archiveNotes = [];
        archiveInnerRef.innerHTML = getEmptyArchiveTemplate();
    }
}

function renderTrashNotes(){
    let trashInnerRef = document.getElementById('trashNotes');
    trashInnerRef.innerHTML = "";
    notes.trashNotesTitles = getFromLocalStorage("trash", "titles");
    notes.trashNotes = getFromLocalStorage("trash", "notes");
    if(notes.trashNotesTitles && notes.trashNotesTitles.length > 0) {
        document.getElementById("btnTrash").dataset.items = notes.trashNotesTitles.length;
        document.getElementById("btnEmptyTrash").classList.remove("hide");
        for (let indexTrashNote = 0; indexTrashNote < notes.trashNotesTitles.length; indexTrashNote++) {
        trashInnerRef.innerHTML += getTrashNoteTemplate(indexTrashNote);
        }
    } else {
        delete document.getElementById("btnTrash").dataset.items;
        notes.trashNotesTitles = [];
        notes.trashNotes = [];
        trashInnerRef.innerHTML = getEmptyTrashTemplate();
        document.getElementById("btnEmptyTrash").classList.add("hide");
    }
}

function addActiveNote(){
    let noteTitleInput = document.getElementById('noteTitleInput').value;
    let noteInput = document.getElementById('noteInput').value;
    if( noteTitleInput && noteInput ) {
        notes.activeNotesTitles.push(noteTitleInput);
        notes.activeNotes.push(noteInput);
        saveToLocalStorage("active", notes.activeNotesTitles, notes.activeNotes);
        // renderActiveNotes();
        noteTitleInput.value = "";
        noteInput.value = "";
    }
}

function duplicateActiveNote(indexActiveNote){
    let activeNoteTitle = notes.activeNotesTitles[indexActiveNote];
    let activeNote = notes.activeNotes[indexActiveNote];
    notes.activeNotesTitles.push(activeNoteTitle);
    notes.activeNotes.push(activeNote);
    saveToLocalStorage("active", notes.activeNotesTitles, notes.activeNotes);
    saveToLocalStorage("archive", notes.archiveNotesTitles, notes.archiveNotes);
    renderNotes();
}

function archiveActiveNote(indexActiveNote){
    let archiveNoteTitle = notes.activeNotesTitles[indexActiveNote];
    let archiveNote = notes.activeNotes[indexActiveNote];
    notes.activeNotesTitles.splice(indexActiveNote, 1);
    notes.activeNotes.splice(indexActiveNote, 1);
    notes.archiveNotesTitles.push(archiveNoteTitle);
    notes.archiveNotes.push(archiveNote);
    saveToLocalStorage("active", notes.activeNotesTitles, notes.activeNotes);
    saveToLocalStorage("archive", notes.archiveNotesTitles, notes.archiveNotes);
    renderNotes();
}

function deleteActiveNote(indexActiveNote){
    let trashNoteTitle = notes.activeNotesTitles[indexActiveNote];
    let trashNote = notes.activeNotes[indexActiveNote];
    notes.activeNotesTitles.splice(indexActiveNote, 1);
    notes.activeNotes.splice(indexActiveNote, 1);
    notes.trashNotesTitles.push(trashNoteTitle);
    notes.trashNotes.push(trashNote);
    saveToLocalStorage("active", notes.activeNotesTitles, notes.activeNotes);
    saveToLocalStorage("trash", notes.trashNotesTitles, notes.trashNotes);
    renderNotes();
}

function deleteArchiveNote(indexArchiveNote){
    let trashNoteTitle = notes.archiveNotesTitles[indexArchiveNote];
    let trashNote = notes.archiveNotes[indexArchiveNote];
    notes.archiveNotesTitles.splice(indexArchiveNote, 1);
    notes.archiveNotes.splice(indexArchiveNote, 1);
    notes.trashNotesTitles.push(trashNoteTitle);
    notes.trashNotes.push(trashNote);
    saveToLocalStorage("archive", notes.archiveNotesTitles, notes.archiveNotes);
    saveToLocalStorage("trash", notes.trashNotesTitles, notes.trashNotes);
    renderNotes();
    if( notes.archiveNotesTitles.length === 0 ) {
        showHideArchive();
    }
}

function deleteTrashNote(indexTrashNote){
    notes.trashNotesTitles.splice(indexTrashNote, 1);
    notes.trashNotes.splice(indexTrashNote, 1);
    saveToLocalStorage("trash", notes.trashNotesTitles, notes.trashNotes);
    renderNotes();
    if( notes.trashNotesTitles.length === 0 ) {
        showHideTrash();
    }
}

function restoreArchiveNote(indexArchiveNote){
    notes.activeNotesTitles.push(notes.archiveNotesTitles[indexArchiveNote]);
    notes.activeNotes.push(notes.archiveNotes[indexArchiveNote]);
    notes.archiveNotesTitles.splice(indexArchiveNote, 1);
    notes.archiveNotes.splice(indexArchiveNote, 1);
    saveToLocalStorage("active", notes.activeNotesTitles, notes.activeNotes);
    saveToLocalStorage("archive", notes.archiveNotesTitles, notes.archiveNotes);
    renderNotes();
    if( notes.archiveNotesTitles.length === 0 ) {
        showHideArchive();
    }
}

function restoreTrashNote(indexTrashNote){
    notes.activeNotesTitles.push(notes.trashNotesTitles[indexTrashNote]);
    notes.activeNotes.push(notes.trashNotes[indexTrashNote]);
    notes.trashNotesTitles.splice(indexTrashNote, 1);
    notes.trashNotes.splice(indexTrashNote, 1);
    saveToLocalStorage("active", notes.activeNotesTitles, notes.activeNotes);
    saveToLocalStorage("trash", notes.trashNotesTitles, notes.trashNotes);
    renderNotes();
    if( notes.trashNotesTitles.length === 0 ) {
        showHideTrash();
    }
}

function emptyTrash(){
    notes.trashNotesTitles = [];
    notes.trashNotes = [];
    saveToLocalStorage("trash", notes.trashNotesTitles, notes.trashNotes);
    renderNotes();
    showHideTrash();
}

function saveToLocalStorage(location, titles, notes){
    localStorage.setItem(location + "NotesTitles", JSON.stringify(titles));
    localStorage.setItem(location + "Notes", JSON.stringify(notes));
}

function getFromLocalStorage(location, type){
    if(type == "titles") {
        type = "NotesTitles";
    } else {
        type = "Notes";
    }
    let stor = localStorage.getItem(location + type);
    let obj = JSON.parse(stor);
    return obj;
}
