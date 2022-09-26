let date = document.getElementById('date');
let noteTitle = document.getElementById('nTitle');
let textarea = document.getElementById('textArea');
let msg = document.getElementById('smg');
let showtext = document.getElementById('showText');
let searchtex = document.getElementById('search');
let select = document.getElementById('select');
let id = 0;
let data = [];
let backUpArr = [];

function Add() {
   if (noteTitle.value === "" ) {

      msg.innerHTML = 'Please Write Title ';

   } else{
      msg.innerHTML = "";
  
   storeData();
}
}

function storeData() {

   let myobj = {
      id: id++,
      date: (new Date()).toString(),
      noteTitle: noteTitle.value,
      textarea: textarea.value,

   }
   data.push(myobj);
   localStorage.setItem('data', JSON.stringify(data));

   displaydata(data);
}


let displaydata = (data, edit = false) => {
   showtext.innerHTML = "";
   data.map((x) => {
      // console.log(x);
      return (showtext.innerHTML +=

         `
         <span id="${x.id}"class="card text-bg-success mb-3" style="max-width: 18rem;">
                       
  <div class="card-header" style="color:black; font-size:18px" >Date: ${x.date}</div>
  <div>Select  Delete<input type= "checkbox"/></div>
  <div class="card-body">
    <h5 class="card-title" style="color:black; font-size:30px" >${x.noteTitle}</h5>
    <p class="card-text">${x.textarea}</p>
    <button type="button" id = "${x.id}" onclick = "deleteNote(this.id)" class="btn btn-primary">Delete</button>
    <button type="button" id="${x.id}" onclick = "editNote(this.id)" class="btn btn-danger">Edit</button>
  </div>
</span>`
      )

   });
   if (edit == false) {
      reset();
   }
};
function reset() {
   data.value = "";
   noteTitle.value = "";
   textarea.value = "";
}


function editNote(id) {
   let editid = data.filter((xd) => {
      return id == xd.id;
      
   })
   editid = editid[0];
   noteTitle.value = editid.noteTitle;
   textarea.value = editid.textarea;
   deleteNote(id, true);

}
function search() {
   let filter = searchtex.value;
   filter = filter.toUpperCase();
   let filterdata = data.filter((x) => x.noteTitle.toUpperCase().includes(filter));
   if(filterdata.length === 0) showtext.innerHTML = "No Data Found!!!";
   else{
      displaydata(filterdata);
   }
}
function sort() {
   let selectedValue = select.value;
   let storeData = JSON.parse(localStorage.getItem("data"))
   console.log(storeData);


   if (selectedValue == "name") {
      
      storeData.sort((a, b) => {
         if (a.textarea > b.textarea) { return 1; }
         else {
            return -1;
         }

      });
      console.log(storeData);
   }
   else if (selectedValue == "date") {
      storeData.sort((a, b) => {
         return a.date - b.date;
      });
      console.log(storeData);
   }
   else if (selectedValue == "title") {
      storeData.sort((a, b) => {
         if (a.noteTitle > b.noteTitle) { return 1; }
         else {
            return -1;
         }
      });
      console.log(storeData);
   }
   displaydata(storeData);
}
function deleteNote(id, edit) {
   let corfirmation = edit ==  true ? true :confirm ("Do You Want to Delete ");
   if(corfirmation){
   let notToBeDelete = data.filter((x) => {
      return id != x.id;

   });
   let backUpData = data.filter((x) => {
      return id == x.id;

   });
   localStorage.setItem('data', JSON.stringify(notToBeDelete));

   data = notToBeDelete;
   displaydata(data, edit);
   backUpStore(backUpData);
}
}
function backUpStore(backUpData) {
   backUpArr.push(backUpData);
   localStorage.setItem("backUpArr", JSON.stringify(backUpArr));
}


function backUp() {
   back_data = JSON.parse(localStorage.getItem("backUpArr"));
   // console.log(JSON.parse(back_data));
   let obj_arr = []
   for (var key in back_data) {
      if (back_data.hasOwnProperty(key)) {
         obj_arr.push(back_data[key][0]);
      }
   }
   displaydata(obj_arr);
}
function multipleDelete() {
   allDescription = showtext.children;
   let RemoveArr = [];
   for (note of allDescription) {
      let checkBox = note.children[1].children[0];
      //   console.log(checkBox);

      if (checkBox.checked) {
         RemoveArr.push(note.id);

      }
      //   console.log(RemoveArr);
   }
   for (let id of RemoveArr) deleteNote(id);

}








(() => {

    data = JSON.parse(localStorage.getItem("data")) || [];
    for (x of data) {
       if (id <= x.id) id = x.id + 1;
    }
    //  console.log(id);
    displaydata(data);
 })();

