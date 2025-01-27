
let activeNotesTitles = [];
let activeNotes = [];
let archiveNotesTitles = [];
let archiveNotes = [];
let trashNotesTitles = [];
let trashNotes = [];

function renderNotes(){
    renderActive();
    renderArchive();
    renderTrash();
}

function showHideInput(){
    document.getElementById("btnInput").classList.toggle("active");
    document.getElementById("input").classList.toggle("active");
}

function showHideArchive(){
    document.getElementById("btnArchive").classList.toggle("active");
    document.getElementById("archive").classList.toggle("active");
    renderArchive();
    if(document.getElementById("archive").classList.contains("active")) {
        document.getElementById("archive").scrollIntoView();
    }
}

function showHideTrash(){
    document.getElementById("btnTrash").classList.toggle("active");
    document.getElementById("trash").classList.toggle("active");
    renderTrash();
    if(document.getElementById("trash").classList.contains("active")) {
        document.getElementById("trash").scrollIntoView();
    }
}

function renderActive(){
    renderActiveNotes();
}

function renderArchive(){
    renderArchiveNotes();
}

function renderTrash(){
    renderTrashNotes();
}

function renderActiveNotes(){
    let activeInnerRef = document.getElementById('activeNotes');
    activeInnerRef.innerHTML = "";
    activeNotesTitles = getFromLocalStorage("active", "titles");
    activeNotes = getFromLocalStorage("active", "notes");
    if(activeNotesTitles && activeNotesTitles.length > 0) {
        for (let indexActiveNote = 0; indexActiveNote < activeNotesTitles.length; indexActiveNote++) {
            activeInnerRef.innerHTML += getActiveNoteTemplate(indexActiveNote);
        }
    } else {
        activeNotesTitles = [];
        activeNotes = [];
        activeInnerRef.innerHTML = getEmptyActiveTemplate();
    }
}

function renderArchiveNotes(){
    let archiveInnerRef = document.getElementById('archiveNotes');
    archiveInnerRef.innerHTML = "";
    archiveNotesTitles = getFromLocalStorage("archive", "titles");
    archiveNotes = getFromLocalStorage("archive", "notes");
    if(archiveNotesTitles && archiveNotesTitles.length > 0) {
        document.getElementById("btnArchive").dataset.items = archiveNotesTitles.length;
        for (let indexArchiveNote = 0; indexArchiveNote < archiveNotesTitles.length; indexArchiveNote++) {
           archiveInnerRef.innerHTML += getArchiveNoteTemplate(indexArchiveNote);
        }
    } else {
        delete document.getElementById("btnArchive").dataset.items;
        archiveNotesTitles = [];
        archiveNotes = [];
        archiveInnerRef.innerHTML = getEmptyArchiveTemplate();
    }
}

function renderTrashNotes(){
    let trashInnerRef = document.getElementById('trashNotes');
    trashInnerRef.innerHTML = "";
    trashNotesTitles = getFromLocalStorage("trash", "titles");
    trashNotes = getFromLocalStorage("trash", "notes");
    if(trashNotesTitles && trashNotesTitles.length > 0) {
        document.getElementById("btnTrash").dataset.items = trashNotesTitles.length;
        document.getElementById("btnEmptyTrash").classList.remove("hide");
        for (let indexTrashNote = 0; indexTrashNote < trashNotesTitles.length; indexTrashNote++) {
        trashInnerRef.innerHTML += getTrashNoteTemplate(indexTrashNote);
        }
    } else {
        delete document.getElementById("btnTrash").dataset.items;
        trashNotesTitles = [];
        trashNotes = [];
        trashInnerRef.innerHTML = getEmptyTrashTemplate();
        document.getElementById("btnEmptyTrash").classList.add("hide");
    }
}

function addActiveNote(){
    let noteTitleInput = document.getElementById('noteTitleInput').value;
    let noteInput = document.getElementById('noteInput').value;
    if( noteTitleInput && noteInput ) {
        activeNotesTitles.push(noteTitleInput);
        activeNotes.push(noteInput);
        saveToLocalStorage("active", activeNotesTitles, activeNotes);
        renderActiveNotes();
        noteTitleInput.value = "";
        noteInput.value = "";
    }
}

function duplicateActiveNote(indexActiveNote){
    let activeNoteTitle = activeNotesTitles[indexActiveNote];
    let activeNote = activeNotes[indexActiveNote];
    activeNotesTitles.push(activeNoteTitle);
    activeNotes.push(activeNote);
    saveToLocalStorage("active", activeNotesTitles, activeNotes);
    saveToLocalStorage("archive", archiveNotesTitles, archiveNotes);
    renderNotes();
}

function archiveActiveNote(indexActiveNote){
    let archiveNoteTitle = activeNotesTitles[indexActiveNote];
    let archiveNote = activeNotes[indexActiveNote];
    activeNotesTitles.splice(indexActiveNote, 1);
    activeNotes.splice(indexActiveNote, 1);
    archiveNotesTitles.push(archiveNoteTitle);
    archiveNotes.push(archiveNote);
    saveToLocalStorage("active", activeNotesTitles, activeNotes);
    saveToLocalStorage("archive", archiveNotesTitles, archiveNotes);
    renderNotes();
}

function deleteActiveNote(indexActiveNote){
    let trashNoteTitle = activeNotesTitles[indexActiveNote];
    let trashNote = activeNotes[indexActiveNote];
    activeNotesTitles.splice(indexActiveNote, 1);
    activeNotes.splice(indexActiveNote, 1);
    trashNotesTitles.push(trashNoteTitle);
    trashNotes.push(trashNote);
    saveToLocalStorage("active", activeNotesTitles, activeNotes);
    saveToLocalStorage("trash", trashNotesTitles, trashNotes);
    renderNotes();
}

function deleteArchiveNote(indexArchiveNote){
    let trashNoteTitle = archiveNotesTitles[indexArchiveNote];
    let trashNote = archiveNotes[indexArchiveNote];
    archiveNotesTitles.splice(indexArchiveNote, 1);
    archiveNotes.splice(indexArchiveNote, 1);
    trashNotesTitles.push(trashNoteTitle);
    trashNotes.push(trashNote);
    saveToLocalStorage("archive", archiveNotesTitles, archiveNotes);
    saveToLocalStorage("trash", trashNotesTitles, trashNotes);
    renderNotes();
    if( archiveNotesTitles.length === 0 ) {
        showHideArchive();
    }
}

function deleteTrashNote(indexTrashNote){
    trashNotesTitles.splice(indexTrashNote, 1);
    trashNotes.splice(indexTrashNote, 1);
    saveToLocalStorage("trash", trashNotesTitles, trashNotes);
    renderNotes();
    if( trashNotesTitles.length === 0 ) {
        showHideTrash();
    }
}

function restoreArchiveNote(indexArchiveNote){
    activeNotesTitles.push(archiveNotesTitles[indexArchiveNote]);
    activeNotes.push(archiveNotes[indexArchiveNote]);
    archiveNotesTitles.splice(indexArchiveNote, 1);
    archiveNotes.splice(indexArchiveNote, 1);
    saveToLocalStorage("active", activeNotesTitles, activeNotes);
    saveToLocalStorage("archive", archiveNotesTitles, archiveNotes);
    renderNotes();
    if( archiveNotesTitles.length === 0 ) {
        showHideArchive();
    }
}

function restoreTrashNote(indexTrashNote){
    activeNotesTitles.push(trashNotesTitles[indexTrashNote]);
    activeNotes.push(trashNotes[indexTrashNote]);
    trashNotesTitles.splice(indexTrashNote, 1);
    trashNotes.splice(indexTrashNote, 1);
    saveToLocalStorage("active", activeNotesTitles, activeNotes);
    saveToLocalStorage("trash", trashNotesTitles, trashNotes);
    renderNotes();
    if( trashNotesTitles.length === 0 ) {
        showHideTrash();
    }
}

function emptyTrash(){
    trashNotesTitles = [];
    trashNotes = [];
    saveToLocalStorage("trash", trashNotesTitles, trashNotes);
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
