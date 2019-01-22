"use strict";

document.addEventListener("DOMContentLoaded",init, false);

function displayTable(){
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8888/web_service/personne_service.php",true);
    xhr.responseType = "json";

    xhr.onload = function () {
        let container = document.getElementById("table-container");
        if (xhr.status === 200) {

            let personnes = xhr.response;
            let str = `
<table  class="table table-striped">
<tr >
<th>#</th>
<th>First Name</th>
<th>Last Name</th>
<th>Gender</th>
</tr>`;
        for(let pers of personnes){
          str=str.concat(` 
          <tr>
          <td>${pers.id}</td>
          <td>${pers.first_name}</td>
          <td>${pers.last_name}</td>
          <td>${pers.gender}</td>
          
</tr>`) ;
        }


            str.concat(`</table>`);

            container.innerHTML = str;
        } else {
            container.innerHTML = "<h2>OUPS y'a rien</h2>";
        }
    };
    xhr.send(null);
}
function addPersonne(pers , callback){
    let xhr = new XMLHttpRequest();

    xhr.open("POST", "http://localhost:8888/web_service/personne_service.php");
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.onload = function () {
        if (xhr.status !== 201) {
            console.log("un ange passe....");
        }
        callback();
    };
    xhr.send(JSON.stringify(pers));
}
function initForm(){
    let form = document.add_form;
    form.addEventListener("submit",function (e) {
        e.preventDefault();
        let firstName = form.first_name.value;
        let lastName = form.last_name.value;
        let gender = form.gender.value;
        let pers = {
            firstName: firstName,
            lastName: lastName,
            gender: gender
        };

        addPersonne(pers, displayTable);
        },false);



}
function init() {


    displayTable();
    initForm();
}

