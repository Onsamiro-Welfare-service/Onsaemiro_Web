//사용자 프로필 추가하고 서버에 등록 
var AddUser = {//새로운 사용자 데이터 저장 객체
    Name: "",
    birth: "",
    address: "",
    AdminId: ""
    /*Picture: ""*/
};

function Add_Profile(){//사용자 프로필 추가하기 버튼을 누르면 실행
    document.getElementById('Add_Profile_bg').style.display ='block';
    document.getElementById('Add_Profile_wrap').style.display ='block';
}



/*function showImage() {//프로필 사진 파일을 올리면 미리 볼 수 있게 하는 함수
    var newImage = document.getElementById('image-show').lastElementChild;
    
    //이미지는 화면에 나타나고
    newImage.style.visibility = "visible";
}
function loadFile(input) {//프로필 사진 파일 넣는 함수
    var file = input.files[0];	//선택된 파일 가져오기

  	//새로운 이미지 div 추가
    let newImage = document.getElementById('Profile_picture');
    
    //이미지 source 가져오기
    newImage.src = URL.createObjectURL(file);   
    newImage.style.visibility = "hidden";   //버튼을 누르기 전까지는 이미지를 숨긴다
    newImage.style.objectFit = "contain";

    //이미지 source 사용자 객체에 저장
    AddUser.Picture = URL.createObjectURL(file); 

    //이미지를 image-show div에 추가
    var container = document.getElementById('image-show');
    container.appendChild(newImage);

    showImage();//업로드 된 프로필 미리 보기
};*/

function saveBtn(){//사용자를 추가하는 함수
    AddUser.Name = document.getElementById("Profile_name").value;//사용자 이름
    AddUser.birth = document.getElementById("Profile_birth").value;//사용자 생년월일
    AddUser.address = document.getElementById("Profile_address").value;//사용자 주소
    AddUser.AdminId = "관리자Id";//로그인되어 있는 값을 받아와서 여기에 할당

    //서버에 등록 API 요청 : AddUser으로
    Request_AddUser_Api();
    console.log("SendData Web to Server");
    console.log(AddUser.Name + " " + AddUser.birth + " " + AddUser.address);
    
    //api요청하고나면 입력창 초기화
    cancelBtn();

}

function cancelBtn(){//사용자 등록을 취소하면 다시 초기화 상태로 돌림
    //입력 항목에 들어가 있던 데이터 초기화
    //document.getElementById('Profile_picture').src = "../src/img/avatars/Default_Profile.png";
    document.getElementById("Profile_name").value = "";//사용자 이름 초기화
    document.getElementById("Profile_birth").value = "";//사용자 생년월일 초기화
    document.getElementById("Profile_address").value = "";//사용자 주소 초기화

    //사용자 등록창 닫기
    document.getElementById('Add_Profile_bg').style.display ='none';
    document.getElementById('Add_Profile_wrap').style.display ='none';
}

function Request_AddUser_Api(){
    console.log("새로운 사용자 정보 서버에 등록");
    /* 사용자 회원가입: post
    https://ec2-43-201-19-40.ap-northeast-2.compute.amazonaws.com/api/user_register
    형식: JSON
    {
        “name” : 
        “birth” :
        “manager” :
        “address” :
    } */
}