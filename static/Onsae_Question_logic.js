//문진표 질문 받아오기 및 질문리스트 생성
var Category_DL_Arr = [];
var Category_S_Arr = [];
var Category_H_Arr = [];
var Category_M_Arr = [];
//초기실행
Request_API("DL");
Request_API("S");
Request_API("H");
Request_API("M");

var DL_sequence = [];
var S_sequence = [];
var H_sequence = [];
var M_sequence = [];



async function Request_API(category){//Request_API("DL");
// 모든 질문 불러오기 (관리자 웹용) <- 삭제로 죽은 질문지까지 모두 불러오는 API:get
    let Request_QuestionAPI = new Object();
    Request_QuestionAPI.category = category;
    
    let ReturnVal = [];// 받아온 값 ReturnVal에 할당 
 await axios
    .get(
      "http://apionsaemiro.site/api/load_question",{
		params :{
			category:category,
			
		}
	  }).then(function(response) {
      if (response) {
        console.log(response.data);
		  ReturnVal=response.data;
      }
    })
    .catch((error) => {  

    });


    switch(category){
        case "DL":
            Category_DL_Arr = ReturnVal;
            create_QuestionList("DailyLife");
            //checkDaily(true, "DailyLife");
            exist_sequence(Category_DL_Arr, "DL");
            break;
        case "S":
            Category_S_Arr = ReturnVal;
            create_QuestionList("Safe");
            //checkSafe(true, "Safe");
            exist_sequence(Category_S_Arr, "S");
            break;
        case "H":
           	Category_H_Arr = ReturnVal;
            create_QuestionList("Health");
            //checkHealth(true, "Health");
            exist_sequence(Category_H_Arr, "H");
            break;
        case "M":
            Category_M_Arr = ReturnVal;
            create_QuestionList("Mind");
            //checkMind(true, "Mind");
            exist_sequence(Category_M_Arr, "M");
            break;
        default:
            console.log("Error Code 404");
    }
}

function exist_sequence(data, category){//기존 질문의 순서를 저장하는 함수
    let seq_arr = [];

    for(let index=0; index < data.length; index++){
        seq_arr.push(data[index].code);   
    }
    switch(category){
        case "DL":
            DL_sequence = seq_arr;
            break;
        case "S":
            S_sequence = seq_arr;
            break;
        case "H":
            H_sequence = seq_arr;
            break;
        case "M":
            M_sequence = seq_arr;
            break;
        default:
            console.log("exist_sequence function is error");
    }
    //console.log(seq_arr);
}


var is_modify = "";//만약 수정중이라면 해당 항목에 대해서는 작동x

function show_Answer(div){//질문리스트에서 답변항목 볼수 있게 토글
    //console.log("실행");
    let con = document.getElementById(div);
    if(is_modify != div){
        if(con.style.display == "block")
            con.style.display = "none";
        else 
            con.style.display = "block";
    } 
    
}
function create_QuestionList(category){//create_QuestionList("Safe")
    let parent = document.getElementById("QuestionList");
    let categoryIcon_color, categoryIcon_txt;//생성할 항목의 카테고리 속성
    let QuestionList_Arr;//생성할 질문리스트 배열
    let Category_className;

    switch(category){//카테고리 별 속성 부여
        case "Safe":
            categoryIcon_color = "#FF2626";
            categoryIcon_txt = "안전";
            QuestionList_Arr = Category_S_Arr;
            Category_className = "safe";
            break;
        case "Mind":
            categoryIcon_color = "#F35588";
            categoryIcon_txt = "마음";
            QuestionList_Arr = Category_M_Arr;
            Category_className = "mind";
            break;
        case "Health":
            categoryIcon_color = "#007944";
            categoryIcon_txt = "건강";
            QuestionList_Arr = Category_H_Arr;
            Category_className = "health";
            break;
        case "DailyLife":
            categoryIcon_color = "#fd7e14";
            categoryIcon_txt = "일상";
            QuestionList_Arr = Category_DL_Arr;
            Category_className = "daily";
            break;
        default:
            console.log("create_QuestionList() : Category Not Found!");
    }
    let category_div = document.createElement('div');
    category_div.setAttribute('id', eval("'" + Category_className + "_box'"));

    for(let i=0; i< QuestionList_Arr.length; i++){
        let child = document.createElement('div');
        child.setAttribute('id', eval("'" + QuestionList_Arr[i].code + "'"));//질문코드가 id
        child.setAttribute('class',eval("'Question_Style " + Category_className + "'"));
        child.setAttribute('name', eval("'" + category + "'"));
        child.setAttribute('onclick', eval("'show_Answer(`" + QuestionList_Arr[i].code + "_Answer`)'" ));
            let closeBtn = document.createElement('input');
            closeBtn.setAttribute('type', 'button');
            closeBtn.setAttribute('value', 'X');
            closeBtn.setAttribute('class', 'Question_CloseBtn');
            closeBtn.setAttribute('onclick', eval("'QuestionClose(`" + QuestionList_Arr[i].code + "`)'"));
            child.appendChild(closeBtn);

            let modifiyBtn = document.createElement('input');
            modifiyBtn.setAttribute('id', eval("'" + QuestionList_Arr[i].code + "_modifyBtn'"));
            modifiyBtn.setAttribute('type', 'button');
            modifiyBtn.setAttribute('value', '수정');
            modifiyBtn.setAttribute('class', 'Question_modifiyBtn');
            modifiyBtn.setAttribute('style', 'border: 2px solid #dcdcdca8; background-color: #dcdcdca8;');
            //modifiyBtn.setAttribute('disabled', 'false');
            modifiyBtn.setAttribute('onclick', eval("'QuestionModify(`" + QuestionList_Arr[i].code + "`)'"));
            child.appendChild(modifiyBtn);


            let sequence_div = document.createElement('div');//순서변경
            sequence_div.setAttribute('style', 'float:right; margin-right: 15px;');

                let upbtn = document.createElement('img');
                upbtn.setAttribute('class', 'upbtn_style sequence_btn');
                upbtn.setAttribute('src', './img/icons/up_btn.png');
                upbtn.setAttribute('style', 'display:none;');
                upbtn.setAttribute('onclick', eval("'prevSeq(event,`" + QuestionList_Arr[i].code + "`)'"));
                sequence_div.appendChild(upbtn);
                let downbtn = document.createElement('img');
                downbtn.setAttribute('class', 'downbtn_style sequence_btn');
                downbtn.setAttribute('src', './img/icons/down_btn.png');
                downbtn.setAttribute('style', 'display:none;');
                downbtn.setAttribute('onclick', eval("'nextSeq(event,`" + QuestionList_Arr[i].code + "`)'"));
                sequence_div.appendChild(downbtn);
            child.appendChild(sequence_div);

            
        
            let Icon = document.createElement('span');
            let IconText = document.createTextNode(categoryIcon_txt);
            Icon.setAttribute('class', 'category_Icon');
            Icon.setAttribute('style', eval("'color:" + categoryIcon_color + ";'"));
            Icon.appendChild(IconText);
            child.appendChild(Icon);

            let QuestionContent = document.createElement('span');
            let QuestionContent_Text;
			if(QuestionList_Arr[i].type == '0'){
				QuestionContent_Text = document.createTextNode("사용자 신체관련 질문입니다.");
			}else if(QuestionList_Arr[i].type == '1'){
				QuestionContent_Text = document.createTextNode("슬라이드 형식 질문입니다.");
			}else {
				QuestionContent_Text = document.createTextNode(QuestionList_Arr[i].question);
			}
			QuestionContent.setAttribute('class', 'QuestionText');
            QuestionContent.setAttribute('id', eval("'" + QuestionList_Arr[i].code + "_Question'"));
            QuestionContent.appendChild(QuestionContent_Text);
            child.appendChild(QuestionContent);

            let enter = document.createElement('br');
            child.appendChild(enter);

            //질문리스트에서 해당 답변 항목 생성 파트
            let AnswerDiv = document.createElement('div');
            AnswerDiv.setAttribute("id", eval("'" + QuestionList_Arr[i].code + "_Answer'"));
            AnswerDiv.setAttribute("style", "display: none;");
            let AnswerCount = 0, Answer_arr = [];
            switch(QuestionList_Arr[i].type){
                case "0":
                    AnswerCount = -1;
                    break;
                case "1":
                    AnswerCount = -2;
                    break;
                case "2":
                    AnswerCount = 2; 
                    Answer_arr = ["a2","a1"];
                    break;
                case "3":
                    AnswerCount = 3;
                    Answer_arr = ["a3","a2","a1"];
                    break;
                case "4":
                    AnswerCount = 4;
                    Answer_arr = ["a4","a3","a2","a1"];
                    break;
            }
            if(AnswerCount > 0){//답변타입 2항/3항/4항
                let AnswerObj = JSON.parse(QuestionList_Arr[i].option);
                for(let p=1; p <= AnswerCount; p++){
                    let AnswerText = document.createElement('div');
                    let AnswerText_val = document.createTextNode('o 답변' + p + ': ' + AnswerObj[Answer_arr.pop()]);//각각의 답변값들
                    AnswerText.setAttribute('class', 'AnswerText');
                    AnswerText.setAttribute('id', eval("'" + QuestionList_Arr[i].code + "_Answer" + p +"'"));
                    AnswerText.appendChild(AnswerText_val);
                    AnswerDiv.appendChild(enter);
                    AnswerDiv.appendChild(AnswerText);
                }
            } else {//답변타입 신체/슬라이드
                let Default_Answer = document.createElement('div');
                Default_Answer.setAttribute('class', 'AnswerText');
				if(AnswerCount == -1){
                    let Default_Answer_text1 = document.createTextNode('(기본값)사용자 신체관련 질문입니다.');
                    Default_Answer.appendChild(Default_Answer_text1); 
                } else if(AnswerCount == -2){
                    let Default_Answer_text2 = document.createTextNode('(기본값)사용자 슬라이드 질문입니다.');
                    Default_Answer.appendChild(Default_Answer_text2); 
                } else {
                    console.log("Error 404: Not Found : function create_QuestionList() >> Answer Value is None");
                }
                AnswerDiv.appendChild(enter);
                AnswerDiv.appendChild(Default_Answer);
            }
            child.appendChild(AnswerDiv);

            let InputText = document.createElement('div');
            InputText.setAttribute("id", eval("'" + QuestionList_Arr[i].code + "_Input'"));
            InputText.setAttribute("style", "display: none; margin-top: 10px");

                let Question_Input = document.createElement('input');
                Question_Input.setAttribute("id", eval("'" + QuestionList_Arr[i].code + "_Input_Question'"));
                Question_Input.setAttribute('style', 'font-size: 20px; margin-left: 95px; width: 80%;');
                Question_Input.setAttribute('placeholder', '질문사항을 수정해주세요.');
                InputText.appendChild(Question_Input);

                
                for(let n=1; n <= AnswerCount; n++){
                    let br = document.createElement('br');
                    InputText.appendChild(br);

                    let Answer_Input = document.createElement('input');
                    Answer_Input.setAttribute("id", eval("'" + QuestionList_Arr[i].code + "_Input_Answer"+ n +"'"));
                    Answer_Input.setAttribute('style', 'font-size: 20px; margin-left: 115px; width: 78%; margin-top: 10px;');
                    Answer_Input.setAttribute('placeholder', '답변항목을 수정해주세요.');
                    InputText.appendChild(Answer_Input);
                }

                let div1 = document.createElement('div');
                div1.setAttribute('style', 'height: 35px; margin-top: 20px;');
                    let CancelBtn = document.createElement('input');
                    CancelBtn.setAttribute('type', 'button');
                    CancelBtn.setAttribute('value', '취소');
                    CancelBtn.setAttribute('class','modify_cancelBtn');
                    CancelBtn.setAttribute('onclick', eval("'CancelModify(`" + QuestionList_Arr[i].code + "`)'"));
                    div1.appendChild(CancelBtn);

                    let SaveBtn = document.createElement('input');
                    SaveBtn.setAttribute('type', 'button');
                    SaveBtn.setAttribute('value', '저장');
                    SaveBtn.setAttribute('class','modify_saveBtn');
                    SaveBtn.setAttribute('onclick', eval("'SaveModify(`" + QuestionList_Arr[i].code + "`)'"));
                div1.appendChild(SaveBtn);
                
                InputText.appendChild(div1);
            child.appendChild(InputText);
            category_div.appendChild(child);
    }
    parent.appendChild(category_div);
    is_Empty();
}

function nextSeq(event, div_id){//질문 순서 변경 테스트
    event.stopPropagation();
    let this_elem = document.getElementById(div_id);
    let next_elem = this_elem.nextElementSibling;

    if(next_elem == null){
        alert("마지막 입니다!");
    } else {
        next_elem.insertAdjacentElement('afterend', this_elem);
        //alert("변경되었습니다!");
        changeBackgroundColor(this_elem, next_elem);
    }
}

function prevSeq(event, div_id){
    event.stopPropagation();
    let this_elem = document.getElementById(div_id);
    let prev_elem = this_elem.previousElementSibling;
    if(prev_elem == null){
        alert("첫번째 입니다!");
    } else {
        prev_elem.insertAdjacentElement('beforebegin', this_elem);
        //alert("변경되었습니다!");
        changeBackgroundColor(this_elem, prev_elem);
    }
}

function changeBackgroundColor(elem1, elem2) {
    elem1.classList.add('clicked');
    //elem2.classList.add('clicked');

    setTimeout(() => {
        elem1.classList.remove('clicked');
        //elem2.classList.remove('clicked');
    }, 1000);
}
  



function sequenceChange(btn){//질문 순서 변경 모드 버튼
    let cate_daily = document.getElementById('daily_box');
    let cate_health = document.getElementById('health_box');
    let cate_mind = document.getElementById('mind_box');
    let cate_safe = document.getElementById('safe_box');

    let style_on = 'border: 6px solid #3c4e57;border-radius: 5px; margin-bottom: 10px; padding: 10px 10px 0px 10px';
    let style_off = '';
    let mode = document.getElementById("seq_btn").className;
    
    let seq_cancel = document.getElementById("create_Question");
    

    if(mode == "sequence_change"){
        cate_daily.style = style_on;
        cate_health.style = style_on
        cate_mind.style = style_on;
        cate_safe.style = style_on;

        let buttons = document.querySelectorAll('.sequence_btn');
        for (let btn_index = 0; btn_index < buttons.length; btn_index++) {
            buttons[btn_index].style.display = 'block';
        }

        btn.value = "순서 변경 완료";
        seq_cancel.value = "취소하기";
        seq_cancel.setAttribute('onclick', 'sequenceCancel()');
    } else {
        cate_daily.style = style_off;
        cate_health.style = style_off
        cate_mind.style = style_off;
        cate_safe.style = style_off;

        let buttons = document.querySelectorAll('.sequence_btn');
        for (let btn_index = 0; btn_index < buttons.length; btn_index++) {
            buttons[btn_index].style.display = 'none';
        }

        btn.value = "순서 변경 지정";
        seq_cancel.value = "질문 생성하기";
        seq_cancel.setAttribute('onclick', 'openModal()');
        isSeqchange();
    }
    
    seq_cancel.classList.toggle('active');
    btn.classList.toggle('active');
}

function isSeqchange(){//순서변경 완료 후 기존 순서에서 변경되었는지 확인
    let D_elem = document.getElementById('daily_box');
    let Dchild = D_elem.children;
    let Dseq = Array.from(Dchild).map(div => div.id);

    let H_elem = document.getElementById('health_box');
    let Hchild = H_elem.children;
    let Hseq = Array.from(Hchild).map(div => div.id);

    let S_elem = document.getElementById('safe_box');
    let Schild = S_elem.children;
    let Sseq = Array.from(Schild).map(div => div.id);

    let M_elem = document.getElementById('mind_box');
    let Mchild = M_elem.children;
    let Mseq = Array.from(Mchild).map(div => div.id);

    let is_change = false;

    if(JSON.stringify(DL_sequence) != JSON.stringify(Dseq)){
        updateSeq(Dseq);
        console.log("일상 순서 바뀜");//순서 변경 api만 적용하면 됨
        is_change = true;
    }
    if(JSON.stringify(H_sequence) != JSON.stringify(Hseq)){
        updateSeq(Hseq);
        console.log("건강 순서 바뀜");
        is_change = true;
    }
    if(JSON.stringify(S_sequence) != JSON.stringify(Sseq)){
        updateSeq(Sseq);
        console.log("안전 순서 바뀜");
        is_change = true;
    }
    if(JSON.stringify(M_sequence) != JSON.stringify(Mseq)){
        updateSeq(Mseq);
        console.log("마음 순서 바뀜");
        is_change = true;
    }

    if(is_change){
        alert("적용되었습니다!");
        location.reload();
    }
}

//async function updateSeq(seq_data){
function updateSeq(seq_data){
    console.log("등록함" + seq_data);
    // await axios.post("http://apionsaemiro.site/api/",{
    //     code: seq_data
    // }).then((response) => {
    //     if (response) {
    //     console.log(response.data);
    // }
    // })
    // .catch((error) => {
    //     console.log(error);
    
    // });
}


function sequenceCancel(){//질문 순서 변경 취소
    console.log("취소되었습니다");
    location.reload();
}
async function QuestionClose(id){
	if(confirm("질문을 삭제하시겠습니까?")){
		document.getElementById(id).style.display = "none";
		console.log(id);
		await axios.post("http://apionsaemiro.site/api/delete_question",{
			code:id
		}).then((response) => {
     	 if (response) {
        //imageurl = response.data;
        	console.log(response.data);
      	}
    	})
    	.catch((error) => {
      		console.log(error);
      	
    	});
		location.reload();
	}
	//삭제 api 요청
}
//문진표 질문 리스트 확인 및 검색 관련

function QuestionModify(questionId){
    is_modify = questionId + "_Answer";
    document.getElementById(is_modify).style.display = "block";
    document.getElementById(questionId + "_Input").style.display = "block";

    let btn = document.getElementById(questionId + "_modifyBtn");
    btn.disabled = true;
    btn.value = "수정 중";
    btn.style = "border: 2px solid #569ff7;background-color: #569ff7; color: white;"
}

function CancelModify(questionId){
    document.getElementById(is_modify).style.display = "none";
    is_modify = "";
    document.getElementById(questionId + "_Input").style.display = "none";
    
    let btn = document.getElementById(questionId + "_modifyBtn");
    btn.disabled = false;
    btn.value = "수정";
    btn.style = "border: 2px solid #dcdcdca8;background-color: #dcdcdca8; color: black;"
}


async function SaveModify(questionId){
    if(confirm("변경사항을 업데이트하시겠습니까?")){
        let modify_question = document.getElementById(questionId + "_Input_Question").value;

        let elemCount = document.getElementById(questionId +"_Input").childElementCount;
        let answerCount = (elemCount - 2)/2;
        let answer_data = {
            a1: "",
            a2: "",
            a3: "",
            a4: ""
        }
        for(v=1; v <= answerCount; v++){
            switch(v){
                case 1: 
                    answer_data.a1 = document.getElementById(questionId + "_Input_Answer1").value;
                    break;
                case 2: 
                    answer_data.a2 = document.getElementById(questionId + "_Input_Answer2").value;
                    break;
                case 3: 
                    answer_data.a3 = document.getElementById(questionId + "_Input_Answer3").value;
                    break;
                case 4: 
                    answer_data.a4 = document.getElementById(questionId + "_Input_Answer4").value;
                    break;
            }
        }

        await axios.post("http://apionsaemiro.site/api/modify_question",{
			code: questionId,
            question: modify_question,
            option: JSON.stringify(answer_data)
		}).then((response) => {
     	 if (response) {
        	console.log(response.data);
      	}
    	})
    	.catch((error) => {
      		console.log(error);
      	
    	});
		location.reload();
    }
}

function filter() {
    let search = document.getElementById("search_Question").value.toLowerCase();
    let listInner = document.getElementsByClassName("Question_Style");

    for (let i = 0; i < listInner.length; i++) {
        if(listInner[i].value != false){
            Question = listInner[i].getElementsByClassName("QuestionText");
            if (Question[0].innerHTML.toLowerCase().indexOf(search) != -1) {
                listInner[i].style.display = "block"
            } else {
                listInner[i].style.display = "none"
            }
        }
        
    }
    is_Empty();
}
var Mind = true, Health = true, Safe = true, Daily = true;

function checkMind(){
    Mind = !Mind;//토글버튼처럼 작동
    let con = document.getElementById("categoryBtn_M");
    if(Mind){
        con.style.backgroundColor = "#FEBE8C";
    } else {
        con.style.backgroundColor = "lightgrey";
    }
    Show_Question(Mind, "Mind");
}
function checkHealth(){
    Health = !Health;//토글버튼처럼 작동
    let con = document.getElementById("categoryBtn_H");
    if(Health){
        con.style.backgroundColor = "#B6E2A1";
    } else {
        con.style.backgroundColor = "lightgrey";
    }
    Show_Question(Health, "Health");
}
function checkSafe(){
    Safe = !Safe;//토글버튼처럼 작동
    let con = document.getElementById("categoryBtn_S");
    if(Safe){
        con.style.backgroundColor = "#F7A4A4";
    } else {
        con.style.backgroundColor = "lightgrey";
    }
    Show_Question(Safe, "Safe");
}
function checkDaily(){
    Daily = !Daily;//토글버튼처럼 작동
    let con = document.getElementById("categoryBtn_DL");
    if(Daily){
        con.style.backgroundColor = "#FFFBC1";
    } else {
        con.style.backgroundColor = "lightgrey";
    }
    Show_Question(Daily, "DailyLife");
}

function Show_Question(bool, category){
    let con = document.getElementsByName(category);
    for(let i=0;i < con.length; i++){
        if(bool){
            con[i].style.display = "block";
            con[i].value = true;
        } else {
            con[i].style.display = "none";
            con[i].value = false;
        }     
    }
    is_Empty();
}

function is_Empty(){
    let listInner = document.getElementsByClassName("Question_Style");
    let is_Find = true;
    for(let i=0; i < listInner.length; i++){
        if(listInner[i].style.display == "block"){
            is_Find = false;
        }
    }
    if(is_Find){
        document.getElementById("Empty_Question").style.display = "block";
    } else {
        document.getElementById("Empty_Question").style.display = "none";
    }

}

//모달팝업 기본 함수
function openModal(){
    document.getElementById("Input_Survey_bg").style.display ='block';
    document.getElementById("Input_Survey_modal").style.display ='block';
}
function closeModal(){
    document.getElementById("Input_Survey_bg").style.display ='none';
    document.getElementById("Input_Survey_modal").style.display ='none';

    //선택형-2항일때 기존 데이터 초기화
    document.getElementById("Question_Img").innerHTML = "";
    document.getElementById("Question_Img").style.display = "none";
    document.getElementById("Question_Txt").innerText = "* 필수입력 사항입니다";
    document.getElementById("Question_Txt").style.color = "black";
    document.getElementById("Question").value = "";
    document.getElementById("Question_file").value = "";

    document.getElementById("Answer1_Img").innerHTML = "";
    document.getElementById("Answer1_Img").style.display = "none";
    document.getElementById("Answer1_Txt").innerText = "* 필수입력 사항입니다";
    document.getElementById("Answer1_Txt").style.color = "black";
    document.getElementById("Answer1").value = "";
    document.getElementById("Answer1_file").value = "";

    document.getElementById("Answer2_Img").innerHTML = "";
    document.getElementById("Answer2_Img").style.display = "none";
    document.getElementById("Answer2_Txt").innerText = "* 필수입력 사항입니다";
    document.getElementById("Answer2_Txt").style.color = "black";
    document.getElementById("Answer2").value = "";
    document.getElementById("Answer2_file").value = "";
}
function openpreview(){
    document.getElementById("preview_bg").style.display ='block';
    document.getElementById("preview_modal").style.display ='block';
    let type_val = document.getElementById("Question_Type").value;
    switch(type_val){
        case '2':
            Create_Preview_2Choice();
            break;
        case '3':
            Create_Preview_3Choice();
            break;
        case '4':
            Create_Preview_4Choice();
            break;
        default:
            console.log("미리보기 항목이 없습니다");
    }
}
function closepreview(){
    document.getElementById("preview_bg").style.display ='none';
    document.getElementById("preview_modal").style.display ='none';
    document.getElementById("phone_interior").innerHTML = "";
}


//질문창 작동관련
function QuestionType(){//선택한 항목에 따라 div 생성
    let TypeVal = document.getElementById("Question_Type").value;
    let AnswerList = document.getElementById("AnswerList_body");
    AnswerList.innerHTML = "";
    switch(TypeVal){
        case "0":
            create_Default_Slide(AnswerList);
            break;
        case "1":
            create_Default_Slide(AnswerList);
            break;
        case "2":
            create_Select(AnswerList, 2);
            break;
        case "3":
            create_Select(AnswerList, 3);
            break;
        case "4":
            create_Select(AnswerList, 4);
            break;
        default:
            console.log("QuestionType() : Error!");
    }
}


function create_Default_Slide(parent){
    let child = document.createElement('h4');
    child.setAttribute('style', 'font-weight: bold; padding: 3px; color: gray;background-color: lightgray;');
    let child_txt = document.createTextNode('기본값 입니다.');
    child.appendChild(child_txt);
    parent.appendChild(child);
}

function create_Select(parent, index){
    for(let i=1;i<= index; i++){
        let child = document.createElement('div');
            let Img = document.createElement('div');
            Img.setAttribute('id', eval("'Answer" + i + "_Img'"));
            Img.setAttribute('class', 'Answer_Img_style');
            Img.setAttribute('style', 'display:none;');
            child.appendChild(Img);
            let Txt = document.createElement('div');
            let Txt_str = document.createTextNode("* 필수입력 사항입니다");
            Txt.setAttribute('id', eval("'Answer" + i + "_Txt'"));
            Txt.setAttribute('style', 'color:black; font-size: 14px;');
            Txt.appendChild(Txt_str);
            child.appendChild(Txt);
            let Answer = document.createElement('input');
            Answer.setAttribute('type', 'text');
            Answer.setAttribute('id', eval("'Answer" + i + "'"));
            Answer.setAttribute('class', 'Text_style');
            Answer.setAttribute('placeholder', '답변내용을 입력하세요.');
            Answer.setAttribute('onkeyup', eval("'Detect_Str(`Answer" + i + "`)'"));
            child.appendChild(Answer);
            let ImgBtn = document.createElement('input');
            ImgBtn.setAttribute('type', 'image');
            ImgBtn.setAttribute('class', 'ImgBtn_style');
            ImgBtn.setAttribute('value', '사진 추가하기');
            ImgBtn.setAttribute('src', './img/icons/imgBtn.png');
            ImgBtn.setAttribute('onclick', eval("'document.all.Answer" + i + "_file.click()'"));
            child.appendChild(ImgBtn);
            let file = document.createElement('input');
            file.setAttribute('type', 'file');
            file.setAttribute('id', eval("'Answer" + i + "_file'"));
            file.setAttribute('style', 'display:none;');
            file.setAttribute('onchange', eval("'loadFile(this, `Answer" + i + "`)'"));
            child.appendChild(file);
        parent.appendChild(child);
    }
}


function Detect_Str(divId){
    let Input_Val = document.getElementById(divId);
    let Txt = document.getElementById(divId + "_Txt");
    let img = document.getElementById(divId + "_Img");
    if(Input_Val.value == '' && img.value == ''){
        Txt.style.display = "block";
        Txt.style.color = "red";
        Txt.style.marginTop = "0px";
        Txt.innerText = "* 해당 입력칸에 내용이 없습니다.";
    } else {
        Txt.innerText = "";
        Txt.style.marginTop = "21px";
    }
}

function showImage(div_id) {
    document.getElementById(div_id + "_Img").style.display = 'block';
    document.getElementById(div_id + '_Txt').style.color = '#007944';
    document.getElementById(div_id + "_Txt").style.marginTop = "0px";
    document.getElementById(div_id + '_Txt').innerText ="*사진 업로드가 완료되었습니다";
    var newImage = document.getElementById(div_id + '_Img').lastElementChild;
    newImage.style.display= "block";
}


function loadFile(input ,div_id) {
    var file = input.files[0];
    var newImage = document.createElement("img");
    newImage.setAttribute("class", 'img');
    newImage.src = URL.createObjectURL(file);   
    newImage.style.width = "100%";
    newImage.style.height = "100%";
    var container = document.getElementById(div_id + '_Img');
    if(container.children.length > 0){
        container.innerHTML = "";
    }
    container.appendChild(newImage);

    showImage(div_id);
};


//2항 미리보기
function Create_Preview_2Choice(){
    //2항 질문칸 구역
    let parent = document.getElementById("phone_interior");
    let Question_interior = document.createElement("div");
    Question_interior.setAttribute('id', 'Question_Interior');
    Question_interior.setAttribute('class', 'Question_2Choice');
        let Q_body = document.createElement("div");
        Q_body.setAttribute('id', 'Question_Body');
        Q_body.setAttribute('style', 'width: 320px; height: 280px; padding: 10px');
            //2항 질문칸 미리보기 - 질문 사진
            if(document.getElementById("Question_Img").children.length > 0){//질문칸 사진이 있는지 확인
                let Q_img = document.createElement('img');
                Q_img.setAttribute('class', 'Question_img_2Choice');
                Q_img.src = document.getElementById("Question_Img").children[0].src;//질문 사진값
                Q_body.appendChild(Q_img);
            }
            //2항 질문칸 미리보기 - 질문 내용
            let Q_txt = document.createElement("div");
            Q_txt.setAttribute('id', 'Question_txt');
            Q_txt.textContent = document.getElementById("Question").value;//질문 txt값
            Q_body.appendChild(Q_txt);
        Question_interior.appendChild(Q_body);
    parent.appendChild(Question_interior);

    //2항 답변칸 전체 구역
    let Answer_group = document.createElement("div");
    Answer_group.setAttribute('id', 'Answer_Group');
    Answer_group.setAttribute('style', 'margin-top: 10px; height: 206px;');
        //첫번째 답변 구역
        let Answer1_interior = document.createElement('div');
        Answer1_interior.setAttribute('id', 'Answer1_Interior');
        Answer1_interior.setAttribute('class', 'Answer_2Choice_Style');
            let Answer1_body = document.createElement('div');
            Answer1_body.setAttribute('id', 'Answer1_body');
                //2항 답변1칸 미리보기 - 답변1 사진 
                if(document.getElementById("Answer1_Img").children.length > 0){//답변1 사진이 있는지 확인
                    let A1_img = document.createElement('img');
                    A1_img.setAttribute('class', 'Answer_img_2Choice');
                    A1_img.src = document.getElementById("Answer1_Img").children[0].src;//답변1 사진값 
                    Answer1_body.appendChild(A1_img);
                }
                //2항 답변1칸 미리보기 - 답변1 내용 
                let A1_txt = document.createElement('div');
                A1_txt.setAttribute('id', 'Answer1_txt');
                A1_txt.setAttribute('class', 'Answer_txt_style1');
                A1_txt.textContent = document.getElementById("Answer1").value;//답변1 txt값
                Answer1_body.appendChild(A1_txt);
            Answer1_interior.appendChild(Answer1_body);
            Answer_group.appendChild(Answer1_interior);
        

        //두번째 답변 구역
        let Answer2_interior = document.createElement('div');
        Answer2_interior.setAttribute('id', 'Answer2_Interior');
        Answer2_interior.setAttribute('class', 'Answer_2Choice_Style');
            let Answer2_body = document.createElement('div');
            Answer2_body.setAttribute('id', 'Answer2_body');
                //2항 답변2칸 미리보기 - 답변2 사진 
                if(document.getElementById("Answer2_Img").children.length > 0){//답변2 사진이 있는지 확인
                    let A2_img = document.createElement('img');
                    A2_img.setAttribute('class', 'Answer_img_2Choice');
                    A2_img.src = document.getElementById("Answer2_Img").children[0].src;//답변2 사진값 
                    Answer2_body.appendChild(A2_img);
                }
                //2항 답변2칸 미리보기 - 답변2 내용 
                let A2_txt = document.createElement('div');
                A2_txt.setAttribute('id', 'Answer2_txt');
                A2_txt.setAttribute('class', 'Answer_txt_style1');
                A2_txt.textContent = document.getElementById("Answer2").value;//답변2 txt값
                Answer2_body.appendChild(A2_txt);
            Answer2_interior.appendChild(Answer2_body);
        Answer_group.appendChild(Answer2_interior);
    parent.appendChild(Answer_group);
}

//3항 미리보기
function Create_Preview_3Choice(){
    //3항 질문칸 구역
    let parent = document.getElementById("phone_interior");
    let Question_interior = document.createElement("div");
    Question_interior.setAttribute('id', 'Question_Interior');
    Question_interior.setAttribute('class', 'Question_3Choice');
        let Q_body = document.createElement("div");
        Q_body.setAttribute('id', 'Question_Body');
        Q_body.setAttribute('style', 'width: 320px; height: 280px; padding: 10px');
            //2항 질문칸 미리보기 - 질문 사진
            if(document.getElementById("Question_Img").children.length > 0){//질문칸 사진이 있는지 확인
                let Q_img = document.createElement('img');
                Q_img.setAttribute('class', 'Question_img_3Choice');
                Q_img.src = document.getElementById("Question_Img").children[0].src;//질문 사진값
                Q_body.appendChild(Q_img);
            }
            //2항 질문칸 미리보기 - 질문 내용
            let Q_txt = document.createElement("div");
            Q_txt.setAttribute('id', 'Question_txt');
            Q_txt.textContent = document.getElementById("Question").value;//질문 txt값
            Q_body.appendChild(Q_txt);
        Question_interior.appendChild(Q_body);
    parent.appendChild(Question_interior);

    //3항 답변칸
    let Answer_group = document.createElement("div");
    Answer_group.setAttribute('id', 'Answer_Group');
    Answer_group.setAttribute('style', 'margin-top: 10px; height: 206px;');
        //첫번째 답변 구역
        let Answer1_interior = document.createElement('div');
        Answer1_interior.setAttribute('id', 'Answer1_Interior');
        Answer1_interior.setAttribute('class', 'Answer_3Choice_Style');
            let Answer1_body = document.createElement('div');
            Answer1_body.setAttribute('id', 'Answer1_body');
                //3항 답변1칸 미리보기 - 답변1 사진 
                if(document.getElementById("Answer1_Img").children.length > 0){//답변1 사진이 있는지 확인
                    let A1_img = document.createElement('img');
                    A1_img.setAttribute('class', 'Answer_img_3Choice');
                    A1_img.src = document.getElementById("Answer1_Img").children[0].src;//답변1 사진값 
                    Answer1_body.appendChild(A1_img);
                }
                //3항 답변1칸 미리보기 - 답변1 내용 
                let A1_txt = document.createElement('div');
                A1_txt.setAttribute('id', 'Answer1_txt');
                A1_txt.setAttribute('class', 'Answer_txt_style1');
                A1_txt.textContent = document.getElementById("Answer1").value;//답변1 txt값
                Answer1_body.appendChild(A1_txt);
            Answer1_interior.appendChild(Answer1_body);
            Answer_group.appendChild(Answer1_interior);
        

        //두번째 답변 구역
        let Answer2_interior = document.createElement('div');
        Answer2_interior.setAttribute('id', 'Answer2_Interior');
        Answer2_interior.setAttribute('class', 'Answer_3Choice_Style');
            let Answer2_body = document.createElement('div');
            Answer2_body.setAttribute('id', 'Answer2_body');
                //3항 답변2칸 미리보기 - 답변2 사진 
                if(document.getElementById("Answer2_Img").children.length > 0){//답변2 사진이 있는지 확인
                    let A2_img = document.createElement('img');
                    A2_img.setAttribute('class', 'Answer_img_3Choice');
                    A2_img.src = document.getElementById("Answer2_Img").children[0].src;//답변2 사진값 
                    Answer2_body.appendChild(A2_img);
                }
                //3항 답변2칸 미리보기 - 답변2 내용 
                let A2_txt = document.createElement('div');
                A2_txt.setAttribute('id', 'Answer2_txt');
                A2_txt.setAttribute('class', 'Answer_txt_style1');
                A2_txt.textContent = document.getElementById("Answer2").value;//답변2 txt값
                Answer2_body.appendChild(A2_txt);
            Answer2_interior.appendChild(Answer2_body);
        Answer_group.appendChild(Answer2_interior);

        //세번째 답변 구역
        let Answer3_interior = document.createElement('div');
        Answer3_interior.setAttribute('id', 'Answer3_Interior');
        Answer3_interior.setAttribute('class', 'Answer_3Choice_Style');
            let Answer3_body = document.createElement('div');
            Answer3_body.setAttribute('id', 'Answer3_body');
                //3항 답변3칸 미리보기 - 답변3 사진 
                if(document.getElementById("Answer3_Img").children.length > 0){//답변3 사진이 있는지 확인
                    let A3_img = document.createElement('img');
                    A3_img.setAttribute('class', 'Answer_img_3Choice');
                    A3_img.src = document.getElementById("Answer3_Img").children[0].src;//답변3 사진값 
                    Answer3_body.appendChild(A3_img);
                }
                //3항 답변3칸 미리보기 - 답변3 내용 
                let A3_txt = document.createElement('div');
                A3_txt.setAttribute('id', 'Answer3_txt');
                A3_txt.setAttribute('class', 'Answer_txt_style1');
                A3_txt.textContent = document.getElementById("Answer3").value;//답변3 txt값
                Answer3_body.appendChild(A3_txt);
            Answer3_interior.appendChild(Answer3_body);
        Answer_group.appendChild(Answer3_interior);
    parent.appendChild(Answer_group);
}
function Create_Preview_4Choice(){
    //4항 질문칸 구역
    let parent = document.getElementById("phone_interior");
    let Question_interior = document.createElement("div");
    Question_interior.setAttribute('id', 'Question_Interior');
    Question_interior.setAttribute('class', 'Question_4Choice');
        let Q_body = document.createElement("div");
        Q_body.setAttribute('id', 'Question_Body');
        Q_body.setAttribute('style', 'width: 320px; height: 240px; margin-left: 10px;');
            //2항 질문칸 미리보기 - 질문 사진
            if(document.getElementById("Question_Img").children.length > 0){//질문칸 사진이 있는지 확인
                let Q_img = document.createElement('img');
                Q_img.setAttribute('class', 'Question_img_4Choice');
                Q_img.src = document.getElementById("Question_Img").children[0].src;//질문 사진값
                Q_body.appendChild(Q_img);
            }
            //2항 질문칸 미리보기 - 질문 내용
            let Q_txt = document.createElement("div");
            Q_txt.setAttribute('id', 'Question_txt');
            Q_txt.textContent = document.getElementById("Question").value;//질문 txt값
            Q_body.appendChild(Q_txt);
        Question_interior.appendChild(Q_body);
    parent.appendChild(Question_interior);

    //4항 답변칸 전체 구역
    let Answer_group = document.createElement("div");//4항 답변칸 전체 구역
    Answer_group.setAttribute('id', 'Answer_Group');
    Answer_group.setAttribute('style', 'height: 260px;');
        //첫번째 답변 구역
        let Answer1_interior = document.createElement('div');
        Answer1_interior.setAttribute('id', 'Answer1_Interior');
        Answer1_interior.setAttribute('class', 'Answer_4Choice_Style');
            let Answer1_body = document.createElement('div');
            Answer1_body.setAttribute('id', 'Answer1_body');
                //4항 답변1칸 미리보기 - 답변1 사진 
                if(document.getElementById("Answer1_Img").children.length > 0){//답변1 사진이 있는지 확인
                    let A1_img = document.createElement('img');
                    A1_img.setAttribute('class', 'Answer_img_4Choice');
                    A1_img.src = document.getElementById("Answer1_Img").children[0].src;//답변1 사진값 
                    Answer1_body.appendChild(A1_img);
                }
                //4항 답변1칸 미리보기 - 답변1 내용 
                let A1_txt = document.createElement('div');
                A1_txt.setAttribute('id', 'Answer1_txt');
                A1_txt.setAttribute('class', 'Answer_txt_style2');
                A1_txt.textContent = document.getElementById("Answer1").value;//답변1 txt값
                Answer1_body.appendChild(A1_txt);
            Answer1_interior.appendChild(Answer1_body);
            Answer_group.appendChild(Answer1_interior);
        

        //두번째 답변 구역
        let Answer2_interior = document.createElement('div');
        Answer2_interior.setAttribute('id', 'Answer2_Interior');
        Answer2_interior.setAttribute('class', 'Answer_4Choice_Style');
            let Answer2_body = document.createElement('div');
            Answer2_body.setAttribute('id', 'Answer2_body');
                //4항 답변2칸 미리보기 - 답변2 사진 
                if(document.getElementById("Answer2_Img").children.length > 0){//답변2 사진이 있는지 확인
                    let A2_img = document.createElement('img');
                    A2_img.setAttribute('class', 'Answer_img_4Choice');
                    A2_img.src = document.getElementById("Answer2_Img").children[0].src;//답변2 사진값 
                    Answer2_body.appendChild(A2_img);
                }
                //4항 답변2칸 미리보기 - 답변2 내용 
                let A2_txt = document.createElement('div');
                A2_txt.setAttribute('id', 'Answer2_txt');
                A2_txt.setAttribute('class', 'Answer_txt_style2');
                A2_txt.textContent = document.getElementById("Answer2").value;//답변2 txt값
                Answer2_body.appendChild(A2_txt);
            Answer2_interior.appendChild(Answer2_body);
        Answer_group.appendChild(Answer2_interior);

        //세번째 답변 구역
        let Answer3_interior = document.createElement('div');
        Answer3_interior.setAttribute('id', 'Answer3_Interior');
        Answer3_interior.setAttribute('class', 'Answer_4Choice_Style');
            let Answer3_body = document.createElement('div');
            Answer3_body.setAttribute('id', 'Answer3_body');
                //4항 답변3칸 미리보기 - 답변3 사진 
                if(document.getElementById("Answer3_Img").children.length > 0){//답변3 사진이 있는지 확인
                    let A3_img = document.createElement('img');
                    A3_img.setAttribute('class', 'Answer_img_4Choice');
                    A3_img.src = document.getElementById("Answer3_Img").children[0].src;//답변3 사진값 
                    Answer3_body.appendChild(A3_img);
                }
                //4항 답변3칸 미리보기 - 답변3 내용 
                let A3_txt = document.createElement('div');
                A3_txt.setAttribute('id', 'Answer3_txt');
                A3_txt.setAttribute('class', 'Answer_txt_style2');
                A3_txt.textContent = document.getElementById("Answer3").value;//답변3 txt값
                Answer3_body.appendChild(A3_txt);
            Answer3_interior.appendChild(Answer3_body);
        Answer_group.appendChild(Answer3_interior);

        //네번째 답변 구역
        let Answer4_interior = document.createElement('div');
        Answer4_interior.setAttribute('id', 'Answer4_Interior');
        Answer4_interior.setAttribute('class', 'Answer_4Choice_Style');
            let Answer4_body = document.createElement('div');
            Answer4_body.setAttribute('id', 'Answer4_body');
                //4항 답변4칸 미리보기 - 답변4 사진 
                if(document.getElementById("Answer4_Img").children.length > 0){//답변4 사진이 있는지 확인
                    let A4_img = document.createElement('img');
                    A4_img.setAttribute('class', 'Answer_img_4Choice');
                    A4_img.src = document.getElementById("Answer4_Img").children[0].src;//답변4 사진값 
                    Answer4_body.appendChild(A4_img);
                }
                //4항 답변4칸 미리보기 - 답변4 내용 
                let A4_txt = document.createElement('div');
                A4_txt.setAttribute('id', 'Answer4_txt');
                A4_txt.setAttribute('class', 'Answer_txt_style2');
                A4_txt.textContent = document.getElementById("Answer4").value;//답변4 txt값
                Answer4_body.appendChild(A4_txt);
            Answer4_interior.appendChild(Answer4_body);
        Answer_group.appendChild(Answer4_interior);
    parent.appendChild(Answer_group);
}
function Reset_Preview(){

}

async function Create_Question(){//생성하기를 누르면 입력된 정보 다 긁어오고 기존 정보 초기화
    let Request_API_Obj = new Object();
    let Answer_Obj = { a1:"", a2:"", a3:"", a4:""};
    let type = document.getElementById("Question_Type").value;

    Request_API_Obj.category = document.getElementById("Question_category").value;//카테고리
    Request_API_Obj.type = type;//문제유형
    Request_API_Obj.question = document.getElementById("Question").value;//질문내용
    switch(type){
        case "0"://기본값으로 인한 답 가져오기 생략 사진값 한개만 존재 
            break;
        case "1"://기본값으로 인한 답 가져오기 생략 사진값 한개만 존재
            //Answer_Obj.a1 = document.getElementById("Answer1").value;
            break;
        case "2":
            Answer_Obj.a1 = document.getElementById("Answer1").value;
            Answer_Obj.a2 = document.getElementById("Answer2").value;
            break;
        case "3":
            Answer_Obj.a1 = document.getElementById("Answer1").value;
            Answer_Obj.a2 = document.getElementById("Answer2").value;
            Answer_Obj.a3 = document.getElementById("Answer3").value;
            break;
        case "4":
            Answer_Obj.a1 = document.getElementById("Answer1").value;
            Answer_Obj.a2 = document.getElementById("Answer2").value;
            Answer_Obj.a3 = document.getElementById("Answer3").value;
            Answer_Obj.a4 = document.getElementById("Answer4").value;
            break;
    }
    console.log(Answer_Obj);

    Request_API_Obj.option = Answer_Obj;//답변내용
    let Photo_Obj = { q: "", a1: "", a2: "", a3: "", a4: ""};
    Photo_Obj.q = await Post_Img(document.getElementById("Question_file").files[0]);//질문내용 

    switch(type){
        case "2":
            for(let i=1;i<= 2;i++){
                let AnswerImg = document.getElementById("Answer" + i + "_file");
               //if(AnswerImg.children.length > 0){//사진값이 있는지 확인
                    if(i == 1){
                        Photo_Obj.a1 = await Post_Img(AnswerImg.files[0]);//질문내용 이미지 링크값 가져오기
                    	console.log(Photo_Obj.a1)
					} else if(i == 2){
                        Photo_Obj.a2 = await Post_Img(AnswerImg.files[0]);
                    	console.log(Photo_Obj.a2)
                    }
                //}
            }
            break;
        case "3":
            for(let i=1;i<= 3;i++){
                let AnswerImg = document.getElementById("Answer" + i + "_file");
                //if(AnswerImg.children.length > 0){//사진값이 있는지 확인
                    if(i == 1){
                        Photo_Obj.a1 = await Post_Img(AnswerImg.files[0]);
                    } else if(i == 2){
                        Photo_Obj.a2 = await Post_Img(AnswerImg.files[0]);
                    } else if(i == 3){
                        Photo_Obj.a3 = await Post_Img(AnswerImg.files[0]);
                    }
                //}
            }
            break;
        case "4":
            for(let i=1;i<=4;i++){   
			console.log("for루프 실행");
			let AnswerImg = document.getElementById("Answer" + i + "_file");
                //if(AnswerImg.children.length > 0){//사진값이 있는지 확인
					console.log("사진값 체크");
                    if(i == 1){console.log("답변1 올리기");
                        Photo_Obj.a1 = await Post_Img(AnswerImg.files[0]); console.log(Photo_Obj.a1);
                    } else if(i == 2){
                        Photo_Obj.a2 = await Post_Img(AnswerImg.files[0]); console.log(Photo_Obj.a2);
                    } else if(i == 3){
                        Photo_Obj.a3 = await Post_Img(AnswerImg.files[0]); console.log(Photo_Obj.a3);
                    } else if(i == 4){
                        Photo_Obj.a4 = await Post_Img(AnswerImg.files[0]); console.log(Photo_Obj.a4);
                    }
                //}
            }
            break;
    
	}

    Request_API_Obj.photo = Photo_Obj;
	
    console.log(Request_API_Obj); alert("질문이 생성되었습니다!");
    Request_API_Question(Request_API_Obj);
   	closeModal();
	location.reload();
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
        // if (error.response) {
        //   // The request was made and the server responded with a status code
        //   // that falls out of the range of 2xx
        //   console.log(error.response.data);
        //   console.log(error.response.status);
        //   console.log(error.response.headers);
        // } else if (error.request) {
        //   // The request was made but no response was received
        //   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        //   // http.ClientRequest in node.js
        //   console.log(error.request);
        // } else {
        //   // Something happened in setting up the request that triggered an Error
        //   console.log("Error", error.message);
        // }
        console.log(error);
        window.alert("게시물 작성에 실패했습니다.");
      });
  }
  // 사진 업로드 : post
  // http://ec2-43-201-19-40.ap-northeast-2.compute.amazonaws.com/api/upload_photo
  // 리턴값 -> 사진 링크
  return imageurl;
}

async function Request_API_Question(data){//새로운 질문 Post
	await axios.post('http://apionsaemiro.site/api/create_question', {
		category:data.category,
		type:data.type,
		question:data.question,
		option:JSON.stringify(data.option),
		photo:JSON.stringify(data.photo)
	}).then(function(res){
		console.log(res);

	}).catch((err)=>{
		console.log(err)
	});
    
}
