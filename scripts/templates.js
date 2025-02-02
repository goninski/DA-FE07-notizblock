function getNoteTemplate(indexNote, source){

    switch (source) {

        case 'active':
            buttons = `
            <button onclick="duplicateNote(${indexNote}, 'active')" title="Notiz duplizieren">
                <img src="assets/icons/google-copy.svg" alt="copy" class="icon-duplicate">
            </button>
            <button onclick="moveNote(${indexNote}, 'active', 'archive')" title="Notiz archivieren">
                <img src="assets/icons/google-inventory.svg" alt="archive" class="icon-archive">
            </button>
            <button onclick="moveNote(${indexNote}, 'active', 'trash')" title="Notiz löschen">
                <img src="assets/icons/google-delete.svg" alt="delete" class="icon-delete">
            </button>
            `
            break

        case 'archive':
            buttons = `
            <button onclick="moveNote(${indexNote}, 'archive', 'active')" title="Notiz reaktivieren">
                <img src="assets/icons/google-upload.svg" alt="restore"  class="icon-restore">
            </button>
            <button onclick="moveNote(${indexNote}, 'archive', 'trash')" title="Notiz löschen">
                <img src="assets/icons/google-delete.svg" alt="delete"  class="icon-delete">
            </button>
            `
            break

        case 'trash':
            buttons = `
            <button onclick="moveNote(${indexNote}, 'trash', 'active')" title="Notiz wiederherstellen">
                <img src="assets/icons/google-upload.svg" alt="restore" class="icon-restore">
            </button>
            <button onclick="moveNote(${indexNote}, 'trash', 'delete')" title="Notiz definitiv löschen">
                <img src="assets/icons/google-delete.svg" alt="delete" class="icon-delete">
            </button>
            `
            break
        }

    return `
    <div class="note flex-col">
        <h3>${notes[source + 'NoteTitles'][indexNote]}</h4>
        <p>${notes[source + 'NoteContents'][indexNote]}</p>
        <div class="buttons flex-row gap-05">
           ${buttons}
        </div>
    </div>
    `;
}

function getEmptyTemplate(source){
    switch (source) {
        case 'active':
            msg = 'Keine aktiven Notizen';
            break
        case 'archive':
            msg = 'Keine archivierten Notizen';
            break
        case 'trash':
            msg = 'Der Papierkorb ist leer';
            break
        }
    return `<p>${msg}</p>`;
}

// function getActiveNoteTemplate(indexNote){
//     return `
//     <div class="note flex-col">
//         <h3>${notes.activeNoteTitles[indexNote]}</h4>
//         <p>${notes.activeNoteContents[indexNote]}</p>
//         <div class="buttons flex-row gap-05">
//             <button onclick="duplicateNote(${indexNote}, 'active')" title="Notiz duplizieren">
//                 <img src="assets/icons/google-copy.svg" alt="copy" class="icon-duplicate">
//             </button>
//             <button onclick="moveNote(${indexNote}, 'active', 'archive')" title="Notiz archivieren">
//                 <img src="assets/icons/google-inventory.svg" alt="archive" class="icon-archive">
//             </button>
//             <button onclick="moveNote(${indexNote}, 'active', 'trash')" title="Notiz löschen">
//                 <img src="assets/icons/google-delete.svg" alt="delete" class="icon-delete">
//             </button>
//         </div>
//     </div>
//     `;
// }

// function getArchiveNoteTemplate(indexNote){
//     return `
//     <div class="note flex-col">
//         <h3>${notes.archiveNoteTitles[indexNote]}</h4>
//         <p>${notes.archiveNoteContents[indexNote]}</p>
//         <div class="buttons flex-row gap-05">
//             <button onclick="moveNote(${indexNote}, 'archive', 'active')" title="Notiz reaktivieren">
//                 <img src="assets/icons/google-upload.svg" alt="restore"  class="icon-restore">
//             </button>
//             <button onclick="moveNote(${indexNote}, 'archive', 'trash')" title="Notiz löschen">
//                 <img src="assets/icons/google-delete.svg" alt="delete"  class="icon-delete">
//             </button>
//         </div>
//     </div>
//     `;
// }

// function getTrashNoteTemplate(indexNote){
//     return `
//     <div class="note flex-col">
//         <h3>${notes.trashNoteTitles[indexNote]}</h4>
//         <p>${notes.trashNoteContents[indexNote]}</p>
//         <div class="buttons flex-row gap-05">
//             <button onclick="moveNote(${indexNote}, 'trash', 'active')" title="Notiz wiederherstellen">
//                 <img src="assets/icons/google-upload.svg" alt="restore" class="icon-restore">
//             </button>
//             <button onclick="moveNote(${indexNote}, 'trash', 'delete')" title="Notiz definitiv löschen">
//                 <img src="assets/icons/google-delete.svg" alt="delete" class="icon-delete">
//             </button>
//         </div>
//     </div>
//     `;
// }


// function getEmptyActiveTemplate(){
//     return `
//     <p>Keine aktiven Notizen</p>
//     `;
// }
// function getEmptyArchiveTemplate(){
//     return `
//     <p>Keine archivierte Notizen</p>
//     `;
// }
// function getEmptyTrashTemplate(){
//     return `
//     <p>Der Papierkorb ist leer</p>
//     `;
// }


