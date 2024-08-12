const sidebar = document.querySelector(".sidebar");

function showSidebar(){
    sidebar.style.display = "flex";
}
function hideSidebar(){
    sidebar.style.display = "none";
}
const questions = [
    {
        question:"In HTML5,which of the following elements is used to define the main content area of a document?",
        answers:[
            {text:"main",correct:true},
            {text:"content",correct:false},
            {text:"body",correct:false},
            {text:"section",correct:false},
        ]
    },
    {
        question:"Which CSS property is used to control the spacing between the lines of text in an element?",
        answers:[
            {text:"line-height",correct:true},
            {text:"letter-spacing",correct:false},
            {text:"text-align",correct:false},
            {text:"margin",correct:false},
        ]
    },
    {
        question:"Which method is used to attach an event handler to a DOM element in JavaScript?",
        answers:[
            {text:"addListener()",correct:false},
            {text:"addEvent()",correct:false},
            {text:"addEventListener()",correct:true},
            {text:"attachEvent()",correct:false},
        ]
    },{
        question:"In the CSS box model, which property is used to add space outside the border of an element?",
        answers:[
            {text:"padding",correct:false},
            {text:"margin",correct:true},
            {text:"border",correct:false},
            {text:"width",correct:false},
        ]
    },{
        question:"output of console.log(0.1 + 0.2 === 0.3);",
        answers:[
            {text:"true",correct:false},
            {text:"false",correct:true},
            {text:"nan",correct:false},
            {text:"undefined",correct:false},
        ]
    },{
        question:"Which of the following methods is used to convert a string to an integer in JavaScript?",
        answers:[
            {text:"parseFloat()",correct:false},
            {text:"toInteger()",correct:false},
            {text:"convertToInt()",correct:false},
            {text:"parseInt()",correct:true},
        ]
    },{
        question:"What is the purpose of the meta tag in HTML?",
        answers:[
            {text:"To include JavaScript files",correct:false},
            {text:" To define the document's metadata",correct:true},
            {text:"To create hyperlinks",correct:false},
            {text:" To display images",correct:false},
        ]
    },{
        question:"Which HTML element is used to define a section in a document?",
        answers:[
            {text:"div",correct:false},
            {text:"article",correct:false},
            {text:"header",correct:false},
            {text:"section",correct:true},
        ]
    },{
        question:"What is the default display value of the div element in HTML?",
        answers:[
            {text:"inline",correct:false},
            {text:"block",correct:true},
            {text:"flex",correct:false},
            {text:"none",correct:false},
        ]
    },{
        question:"How do you select all p elements inside a div using CSS?",
        answers:[
            {text:"div > p",correct:false},
            {text:"div p",correct:true},
            {text:"div + p",correct:false},
            {text:"div.p",correct:false},
        ]
    }
];
const qustionElement = document.getElementById("question");
const answerButtons = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
let questionIndex = 0;
let score = 0;
function shuffle(array) {//fisher yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}
function startQuiz(){
    questionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    shuffle(questions);
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[questionIndex];
    let questionNo = questionIndex + 1;
    qustionElement.innerHTML = questionNo +")"+currentQuestion.question;
    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click",selectAnswer);
    });
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    })
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    qustionElement.innerHTML = `your score ${score}/10`;
    nextButton.style.display = "block";
    nextButton.innerHTML = "Play Again";
}
nextButton.addEventListener("click",()=>{
    if(questionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
function handleNextButton(){
    questionIndex++;
    if(questionIndex<questions.length){
        showQuestion();
    }else{
        showScore();   
    }
}
startQuiz();
const accountLink = document.querySelectorAll(".account-link");
const mainLink = document.querySelector(".main");
const footerLink = document.querySelector(".footer");
const homeLink = document.querySelectorAll(".home-link");
let messageLink;
accountLink.forEach(e => {e.addEventListener("click",function(event){
    mainLink.style.display = "none";
    if(!messageLink){
    messageLink = document.createElement('div');
    messageLink.className = "message";
    messageLink.innerHTML = "you haven't created an account! please create an account.";
    document.body.appendChild(messageLink);
    footerLink.parentNode.insertBefore(messageLink,footerLink);
    }else{
        messageLink.style.display = "flex";
    }
    if(login){
        login.style.display = "none";
    }
    
})});
homeLink.forEach(e => {e.addEventListener("click",function(event){
    event.preventDefault();
    mainLink.style.display = "flex";
    if(messageLink){
        messageLink.style.display = "none";
    }
    if(login){
        login.style.display = "none";
    }
})});
let login;
let loginLink = document.querySelectorAll(".loginlink");
loginLink.forEach(button => {button.addEventListener("click",function(event){
    event.preventDefault();
    mainLink.style.display = "none";
    if(!login){
        login = document.createElement("div");
        login.className = "login-container";
        login.innerHTML = `
            <div className="login-container">
            <div class="content" style="display: flex;
                    flex-direction: column;
                    background-color: white;
                    border-radius:10px;
                    width: 300PX;
                    height: 400px;
                    border: 2px solid white;
                    padding: 30px;">
                <h2 style="margin-bottom: 20px;">Login</h2>
                <div class="input-text" style="display: flex;
                    flex-direction: column;">
                    <input type="text" placeholder="Enter Username"/ style="height: 40px;margin-bottom: 20px;padding: 0px 20px;border: 2px solid rgb(237, 231, 231);">
                    <input type="password" placeholder="Enter Password" style="height: 40px;margin-bottom: 20px;padding: 0px 20px;border: 2px solid rgb(237, 231, 231);" />
                </div>
                <div class="continue">
                    <button style="width: 100%;height: 40px;font-size: 17px;margin-bottom: 20px;background-color: red;color:white;border: none;cursor: pointer;">Continue</button>
                </div>
                <div class="create-account" style="display: flex;flex-direction: column;gap: 20px;">
                    <p>Create an account?<span style="color: rgb(182, 8, 8);cursor: pointer;">Click here</span></p>
                    <div class="checkbox" style=" display: flex;gap: 10px;">
                        <input type="checkbox" name="checkbox" id="check" />
                        <p>By continuing I agree to the terms of use &privacy policy</p>
                    </div>
                </div>
            </div> 
        </div>
        `;
        document.body.appendChild(login);
        footerLink.parentNode.insertBefore(login,footerLink);
    }else{
        login.style.display = "flex";
    }
    if(messageLink){
        messageLink.style.display = "none";
    }
    
})});
