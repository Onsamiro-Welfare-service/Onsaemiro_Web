/**질문 생성: post
http://ec2-43-201-19-40.ap-northeast-2.compute.amazonaws.com/api/create_question
{
    "category" :  카테고리 코드
    "type" :  답변 타입 (0: 선택지 2개, 1: 선택지 3개, 2: 선택지 10개 <- 나중에 확실히 정하면 될듯)
    "body" : 질문 내용
    "option" : 답변 내용 <- 프론트쪾에서 불러오기 쉬은 방식으로 만든 뒤 스트링으로 변환해서 보내주면 됨. 아마 JSON 배열 방식이 편하지 않을까 싶음
    “Photo” : 사진 <- 링크 필요한거 문제 답변 순서 순으로 배열 만들어서 업로드 하면 될듯? 이것도 프론트에서 편한 방식으로 규칙정해서 ㄱㄱㄱ 업로드만 스트링 방식이면 됨
} */
function filter() {
    let search = document.getElementById("search_Question").value.toLowerCase();
    let listInner = document.getElementsByClassName("Question_Style");

    for (let i = 0; i < listInner.length; i++) {
        //city = listInner[i].getElementsByClassName("city");
        if(listInner[i].value != false){
            Question = listInner[i].getElementsByClassName("QuestionText");
            if (Question[0].innerHTML.toLowerCase().indexOf(search) != -1) {
                listInner[i].style.display = "block"
            } else {
                listInner[i].style.display = "none"
            }
        }
        
    }
    is_Empty();
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
    Show_Question(Mind, "Mind");
}
function checkHealth(){
    Health = !Health;//토글버튼처럼 작동
    let con = document.getElementById("categoryBtn_H");
    if(Health){
        con.style.backgroundColor = "yellowgreen";
    } else {
        con.style.backgroundColor = "lightgrey";
    }
    Show_Question(Health, "Health");
}
function checkSafe(){
    Safe = !Safe;//토글버튼처럼 작동
    let con = document.getElementById("categoryBtn_S");
    if(Safe){
        con.style.backgroundColor = "red";
    } else {
        con.style.backgroundColor = "lightgrey";
    }
    Show_Question(Safe, "Safe");
}
function checkDaily(){
    Daily = !Daily;//토글버튼처럼 작동
    let con = document.getElementById("categoryBtn_DL");
    if(Daily){
        con.style.backgroundColor = "sandybrown";
    } else {
        con.style.backgroundColor = "lightgrey";
    }
    Show_Question(Daily, "DailyLife");
}

function Show_Question(bool, category){
    let con = document.getElementsByName(category);
    for(let i=0;i < con.length; i++){
        if(bool){
            con[i].style.display = "block";
            con[i].value = true;
        } else {
            con[i].style.display = "none";
            con[i].value = false;
        }     
    }
    is_Empty();
}

function is_Empty(){
    let listInner = document.getElementsByClassName("Question_Style");
    let is_Find = false;
    for(let i=0; i < listInner.length; i++){
        if(listInner[i].style.display == "block"){
            is_Find = true;
        }
    }

    if(!is_Find){
        document.getElementById("Empty_Question").style.display = "block";
    } else {
        document.getElementById("Empty_Question").style.display = "none";
    }
}

function openModal(){
    document.getElementById("Change_Info_Bg").style.display ='block';
    document.getElementById("Change_Info_modal").style.display ='block';
}
function closeModal(){
    document.getElementById("Change_Info_Bg").style.display ='none';
    document.getElementById("Change_Info_modal").style.display ='none';
}