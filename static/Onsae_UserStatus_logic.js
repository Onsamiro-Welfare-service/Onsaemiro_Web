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

//2023/03/13
async function Delete_User(UserId){// 사용자 삭제 : Post 
    // http://apionsaemiro.site/api/delete_user
    if(confirm("[경고!]" + UserId + " 사용자를 삭제하시겠습니까?")){
        await axios.post('http://apionsaemiro.site/api/delete_user', {
            id: UserId
        }).then(function(res){
            console.log(res);
        }).catch((err)=>{
            console.log(err)
        });

        offClick();//창닫기
        window.location.reload();//새로고침
    }	
}
//var LoginCode_test = "";
async function Inquire_LoginCode(UserId){
    await axios.get("http://apionsaemiro.site/api/get_user_code",{
        params :{
            id: UserId  
        }
    }).then(function(response) {
        alert('로그인 코드는 [' + response.data[0].code + '] 입니다!');
        //LoginCode_test = response.data;
        console.log(response.data[0].code);
    })
    .catch((error) => {
            console.log(error);  
    });
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

    //2023/03/13
    let LoginBtn = document.createElement('input');
    LoginBtn.setAttribute('type', 'button');
    LoginBtn.setAttribute('id', 'Inpuire_LoginCode_btn');
    LoginBtn.setAttribute('class', 'Userprofile_btn LoginCode_btn');
    LoginBtn.setAttribute('value', '로그인코드');
    LoginBtn.setAttribute('onclick', eval("'Inquire_LoginCode(`" + UserId + "`)'"));
    parent.appendChild(LoginBtn);

    let DeleteUserBtn = document.createElement('input'); 
    DeleteUserBtn.setAttribute('type', 'button');
    DeleteUserBtn.setAttribute('id', 'Delete_User_btn');
    DeleteUserBtn.setAttribute('class', 'Userprofile_btn DeleteUser_btn');
    DeleteUserBtn.setAttribute('value', '사용자삭제');
    DeleteUserBtn.setAttribute('onclick', eval("'Delete_User(`" + UserId + "`)'"));
    parent.appendChild(DeleteUserBtn);

    document.getElementById("Modal_bar_date").setAttribute('onchange', eval("'RequestData(`" + UserId + "`)'"));//RequestData('사용자1')
    //RequestData(UserId);//오늘의 날짜에 해당하는 사용자 문진표 불러오기
    RequestData(UserId);
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
