//사용자 정보확인창(modal) 초기 관련 세팅 담당

function CurrentTime(){//기본 시간 타임 세팅 함수
    let Today = new Date();
    let years = Today.getFullYear();
    let months = Today.getMonth() + 1;
    let dates = Today.getDate();
    if(months < 10)  months = "0" + months;
    if(dates < 10)  dates = "0" + dates;
    return years + "-" + months + "-" + dates;
}

function RequestTime(){//문진표 조회하기 위해 서버에 데이터 요청할때 쓰는 함수
    let Today = new Date();
    let years = Today.getFullYear();
    let months = Today.getMonth() + 1;
    let dates = Today.getDate();
    return years + "-" + months + "-" + dates;
}

function onClick(UserId) {//클릭하면 해당 사용자 데이터값 요청해서 모달창에 값을 표시
    document.getElementById('UserStatus_modal_bg').style.display ='block';//모달창 띄우기
    document.getElementById('UserStatus_modal_wrap').style.display ='block';
    
    let parent = document.getElementById("Modal_bar");//사용자 ID와 현재 날짜 세팅
    parent.innerText = UserId;
    let dateInp = document.createElement('input');
    dateInp.setAttribute('type', 'date');
    dateInp.setAttribute('id','Modal_bar_date');
    dateInp.setAttribute('value', eval("'" + CurrentTime() + "'"));
    parent.appendChild(dateInp);

    document.getElementById("Modal_bar_date").setAttribute('onchange', eval("'RequestData(`" + UserId + "`)'"));//RequestData('사용자1')
    RequestData(UserId);//오늘의 날짜에 해당하는 사용자 문진표 불러오기
} 
function offClick() {//
    document.getElementById('UserStatus_modal_bg').style.display ='none';
    document.getElementById('UserStatus_modal_wrap').style.display ='none';
}
function toggleBody(div_id){
    let con = document.getElementById(div_id + "_Body").style.display;
    if(con =="none"){
        document.getElementById(div_id + "_Body").style.display = "block";
    }else {
        document.getElementById(div_id + "_Body").style.display = "none";
    }
}
