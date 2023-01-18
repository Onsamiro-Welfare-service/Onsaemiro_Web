function modal(div_id) {
    //document.getElementById(div_id).addEventListener('click', onClick);
    //document.querySelector('.modal_close').addEventListener('click', offClick);
}
function onClick() {//클릭하면 해당 사용자 데이터값 요청해서 모달창에 값을 표시
document.querySelector('.modal_wrap').style.display ='block';
document.querySelector('.black_bg').style.display ='block';
}   
function offClick() {//
document.querySelector('.modal_wrap').style.display ='none';
document.querySelector('.black_bg').style.display ='none';
}