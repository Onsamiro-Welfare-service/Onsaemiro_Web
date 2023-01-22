//기존 세션 정보를 저장하고 다시 로드될때 불러오게끔 하기 위함
var UserRequirement_SessionArr = [
    // { 
    //     header: ["id", "name", "status", "icon"],//UserId, UserName, Status msg, Icon Color
    //     body: ["created_time", false, "requirement"],//생성시간, 사진여부, 요구사항
    //     btn: [true, true],//버튼 활성화 여부 - 확인완료, 조치완료
    //     photo: "src"//사진 소스
    // }
];

function get_SessionData(index){//인덱스에 해당하는 해당 요구사항Div 상태값을 모두 긁어와 객체형태로 리턴
    let getData = {};
    let header_SessionData = [], body_SessionData = [], btn_SessionData = [];
    
    //아이디 이름 상태 아이콘
    header_SessionData.push(UserRequirementList[index].id);//사용자Id
    let UsrName = Search_UserName(UserRequirementList[index].id);
    header_SessionData.push(UsrName);//사용자 이름
    let Status = document.getElementById("Requirement" + index + "_Status").innerText;
    header_SessionData.push(Status);//요구사항 상태
    let Icon = document.getElementById("Requirement" + index + "_Icon").style.borderColor;
    header_SessionData.push(Icon);//요구사항 아이콘 색상
    getData.header = header_SessionData;
    
    //생성시간 사진여부 요구사항
    body_SessionData.push(UserRequirementList[index].date);//생성시간
    body_SessionData.push(UserRequirementList[index].is_photo);//사진여부
    body_SessionData.push(UserRequirementList[index].text);//요구사항
    getData.body = body_SessionData;

    //버튼상태
    let Confirm_val = document.getElementById("Requirement" + index + "_ConfirmBtn").disabled;
    btn_SessionData.push(Confirm_val);//확인완료 버튼 상태
    let Complete_val = document.getElementById("Requirement" + index + "_CompleteBtn").disabled;
    btn_SessionData.push(Complete_val);//조치완료 버튼 상태
    getData.btn = btn_SessionData;

    //사진소스
    getData.photo = UserRequirementList[index].photo;
    return getData;//객체반환

}

function save_SessionData(){//화면에 보이는 요구사항 상태값을 모두 저장하는 함수 
    let parent = document.getElementById("RequirementList");
    let parent_Count = parent.children.length;

    //현재 세션 데이터 모두 긁어오기
    for(let p=0; p < parent_Count; p++){
        UserRequirement_SessionArr.push(get_SessionData(p));
    }
    let is_data = [];
    is_data.push(get_RequirementList());//배열값 리턴

    //모두 긁어온 데이터를 IndexedDB에 저장
    if(is_data.length == 0){
        save_RequirementList();//IndexedDB에 아무값도 없다면 새로추가
    } else {
        update_RequirementList();//IndexedDB에 기존 값이 있다면 업데이트
    }
}

function load_SessionData(){//기존 세션데이터가 있다면 불러와 다시 화면에 구성시키는 함수
    UserRequirement_SessionArr = get_RequirementList();
    for(let k=0; k< UserRequirement_SessionArr.length; k++){
        create_Session(k);
    }
}

function create_Session(index){//저장된 데이터로 요구사항 항목 만드는 함수
    let parent = document.getElementById("RequirementList");
    let child = document.createElement('div');
    child.setAttribute('id', eval("'Requirement" + index + "'"));
    child.setAttribute('class', 'Requirement_main_style');
        let header = document.createElement('div');
        header.setAttribute('id', eval("'Requirement" + index + "_header'"));
        header.setAttribute('class', 'Requirement_header_style');
        header.setAttribute('onclick', eval("'toggleDiv(`Requirement" + index + "`)'"));
            let title_name = document.createElement('span');
            let title_name_str = document.createTextNode(UserRequirement_SessionArr[index].header[1]);//UserName
            title_name.setAttribute('class', 'header_title_style');
            title_name.appendChild(title_name_str);
            header.appendChild(title_name);
            let title_usrid = document.createElement('span');
            let title_usrid_str = document.createTextNode(UserRequirement_SessionArr[index].header[0]);//UserId
            title_usrid.setAttribute('class', 'header_usrid_style');
            title_usrid.appendChild(title_usrid_str);
            header.appendChild(title_usrid);
            let title_txt = document.createElement('span');
            let title_txt_str = document.createTextNode("요구사항");
            title_txt.setAttribute('class', 'header_title_style');
            title_txt.appendChild(title_txt_str);
            header.appendChild(title_txt);
            let Icon = document.createElement('span');
            Icon.setAttribute('id', eval("'Requirement" + index + "_Icon'"));
            Icon.setAttribute('class', 'header_icon_style');
            Icon.setAttribute('style', eval("'border-color:" + UserRequirement_SessionArr[index].header[3] + ";'"));//Icon Color
            header.appendChild(Icon);
            let Status = document.createElement('span');
            let Status_str = document.createTextNode(UserRequirement_SessionArr[index].header[2]);//Status msg
            Status.setAttribute('id', eval("'Requirement" + index + "_Status'"));
            Status.setAttribute('class', 'header_status_style');
            Status.appendChild(Status_str);
            header.appendChild(Status);
        child.appendChild(header);
            
        let body = document.createElement('div');
        body.setAttribute('id', eval("'Requirement" + index + "_body'"));
        body.setAttribute('class', 'Requirement_body_style');
            let Times = document.createElement('div');
            let createdTime = document.createTextNode('생성시간: ' + UserRequirement_SessionArr[index].body[0]);//createdTime
            Times.setAttribute('id', eval("'Requirement" + index + "_createdTime'"));
            Times.setAttribute('style', 'font-weight: bold; margin:8px;');   
            Times.appendChild(createdTime);
            body.appendChild(Times);

            if(UserRequirement_SessionArr[index].body[1]){//있다면 true             is_photo
                body.setAttribute('style', 'display:none;height: 400px;');
                let Img = document.createElement('div');
                Img.setAttribute('id', eval("'Requirement" + index + "_Img'"));
                Img.setAttribute('class', 'body_ImgDiv_style');
                    let Img_src = document.createElement('img');
                    Img_src.setAttribute('src', eval("'" + UserRequirement_SessionArr[index].photo + "'"));//Photo
                    Img_src.setAttribute('style', 'margin-top: 2%;');
                    Img.appendChild(Img_src);
                body.appendChild(Img);
            } else {//없다면
                body.setAttribute('style', 'display:none;height: 150px;');
            }
            
            let Requirement_txt = document.createElement('div');
            let Requirement_txt_str = document.createTextNode(UserRequirement_SessionArr[index].body[2]);//Requirement Text
            Requirement_txt.setAttribute('id', eval("'Requirement" + index + "_Txt'"));
            Requirement_txt.setAttribute('class', 'body_txt_style');
            Requirement_txt.appendChild(Requirement_txt_str);
            body.appendChild(Requirement_txt);
        child.appendChild(body);

        let Btn = document.createElement('div');
        Btn.setAttribute('id', eval("'Requirement" + index + "_Btn'"));
        Btn.setAttribute('style', 'width: 990px; height: 50px; display: none;');
            let ConfirmBtn = document.createElement('input');
            ConfirmBtn.setAttribute('type', 'button');
            ConfirmBtn.setAttribute('id', eval("'Requirement" + index + "_ConfirmBtn'"));
            ConfirmBtn.setAttribute('class', 'Requirement_btn_style');
            if(UserRequirement_SessionArr[index].btn[0]){
                ConfirmBtn.setAttribute('disabled', 'true');
            }
            ConfirmBtn.setAttribute('style', 'background-color: palegoldenrod;');
            ConfirmBtn.setAttribute('value', '확인 완료');
            ConfirmBtn.setAttribute('onclick', eval("'Requirement_Confirm(`Requirement" + index + "`)'"));
            Btn.appendChild(ConfirmBtn);
            let CompleteBtn = document.createElement('input');
            CompleteBtn.setAttribute('type', 'button');
            CompleteBtn.setAttribute('id', eval("'Requirement" + index + "_CompleteBtn'"));
            CompleteBtn.setAttribute('class', 'Requirement_btn_style');
            if(UserRequirement_SessionArr[index].btn[1]){
                CompleteBtn.setAttribute('disabled', 'true');
            }
            CompleteBtn.setAttribute('style', 'background-color: palegreen; margin-left: -6px;');
            CompleteBtn.setAttribute('value', '조치 완료');
            CompleteBtn.setAttribute('onclick', eval("'Requirement_Complete(`Requirement" + index + "`)'"));
            Btn.appendChild(CompleteBtn);
        child.appendChild(Btn);
    parent.appendChild(child); 

    UserRequirementList.push(UserRequirement_SessionArr[index]);
}

// function Assign_UserRequirementList(index){//기존값을 웹에 저장되는 요구사항리스트에 저장할까말까?
//     { UserRequirement_SessionArr
//         header: ["id", "name", "status", "icon"],//UserId, UserName, Status msg, Icon Color
//         body: ["created_time", false, "requirement"],//생성시간, 사진여부, 요구사항
//         btn: [true, true],//버튼 활성화 여부 - 확인완료, 조치완료
//         photo: "src"//사진 소스
//     }

//     UserRequirementList = [//웹에 저장된 사용자 요구사항 리스트
//     { id: "UserId1111", date: '01-10-18:32', is_photo: false, text: "질문내용 이거저거그것", photo: "src~~~~"},
// }



//IndexedDB 관련 파트
let Session_db;
let Session_dbReq

//UserRequirementList IndexedDB 접속
Session_dbReq = indexedDB.open('UserRequirementList',1);
Session_dbReq.addEventListener('success', function(event){
    Session_db = event.target.result;
});
Session_dbReq.addEventListener('error', function(event){
    const error = event.target.error; 
    console.log('error', error.name);
});  
Session_dbReq.addEventListener('upgradeneeded', function(event){
    Session_db = event.target.result;  
    let oldVersion = event.oldVersion;
    if(oldVersion < 1){
        Session_db.createObjectStore('SessionStorage', {keyPath:'id'});
    } 
});


//UserRequirementList IndexedDB 데이터 관련 함수
function save_RequirementList(){//리스트 저장
    let store = Session_db.transaction('SessionStorage', 'readwrite').objectStore('SessionStorage');
    let addReq = store.add({
        id: "Session_UserRequirementList",
        value: UserRequirement_SessionArr
    });
    addReq.addEventListener('success', function(event){
        console.log(event);
    });
}
// function get(){
//     let id = "Session_UserRequirementList";
//     let store = Session_db.transaction('SessionStorage', 'readonly').objectStore('SessionStorage');            
//     let getReq = store.get(id);
//     getReq.addEventListener('success', function(event){
//         console.log(event.target.result);
//     });
// }
function get_RequirementList(){//저장되어있는 리스트값 불러오기
    let store = Session_db.transaction('SessionStorage', 'readonly').objectStore('SessionStorage');            
    let getAllReq = store.getAll();
    getAllReq.addEventListener('success', function(event){
        console.log(event.target.result);
        let loadData = event.target.result;
        return loadData[0].value;
    });
}
function update_RequirementList(){//저장되어있는 리스트값 업데이트
    let store = Session_db.transaction('SessionStorage', 'readwrite').objectStore('SessionStorage');
    let putReq = store.put({
        id: "Session_UserRequirementList",
        value: UserRequirement_SessionArr
    });
    putReq.addEventListener('success',function(event){
        console.log(event);
    });
}
// function delete_RequirementList(){//저장되어있는 리스트값 삭제
//     let store = Session_db.transaction('SessionStorage', 'readwrite').objectStore('SessionStorage');
//     let deleteReq = store.delete("Session_UserRequirementList");
//     deleteReq.addEventListener('success', function(event){
//         console.log(event);
//     });
// }