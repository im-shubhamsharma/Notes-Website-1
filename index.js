let notesObj = [];
showNotes();

let addBtn = document.getElementById("addBtn");


// ----------Add Notes---------
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myArr = {'title': addTitle.value,
               'txt': addTxt.value 
              };
  notesObj.push(myArr);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
  console.log(notesObj);
  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    let notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html = "";
  notesObj.forEach(function (element, index) {
    html += `<div class="notes">
            <h2>${element.title}</h2>
            <p style="margin: 10px 0;">${element.txt}</p>
            <button class="btn" id="${index}" onclick="deleteNote(this.id)">Delete</button>
            </div>`;
  });

  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Please Enter a note using 'Add Note' option above`;
  }
}

// ----------Delete Notes---------

function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();

}

// ----------Search Notes---------
let search = document.getElementById('search');
search.addEventListener('input', function(){
   let inputVal = search.value.toLowerCase();
   let noteCard = document.getElementsByClassName('notes')
   Array.from(noteCard).forEach(function(element){
    let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
    let cardTxt2 = element.getElementsByTagName("h2")[0].innerText.toLowerCase();
    let searchVal = cardTxt + cardTxt2;
    if (searchVal.includes(inputVal)){
        element.style.display = "flex";
    }
    else{
     element.style.display = "none";
    }
   }); 
});

