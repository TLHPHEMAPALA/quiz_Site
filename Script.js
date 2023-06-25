const startButton=document.querySelector('.start-button');
const popUp=document.querySelector('.popup');
const exitButton=document.querySelector('.exit-button');
const main=document.querySelector('.main');
const continueButton=document.querySelector('.continue-btn');
const quizSection=document.querySelector('.quiz-section');
const quizBox=document.querySelector('.quiz-box');
const resultsBox=document.querySelector('.results-box');
const tryAgainButton=document.querySelector('.tryAgain-Button');
const gotoHomeButton=document.querySelector('.goHome-Button');

startButton.onclick = () => {
    popUp.classList.add('active');
    main.classList.add('active');
}

exitButton.onclick = () =>{
    popUp.classList.remove('active');
    main.classList.remove('active');
}

continueButton.onclick = () => {
    quizSection.classList.add('active');
    popUp.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');


    showQuestions(0);
    questionCounter(1);
    headerScore();
    
}

tryAgainButton.onclick = () =>{
    quizBox.classList.remove('active');
    nextButton.classList.remove('active');
    resultsBox.classList.remove('active');

    questionCount =0;
    questionNumber = 1;
    userScore=0;
    showQuestions(questionCount);
    questionCounter(questionNumber);

    headerScore();
}

gotoHomeButton.onclick = () =>{
    quizSection.classList.remove('active');
    nextButton.classList.remove('active');
    resultsBox.classList.remove('active');

    questionCount =0;
    questionNumber = 1;
    userScore=0;
    showQuestions(questionCount);
    questionCounter(questionNumber);

    headerScore();
}


let questionCount =0;
let questionNumber = 1;
let userScore=0;

const nextButton=document.querySelector('.next-button');

nextButton.onclick = () => {
    if (questionCount < questions.length -1){
        questionCount++;
        showQuestions(questionCount);

        questionNumber++;
        questionCounter(questionNumber);
        
    }
    else{        
        showResultsBox();
    }
}

const optionList=document.querySelector('.option-list');

//getting questions and options from array
function showQuestions(index){
    const questionText=document.querySelector('.question-text');
    questionText.textContent =`${questions[index].numb}.${questions[index].question}`;

    let optionTag=`<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for(let i=0; i<option.length;i++){
        option[i].setAttribute('onclick','optionSelected(this)');
    }
}

function optionSelected(answer){
    let userAnswer=answer.textContent;
    let correctAnswer=questions[questionCount].answer;  
    let allOptions=optionList.children.length;

    if(userAnswer==correctAnswer) {        
        answer.classList.add('Correct');
        userScore += 1;
        headerScore();
    }
    else{        
        answer.classList.add('Incorrect');
        //if answer incorrect auto selected correct answer 

        for (let i=0 ; i < allOptions; i++){
            if (optionList.children[i].textContent==correctAnswer) {
                optionList.children[i].setAttribute('class','option Correct');
            }
        }
    }

    //if user has selected ,disabled all options

    for (let i=0; i< allOptions;i++){
        optionList.children[i].classList.add('Disabled') ;
    }

    nextButton.classList.add('active');
}

function questionCounter(index) {
    const questionTotal=document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore() {
    const headerScoreText=document.querySelector('.header-score');
    headerScoreText.textContent=`Score: ${userScore} / ${questions.length}`;
}

function showResultsBox(){
    quizBox.classList.remove('active');
    resultsBox.classList.add('active');

    const scoreText=document.querySelector('.score-text');
    scoreText.textContent=`Your Score ${userScore} out of ${questions.length}`;

    const circularProgress=document.querySelector('.circular-progress');
    const progressValue=document.querySelector('.progress-value');
    let progressStartValue=-1;
    let progressEndValue=(userScore/questions.length)*100;
    let speed=20;

    let progress=setInterval(()=>{
        progressStartValue++;

        //console.log(progressStartValue);
        progressValue.textContent=`${progressStartValue}%`;
        circularProgress.style.background=`conic-gradient(#aa025e ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1)0deg)`;

        if (progressStartValue==progressEndValue){
            clearInterval(progress);
        }
    },speed );

}