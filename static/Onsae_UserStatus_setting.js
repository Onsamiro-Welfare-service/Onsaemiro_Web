function onClick(UserId) {//클릭하면 해당 사용자 데이터값 요청해서 모달창에 값을 표시
    document.getElementById("Modal_bar").innerText = UserId;
    document.getElementById("Modal_bar_date").value = CurrentTime();
    document.getElementById("Modal_bar_date").setAttribute('onclick', eval("'RequestData(`" + UserId + "`)'"));//RequestData('사용자1')
    RequestData(UserId);//오늘의 날짜에 해당하는 사용자 문진표 불러오기
    document.querySelector('.modal_wrap').style.display ='block';
    document.querySelector('.black_bg').style.display ='block';
}   
function offClick() {//
    document.querySelector('.modal_wrap').style.display ='none';
    document.querySelector('.black_bg').style.display ='none';
}
function toggleBody(div_id){
    let con = document.getElementById(div_id + "_Body").style.display;
    if(con =="none"){
        document.getElementById(div_id + "_Body").style.display = "block";
    }else {
        document.getElementById(div_id + "_Body").style.display = "none";
    }
}