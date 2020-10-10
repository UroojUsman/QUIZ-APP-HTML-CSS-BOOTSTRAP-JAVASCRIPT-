//Quiz Question Bank
const quiz=[
    {
        q:'Name the currency used in Japan?',
        option:['Taka','Ruppee','Dinar','yen'],
        answer:3
    },
    {
        q:'Which animal is the tallest in the world?',
        option:['Elephant','Lion','Giraffe','kangroo'],
        answer:2
    },
    {
        q:'What is a supernova?',
        option:['An underwater volcano','An intense lightening storm','The explosion of a star','The eye of an tornado'],
        answer:2
    },
    {
        q:'Which car company makes the Corolla?',
        option:['Toyota','Nissan','Honda','Subaru'],
        answer:0
    },
    {
        q:'Where is Mount Everest located?',
        option:['Tibet','Nepal','Switzerland','On the border between Tibet and Nepal'],
        answer:3
    }
];

const questionNumber=document.querySelector(".question-number");
const questionText= document.querySelector(".question-text");
const optionContainer= document.querySelector(".option-container");
const answerIndicatorContainer= document.querySelector(".answer-indicator");
const home_box= document.querySelector(".home-box");
const quiz_box= document.querySelector(".quiz-box");
const result_box=document.querySelector(".result-box");

let questionCounter=0;
let currentQuestion;
let availableQuestion=[];
let availableoption=[];
let correctAnswer=0;
let attempt=0;

//Pushing available questions in array
function setAvailableQuestion()
{   
    const totalques=quiz.length;
    
    for(let i=0;i<totalques;i++)
    {
        
        availableQuestion.push(quiz[i]);
        
       
    }
    
}
//getting new Question everytime from the quiz question bank
function getNewQuestion()
{    
    questionNumber.innerHTML="Question "+(questionCounter+1)+" of "+quiz.length;
    //removing the reoccurence of previous questions
    const questionIndex=availableQuestion[Math.floor(Math.random()*availableQuestion.length)];
    currentQuestion=questionIndex;
    
    questionText.innerHTML=currentQuestion.q;
   
    const index1=availableQuestion.indexOf(questionIndex);

    //removing the already answered questions from the available questions 
    availableQuestion.splice(index1,1);
   
    const optionlen=currentQuestion.option.length;

    for(let i=0;i<optionlen;i++)
    {
        availableoption.push(i);
    }

    optionContainer.innerHTML='';
   let animationDelay=0.15;

    for(let i=0;i<optionlen;i++)
    {   
        const optionIndex= availableoption[Math.floor(Math.random()*availableoption.length)];
        const index2= availableoption.indexOf(optionIndex);
        availableoption.splice(index2,1);
        
       
        const options=document.createElement("div"); 
        options.innerHTML=currentQuestion.option[optionIndex];
        options.id=optionIndex;
        options.style.animationDelay=animationDelay+ 's';
        animationDelay=animationDelay+0.15;
        options.className="option";
        optionContainer.appendChild(options);
        options.setAttribute("onclick","getResult(this)");
    }

    questionCounter++;
}

function getResult(element)
{   
    const id= parseInt( element.id);
    if(id == currentQuestion.answer)
    {
      element.classList.add("correct");
      updateAnswerIndicator("correct");
      correctAnswer++;
    }
    else
    { element.classList.add("wrong");
    updateAnswerIndicator("wrong");

    const optionlen=optionContainer.children.length;
    for(var i=0;i<optionlen;i++)
    {
        if(parseInt(optionContainer.children[i].id)==currentQuestion.answer)
        {
            optionContainer.children[i].classList.add("correct");
        }
    }
        
    }
    attempt++;
    unclickable()
}
function unclickable()
{
    const optionlen=optionContainer.children.length;
    for(var i=0;i<optionlen;i++)
    {
        optionContainer.children[i].classList.add("already-answered");
    }
}
function next()
{
    if(questionCounter==quiz.length)
    {
        quizOver();
    }
    else 
    {
        getNewQuestion();

    }
}

function quizOver()
{
  quiz_box.classList.add("hide");
  result_box.classList.remove("hide");
  quizResult();
}

function quizResult()
{
    result_box.querySelector(".total-question").innerHTML= quiz.length  ;
    result_box.querySelector(".total-attempt").innerHTML= attempt  ; 
    result_box.querySelector(".total-correct").innerHTML=  correctAnswer;
    result_box.querySelector(".total-wrong").innerHTML=  (attempt-correctAnswer) ;
    const percentage=(correctAnswer/quiz.length)*100;
    result_box.querySelector(".percentage").innerHTML=percentage.toFixed(2)+"%"  ;
    result_box.querySelector(".total-score").innerHTML=correctAnswer +"/" +quiz.length   ;

}

function tryAgain()
{
    result_box.classList.add("hide");
    quiz_box.classList.remove("hide");
    resetQuiz();
    StartQuiz();
}

function GoToHome(){
    result_box.classList.add("hide");
    home_box.classList.remove("hide");
    resetQuiz();
}

function resetQuiz()
{
    questionCounter=0;
    correctAnswer=0;
    attempt=0;

}

function answersIndicator()
{   
    answerIndicatorContainer.innerHTML='';
    const totalques=quiz.length;
    for(var i=0;i<totalques;i++)
    {
        const indicator= document.createElement("div");
        answerIndicatorContainer.appendChild(indicator);
    }
}

function updateAnswerIndicator(ansColor)
{
    answerIndicatorContainer.children[questionCounter-1].classList.add(ansColor);

}
function StartQuiz(){

    home_box.classList.add("hide");
    quiz_box.classList.remove("hide");
    setAvailableQuestion();
    getNewQuestion();
    answersIndicator()
}

window.onload=function()
{
    home_box.querySelector(".total-question").innerHTML=quiz.length;
}