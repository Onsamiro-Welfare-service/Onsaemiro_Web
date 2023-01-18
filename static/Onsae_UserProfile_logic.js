//사용자 프로필 추가하고 서버에 등록 
var AddUser = {//새로운 사용자 데이터 저장 객체
    UserId: "",
    Name: "",
    Info: ["","",""]
    /*Picture: ""*/
};

function Add_Profile(){//사용자 프로필 추가하기 버튼을 누르면 실행
    document.getElementById('Add_Profile_bg').style.display ='block';
    document.getElementById('Add_Profile_wrap').style.display ='block';
    document.getElementById('Profile_UserID').innerText = create_UserId();
}

function create_UserId(){//사용자ID 생성하는 함수
    AdminId = "SD1111";
    let exp_Num = new RegExp("[0-9]{4}");//가장 나중에 만들어진 사용자id값을 알기 위해
    let exp_str = new RegExp("[A-z]{2}");//관리자 ID에서 코드를 따오기 위해
    let Admin_Code = AdminId.match(exp_str);//관리자Id: "SD0001"이면 결과값 "SD"
    console.log(Admin_Code);
    let Last_Num = UserList[UserList.length-1].User_Id.match(exp_Num);//유저 리스트에서 가장 나중의 아이디가 "SD1111"일때 결과값 1111
    Last_Num = Number(Last_Num);
    return Admin_Code + (Last_Num+1);// "SD1112" 반환
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
    AddUser.Info.push(document.getElementById("Profile_Info1").value);//사용자 정보1
    AddUser.Info.push(document.getElementById("Profile_Info2").value);//사용자 정보2
    AddUser.Info.push(document.getElementById("Profile_Info3").value);//사용자 정보3
    AddUser.UserId = document.getElementById("Profile_UserID").innerText;//생성된 사용자 ID
    //사용자 사진은 파일 업로드할때 미리 저장 loadFile()함수에서 실행

    //서버에 등록 API 요청
    console.log("SendData Web to Server");
}

function cancelBtn(){//사용자 등록을 취소하면 다시 초기화 상태로 돌림
    //입력 항목에 들어가 있던 데이터 초기화
    //document.getElementById('Profile_picture').src = "../src/img/avatars/Default_Profile.png";
    document.getElementById("Profile_name").value = "";
    document.getElementById("Profile_Info1").value = "";
    document.getElementById("Profile_Info2").value = "";
    document.getElementById("Profile_Info3").value = "";
    document.getElementById("Profile_UserID").innerText = "";

    //사용자 등록창 닫기
    document.getElementById('Add_Profile_bg').style.display ='none';
    document.getElementById('Add_Profile_wrap').style.display ='none';
}