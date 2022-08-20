// console.log('Welcome to notes app');
showNotes();
// If user adds note,add it in localstorage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function () {
    let addTxt = document.getElementById('addTxt');
    let addheading = document.getElementById('addheading');
    let notes = localStorage.getItem('notes');
    let headings = localStorage.getItem('headings');
    if (notes == null && headings == null) {
        notesObj = [];
        headingsObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
        headingsObj = JSON.parse(headings);
    }
    notesObj.push(addTxt.value);
    headingsObj.push(addheading.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("headings", JSON.stringify(headingsObj));
    addTxt.value = "";
    addheading.value = "";
    // console.log(notesObj);
    showNotes();
});

// function to show notes
function showNotes() {
    let notesObj;
    let headingsObj;
    let notes = localStorage.getItem('notes');
    let headings = localStorage.getItem('headings');
    if (notes == null && headings == null) {
        notesObj = [];
        headingsObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
        headingsObj = JSON.parse(headings);
    }
    let html = "";
    // notesObj.forEach(function (element, index) {
    //     html += `
    //     <div class="card my-2 mx-4 notesCard" style="width: 18rem;">
    //     <div class="card-body">
    //         <h5 class="card-title">Notes-${index + 1}</h5>
    //         <p class="card-text">${element}</p>
    //         <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
    //     </div>
    // </div>
    //     `;
    // });
    for (let index = 0; index < headingsObj.length; index++) {
        const headings = headingsObj[index];
        const element = notesObj[index];
        html += `
        <div class="card my-2 mx-4 notesCard" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${headings}</h5>
                <p class="card-text">${element}</p>
                <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
        </div>
            `;
    }
    notesEle = document.getElementById('notes');
    if (notesObj.length != 0 && headingsObj.length!=0) {
        notesEle.innerHTML = html;
    }
    else {
        notesEle.innerHTML = `Nothing to Show! Use "Add a Note" to add notes.`;
    }
}

// function to delete notes
function deleteNote(index) {
    // console.log("deleting" + index);
    let notesObj;
    let headingsObj;   
    let notes = localStorage.getItem('notes');
    let headings = localStorage.getItem('headings');
    if (notes == null && headings == null) {
        notesObj = [];
        headingsObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
        headingsObj = JSON.parse(headings);
    }
    notesObj.splice(index, 1);
    headingsObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("headings", JSON.stringify(headingsObj));
    showNotes();
}

// Search 
let search = document.getElementById('searchTxt');
search.addEventListener('input', function () {
    inputval = search.value;
    // console.log("input event fired",inputval);
    noteCards = document.getElementsByClassName('notesCard');
    Array.from(noteCards).forEach(function (element) {
        let cardText = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        let cardhead = element.getElementsByTagName("h5")[0].innerText.toLowerCase();
        // console.log(cardText);
        if (cardText.includes(inputval.toLowerCase()) || cardhead.includes(inputval.toLowerCase())) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });
});
// 1.Add Title
// 2.Add important button
// 3.separate notes by user
// 4.host it