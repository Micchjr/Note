document.getElementById('addNote_id').addEventListener('click', addNote);


function addNote() {
    const title = document.getElementById('note_title').value;
    const body = document.getElementById('note_body').value;
    const summary = document.getElementById('note_summary').value;

    let date = new Date();
    timestamp = date.getTime();

    note = {
        'id': timestamp,
        'title': title,
        'body': body,
        'summary': summary,
    }


    // so now,we try checking if there has been any note saved at first by geting the note from the local storage..
    let stored_notes = localStorage.getItem('notes');


    // so we now use the conditionals to tell it what to do if there is any notes or not..
    if (stored_notes == null || stored_notes == undefined) {
        // this means there is no notes,then..

        // then we create an empty array so as to be able to push in the note object once we have a note..
        stored_notes = [];
        stored_notes.push(note);

        // then we stringfy so as to be able to read it in the browser..
        stored_notes = JSON.stringify(stored_notes);
        localStorage.setItem('notes',stored_notes);

        alert('New note Added');

        //get the notes from localStorage
        getSavedNotes()
    } else {

        stored_notes = JSON.parse(stored_notes);

        stored_notes.push(note)

        localStorage.setItem('notes', JSON.stringify(stored_notes));

        alert("New Note Created!");

        //get the notes from localStorage
        getSavedNotes();

    }

}


function getSavedNotes(){

    //get the notes from localStorage 
   const stored_notes = JSON.parse(localStorage.getItem('notes'));

    code = `<div>`;

   for(let i = 0; i < stored_notes.length; i++){

        code += `<div style='border: 2px solid black; padding-left: 10px; padding-bottom: 10px;'>
                <h5>${stored_notes[i]['title']}</h5>
                <p>${stored_notes[i]['body']}</p>
                <small><a href='#' onclick='return openUpdateForm(${stored_notes[i]['id']})'>Update</a> | <a href='#' onclick='return deleteNote()'>Delete</a></small>
                </div>`;
   }

   code += `</div>`;

   document.getElementById('saved_notes_id').innerHTML = code;


}

function openUpdateForm(id){

     const stored_notes = JSON.parse(localStorage.getItem('notes'));

    let note = null;
     for (let i = 0; i < stored_notes.length; i++){
         if(stored_notes[i]['id'] == id){
             note = stored_notes[i];
             break;
         }
     }

     console.log("This is the note: ", note);

    updateForm = `
    <h3>Update Note</h3>
    <div class="note_title">
    <input type="text" id="note_title_new" placeholder="Title" value='${note['title']}'> <br> <br>
    </div>

    <div class="note_body">
        <textarea name="" id="note_body_new" cols="30" rows="6" placeholder="Body">${note['body']}</textarea> <br> <br>
    </div>

    <div class="note_summary">
        <textarea name="" id="note_summary_new" cols="30" rows="5" placeholder="Summary">${note['summary']}</textarea> <br> <br>
    </div>

    <div class="submit">
        <button type="button" onclick="updateNote(${note['id']})">Update Note</button>
    </div>
            
    `;
    document.getElementById('create_note_id').innerHTML =  updateForm;
}


function updateNote(id){
    new_title = document.getElementById('note_title_new').value;
    new_body = document.getElementById('note_body_new').value;
    new_summary = document.getElementById('note_summary_new').value; 

    let stored_notes = JSON.parse(localStorage.getItem('notes'));

    new_note = {
        'title': new_title, 
        'body': new_body, 
        'summary': new_summary,
        id: id
    }

    for (let i = 0; i < stored_notes.length; i++){

        if(stored_notes[i]['id'] == id){

            stored_notes[i] = new_note;
            
            localStorage.setItem('notes', JSON.stringify(stored_notes));

            alert("Note updated");

            break;


        }


    }


    getSavedNotes();

    
}