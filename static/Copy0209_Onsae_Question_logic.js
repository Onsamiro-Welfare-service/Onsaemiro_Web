/**질문 생성: post
http://ec2-43-201-19-40.ap-northeast-2.compute.amazonaws.com/api/create_question
{
    "category" :  카테고리 코드
    "type" :  답변 타입 (0: 선택지 2개, 1: 선택지 3개, 2: 선택지 10개 <- 나중에 확실히 정하면 될듯)
    "body" : 질문 내용
    "option" : 답변 내용 <- 프론트쪾에서 불러오기 쉬은 방식으로 만든 뒤 스트링으로 변환해서 보내주면 됨. 아마 JSON 배열 방식이 편하지 않을까 싶음
    “Photo” : 사진 <- 링크 필요한거 문제 답변 순서 순으로 배열 만들어서 업로드 하면 될듯? 이것도 프론트에서 편한 방식으로 규칙정해서 ㄱㄱㄱ 업로드만 스트링 방식이면 됨
} */

//문진표 질문 받아오기 및 질문리스트 생성
//[{“code":"DL1493","category":"DL","type":"0","option":"{ '1' : 'd', '2' : 'd'}"}]
var Category_DL_Arr = [
    { code: "DL111", category: "DL", type: "1", question:"일상 질문내용1111", option: ["답변1","답변2"], photo: "../src/img/avatars/avatar-1.jpg", alive: true },
    { code: "DL222", category: "DL", type: "1", question:"일상 질문내용2222", option: ["답변1","답변2"], photo: "../src/img/avatars/avatar-2.jpg", alive: true },
    { code: "DL333", category: "DL", type: "1", question:"일상 질문내용3333", option: ["답변1","답변2"], photo: "../src/img/avatars/avatar-3.jpg", alive: true }
];
var Category_S_Arr = [
    { code: "S1111", category: "S", type: "1", question:"안전 질문내용1111", option: ["답변1","답변2"], photo: "../src/img/avatars/avatar-1.jpg", alive: true },
    { code: "S2222", category: "S", type: "1", question:"안전 질문내용2222", option: ["답변1","답변2"], photo: "../src/img/avatars/avatar-2.jpg", alive: true },
    { code: "S3333", category: "S", type: "1", question:"안전 질문내용3333", option: ["답변1","답변2"], photo: "../src/img/avatars/avatar-3.jpg", alive: true },
    { code: "S4444", category: "S", type: "1", question:"안전 질문내용4444", option: ["답변1","답변2"], photo: "../src/img/avatars/avatar-4.jpg", alive: true },
];
var Category_H_Arr = [
    { code: "H1111", category: "H", type: "1", question:"건강 질문내용1111", option: ["답변1","답변2"], photo: "../src/img/avatars/avatar-1.jpg", alive: true },
    { code: "H2222", category: "H", type: "1", question:"건강 질문내용2222", option: ["답변1","답변2"], photo: "../src/img/avatars/avatar-2.jpg", alive: true },
    { code: "H3333", category: "H", type: "1", question:"건강 질문내용3333", option: ["답변1","답변2"], photo: "../src/img/avatars/avatar-3.jpg", alive: true },
    { code: "H4444", category: "H", type: "1", question:"건강 질문내용4444", option: ["답변1","답변2"], photo: "../src/img/avatars/avatar-4.jpg", alive: true },
];
var Category_M_Arr = [
    { code: "M1111", category: "M", type: "1", question:"마음 질문내용1111", option: ["답변1","답변2"], photo: "../src/img/avatars/avatar-1.jpg", alive: true },
    { code: "M2222", category: "M", type: "1", question:"마음 질문내용2222", option: ["답변1","답변2"], photo: "../src/img/avatars/avatar-2.jpg", alive: true },
];
//초기실행
Request_API("DL");
Request_API("S");
Request_API("H");
Request_API("M");

async function Request_API(category){//Request_API("DL");
// 모든 질문 불러오기 (관리자 웹용) <- 삭제로 죽은 질문지까지 모두 불러오는 API:get

    let Request_QuestionAPI = new Object();
    Request_QuestionAPI.category = category;
    // {
    //     "category" : "DL"
    // }
    // https://ec2-43-201-19-40.ap-northeast-2.compute.amazonaws.com/api/load_all_question
    // 리턴값 질문 불러오기와 같음
    let ReturnVal = [];// 받아온 값 ReturnVal에 할당 
 await axios
    .get(
      "http://13.209.212.43/api/load_question",{
		params :{
			category:category,
			
		}
	  }).then(function(response) {
      if (response) {
        //imageurl = response.data;
        console.log(response.data);
		  ReturnVal=response.data;
      //  console.log(response.data.category);
      }
    })
    .catch((error) => {
//      console.log(error);
      
    });


    switch(category){
        case "DL":
            Category_DL_Arr = ReturnVal;
            create_QuestionList("DailyLife");
            //checkDaily(true, "DailyLife");
            break;
        case "S":
            Category_S_Arr = ReturnVal;
            create_QuestionList("Safe");
            //checkSafe(true, "Safe");
            break;
        case "H":
           	Category_H_Arr = ReturnVal;
            create_QuestionList("Health");
            //checkHealth(true, "Health");
            break;
        case "M":
            Category_M_Arr = ReturnVal;
            create_QuestionList("Mind");
            //checkMind(true, "Mind");
            break;
        default:
            console.log("Error Code 404");
    }
}
function create_QuestionList(category){//create_QuestionList("Safe")
    let parent = document.getElementById("QuestionList");
    let categoryIcon_color, categoryIcon_txt;//생성할 항목의 카테고리 속성
    let QuestionList_Arr;//생성할 질문리스트 배열
    switch(category){//카테고리 별 속성 부여
        case "Safe":
            categoryIcon_color = "#FF2626";
            categoryIcon_txt = "안전";
            QuestionList_Arr = Category_S_Arr;
            break;
        case "Mind":
            categoryIcon_color = "#F35588";
            categoryIcon_txt = "마음";
            QuestionList_Arr = Category_M_Arr;
            break;
        case "Health":
            categoryIcon_color = "#007944";
            categoryIcon_txt = "건강";
            QuestionList_Arr = Category_H_Arr;
            break;
        case "DailyLife":
            categoryIcon_color = "#fd7e14";
            categoryIcon_txt = "일상";
            QuestionList_Arr = Category_DL_Arr;
            break;
        default:
            console.log("create_QuestionList() : Category Not Found!");
    }
    for(let i=0; i< QuestionList_Arr.length; i++){
        let child = document.createElement('div');
        child.setAttribute('id', eval("'" + QuestionList_Arr[i].code + "'"));//질문코드가 id
        child.setAttribute('class', 'Question_Style');
        child.setAttribute('name', eval("'" + category + "'"));
            let Icon = document.createElement('span');
            let IconText = document.createTextNode(categoryIcon_txt);
            Icon.setAttribute('class', 'category_Icon');
            Icon.setAttribute('style', eval("'color:" + categoryIcon_color + ";'"));
            Icon.appendChild(IconText);
            child.appendChild(Icon);

            let QuestionContent = document.createElement('span');
            let QuestionContent_Text = document.createTextNode(QuestionList_Arr[i].question);
            QuestionContent.setAttribute('class', 'QuestionText');
            QuestionContent.appendChild(QuestionContent_Text);
            child.appendChild(QuestionContent);

		    let closeBtn = document.createElement('input');
		    closeBtn.setAttribute('type', 'button');
		    closeBtn.setAttribute('value', 'X');
		    closeBtn.setAttribute('style', 'border:none;float:right; background-color:transparent;font-size: 20px; font-weight:bold;');
		    closeBtn.setAttribute('class', 'Question_CloseBtn');
		    closeBtn.setAttribute('onclick', eval("'QuestionClose(`" + QuestionList_Arr[i].code + "`)'"));
		    child.appendChild(closeBtn);
        parent.appendChild(child);
    }
    is_Empty();
}

async function QuestionClose(id){
	if(confirm("질문을 삭제하시겠습니까?")){
		document.getElementById(id).style.display = "none";
		console.log(id);
		await axios.post("http://13.209.212.43/api/delete_question",{
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
function filter() {
    let search = document.getElementById("search_Question").value.toLowerCase();
    let listInner = document.getElementsByClassName("Question_Style");

    for (let i = 0; i < listInner.length; i++) {
        //city = listInner[i].getElementsByClassName("city");
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
    set_Preview();
}
function closepreview(){
    document.getElementById("preview_bg").style.display ='none';
    document.getElementById("preview_modal").style.display ='none';

    //선택형-2항일때 기존 데이터 초기화
    document.getElementById("QuestionImg_screen").innerHTML = "";
    document.getElementById("QuestionTxt_screen").innerText = "";
    document.getElementById("AnswerImg1").innerHTML = "";
    document.getElementById("AnswerImg2").innerHTML = "";
    document.getElementById("AnswerTxt1").innerText = "";
    document.getElementById("AnswerTxt2").innerText = "";
}


//질문창 작동관련

function QuestionType(){//선택한 항목에 따라 div 생성
    let TypeVal = document.getElementById("Question_Type").value;
    let AnswerList = document.getElementById("AnswerList_body");
    AnswerList.innerHTML = "";
    switch(TypeVal){
        case "1":
            create_Slide(AnswerList);
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

//답변칸 생성
function create_Slide(parent){
    let child = document.createElement('div');
        let Txt = document.createElement('div');
        let Txt_str = document.createTextNode("* 필수입력 사항입니다");
        Txt.setAttribute('id', 'Answer0_Txt');
        Txt.setAttribute('style', 'color:black; font-size: 14px;');
        Txt.appendChild(Txt_str);
        child.appendChild(Txt);
        let Answer = document.createElement('input');
        Answer.setAttribute('type', 'text');
        Answer.setAttribute('id', 'Answer0');
        Answer.setAttribute('class', 'Text_style');
        Answer.setAttribute('placeholder', '답변내용을 입력하세요.');
        Answer.setAttribute('onkeyup', 'Detect("Answer0")');
        child.appendChild(Answer);
    parent.appendChild(child);
}

function create_Select(parent, index){
    for(let i=0;i< index; i++){
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
            Answer.setAttribute('onkeyup', eval("'Detect(`Answer" + i + "`)'"));
            child.appendChild(Answer);
            let ImgBtn = document.createElement('input');
            ImgBtn.setAttribute('type', 'image');
            ImgBtn.setAttribute('class', 'ImgBtn_style');
            ImgBtn.setAttribute('value', '사진 추가하기');
            ImgBtn.setAttribute('src', '../src/img/icons/imgBtn.png');
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
    //newImage.setAttribute('id', eval("'" + div_id + "_Img'"))
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


//질문 생성하기&미리보기
function set_Preview(){//미리보기 화면 구성
    //일단 문제유형 - 선택형(2항)만 구현
    let is_QuestionImg = (document.getElementById("Question_Img").children.length > 0);
    let QuestionTxt = document.getElementById("Question").value;
    if(is_QuestionImg){//true면 사진이 있다는 뜻
        var QuestionImage = document.createElement("img");
        QuestionImage.setAttribute("class", 'img');
        //newImage.setAttribute('id', eval("'" + div_id + "_Img'"))
        QuestionImage.src = document.getElementById("Question_Img").children[0].src;
        QuestionImage.style.width = "100%";
        QuestionImage.style.height = "100%";
        var container = document.getElementById("QuestionImg_screen");
        container.appendChild(QuestionImage);
    }
    document.getElementById("QuestionTxt_screen").innerText = QuestionTxt;

    let is_Answer1Img = (document.getElementById("Answer1_Img").children.length > 0);
    let Answer1Txt = document.getElementById("Answer1").value;
    if(is_Answer1Img){//true면 사진이 있다는 뜻
        var Answer1Image = document.createElement("img");
        Answer1Image.setAttribute("class", 'img');
        //newImage.setAttribute('id', eval("'" + div_id + "_Img'"))
        Answer1Image.src = document.getElementById("Answer1_Img").children[0].src;
        Answer1Image.style.width = "100%";
        Answer1Image.style.height = "100%";
        var container = document.getElementById("AnswerImg1");
        container.appendChild(Answer1Image);
    }
    document.getElementById("AnswerTxt1").innerText = Answer1Txt;

    let is_Answer2Img = (document.getElementById("Answer2_Img").children.length > 0);
    let Answer2Txt = document.getElementById("Answer2").value;
    if(is_Answer2Img){//true면 사진이 있다는 뜻
        var Answer2Image = document.createElement("img");
        Answer2Image.setAttribute("class", 'img');
        //newImage.setAttribute('id', eval("'" + div_id + "_Img'"))
        Answer2Image.src = document.getElementById("Answer2_Img").children[0].src;
        Answer2Image.style.width = "100%";
        Answer2Image.style.height = "100%";
        var container = document.getElementById("AnswerImg2");
        container.appendChild(Answer2Image);
    }
    document.getElementById("AnswerTxt2").innerText = Answer2Txt;
}

async function Create_Question(){//생성하기를 누르면 입력된 정보 다 긁어오고 기존 정보 초기화
    let Request_API_Obj = new Object();
    let Answer_Obj = { a1:"", a2:"", a3:"", a4:""};
    let type = document.getElementById("Question_Type").value;

    Request_API_Obj.category = document.getElementById("Question_category").value;//카테고리
    Request_API_Obj.type = type;//문제유형
    Request_API_Obj.question = document.getElementById("Question").value;//질문내용
    switch(type){
        case "1":
            Answer_Obj.a1 = document.getElementById("Answer1").value;
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

    Request_API_Obj.option = Answer_Obj;//답변내용
    let Photo_Obj = { q: "", a1: "", a2: "", a3: "", a4: ""};
    Photo_Obj.q = await Post_Img(document.getElementById("Question_file").files[0]);//질문내용 사진값
    // let Answer_Count = document.getElementById("AnswerList_body").children.length;
    // for(let i=0;i< Answer_Count;i++){
    //     let AnswerImg = document.getElementById("Answer" + i + "_Img");
    //     if(AnswerImg.children.length > 0){//사진값이 있는지 확인
    //         AnswerArr.push(Post_Img(AnswerImg.children[0].src));//질문칸에 넣어진 사진데이터를 링크화해서 넣기
    //     }
    // }
    switch(type){
        case "2":
            for(let i=1;i<= 2;i++){
                let AnswerImg = document.getElementById("Answer" + i + "_file");
               // if(AnswerImg.children.length > 0){//사진값이 있는지 확인
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
                if(AnswerImg.children.length > 0){//사진값이 있는지 확인
                    if(i == 1){
                        Photo_Obj.a1 = await Post_Img(AnswerImg.files[0]);
                    } else if(i == 2){
                        Photo_Obj.a2 =await Post_Img(AnswerImg.files[0]);
                    } else if(i == 3){
                        Photo_Obj.a3 =await Post_Img(AnswerImg.files[0]);
                    }
                }
            }
            break;
        case "4":
            for(let i=1;i<=3;i++){    
			let AnswerImg = document.getElementById("Answer" + i + "_file");
                if(AnswerImg.children.length > 0){//사진값이 있는지 확인
                    if(i == 1){
                        Photo_Obj.a1 = await Post_Img(AnswerImg.files[0]);
                    } else if(i == 2){
                        Photo_Obj.a2 =await Post_Img(AnswerImg.files[0]);
                    } else if(i == 3){
                        Photo_Obj.a3 =await Post_Img(AnswerImg.files[0]);
                    } else if(i == 4){
                        Photo_Obj.a4 =await Post_Img(AnswerImg.files[0]);
                    }
                }
            }
            break;
    }
    Request_API_Obj.photo = Photo_Obj;

    console.log(Request_API_Obj);
    Request_API_Question(Request_API_Obj);
   	closeModal();
	location.reload();
}
async function Post_Img(Img_file){//이미지 파일 업로드
    // 사진 업로드 : post
    // http://ec2-43-201-19-40.ap-northeast-2.compute.amazonaws.com/api/upload_photo
    // 리턴값 -> 사진 링크
//	console.log(123);
	var imageurl;
  if (Img_file) {
    const uploadFile = Img_file;
    const formData = new FormData();
    formData.append("photo", uploadFile);

    await axios.post("http://13.209.212.43/api/upload_photo",formData,
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

   // console.log(Img_file);
	//return Img_file + "";
}

async function Request_API_Question(data){//새로운 질문 Post
	await axios.post('http://13.209.212.43/api/create_question', {
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
    // http://ec2-43-201-19-40.ap-northeast-2.compute.amazonaws.com/api/create_question
    // 질문 생성: post
    // http://ec2-43-201-19-40.ap-northeast-2.compute.amazonaws.com/api/create_question
    // "category" : "DL",
    // "type" : "2",
    // "question" : "밥은 먹었나요?",
    // "option":  "{"a1": "네", "a2": "아니요"}",
    // "photo": "{"q": "http://ec2-43-201-19-40.ap-northeast-2.compute.amazonaws.com/load/eat.png/" , "a1": "http://ec2-43-201-19-40.ap-northeast-2.compute.amazonaws.com/load/check.png/" , "a2": "http://ec2-43-201-19-40.ap-northeast-2.compute.amazonaws.com/load/x.png/" }"
}
