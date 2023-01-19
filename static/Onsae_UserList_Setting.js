//서버에서 사용자 리스트를 받아와서 프로필 카드를 만드는 담당
var AdminId;//로그인 되었을때 로그인된 관리자ID
var UserList = [//서버에서 사용자리스트를 받아오면 저장해두는 객체
    {  User_Id: "UserId1111" ,Name: "ㅇㅇㅇ", birth: "0000-00-00", address: "주소1" },
    {  User_Id: "UserId2222" ,Name: "ㅂㅂㅂ", birth: "1111-11-11", address: "주소2" },
    {  User_Id: "UserId3333" ,Name: "ㅁㅁㅁ", birth: "2222-22-22", address: "주소3" },
    {  User_Id: "UserId3333" ,Name: "ㅁㅁㅁ", birth: "2222-22-22", address: "주소4" },
    {  User_Id: "UserId3333" ,Name: "ㅁㅁㅁ", birth: "2222-22-22", address: "주소5" },
    {  User_Id: "UserId3333" ,Name: "ㅁㅁㅁ", birth: "2222-22-22", address: "주소6  " },
];


function Request_UserList_Api(){
    //맨처음 해당 페이지를 접속하면 사용자 데이터를 호출
    // { AdminId : "SD1111" }
    console.log("Api로 사용자 리스트 all get 요청");
    //리턴값으로 사용자 정보가 오면 UserList에 저장



    if(UserList.length > 0){//받아온 값이 있을때 프로필카드 생성
        create_Profile();
    }
}

setInterval(() => Request_UserList_Api(), 180000);//3분마다 사용자 정보 받아오게끔



function create_Profile(){
    let parent = document.getElementById("Profile_Div");
    if(parent.children.length > 0){
        document.getElementById("Profile_Div").innerHTML = "";
    }
    for(let i=0; i< UserList.length; i++){
        let child = document.createElement('div');
        child.setAttribute('id', eval("'User" + i + "'"));
        child.setAttribute('style', 'width: 300px; height: 270px;');
        child.setAttribute('onclick', eval("'onClick(`" + UserList[i].User_Id + "`)'"));
            let card = document.createElement('div');
            card.setAttribute('class', 'card flex-fill w-100');
                let header = document.createElement('div');
                header.setAttribute('class', 'card-header');
                    let profile_title = document.createElement('h5');
                    profile_title.setAttribute('class', 'card-title mb-0');
                    profile_title.setAttribute('style', 'color: black; font-size:20px;');
                    let profile_title_txt = document.createTextNode(UserList[i].Name);
                    profile_title.appendChild(profile_title_txt);
                    header.appendChild(profile_title);
                card.appendChild(header);

                let body = document.createElement('div');
                body.setAttribute('class', 'card-body d-flex');
                    let align_center = document.createElement('div');
                    align_center.setAttribute('class', 'align-self-center w-100');
                        
                    body.appendChild(align_center);
                card.appendChild(body);
            child.appendChild(card);
        parent.appendChild(child);

        let Info_table = document.createElement('table');
        Info_table.setAttribute('class', 'table mb-0');
            let Tbody = document.createElement('tbody');
            Tbody.setAttribute('id', eval("'User" + i + "_tbody'"));
            Info_table.appendChild(Tbody);
        align_center.appendChild(Info_table);

        let UserInfo_table = document.getElementById('User' + i + '_tbody');
        let row = UserInfo_table.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.innerText = "생년월일"
        cell2.class = "text-end";
        cell2.innerHTML = UserList[i].birth;
    
    }
}