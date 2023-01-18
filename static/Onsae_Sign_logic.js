var LoginAccess = 0;//서버에서 
var ServerValue = "SDBG0112";//서버에서 받아오는 매니저 아이디값 저장 

async function login(){//로그인 버튼을 누르면 입력된 값을 받아오는 함수
    let ID = document.getElementById('Admin_Id').value;
    let PW = document.getElementById('Admin_Code').value;
    console.log("사용자 아이디: " + ID + "인증번호는: " + PW);
	var form = String({
		id : ID,
		password : PW
	});
	await axios.post('http://ec2-43-201-19-40.ap-northeast-2.compute.amazonaws.com/api/manager_login',{
        id :ID,
        password : PW
    }).then(function(response){
		LoginAccess = response.data;
	}).catch(function(err){
		console.log(err);
		alert('ERROR!');
	});
    
    if(is_Blank('Admin_Id') && is_Blank('Admin_Code')){
        //리턴값 LoginAccess에 저장 
        switch(LoginAccess){
            case 0://id틀림
                alert("존재하지 않는 아이디입니다.");
                document.getElementById('Admin_Id').style.borderColor = "red";
                break;
            case 1://로그인성공
                location.href= "./Onsae_Main_page.html";

                break;
            case 2://비밀번호 틀림
                alert("비밀번호가 틀렸습니다.");
                document.getElementById('Admin_Code').style.borderColor = "red";
                break;
            case 3://예상치 못한 오류
                alert("Error: Code 404 예상치 못한 오류입니다.");
                break;  
            default: 
                alert("Error: Code 418 I'm a teapot 커피는 믹스커피");
                break;
        }
        // if(LoginAccess){//로그인 성공값을 받아오면 로그인된 메인 화면으로 이동
        //     location.href= "./Onsae_Main_page.html";
        // }else{//실패시 실패메세지 전송
        //     alert("입력한 정보를 확인해주세요!");
        // }
    }
}

function signUp(){
    let Name = document.getElementById('name').value;
    let Belong = document.getElementById('company').value;
    let Phone = document.getElementById('phone_Num').value;
    let Address = document.getElementById('Address').value;


    if(is_Blank('name') && is_Blank('company') && is_Blank('phone_Num') && is_Blank('Address') && PasswordCheck()){
        if(NameCheck() && PhoneCheck()){
            console.log("이름: " + Name);
            console.log("소속: " + Belong);
            console.log("휴대전화: " + Phone);
            console.log("주소: "+ Address);
            //Console.log 자리에 서버와 통신
            if(confirm("생성된 매니저 아이디는 " + ServerValue + "입니다. 로그인하시겠습니까?")){
                location.href= "./Onsae_Main_page.html";
            }
            
        }
    }
}

function is_Blank(id){
    let Val = document.getElementById(id).value;
    if(Val == ""){
        alert("값이 정상적으로 입력되지 않았습니다");
        document.getElementById(id).style.borderColor = "red";
        return false;
    }else {
        document.getElementById(id).style.borderColor = "green";
        return true;
    }
}

function NameCheck(){//이름 형식이 맞는지 체크
    let Name = document.getElementById('name').value;
    let Exp_name = RegExp("[가-힣]{2,4}");
    let is_Name = Name.match(Exp_name);
    if(is_Name == null){
        document.getElementById('name').style.borderColor = "red";
        alert("이름을 제대로 입력해주세요");
        return false;
    } else {
        document.getElementById('name').style.borderColor = "green";
        return true;
    }
}

function PhoneCheck(){
    let Phone = document.getElementById('phone_Num').value;
    let Exp_phone = RegExp("[0-9]{3}[-][0-9]{4}[-][0-9]{4}");
    let is_phone = Phone.match(Exp_phone);

    if(is_phone == null){
        document.getElementById('phone_Num').style.borderColor = "red";
        alert("번호를 제대로 입력해주세요");
        return false;
    } else {
        document.getElementById('phone_Num').style.borderColor = "green";
        return  true;
    }
}

function PasswordCheck(){
    let PW = document.getElementById("password").value;
    let PW_check = document.getElementById("password_check").value;
    if(PW != PW_check){
        alert('비밀번호가 일치하지 않습니다!');
        document.getElementById("password").style.borderColor = "red";
        document.getElementById("password_check").style.borderColor = "red";
    } else {
        return true;
    }
    
}
