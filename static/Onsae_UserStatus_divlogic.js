//사용자 정보확인창(modal)의 문진표 요청 및 결과 정보 표시 담당
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
    "category": "DL"
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
  ["S질문1", "S답변1"],
  ["S질문2", "S답변2"],
  ["S질문3", "S답변3"],
  ["S질문4", "S답변4"]
];
var Category_M_Arr = [
  ["M질문1", "M답변1"],
  ["M질문2", "M답변2"],
  ["M질문3", "M답변3"],
  ["M질문4", "M답변4"]
];
var Category_H_Arr = [
  ["H질문1", "H답변1"],
  ["H질문2", "H답변2"],
  ["H질문3", "H답변3"],
  ["H질문4", "H답변4"]
];



function RequestData(UserId){//리퀘스트 값
  //let Today_Date = RequestTime();//날짜값
  let Api_Obj = new Object();
  Api_Obj.id = UserId;
  Api_Obj.date = document.getElementById("Modal_bar_date").value;
  Api_Obj.category = "DL";//DL S H M
  //console.log("RequestData(" + UserId + "):");
  //console.log(Api_Obj);
  Request_UserStatus_Api(Api_Obj);
  //Category_DL_Arr = 받아오는 데이터

  Api_Obj.category = "S";
  Request_UserStatus_Api(Api_Obj);
  //Category_S_Arr = 받아오는 데이터

  Api_Obj.category = "H";
  Request_UserStatus_Api(Api_Obj);
  //Category_H_Arr = 받아오는 데이터

  Api_Obj.category = "M";
  Request_UserStatus_Api(Api_Obj);
  //Category_M_Arr = 받아오는 데이터

  setContent();
}

function Request_UserStatus_Api(Obj){
  //console.log("문진표 조회하기" + Obj.id + " " + Obj.date + " " + Obj.category);
  /*답변 불러오기:get
  https://ec2-43-201-19-40.ap-northeast-2.compute.amazonaws.com/api/get_answer
  {
    "id" : "dd", <- 사용자 ID(조회하고자 하는)
    "date" : "2023-1-13", <- 조회하고자 하는 날짜 (형식: YYYY:M(한자리일 경우 앞에 0 안붙임):D(똑같이 앞에 0 안붙임)
    "category" : "DL" <-카테고리 코드
  }*/
  let Return_val = [""];// = 요청해서 받아온 값 할당
  return Return_val;
}

function setContent(){
  //문진표 상위 탭: 2023-1-12 문진표 답변
  let Today = document.getElementById("Modal_bar_date").value;
  document.getElementById("Answer_Title").innerText = Today + " 문진표 답변";

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
  document.getElementById("Answer_category").innerText = categoryStr;

  //문진표 카테고리 질문 답변 내용
  let parent = document.getElementById("Answer_Content");
  if(parent.children.length != 0){//내용추가하기 전 기존 데이터가 있다면 초기화
    parent.innerHTML = "";
  }
  //여기서부터 Survey 내용만드는 콘텐트 생성 시작
  
  DailyLifeSurvey(parent);//Category_DL_Arr Div 생성함수
  SafeSurvey(parent);//Category_S_Arr Div 생성함수
  HealthSurvey(parent);//Category_H_Arr Div 생성함수
  MindSurvey(parent);//Category_M_Arr Div 생성함수
}



function DailyLifeSurvey(parent_val){//DL부분 만드는 함수 / 질의응답 갯수따라 증가
  if(Category_DL_Arr.length != 0){
    let DLChild = document.createElement('div');
    DLChild.setAttribute('class', 'Survey_style');
    DLChild.setAttribute('style', 'margin-top: 20px;');
      let DL_title = document.createElement('div');
      let DL_title_str = document.createTextNode('일상');
      DL_title.setAttribute('id', 'Answer_DailyLifeDiv');
      DL_title.setAttribute('class', 'Category_Icon');
      DL_title.setAttribute('style', 'border: 2px solid #fd7e14; color: #fd7e14;');
      DL_title.appendChild(DL_title_str);
      DLChild.appendChild(DL_title);
      for(let i=0;i< Category_DL_Arr.length; i++){//질문답변 배열 갯수에 맞춰 생성
        let Question = document.createElement('div');//질문내용 만드는 div
        let Q_str = document.createTextNode(Category_DL_Arr[i][0]);//질문내용
        Question.setAttribute('id', eval("'Answer_DL_Question" + i + "'"));
        Question.setAttribute('class', 'Answer_Question');
        Question.appendChild(Q_str);
        DLChild.appendChild(Question);
        
        let Reply = document.createElement('div');//답변내용 만드는 div
        let R_str = document.createTextNode(Category_DL_Arr[i][1]);//답변내용
        Reply.setAttribute('id', eval("'Answer_DL_Reply" + i + "'"));
        Reply.setAttribute('class', 'Answer_Reply');
        Reply.appendChild(R_str);
        DLChild.appendChild(Reply);
      }
    parent_val.appendChild(DLChild);//위에 생성된 모든 항목 부모요소에 편입
  }
} 

function SafeSurvey(parent_val){//Safe부분 만드는 함수 / 질의응답 갯수따라 증가
  if(Category_S_Arr.length != 0){
    let S_Child = document.createElement('div');
    S_Child.setAttribute('class', 'Survey_style');
    S_Child.setAttribute('style', 'margin-top: 20px;');
      let S_title = document.createElement('div');
      let S_title_str = document.createTextNode('안전');
      S_title.setAttribute('id', 'Answer_DailyLifeDiv');
      S_title.setAttribute('class', 'Category_Icon');
      S_title.setAttribute('style', 'border: 2px solid #FF2626; color: #FF2626;');
      S_title.appendChild(S_title_str);
      S_Child.appendChild(S_title);
      for(let i=0;i< Category_S_Arr.length; i++){//질문답변 배열 갯수에 맞춰 생성
        let Question = document.createElement('div');//질문내용 만드는 div
        let Q_str = document.createTextNode(Category_S_Arr[i][0]);//질문내용
        Question.setAttribute('id', eval("'Answer_S_Question" + i + "'"));
        Question.setAttribute('class', 'Answer_Question');
        Question.appendChild(Q_str);
        S_Child.appendChild(Question);
        
        let Reply = document.createElement('div');//답변내용 만드는 div
        let R_str = document.createTextNode(Category_S_Arr[i][1]);//답변내용
        Reply.setAttribute('id', eval("'Answer_S_Reply" + i + "'"));
        Reply.setAttribute('class', 'Answer_Reply');
        Reply.appendChild(R_str);
        S_Child.appendChild(Reply);
      }
    parent_val.appendChild(S_Child);//위에 생성된 모든 항목 부모요소에 편입
  }
} 

function HealthSurvey(parent_val){//Health부분 만드는 함수 / 질의응답 갯수따라 증가
  if(Category_H_Arr.length != 0){
    let H_Child = document.createElement('div');
    H_Child.setAttribute('class', 'Survey_style');
    H_Child.setAttribute('style', 'margin-top: 20px;');
      let H_title = document.createElement('div');
      let H_title_str = document.createTextNode('건강');
      H_title.setAttribute('id', 'Answer_DailyLifeDiv');
      H_title.setAttribute('class', 'Category_Icon');
      H_title.setAttribute('style', 'border: 2px solid #007944; color: #007944;');
      H_title.appendChild(H_title_str);
      H_Child.appendChild(H_title);
      for(let i=0;i< Category_H_Arr.length; i++){//질문답변 배열 갯수에 맞춰 생성
        let Question = document.createElement('div');//질문내용 만드는 div
        let Q_str = document.createTextNode(Category_H_Arr[i][0]);//질문내용
        Question.setAttribute('id', eval("'Answer_H_Question" + i + "'"));
        Question.setAttribute('class', 'Answer_Question');
        Question.appendChild(Q_str);
        H_Child.appendChild(Question);
        
        let Reply = document.createElement('div');//답변내용 만드는 div
        let R_str = document.createTextNode(Category_H_Arr[i][1]);//답변내용
        Reply.setAttribute('id', eval("'Answer_H_Reply" + i + "'"));
        Reply.setAttribute('class', 'Answer_Reply');
        Reply.appendChild(R_str);
        H_Child.appendChild(Reply);
      }
    parent_val.appendChild(H_Child);//위에 생성된 모든 항목 부모요소에 편입
  }
} 

function MindSurvey(parent_val){//Mind부분 만드는 함수 / 질의응답 갯수따라 증가
  if(Category_M_Arr.length != 0){
    let M_Child = document.createElement('div');
    M_Child.setAttribute('class', 'Survey_style');
    M_Child.setAttribute('style', 'margin-top: 20px;');
      let M_title = document.createElement('div');
      let M_title_str = document.createTextNode('마음');
      M_title.setAttribute('id', 'Answer_DailyLifeDiv');
      M_title.setAttribute('class', 'Category_Icon');
      M_title.setAttribute('style', 'border: 2px solid #F35588; color: #F35588;');
      M_title.appendChild(M_title_str);
      M_Child.appendChild(M_title);
      for(let i=0;i< Category_M_Arr.length; i++){//질문답변 배열 갯수에 맞춰 생성
        let Question = document.createElement('div');//질문내용 만드는 div
        let Q_str = document.createTextNode(Category_M_Arr[i][0]);//질문내용
        Question.setAttribute('id', eval("'Answer_M_Question" + i + "'"));
        Question.setAttribute('class', 'Answer_Question');
        Question.appendChild(Q_str);
        M_Child.appendChild(Question);
        
        let Reply = document.createElement('div');//답변내용 만드는 div
        let R_str = document.createTextNode(Category_M_Arr[i][1]);//답변내용
        Reply.setAttribute('id', eval("'Answer_M_Reply" + i + "'"));
        Reply.setAttribute('class', 'Answer_Reply');
        Reply.appendChild(R_str);
        M_Child.appendChild(Reply);
      }
    parent_val.appendChild(M_Child);//위에 생성된 모든 항목 부모요소에 편입
  }
} 
