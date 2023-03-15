//사용자 프로필 추가하고 서버에 등록 
var AddUser = {//새로운 사용자 데이터 저장 객체
    Name: "",
    birth: "",
    address: "",
    AdminId: "",
    picture: ""
};

function Add_Profile(){//사용자 프로필 추가하기 버튼을 누르면 실행
    document.getElementById('Add_Profile_bg').style.display ='block';
    document.getElementById('Add_Profile_wrap').style.display ='block';
}



function showImage() {//프로필 사진 파일을 올리면 미리 볼 수 있게 하는 함수
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
    newImage.files = file;
    //이미지 source 사용자 객체에 저장
    AddUser.picture = URL.createObjectURL(file); 

    //이미지를 image-show div에 추가
    var container = document.getElementById('image-show');
    container.appendChild(newImage);

    showImage();//업로드 된 프로필 미리 보기
};

async function saveBtn(){//사용자를 추가하는 함수
    AddUser.name = document.getElementById("Profile_name").value;//사용자 이름
    AddUser.birth = document.getElementById("Profile_birth").value;//사용자 생년월일
    AddUser.address = document.getElementById("Profile_address").value;//사용자 주소
    AddUser.picture = await Post_Img(document.getElementById("Profile_picture").files);//사진 링크값 받아오기
    //AddUser.manager =
    
    if(AddUser.name != '' && AddUser.birth != '' && AddUser.address != ''){
        await axios.get('http://onsaemiro.website/process/get_session_user')
            .then(function(response){
                console.log(response.data);
                AddUser.manager = JSON.stringify(response.data);
            })//로그인되어 있는 값을 받아와서 여기에 할당
            .catch(function(error){
                alert("http://onsaemiro.website/process/get_session_user \n"+error);
                console.log(error);
            })
        await axios.post('http://apionsaemiro.site/api/user_register',AddUser)
            .then(function(response){
                console.log(response);
                alert('ID: ' + response.data.id + " Login Code: " + response.data.code);
            })
            .catch(function(error){
                alert('http://apionsaemiro.site/api/user_register \n' + error);
                console.log(error);
            })

        //서버에 등록 API 요청 : AddUser으로
        //Request_AddUser_Api();
        console.log("SendData Web to Server");
        console.log(AddUser.name + " " + AddUser.birth + " " + AddUser.address);
        
        //api요청하고나면 입력창 초기화
        cancelBtn();
        window.location.reload();//새로고침
    } else {
        alert("입력되지 않은 정보가 있습니다!");
    }
	
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


async function Post_Img(Img_file){//이미지 파일 업로드
    // 사진 업로드 : post
    // http://ec2-43-201-19-40.ap-northeast-2.compute.amazonaws.com/api/upload_photo
    // 리턴값 -> 사진 링크
	var imageurl;
    if (Img_file) {
        const uploadFile = Img_file;
        const formData = new FormData();
        formData.append("photo", uploadFile);

        await axios.post("http://apionsaemiro.site/api/upload_photo",formData,
                {
                redirect: 'follow',
                headers: {
                'Content-Type': 'multipart/form-data',
                },
                transformRequest: (data, headers) => {
                return data;
                },
                })
        .then((response) => {
            if (response) {
            imageurl = response.data;
            console.log(response.data);
            }
        })
        .catch((error) => {
            console.log(error);
            window.alert("게시물 작성에 실패했습니다.");
        });
  }

  // 사진 업로드 : post
  // 리턴값 -> 사진 링크
  return imageurl;
}
