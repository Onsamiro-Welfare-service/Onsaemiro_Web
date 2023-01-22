var UserList = [
    { key: "userid", value:"username"}
];//사용자 정보 리스트
var UserRequirementList = [//웹에 저장된 사용자 요구사항 리스트
    { id: "userid", date: '01-10-18:32', is_photo: false, text: "질문내용 이거저거그것", photo: "src~~~~"}
];
var NewRequirementList = [//서버에서 불러온 사용자 요구사항 리스트
    { id: "userid", date: '01-10-18:32', is_photo: false, text: "질문내용 이거저거그것", photo: "src~~~~"}
];
var Exp_Name = new RegExp("[가-힣]{2,4}");

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

//콘텐트 생성 및 데이터 관련 함수
function Search_UserName(id){
    let getData = localStorage.getItem("UserList");
    UserList = JSON.parse(getData);
    let is_find = "이름을 찾지 못했습니다";
    UserList.forEach((elem, index) => {
        let FindVal = elem.key;
        if(FindVal.indexOf(id) != -1){//값을 찾는다면 리턴
            is_find = UserList[index].value;
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

    
    Delete_New_requirement();//새로운 데이터 로드 시
}


setInterval(() => Request_UserRequirement_Api(), 180000);//3분마다 사용자 요구사항 받아오게끔