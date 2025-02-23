let notes = {
    "activeNoteTitles": [],
    "activeNoteContents": [],
    "archiveNoteTitles": [],
    "archiveNoteContents": [],
    "trashNoteTitles": [],
    "trashNoteContents": [],
};

let noteFieldKeys = ["Title", "Content"];
let noteFieldKey = "";
let notesSource = [];
let notesTarget = [];

function init() {
    renderLocation();
    // setHomeURL();
}

function addNote(target){
    let inputNoteTitle = document.getElementById('inputNoteTitle').value;
    let inputNoteContent = document.getElementById('inputNoteContent').value;
    if( inputNoteTitle && inputNoteContent ) {
        for (let i = 0; i < noteFieldKeys.length; i++) {
            noteFieldKey = noteFieldKeys[i];
            let inputKey = "inputNote" + noteFieldKey;
            let fieldValue = document.getElementById(inputKey).value;
            let fieldKey = target + "Note" + noteFieldKey + "s";
            notes[fieldKey].push(fieldValue);
            notesTarget = notes[fieldKey];
            saveToLocalStorage(fieldKey, notesTarget);
        }
        renderLocation(target, '--');
    }
}

function moveNote(indexNote, source, target){
    for (let i = 0; i < noteFieldKeys.length; i++) {
        noteFieldKey = noteFieldKeys[i];
        let fieldKey = source + "Note" + noteFieldKey + "s";
        let fieldValue = notes[fieldKey][indexNote];
        notes[fieldKey].splice(indexNote, 1);
        notesSource = notes[fieldKey];
        saveToLocalStorage(fieldKey, notesSource);
        if(target != 'delete') {
            moveNoteToTarget(noteFieldKey, fieldValue, target);
        }    
    }
    renderLocation(source, target);
    if(notesSource.length <= 0) {
        showHideLocation(source);
    }
}

function moveNoteToTarget(noteFieldKey, fieldValue, target) {
    fieldKey = target + "Note" + noteFieldKey + "s";
    notes[fieldKey].push(fieldValue);
    notesTarget = notes[fieldKey];
    saveToLocalStorage(fieldKey, notesTarget);
}

function duplicateNote(indexNote, source){
    for (let i = 0; i < noteFieldKeys.length; i++) {
        noteFieldKey = noteFieldKeys[i];
        let fieldKey = source + "Note" + noteFieldKey + "s";
        let fieldValue = notes[fieldKey][indexNote];
        notes[fieldKey].push(fieldValue);
        notesSource = notes[fieldKey];
        saveToLocalStorage(fieldKey, notesSource);
    }
    renderLocation(source);
}

function emptyTrash(){
    for (let i = 0; i < noteFieldKeys.length; i++) {
        let fieldKey = "trashNote" + noteFieldKeys[i] + "s";
        notes[fieldKey] = [];
        saveToLocalStorage(fieldKey, notes[fieldKey]);
    }
    renderLocation('trash');
    showHideLocation('trash');
}

function getFromLocalStorage(source, fieldKey){
    let stor = localStorage.getItem(source + "Note" + fieldKey + "s");
    let obj = JSON.parse(stor);
    return obj;
}

function saveToLocalStorage(fieldKey, fieldContent){
    localStorage.setItem(fieldKey, JSON.stringify(fieldContent));
}

function renderLocation(source = 'active', target = '---'){
    switch (true) {
        case source == 'active':
        case target == 'active':
            renderNotes('active');

        case source == 'archive':
        case target == 'archive':
            renderNotes('archive');

        case source == 'trash':
        case target == 'trash':
        case target == 'delete':
            renderNotes('trash');
        }
}

function renderNotes(location){
    let notesRef = document.getElementById(location + 'Notes');
    notesRef.innerHTML = "";
    for (let i = 0; i < noteFieldKeys.length; i++) {
        noteFieldKey = noteFieldKeys[i];
        let fieldKey = location + "Note" + noteFieldKey + "s";
        let storedNotes = getFromLocalStorage(location, noteFieldKey);
        if(storedNotes){
            notes[fieldKey] = storedNotes;
        }
    }
    if(notes[location + 'NoteTitles'] && notes[location + 'NoteTitles'].length > 0) {
        if(location != 'active') {
            document.getElementById(location + 'Btn').dataset.items = notes[location + 'NoteTitles'].length;
        }
        for (let indexNote = 0; indexNote < notes[location + 'NoteTitles'].length; indexNote++) {
            notesRef.innerHTML += getNoteTemplate(indexNote, location);
        }
    } else {
        notesRef.innerHTML = getEmptyTemplate(location);
        if(location != 'active') {
            delete document.getElementById(location + 'Btn').dataset.items;
        }
    }
}

function showHideLocation(location){
    if(location == 'active') { return; }
    document.getElementById(location + "Btn").classList.toggle("active");
    document.getElementById(location + "Section").classList.toggle("active");
    renderLocation(location);
    scrollToLocation(location);
}

function scrollToLocation(location) {
    if(document.getElementById(location + "Section").classList.contains("active")) {
        document.getElementById(location + "Section").scrollIntoView();
    }
}

function setHomeURL() {
    let url = new URL(window.location.href);
    let homeURL = url;
    switch(url.hostname) {
        case "127.0.0.1":
            homeURL = url.origin + '/' + url.pathname.split("/")[1];
            break
        case "francois-gonin.developerakademie.net":
            homeURL = url.origin + '/' + url.pathname.split("/")[1] + '/' + url.pathname.split("/")[2];
            break
        default:
            homeURL = '/';
    }
    document.querySelector('.js-set-home-url').href = homeURL;
}