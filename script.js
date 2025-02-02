
let notes = {
    "activeNoteTitles": [],
    "activeNoteContents": [],
    "archiveNoteTitles": [],
    "archiveNoteContents": [],
    "trashNoteTitles": [],
    "trashNoteContents": [],
}

let noteFieldKeys = ["Title", "Content"];
let noteFieldKey = "";
let fieldKey = "";
let fieldValue = "";
let notesSource = [];
let notesTarget = [];
// let location = "";

function addNote(location){
    let inputNoteTitles = document.getElementById('noteTitleInput').value;
    let inputNoteContents = document.getElementById('noteContentInput').value;
    if( inputNoteTitles && inputNoteContents ) {
        for (let i = 0; i < noteFieldKeys.length; i++) {
            noteFieldKey = noteFieldKeys[i];
            let inputKey = "note" + noteFieldKey + "Input";
            let input = document.getElementById(inputKey).value;
            fieldKey = location + "Note" + noteFieldKey + "s";
            notes[fieldKey].push(input);
            localStorage.setItem(fieldKey, JSON.stringify(notes[fieldKey]));
        }
        // renderActiveNotes();
        // inputNoteTitles.value = "";
        // inputNoteContents.value = "";
    }
}

function moveNote(indexNote, source, target){
    for (let i = 0; i < noteFieldKeys.length; i++) {
        noteFieldKey = noteFieldKeys[i];

        fieldKey = source + "Note" + noteFieldKey + "s";
        fieldValue = notes[fieldKey][indexNote];
        notes[fieldKey].splice(indexNote, 1);
        notesSource = notes[fieldKey];
        localStorage.setItem(fieldKey, JSON.stringify(notesSource));

        if(target != 'delete') {
            fieldKey = target + "Note" + noteFieldKey + "s";
            notes[fieldKey].push(fieldValue);
            notesTarget = notes[fieldKey];
            localStorage.setItem(fieldKey, JSON.stringify(notesTarget));
        }    
    }
    renderNotes(source, target, notesSource.lenght);
    // if( notesSource.length === 0 ) {
    //     if(source == 'archive') {
    //         showHideArchive();
    //     } else if(source == 'trash') {
    //         showHideTrash();
    //     }
    // }
}

function duplicateNote(indexNote, source){
    for (let i = 0; i < noteFieldKeys.length; i++) {
        noteFieldKey = noteFieldKeys[i];
        fieldKey = source + "Note" + noteFieldKey + "s";
        fieldValue = notes[fieldKey][indexNote];
        notes[fieldKey].push(fieldValue);
        notesSource = notes[fieldKey];
        localStorage.setItem(fieldKey, JSON.stringify(notesSource));
    }
    renderNotes(source, '--', 999);
}

function emptyTrash(){
    for (let i = 0; i < noteFieldKeys.length; i++) {
        fieldKey = "trashNote" + noteFieldKeys[i] + "s";
        notes[fieldKey] = [];
        localStorage.setItem(fieldKey, JSON.stringify(notes[fieldKey]));
    }
    renderNotes('trash', '--', 0);
    // showHideTrash();
}

function getFromLocalStorage(location, type){
    let stor = localStorage.getItem(location + "Note" + type);
    let obj = JSON.parse(stor);
    return obj;
}

function renderNotes(source = 'active', target = 'active', items){

    switch (true) {
        case source == 'active':
        case target == 'active':
            renderNotesDet('active');
            // renderActiveNotes();

        case source == 'archive':
            switch (items) {
                case 0:
                    showHideArchive()
                }
        case target == 'archive':
            renderNotesDet('archive');
            // renderArchiveNotes();

        case source == 'trash':
            switch (items) {
                case 0:
                    showHideTrash()
                }
        case target == 'trash':
        case target == 'delete':
            renderNotesDet('trash');
            // renderTrashNotes();
        }
}

function renderNotesDet(source){
    let notesRef = document.getElementById(source + 'Notes');
    notesRef.innerHTML = "";
    for (let i = 0; i < noteFieldKeys.length; i++) {
        noteFieldKey = noteFieldKeys[i];
        fieldKey = source + "Note" + noteFieldKey + "s";
        notes[fieldKey] = getFromLocalStorage(source, noteFieldKey);
    }
    if(notes[source + 'NoteTitles'] && notes[source + 'NoteTitles'].length > 0) {
        if(source != 'active') {
            document.getElementById(source + 'btn').dataset.items = notes[source + 'NoteTitles'].length;
        }
        for (let indexNote = 0; indexNote < notes[source + 'NoteTitles'].length; indexNote++) {
            notesRef.innerHTML += getNoteTemplate(indexNote, source);
        }
    } else {
        // notes.activeNoteTitles = [];
        // notes.activeNoteContents = [];
        notesRef.innerHTML = getEmptyTemplate(source);
    }
}

// function renderActiveNotes(){
//     let activeInnerRef = document.getElementById('activeNotes');
//     activeInnerRef.innerHTML = "";
//     notes.activeNoteTitles = getFromLocalStorage("active", "Titles");
//     notes.activeNoteContents = getFromLocalStorage("active", "Contents");
//     if(notes.activeNoteTitles && notes.activeNoteTitles.length > 0) {
//         for (let indexActiveNote = 0; indexActiveNote < notes.activeNoteTitles.length; indexActiveNote++) {
//             activeInnerRef.innerHTML += getActiveNoteTemplate(indexActiveNote);
//         }
//     } else {
//         notes.activeNoteTitles = [];
//         notes.activeNoteContents = [];
//         activeInnerRef.innerHTML = getEmptyActiveTemplate();
//     }
// }

// function renderArchiveNotes(){
//     let archiveInnerRef = document.getElementById('archiveNotes');
//     archiveInnerRef.innerHTML = "";
//     notes.archiveNoteTitles = getFromLocalStorage("archive", "Titles");
//     notes.archiveNoteContents = getFromLocalStorage("archive", "Contents");
//     if(notes.archiveNoteTitles && notes.archiveNoteTitles.length > 0) {
//         document.getElementById("btnArchive").dataset.items = notes.archiveNoteTitles.length;
//         for (let indexArchiveNote = 0; indexArchiveNote < notes.archiveNoteTitles.length; indexArchiveNote++) {
//            archiveInnerRef.innerHTML += getArchiveNoteTemplate(indexArchiveNote);
//         }
//     } else {
//         delete document.getElementById("btnArchive").dataset.items;
//         notes.archiveNoteTitles = [];
//         notes.archiveNoteContents = [];
//         archiveInnerRef.innerHTML = getEmptyArchiveTemplate();
//     }
// }

// function renderTrashNotes(){
//     let trashInnerRef = document.getElementById('trashNotes');
//     trashInnerRef.innerHTML = "";
//     notes.trashNoteTitles = getFromLocalStorage("trash", "Titles");
//     notes.trashNoteContents = getFromLocalStorage("trash", "Contents");
//     if(notes.trashNoteTitles && notes.trashNoteTitles.length > 0) {
//         document.getElementById("btnTrash").dataset.items = notes.trashNoteTitles.length;
//         document.getElementById("btnEmptyTrash").classList.remove("hide");
//         for (let indexTrashNote = 0; indexTrashNote < notes.trashNoteTitles.length; indexTrashNote++) {
//         trashInnerRef.innerHTML += getTrashNoteTemplate(indexTrashNote);
//         }
//     } else {
//         delete document.getElementById("trashBtn").dataset.items;
//         notes.trashNoteTitles = [];
//         notes.trashNoteContents = [];
//         trashInnerRef.innerHTML = getEmptyTrashTemplate();
//         document.getElementById("emptyTrashBtn").classList.add("hide");
//     }
// }

function showHideInput(){
    document.getElementById("inputBtn").classList.toggle("active");
    document.getElementById("inputSection").classList.toggle("active");
}

function showHideArchive(){
    document.getElementById("archiveBtn").classList.toggle("active");
    document.getElementById("archiveSection").classList.toggle("active");
    renderArchiveNotes();
    if(document.getElementById("archiveSection").classList.contains("active")) {
        document.getElementById("archiveSection").scrollIntoView();
    }
}

function showHideTrash(){
    document.getElementById("trashBtn").classList.toggle("active");
    document.getElementById("trashSection").classList.toggle("active");
    renderTrashNotes();
    if(document.getElementById("trashSection").classList.contains("active")) {
        document.getElementById("trashSection").scrollIntoView();
    }
}