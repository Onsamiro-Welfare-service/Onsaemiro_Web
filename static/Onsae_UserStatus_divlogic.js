/* 



//질문지 하나 = {
  time: "기록된 시간",
  title: "문진표 제목",
  Category_H: ["질문내용", "답변"],["질문내용", "답변"],["질문내용", "답변"]
  Category_S: ["질문내용", "답변"],["질문내용", "답변"],["질문내용", "답변"]
  Category_DL:["질문내용", "답변"],["질문내용", "답변"],["질문내용", "답변"]
  Category_M: ["질문내용", "답변"],["질문내용", "답변"],["질문내용", "답변"]
}

답변 불러오기:get
https://ec2-43-201-19-40.ap-northeast-2.compute.amazonaws.com/api/get_answer
{
    "id" : "dd", <- 사용자 ID(조회하고자 하는)
    "date" : "2023-1-13", <- 조회하고자 하는 날짜 (형식: YYYY:M(한자리일 경우 앞에 0 안붙임):D(똑같이 앞에 0 안붙임)
}

이걸로 요청하면


{
     DL_str: [[질문내용, 답변내용][질문내용, 답변내용]] ,
    H_str:  [[질문내용, 답변내용][질문내용, 답변내용]] ,
    M_str: [[질문내용, 답변내용][질문내용, 답변내용]] ,
   S_str: [[질문내용, 답변내용][질문내용, 답변내용]] 
}
*/
var Category_DL_Arr = [
  ["DL질문1", "DL답변1"],
  ["DL질문2", "DL답변2"],
  ["DL질문3", "DL답변3"],
  ["DL질문4", "DL답변4"]
];
var Category_S_Arr = [
  ["DL질문1", "DL답변1"],
  ["DL질문2", "DL답변2"],
  ["DL질문3", "DL답변3"],
  ["DL질문4", "DL답변4"]
];
var Category_M_Arr = [
  ["DL질문1", "DL답변1"],
  ["DL질문2", "DL답변2"],
  ["DL질문3", "DL답변3"],
  ["DL질문4", "DL답변4"]
];
var Category_H_Arr = [
  ["DL질문1", "DL답변1"],
  ["DL질문2", "DL답변2"],
  ["DL질문3", "DL답변3"],
  ["DL질문4", "DL답변4"]
];

function CurrentTime(){
  let Today = new Date();
  let years = Today.getFullYear();
  let months = Today.getMonth() + 1;
  let dates = Today.getDate();
  return years + "-" + months + "-" + dates;
}

function RequestData(UserId){//리퀘스트 값
  let Today_Date = CurrentTime();//날짜값
  document.getElementById("Modal_bar_date").value = Today_Date;

  let Api_Obj = new Object();
  Api_Obj.id = UserId;
  Api_Obj.date = Today_Date;
  Api_Obj.category = "DL";//DL S H M
  //Api요청
  //Category_DL_Arr = 받아오는 데이터

  Api_Obj.category = "S";
  //Api요청
  //Category_S_Arr = 받아오는 데이터

  Api_Obj.category = "H";
  //Api요청
  //Category_H_Arr = 받아오는 데이터

  Api_Obj.category = "M";
  //Api요청
  //Category_M_Arr = 받아오는 데이터
}

function setContent(){
  //문진표 상위 탭: 2023-1-12 문진표 답변
  let Today = document.getElementById("Modal_bar_date").value;
  document.getElementById("Answer1_Title").innerText = Today + " 문진표 답변";

  //문진표 상위 탭: 안전 건강 생활
  let categoryStr = "";
  if(Category_DL_Arr.length != 0){
    categoryStr += "일상 ";
  }
  if(Category_H_Arr.length != 0){
    categoryStr += "건강 ";
  }
  if(Category_M_Arr.length != 0){
    categoryStr += "마음 ";
  }
  if(Category_S_Arr.length != 0){
    categoryStr += "안전 ";
  }
  document.getElementById("Answer1_category").innerText = categoryStr;

  //문진표 카테고리 질문 답변 내용
  let parent = document.getElementById("Answer1_Content");
  if(parent.children.length != 0){//내용추가하기 전 기존 데이터가 있다면 초기화
    parent.innerHTML = "";
  }
  //여기서부터 Survey 내용만드는 콘텐트 생성 시작
  //Category_DL_Arr
//Category_S_Arr
//Category_H_Arr
//Category_M_Arr

}



function DailyLife(parent_val){//DL부분 만드는 함수 > html의 334~343줄까지 / 질의응답 갯수따라 증가
  let DLChild = document.createElement('div');
  DLChild.setAttribute('class', 'Survey_style');
  DLChild.setAttribute('style', 'margin-top: 20px;');
    for(let i=0;i< Category_DL_Arr.length; i++){//질문답변 배열 갯수에 맞춰 생성
      //질문내용 만드는 div
      //답변내용 만드는 div
      
    }
}
