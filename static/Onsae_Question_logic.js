function filter() {
    let search = document.getElementById("search_Question").value.toLowerCase();
    let listInner = document.getElementsByClassName("Question_Style");

    for (let i = 0; i < listInner.length; i++) {
        //city = listInner[i].getElementsByClassName("city");
        country = listInner[i].getElementsByClassName("QuestionText");
        if (country[0].innerHTML.toLowerCase().indexOf(search) != -1) {
        listInner[i].style.display = "flex"
        } else {
        listInner[i].style.display = "none"
        }
    }
}
var Mind = true, Health = true, Safe = true, Daily = true;

function checkMind(){
    Mind = !Mind;//토글버튼처럼 작동
    let con = document.getElementById("categoryBtn_M");
    if(Mind){
        con.style.backgroundColor = "lightcoral";
    } else {
        con.style.backgroundColor = "lightgrey";
    }
}
function checkHealth(){
    Health = !Health;//토글버튼처럼 작동
    let con = document.getElementById("categoryBtn_H");
    if(Health){
        con.style.backgroundColor = "yellowgreen";
    } else {
        con.style.backgroundColor = "lightgrey";
    }
}
function checkSafe(){
    Safe = !Safe;//토글버튼처럼 작동
    let con = document.getElementById("categoryBtn_S");
    if(Safe){
        con.style.backgroundColor = "red";
    } else {
        con.style.backgroundColor = "lightgrey";
    }
}
function checkDaily(){
    Daily = !Daily;//토글버튼처럼 작동
    let con = document.getElementById("categoryBtn_DL");
    if(Daily){
        con.style.backgroundColor = "sandybrown";
    } else {
        con.style.backgroundColor = "lightgrey";
    }
}