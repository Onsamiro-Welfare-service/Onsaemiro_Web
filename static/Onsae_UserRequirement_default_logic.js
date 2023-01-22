var UserList = [
    { User_Id: "UserId1111" ,Name: "김승주", birth: "0000-00-00", address: "주소1"}
];//사용자 정보 리스트
var UserRequirementList = [//웹에 저장된 사용자 요구사항 리스트
    //{ id: "Error Code: 404 Not Found", date: "", is_photo: false, text: "사용자 요구사항 데이터를 정상적으로 불러오지 못했습니다", photo: "" }
    { id: "UserId1111", date: '01-10-18:32', is_photo: false, text: "질문내용 이거저거그것", photo: "src~~~~" },
    { id: "UserId2222", date: '01-10-18:32', is_photo: true, text: "질문내용 이거저거그것", photo: "../src/img/avatars/avatar-2.jpg" }
];
var NewRequirementList = [//서버에서 불러온 사용자 요구사항 리스트
    // { id: "UserId1111", date: '01-10-18:32', is_photo: false, text: "질문내용 이거저거그것", photo: "src~~~~"}
];
var UserRequirement_SessionArr = [//현재 세션 데이터 저장
    // { id: "", time: "", status: "", icon: "", confirmBtn : false, completeBtn: false }
];
var UserRequirement_LoadedArr = [];//이전 세션 데이터 불러오면 여기에 저장 
var Exp_Name = new RegExp("[가-힣]{2,4}");


//창닫기 이벤트 감지& 기존 세션 데이터 저장
window.addEventListener('beforeunload', (event) => {
    //화면이 사라지기전 해당화면 상태값 모두 저장
    save_SessionData();
    // 표준에 따라 기본 동작 방지
    event.preventDefault();
    // Chrome에서는 returnValue 설정이 필요함
    event.returnValue = '';
});

//기본 웹에서 버튼 및 작동 관련 함수
function toggleDiv(DivId){
    let header = document.getElementById(DivId + "_header");
    let body = document.getElementById(DivId + "_body");
    let Btn = document.getElementById(DivId + "_Btn");

    if(body.style.display == "none" || Btn.style.display == "none"){
        body.style.display = "block";
        Btn.style.display = "block";
        header.style.borderBottomLeftRadius = "0px";
        header.style.borderBottomRightRadius = "0px";
    } else {
        body.style.display = "none";
        Btn.style.display = "none";
        header.style.borderBottomLeftRadius = "5px";
        header.style.borderBottomRightRadius = "5px";
    }
}
function Requirement_Confirm(DivId){
    document.getElementById(DivId + "_ConfirmBtn").disabled = 'true';
    document.getElementById(DivId + "_Icon").style.borderColor = "rgba(255,192,65)";
    document.getElementById(DivId + "_Status").innerText = "확인 중";
}

function Requirement_Complete(DivId){
    document.getElementById(DivId + "_ConfirmBtn").disabled = 'true';
    document.getElementById(DivId + "_CompleteBtn").disabled = 'true';
    document.getElementById(DivId + "_Icon").style.borderColor = "rgba(76,217,100)";
    document.getElementById(DivId + "_Status").innerText = "조치 완료";
    document.getElementById(DivId + "_body").style.borderBottom = "2px solid black";
}

//기존 세션 정보를 저장하고 다시 로드될때 불러오게끔 하기 위함
function save_SessionData(){//화면에 보이는 요구사항 상태값을 모두 저장하는 함수 
    let parent = document.getElementById("RequirementList");
    let parent_Count = parent.children.length;

    //현재 세션 데이터 모두 긁어오기
    for(let p=0; p < parent_Count; p++){
        UserRequirement_SessionArr.push(get_SessionData(p));   
    }
    //세션 데이터 로컬스토리지에 저장
    localStorage.setItem("UserRequirement_SessionData",JSON.stringify(UserRequirement_SessionArr));
    UserRequirement_SessionArr = [];//초기화
}

function load_SessionData(){//이전 데이터가 있다면 해당 정보 불러와 UserRequirement_SessionArr에 저장하기
    let localData = localStorage.getItem("UserRequirement_SessionData");
    UserRequirement_LoadedArr = JSON.parse(localData);
}
load_SessionData();

function get_SessionData(index){//인덱스에 해당하는 해당 요구사항Div 상태값을 모두 긁어와 객체형태로 리턴
    let getData = {};
    getData.id = UserRequirementList[index].id;//사용자Id
    getData.time = UserRequirementList[index].date;//생성시간
    getData.status = document.getElementById("Requirement" + index + "_Status").innerText;//요구사항 상태
    getData.icon = document.getElementById("Requirement" + index + "_Icon").style.borderColor;//요구사항 아이콘 색상
    getData.confirmBtn = document.getElementById("Requirement" + index + "_ConfirmBtn").disabled;//확인완료 버튼 상태
    getData.completeBtn = document.getElementById("Requirement" + index + "_CompleteBtn").disabled;//조치완료 버튼 상태
    return getData;//객체반환
}

function Update_Session(index){//이전 세션 정보가 있다면 생성된 정보에 기존 정보를 덮어 씌우는 함수
    if(index <= UserRequirement_LoadedArr.length){
        document.getElementById("Requirement" + index + "_Status").innerText = UserRequirement_LoadedArr[index].status;
        document.getElementById("Requirement" + index + "_Icon").style.borderColor = UserRequirement_LoadedArr[index].icon;
        document.getElementById("Requirement" + index + "_ConfirmBtn").disabled = UserRequirement_LoadedArr[index].confirmBtn;
        document.getElementById("Requirement" + index + "_CompleteBtn").disabled = UserRequirement_LoadedArr[index].completeBtn;
        if(UserRequirement_LoadedArr[index].completeBtn) document.getElementById("Requirement" + index + "_body").style.borderBottom = "2px solid black";
    }
}




//콘텐트 생성 및 데이터 관련 함수
function Search_UserName(id){
    let getData = localStorage.getItem("UserList");
    UserList = JSON.parse(getData);
    let is_find = "이름을 찾지 못했습니다";
    UserList.forEach((elem, index) => {
        let FindVal = elem.User_Id;
        if(FindVal.indexOf(id) != -1){//값을 찾는다면 리턴
            is_find = UserList[index].Name;
        }
    });
    return is_find;//이름값을 찾는다면 "이름", 못찾는다면 "404" 리턴
}

function Create_User_requirement(Obj){//생성되는 항목에 값 넣기
    let parent = document.getElementById("RequirementList");
    let List_index = parent.children.length;
    let child = document.createElement('div');
    child.setAttribute('id', eval("'Requirement" + List_index + "'"));
    child.setAttribute('class', 'Requirement_main_style');
        let header = document.createElement('div');
        header.setAttribute('id', eval("'Requirement" + List_index + "_header'"));
        header.setAttribute('class', 'Requirement_header_style');
        header.setAttribute('onclick', eval("'toggleDiv(`Requirement" + List_index + "`)'"));
            let title_name = document.createElement('span');
            let title_name_str = document.createTextNode(Search_UserName(Obj.id));
            title_name.setAttribute('class', 'header_title_style');
            title_name.appendChild(title_name_str);
            header.appendChild(title_name);
            let title_usrid = document.createElement('span');
            let title_usrid_str = document.createTextNode(Obj.id);
            title_usrid.setAttribute('class', 'header_usrid_style');
            title_usrid.appendChild(title_usrid_str);
            header.appendChild(title_usrid);
            let title_txt = document.createElement('span');
            let title_txt_str = document.createTextNode("요구사항");
            title_txt.setAttribute('class', 'header_title_style');
            title_txt.appendChild(title_txt_str);
            header.appendChild(title_txt);
            let Icon = document.createElement('span');
            Icon.setAttribute('id', eval("'Requirement" + List_index + "_Icon'"));
            Icon.setAttribute('class', 'header_icon_style');
            Icon.setAttribute('style', 'border-color: rgba(255,59,48);');
            header.appendChild(Icon);
            let Status = document.createElement('span');
            let Status_str = document.createTextNode("새로운 사항");
            Status.setAttribute('id', eval("'Requirement" + List_index + "_Status'"));
            Status.setAttribute('class', 'header_status_style');
            Status.appendChild(Status_str);
            header.appendChild(Status);
        child.appendChild(header);
            
        let body = document.createElement('div');
        body.setAttribute('id', eval("'Requirement" + List_index + "_body'"));
        body.setAttribute('class', 'Requirement_body_style');
        
            let Times = document.createElement('div');
            let createdTime = document.createTextNode('생성시간: ' + Obj.date);
            Times.setAttribute('id', eval("'Requirement" + List_index + "_createdTime'"));
            Times.setAttribute('style', 'font-weight: bold; margin:8px;');   
            Times.appendChild(createdTime);
            body.appendChild(Times);
            
            if(Obj.is_photo){//있다면 true
                body.setAttribute('style', 'display:none;height: 400px;');
                let Img = document.createElement('div');
                Img.setAttribute('id', eval("'Requirement" + List_index + "_Img'"));
                Img.setAttribute('class', 'body_ImgDiv_style');
                    let Img_src = document.createElement('img');
                    Img_src.setAttribute('src', eval("'" + Obj.photo + "'"));
                    Img_src.setAttribute('style', 'margin-top: 2%;');
                    Img.appendChild(Img_src);
                body.appendChild(Img);
            } else {//없다면
                body.setAttribute('style', 'display:none;height: 150px;');
            }
            
            let Requirement_txt = document.createElement('div');
            let Requirement_txt_str = document.createTextNode(Obj.text);
            Requirement_txt.setAttribute('id', eval("'Requirement" + List_index + "_Txt'"));
            Requirement_txt.setAttribute('class', 'body_txt_style');
            Requirement_txt.appendChild(Requirement_txt_str);
            body.appendChild(Requirement_txt);
        child.appendChild(body);

        let Btn = document.createElement('div');
        Btn.setAttribute('id', eval("'Requirement" + List_index + "_Btn'"));
        Btn.setAttribute('style', 'width: 990px; height: 50px; display: none;');
            let ConfirmBtn = document.createElement('input');
            ConfirmBtn.setAttribute('type', 'button');
            ConfirmBtn.setAttribute('id', eval("'Requirement" + List_index + "_ConfirmBtn'"));
            ConfirmBtn.setAttribute('class', 'Requirement_btn_style');
            ConfirmBtn.setAttribute('style', 'background-color: palegoldenrod;');
            ConfirmBtn.setAttribute('value', '확인 완료');
            ConfirmBtn.setAttribute('onclick', eval("'Requirement_Confirm(`Requirement" + List_index + "`)'"));
            Btn.appendChild(ConfirmBtn);
            let CompleteBtn = document.createElement('input');
            CompleteBtn.setAttribute('type', 'button');
            CompleteBtn.setAttribute('id', eval("'Requirement" + List_index + "_CompleteBtn'"));
            CompleteBtn.setAttribute('class', 'Requirement_btn_style');
            CompleteBtn.setAttribute('style', 'background-color: palegreen; margin-left: -4px;');
            CompleteBtn.setAttribute('value', '조치 완료');
            CompleteBtn.setAttribute('onclick', eval("'Requirement_Complete(`Requirement" + List_index + "`)'"));
            Btn.appendChild(CompleteBtn);
        child.appendChild(Btn);
    parent.appendChild(child);      
    
    if(UserRequirement_LoadedArr.length > 0){//생성된 요구사항에 이전 세션 정보가 있다면 적용
        Update_Session(List_index);
    }
}

if(document.getElementById("RequirementList").children.length == 0){//아무값도 없다면?
    for(let i=0; i < UserRequirementList.length; i++){
        Create_User_requirement(UserRequirementList[i]);
    }
}

function Delete_New_requirement(){//새로운 데이터 로드시 갱신
    if(NewRequirementList.length > UserRequirementList.length){
        for(let i=UserRequirementList.length; i < NewRequirementList.length; i++){
            UserRequirementList.push(NewRequirementList[i]);
            Create_User_requirement(NewRequirementList[i]);
        }
    }
}

function Request_UserRequirement_Api(){//사용자 요구사항 리스트 받아오는 함수
    /**
     * 요구사항 다운로드:get
        http://ec2-43-201-19-40.ap-northeast-2.compute.amazonaws.com/api/get_request
        그냥 저장된 요구사항 다 불러짐
     */
    //UserRequirementList = 받아온 데이터 할당
    //UserRequirementList.push()로 데이터 추가하지 말것! default값이 있기때문
    console.log("Request_Api");
    Delete_New_requirement();//새로운 데이터 로드 시
}


setInterval(() => Request_UserRequirement_Api(), 60000);//1분마다 사용자 요구사항 받아오게끔