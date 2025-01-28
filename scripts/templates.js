function getActiveNoteTemplate(indexActiveNote){
    return `
    <div class="note flex-col">
        <h3>${notes.activeNotesTitles[indexActiveNote]}</h4>
        <p>${notes.activeNotes[indexActiveNote]}</p>
        <div class="buttons flex-row gap-05">
            <button onclick="duplicateActiveNote(${indexActiveNote})" title="Notiz duplizieren">
                <img src="assets/icons/google-copy.svg" alt="copy" class="icon-duplicate">
            </button>
            <button onclick="archiveActiveNote(${indexActiveNote})" title="Notiz archivieren">
                <img src="assets/icons/google-inventory.svg" alt="archive" class="icon-archive">
            </button>
            <button onclick="deleteActiveNote(${indexActiveNote})" title="Notiz löschen">
                <img src="assets/icons/google-delete.svg" alt="delete" class="icon-delete">
            </button>
        </div>
    </div>
    `;
}

function getArchiveNoteTemplate(indexArchiveNote){
    return `
    <div class="note flex-col">
        <h3>${notes.archiveNotesTitles[indexArchiveNote]}</h4>
        <p>${notes.archiveNotes[indexArchiveNote]}</p>
        <div class="buttons flex-row gap-05">
            <button onclick="restoreArchiveNote(${indexArchiveNote})" title="Notiz reaktivieren">
                <img src="assets/icons/google-upload.svg" alt="restore"  class="icon-restore">
            </button>
            <button onclick="deleteArchiveNote(${indexArchiveNote})" title="Notiz löschen">
                <img src="assets/icons/google-delete.svg" alt="delete"  class="icon-delete">
            </button>
        </div>
    </div>
    `;
}

function getTrashNoteTemplate(indexTrashNote){
    return `
    <div class="note flex-col">
        <h3>${notes.trashNotesTitles[indexTrashNote]}</h4>
        <p>${notes.trashNotes[indexTrashNote]}</p>
        <div class="buttons flex-row gap-05">
            <button onclick="restoreTrashNote(${indexTrashNote})" title="Notiz wiederherstellen">
                <img src="assets/icons/google-upload.svg" alt="restore" class="icon-restore">
            </button>
            <button onclick="deleteTrashNote(${indexTrashNote})" title="Notiz definitiv löschen">
                <img src="assets/icons/google-delete.svg" alt="delete" class="icon-delete">
            </button>
        </div>
    </div>
    `;
}

function getEmptyActiveTemplate(){
    return `
    <p>Keine aktiven Notizen</p>
    `;
}
function getEmptyArchiveTemplate(){
    return `
    <p>Keine archivierte Notizen</p>
    `;
}
function getEmptyTrashTemplate(){
    return `
    <p>Der Papierkorb ist leer</p>
    `;
}


