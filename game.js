const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [{
        question: "What Local Government in Akwa-Ibom is Mark Essien From?",
        choice1: "Ikot-ekpene",
        choice2: "Eket",
        choice3: "Uyo",
        answer: 1
    },
    {
        question: "Which Europen country did Mark Essien further his Studies?",
        choice1: "Norway",
        choice2: "England",
        choice3: "Germany",
        answer: 3
    },
    {
        question: "Who is the founder of Start.ng?",
        choice1: "Mark Zuckerberg",
        choice2: "Mark Essien",
        choice3: "Marc Anthony Otiora",
        answer: 2
    },
    {
        question: "What aspect of the HNG internship does Mark Essien handle?",
        choice1: "Design",
        choice2: "Front-End",
        choice3: "Digital Marketing",
        answer: 1
    },
    {
        question: " What was the first Tech Product Mark Essien Built For Sale?",
        choice1: "Video Game",
        choice2: "File Share App",
        choice3: "Hotels Booking App",
        answer: 2
    }
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //go to the end page
        return window.location.assign("end.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();