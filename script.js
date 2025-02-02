
let notes = {
    "activeNoteTitles": [],
    "activeNoteContent": [],
    "archiveNoteTitles": [],
    "archiveNoteContents": [],
    "trashNoteTitles": [],
    "trashNoteContents": [],
}

let noteKeys = ["Titles", "Content"];

function renderNotes(){
    renderActiveNotes();
    renderArchiveNotes();
    renderTrashNotes();
}

function showHideInput(){
    document.getElementById("btnInput").classList.toggle("active");
    document.getElementById("inputSection").classList.toggle("active");
}

function showHideArchive(){
    document.getElementById("btnArchive").classList.toggle("active");
    document.getElementById("archiveSection").classList.toggle("active");
    renderArchiveNotes();
    if(document.getElementById("archiveSection").classList.contains("active")) {
        document.getElementById("archiveSection").scrollIntoView();
    }
}

function showHideTrash(){
    document.getElementById("btnTrash").classList.toggle("active");
    document.getElementById("trashSection").classList.toggle("active");
    renderTrashNotes();
    if(document.getElementById("trashSection").classList.contains("active")) {
        document.getElementById("trashSection").scrollIntoView();
    }
}

function renderActiveNotes(){
    let activeInnerRef = document.getElementById('activeNotes');
    activeInnerRef.innerHTML = "";
    notes.activeNoteTitles = getFromLocalStorage("active", "Titles");
    notes.activeNoteContents = getFromLocalStorage("active", "Contents");
    if(notes.activeNoteTitles && notes.activeNoteTitles.length > 0) {
        for (let indexActiveNote = 0; indexActiveNote < notes.activeNoteTitles.length; indexActiveNote++) {
            activeInnerRef.innerHTML += getActiveNoteTemplate(indexActiveNote);
        }
    } else {
        notes.activeNoteTitles = [];
        notes.activeNoteContents = [];
        activeInnerRef.innerHTML = getEmptyActiveTemplate();
    }
}

function renderArchiveNotes(){
    let archiveInnerRef = document.getElementById('archiveNotes');
    archiveInnerRef.innerHTML = "";
    notes.archiveNoteTitles = getFromLocalStorage("archive", "Titles");
    notes.archiveNoteContents = getFromLocalStorage("archive", "Contents");
    if(notes.archiveNoteTitles && notes.archiveNoteTitles.length > 0) {
        document.getElementById("btnArchive").dataset.items = notes.archiveNoteTitles.length;
        for (let indexArchiveNote = 0; indexArchiveNote < notes.archiveNoteTitles.length; indexArchiveNote++) {
           archiveInnerRef.innerHTML += getArchiveNoteTemplate(indexArchiveNote);
        }
    } else {
        delete document.getElementById("btnArchive").dataset.items;
        notes.archiveNoteTitles = [];
        notes.archiveNoteContents = [];
        archiveInnerRef.innerHTML = getEmptyArchiveTemplate();
    }
}

function renderTrashNotes(){
    let trashInnerRef = document.getElementById('trashNotes');
    trashInnerRef.innerHTML = "";
    notes.trashNoteTitles = getFromLocalStorage("trash", "Titles");
    notes.trashNoteContents = getFromLocalStorage("trash", "Contents");
    if(notes.trashNoteTitles && notes.trashNoteTitles.length > 0) {
        document.getElementById("btnTrash").dataset.items = notes.trashNoteTitles.length;
        document.getElementById("btnEmptyTrash").classList.remove("hide");
        for (let indexTrashNote = 0; indexTrashNote < notes.trashNoteTitles.length; indexTrashNote++) {
        trashInnerRef.innerHTML += getTrashNoteTemplate(indexTrashNote);
        }
    } else {
        delete document.getElementById("btnTrash").dataset.items;
        notes.trashNoteTitles = [];
        notes.trashNoteContents = [];
        trashInnerRef.innerHTML = getEmptyTrashTemplate();
        document.getElementById("btnEmptyTrash").classList.add("hide");
    }
}

function addActiveNote(){
    let noteTitleInput = document.getElementById('noteTitleInput').value;
    let noteContentInput = document.getElementById('noteContentInput').value;
    if( noteTitleInput && noteContentInput ) {
        notes.activeNoteTitles.push(noteTitleInput);
        notes.activeNoteContents.push(noteContentInput);
        saveToLocalStorage("active", notes.activeNoteTitles, notes.activeNoteContents);
        // renderActiveNotes();
        noteTitleInput.value = "";
        noteContentInput.value = "";
    }
}

function duplicateActiveNote(indexActiveNote){
    let activeNoteTitle = notes.activeNoteTitles[indexActiveNote];
    let activeNoteContent = notes.activeNoteContents[indexActiveNote];
    notes.activeNoteTitles.push(activeNoteTitle);
    notes.activeNoteContents.push(activeNoteContent);
    saveToLocalStorage("active", notes.activeNoteTitles, notes.activeNoteContents);
    saveToLocalStorage("archive", notes.archiveNoteTitles, notes.archiveNoteContents);
    renderNotes();
}

function archiveActiveNote(indexActiveNote){
    let archiveNoteTitle = notes.activeNoteTitles[indexActiveNote];
    let archiveNoteContent = notes.activeNoteContents[indexActiveNote];
    notes.activeNoteTitles.splice(indexActiveNote, 1);
    notes.activeNoteContents.splice(indexActiveNote, 1);
    notes.archiveNoteTitles.push(archiveNoteTitle);
    notes.archiveNoteContents.push(archiveNoteContent);
    saveToLocalStorage("active", notes.activeNoteTitles, notes.activeNoteContents);
    saveToLocalStorage("archive", notes.archiveNoteTitles, notes.archiveNoteContents);
    renderNotes();
}

function deleteActiveNote(indexActiveNote){
    let trashNoteTitle = notes.activeNoteTitles[indexActiveNote];
    let trashNoteContent = notes.activeNoteContents[indexActiveNote];
    notes.activeNoteTitles.splice(indexActiveNote, 1);
    notes.activeNoteContents.splice(indexActiveNote, 1);
    notes.trashNoteTitles.push(trashNoteTitle);
    notes.trashNoteContents.push(trashNoteContent);
    saveToLocalStorage("active", notes.activeNoteTitles, notes.activeNoteContents);
    saveToLocalStorage("trash", notes.trashNoteTitles, notes.trashNoteContents);
    renderNotes();
}

function deleteArchiveNote(indexArchiveNote){
    let trashNoteTitle = notes.archiveNoteTitles[indexArchiveNote];
    let trashNoteContent = notes.archiveNoteContents[indexArchiveNote];
    notes.archiveNoteTitles.splice(indexArchiveNote, 1);
    notes.archiveNoteContents.splice(indexArchiveNote, 1);
    notes.trashNoteTitles.push(trashNoteTitle);
    notes.trashNoteContents.push(trashNoteContent);
    saveToLocalStorage("archive", notes.archiveNoteTitles, notes.archiveNoteContents);
    saveToLocalStorage("trash", notes.trashNoteTitles, notes.trashNoteContents);
    renderNotes();
    if( notes.archiveNoteTitles.length === 0 ) {
        showHideArchive();
    }
}

function deleteTrashNote(indexTrashNote){
    notes.trashNoteTitles.splice(indexTrashNote, 1);
    notes.trashNoteContents.splice(indexTrashNote, 1);
    saveToLocalStorage("trash", notes.trashNoteTitles, notes.trashNoteContents);
    renderNotes();
    if( notes.trashNoteTitles.length === 0 ) {
        showHideTrash();
    }
}

function restoreArchiveNote(indexArchiveNote){
    notes.activeNoteTitles.push(notes.archiveNoteTitles[indexArchiveNote]);
    notes.activeNoteContents.push(notes.archiveNoteContents[indexArchiveNote]);
    notes.archiveNoteTitles.splice(indexArchiveNote, 1);
    notes.archiveNoteContents.splice(indexArchiveNote, 1);
    saveToLocalStorage("active", notes.activeNoteTitles, notes.activeNoteContents);
    saveToLocalStorage("archive", notes.archiveNoteTitles, notes.archiveNoteContents);
    renderNotes();
    if( notes.archiveNoteTitles.length === 0 ) {
        showHideArchive();
    }
}

function restoreTrashNote(indexTrashNote){
    notes.activeNoteTitles.push(notes.trashNoteTitles[indexTrashNote]);
    notes.activeNoteContents.push(notes.trashNoteContents[indexTrashNote]);
    notes.trashNoteTitles.splice(indexTrashNote, 1);
    notes.trashNoteContents.splice(indexTrashNote, 1);
    saveToLocalStorage("active", notes.activeNoteTitles, notes.activeNoteContents);
    saveToLocalStorage("trash", notes.trashNoteTitles, notes.trashNoteContents);
    renderNotes();
    if( notes.trashNoteTitles.length === 0 ) {
        showHideTrash();
    }
}

function emptyTrash(){
    notes.trashNoteTitles = [];
    notes.trashNoteContents = [];
    saveToLocalStorage("trash", notes.trashNoteTitles, notes.trashNoteContents);
    renderNotes();
    showHideTrash();
}

function saveToLocalStorage(location, titles, notes){
    localStorage.setItem(location + "NoteTitles", JSON.stringify(titles));
    localStorage.setItem(location + "NoteContents", JSON.stringify(notes));
}

function getFromLocalStorage(location, type){
    let stor = localStorage.getItem(location + "Note" + type);
    let obj = JSON.parse(stor);
    return obj;
}
