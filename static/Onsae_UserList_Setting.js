//서버에서 사용자 리스트를 받아와서 프로필 카드를 만드는 담당
var AdminId;//로그인 되었을때 로그인된 관리자ID
var UserList = [//서버에서 사용자리스트를 받아오면 저장해두는 객체
    {  User_Id: "UserId1111" ,Name: "ㅇㅇㅇ", birth: "0000-00-00", address: "주소1", picture: "http://apionsaemiro.site/load/rn_image_picker_lib_temp_dc0caf5d-a8c8-48ca-9868-9d18021b58e4.jpg"}
];//picture 임시테스트 데이터


async function Request_UserList_Api(){
    //맨처음 해당 페이지를 접속하면 사용자 데이터를 호출
    // { AdminId : "SD1111" }
    console.log("Api로 사용자 리스트 all get 요청")
    //리턴값으로 사용자 정보가 오면 UserList에 저장
	await axios.get('http://onsaemiro.website/process/get_session_user')
	.then(function(response){
		AdminB = JSON.stringify(response.data);
	})
	await axios.get('http://apionsaemiro.site/api/get_user_list_all',{params:{
		belong : AdminB
	}})
	.then(function(response){
		UserList = response.data;
	});


    if(UserList.length > 0){//받아온 값이 있을때 프로필카드 생성
        create_Profile();
    }
}
/* 코드 테스트 하는 위치
//create_Profile();
**/


Request_UserList_Api();
setInterval(() => Request_UserList_Api(), 180000);//3분마다 사용자 정보 받아오게끔

function Local_Saved(){//사용자 리스트를 로컬스토리지에 저장하는 함수
    localStorage.setItem("UserList", JSON.stringify(UserList));
}

function create_Profile(){
    let parent = document.getElementById("Profile_Div");
    if(parent.children.length > 0){
        document.getElementById("Profile_Div").innerHTML = "";
    }
    for(let i=0; i< UserList.length; i++){
        let child = document.createElement('div');
        child.setAttribute('id', eval("'User" + i + "'"));
        child.setAttribute('style', 'width: 320px; height: 330px;');
        child.setAttribute('onclick', eval("'onClick(`" + UserList[i].id + "`)'"));
            let card = document.createElement('div');
            card.setAttribute('class', 'card flex-fill w-100');
                let header = document.createElement('div');
                header.setAttribute('class', 'card-header');
                    let profile_name = document.createElement('h5');
                    let profile_name_txt = document.createTextNode(UserList[i].name);
                    profile_name.setAttribute('class', 'card-title mb-0');
                    profile_name.setAttribute('style', 'display:inline-block; color: black; font-size:20px;');
                    profile_name.appendChild(profile_name_txt);
                    header.appendChild(profile_name);
                    let profile_usrId = document.createElement('h5');
                    let profile_usrId_txt = document.createTextNode(UserList[i].id);
                    profile_usrId.setAttribute('class', 'card-title mb-0');
                    profile_usrId.setAttribute('style', 'display:inline-block; float:right; margin-right: 10px;  color: gray; font-size:17px;');
                    profile_usrId.appendChild(profile_usrId_txt);
                    header.appendChild(profile_usrId);
                card.appendChild(header);

                let body = document.createElement('div');
                body.setAttribute('class', 'card-body d-flex');
                    let align_center = document.createElement('div');
                    align_center.setAttribute('class', 'align-self-center w-100');
                        let img = document.createElement('img');
                        img.setAttribute('src', eval("'" + UserList[i].picture + "'"));
                        img.setAttribute('style', 'width: 100px; height: 100px; border-radius:100px; margin-left: 30%');
                        align_center.appendChild(img);
                    body.appendChild(align_center);
                card.appendChild(body);
            child.appendChild(card);
        parent.appendChild(child);

        let Info_table = document.createElement('table');
        Info_table.setAttribute('class', 'table mb-0');
        Info_table.setAttribute('style', 'margin-top: 15px;');
            let Tbody = document.createElement('tbody');
            Tbody.setAttribute('id', eval("'User" + i + "_tbody'"));
            Info_table.appendChild(Tbody);
        align_center.appendChild(Info_table);

        let UserInfo_table = document.getElementById('User' + i + '_tbody');
        let row1 = UserInfo_table.insertRow();
        let row1_cell1 = row1.insertCell(0);
        let row1_cell2 = row1.insertCell(1);
        row1_cell1.innerText = "생년월일"
        row1_cell2.class = "text-end";
        row1_cell2.innerHTML = UserList[i].birth;
        let row2 = UserInfo_table.insertRow();
        let row2_cell1 = row2.insertCell(0);
        let row2_cell2 = row2.insertCell(1);
        row2_cell1.innerText = "주소"
        row2_cell2.class = "text-end";
        row2_cell2.innerHTML = UserList[i].address;
    
    }
}
