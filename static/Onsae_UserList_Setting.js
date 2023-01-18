//서버에서 사용자 리스트를 받아와서 프로필 카드를 만드는 담당
var AdminId;//로그인 되었을때 로그인된 관리자ID
var UserList = [//서버에서 사용자리스트를 받아오면 저장해두는 객체
    {  User_Id : "SD1111",Name: "김승주", Info: ["정보1", "정보2", "정보3"], picture:  "프로필 사진 데이터값" },
    {  User_Id : "SD1111",Name: "김승주", Info: ["정보1", "정보2", "정보3"], picture:  "프로필 사진 데이터값" },
    {  User_Id : "SD1111",Name: "김승주", Info: ["정보1", "정보2", "정보3"], picture:  "프로필 사진 데이터값" }
];

//맨처음 해당 페이지를 접속하면 사용자 데이터를 호출
// { AdminId : "SD1111" }
//리턴값으로 사용자 정보가 오면 UserList에 저장

if(UserList.length > 0){
    create_Profile();
}

function create_Profile(){
    let parent = document.getElementById("Profile_Div");
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

        let Info_title = ["정보1", "정보2", "특이사항"];
        for(let j=0;j<3;j++){
            let UserInfo_table = document.getElementById('User' + i + '_tbody');
            let row = UserInfo_table.insertRow();
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);

            cell1.innerText = Info_title[j];
            cell2.class = "text-end";
            cell2.innerHTML = UserList[i].Info[j];
        }
    }
}