
const questionText = document.getElementsByClassName("question-text")[0];
let optionBox = document.querySelector(".option-box");
const currentQuestionNum = document.querySelector(".current-question-num");
const answerDescription = document.querySelector(".answer-description");
const nextQuestionBtn = document.querySelector(".next-question-btn");
const seeResultBtn = document.querySelector(".see-result-btn");
const correctAnswer = document.querySelector(".correct-answers");
let remainingTime = document.querySelector(".remaining-time");
const timeUpText = document.querySelector(".time-up-text");
const quizBox = document.querySelector(".quiz-box");
const quizOverBox = document.querySelector(".quiz-over-box");
const quizHomeBox = document.querySelector(".quiz-home-box");
const startAgainQuizBtn = document.querySelector(".start-again-quiz-btn");
let goHomeBtn = document.querySelector(".go-home-btn");
const startQuizBtn = document.querySelector(".start-quiz-btn");
let attempt = 0;
let questionIndex = 0;
let score = 0;
let number = 0;
let myArray = [];

let interval;
// Questions, Options and Answers array with Description
myApp = [
  {
    question: "Кто командовал царскими войсками во время штурма Андижана?",
    options: ["Генерал Кауфман", "Генерал М.Скобелев", "Абдурахман Афтобачи", "Пулатбек"],
    answer: 1,
    // description: "",
  },
  
  {
    question: "Как слово еще можно называть термином “Гомруль”?",
    options: ["Автономия", "Монополия", "Парламент", "Что там"],
    answer: 0,
    // description: "",
  },
  
  {
    question: "С какого года, в Великобритании, партия тред-юнионов начала называться лейбористской?",
    options: ["Что то там", "не помню", "1906", "🤷‍♀️"],
    answer: 2,
    // description: "",
  },
  
  {
    question: " С какого года, в Великобритании, партия тред-юнионов начала называться лейбористской?",
    options: ["1900", "1906", "1097", "1919"],
    answer: 1,
    // description: "",
  },
  
  {
    question: "Назовите дату издания указа о ликвидации Кокандского ханства?",
    options: ["19 февраля 1876 г.", "19 июня 1876 г.", "23 июня 1876 г.", "23 февраля 1876 г."],
    answer: 0,
    // description: "",
  },
  {
    question: "Как называлось в США убийство человека, подозреваемого в преступлении или нарушении общественных обычаев, без суда и следствия?",
    options: ["Суд Линча", "Ку-клукс-клан ", "Суд афроамериканцев", "Реконструкция"],
    answer: 0,
    // description: "",
  },
  {
    question: ". В каком году в Ташкенте было введено Городское положение, по которому управление городом переходило к Городской думе?",
    options: ["1870", "1885", "1877 г.", "1865"],
    answer: 2,
    // description: "",
  },
  {
    question: "Кто объявил в США “политику большой дубинки”?",
    options: ["Франклин Рузвельт", "Вудро Вильсон", "Теодор Рузвельт", "Уильям Тафт"],
    answer: 2,
    // description: "",
  },
  {
    question: "Как назывались представители духовенства, которым кази-калян поручал решение спорных вопросов?",
    options: ["беки", "улемы", "мухадиссы", "казии"],
    answer: 1,
    // description: "",
  },
  {
    question: "В каком городе 10 декабря 1898 года, был подписан мирный договор между США — Испанией?",
    options: ["Париж", "РеалМадридстан", "Лиссабон", "Вашингтон"],
    answer: 0,
    // description: "",
  },
  {
    question: "Какой орган был наделен правами главной судебной инстанции всего Туркестанского края?",
    options: ["Ташкентская судебная палата", "Сенат", "Судебная канцелярию", "Областной суд"],
    answer: 0,
    // description: "",
  },
  {
    question: "Какая революция продолжалась с 1910 по 1917 годы?",
    options: ["Мексиканская", "Бразильская", "Кубинская", "Аргентинская"],
    answer: 0,
    // description: "",
  },
  {
    question: "В каком году, произошло знаменательное событие в истории Российском империи – отмена крепостного права?",
    options: ["1861 г.", "1862 г.", "1863 г.", "1864 г."],
    answer: 0,
    // description: "",
  },
  {
    question: "Какие суды предусматривались для оседлого населения?",
    options: ["Суды казиев", "Суды биев", "Областные суды", "Короче суды"],
    answer: 0,
    // description: "",
  },
  {
    question: "В каком году в США была создана Партия Республиканцев?",
    options: ["1854 г.", "1838 г.", "1834 г.", "1828 г."],
    answer: 0,
    // description: "",
  },
  
];

function load() {

  number++;
  //   console.log(number);
  questionText.innerHTML = myApp[myArray[questionIndex]].question;
  createOptions();
  scoreBoard();
  currentQuestionNum.innerHTML = number + " / " + myApp.length;
}

function createOptions() {
  optionBox.innerHTML = "";
  let animationDelay = 0.2;
  for (let i = 0; i < myApp[myArray[questionIndex]].options.length; i += 1) {
    // console.log(myApp[questionIndex].options[i]);
    const option = document.createElement("div");
    option.innerHTML = myApp[myArray[questionIndex]].options[i];
    // Now setting attribute for class
    // option.setAttribute("class", "option");
    option.classList.add("option");
    option.id = i;
    option.style.animationDelay = animationDelay + "s";
    animationDelay = animationDelay + 0.2;

    // option.setAttribute("onclick", "check(this)");
    option.addEventListener("click", function () {
      // check(this) === check(option)
      check(this);
    });
    optionBox.appendChild(option);
  }
}

function check(option) {
  //   console.log(option.innerHTML);
  attempt++;
  const id = option.id;
  if (id == myApp[myArray[questionIndex]].answer) {
    console.log("correct");
    option.classList.add("correct");
    score += 1;
    scoreBoard();
  } else {
    console.log("Wrong");
    option.classList.add("wrong");
    for (let i = 0; i < optionBox.children.length; i++) {
      if (optionBox.children[i].id == myApp[myArray[questionIndex]].answer) {
        optionBox.children[i].classList.add("show-correct");
      }
    }
  }
  disableOptions();
  showAnswerDescription();
  showNextQuestionBtn();
  stopTimer();

  if (number == myApp.length) {
    console.log("Quiz Over Mate !!!");
    quizOver();
  }
}

function quizResult() {
  document.querySelector(".total-questions").innerHTML = myApp.length;
  document.querySelector(".total-attempt").innerHTML = attempt;
  document.querySelector(".total-correct").innerHTML = score;
  document.querySelector(".total-wrong").innerHTML = attempt - score;
  const percentage = (score / myApp.length) * 100;
  document.querySelector(".total-percentage").innerHTML =
    percentage.toFixed(2) + "%";
}

function resetQuiz() {
  attempt = 0;
  questionIndex = 0;
  score = 0;
  number = 0;
  // myArray = [];
  // myArray = randomeArrayGenerator();
  // console.log(myArray);
  answerDescription.classList.remove("show");
  // startTimer();
  // load();
}

function quizOver() {
  // quizBox.classList.remove("show");
  nextQuestionBtn.classList.remove("show");
  seeResultBtn.classList.add("show");
}

function timeIsUp() {
  showTimeUpText();
  // timeUpText.classList.add("show");
  // when time is up, show the correct output
  for (let i = 0; i < optionBox.children.length; i++) {
    if (optionBox.children[i].id == myApp[myArray[questionIndex]].answer) {
      optionBox.children[i].classList.add("show-correct");
    }
  }
  disableOptions();
  showAnswerDescription();
  if (number != myApp.length) {
    showNextQuestionBtn();
  } else {
    timeUpText.classList.remove("show");
    quizOver();
  }
  // stopTimer();
}

function startTimer() {
  let timeLimit = 15;
  remainingTime.innerHTML = timeLimit;
  remainingTime.classList.remove("less-time");

  interval = setInterval(() => {
    timeLimit--;
    // console.log(timeLimit);
    if (timeLimit < 10) {
      timeLimit = "0" + timeLimit;
    }
    if (timeLimit < 6) {
      remainingTime.classList.add("less-time");
    }
    remainingTime.innerHTML = timeLimit;
    if (timeLimit == 0) {
      clearInterval(interval);
      timeIsUp();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
}

function disableOptions() {
  for (let i = 0; i < optionBox.children.length; i++) {
    // console.log(optionBox.children[i].id);
    // console.log(optionBox.childElementCount);
    // optionBox.children[i].removeAttribute("onclick");
    optionBox.children[i].classList.add("already-answered");
  }
}

function showAnswerDescription() {
  // we will only print description, when there is any predefined exist, otherwise it won't print anything.
  if (typeof myApp[myArray[questionIndex]].description !== "undefined") {
    answerDescription.classList.add("show");
    answerDescription.innerHTML = myApp[myArray[questionIndex]].description;
  }
}

function hideAnswerDescription() {
  answerDescription.classList.remove("show");
  answerDescription.innerHTML = "";
}

function showNextQuestionBtn() {
  nextQuestionBtn.classList.add("show");
}

function hideNextQuestionBtn() {
  nextQuestionBtn.classList.remove("show");
}

function showTimeUpText() {
  timeUpText.classList.add("show");
}

function hideTimeUpText() {
  timeUpText.classList.remove("show");
}

function scoreBoard() {
  correctAnswer.innerHTML = score;
}

nextQuestionBtn.addEventListener("click", nextQuestion);

function nextQuestion() {
  console.log("Abhishek");
  questionIndex++;
  load();
  hideNextQuestionBtn();
  hideAnswerDescription();
  hideTimeUpText();
  startTimer();
}

function randomeArrayGenerator() {
  set = new Set();
  for (let i = 0; set.size != myApp.length; i += 1) {
    set.add(Math.floor(Math.random() * myApp.length));
  }
  return Array.from(set);
}

seeResultBtn.addEventListener("click", () => {
  console.log("See Result Button");
  // quizBox.style.display = "none";
  quizBox.style.display = "none";
  seeResultBtn.classList.remove("show");
  quizOverBox.classList.add("show");
  quizResult();
});

startAgainQuizBtn.addEventListener("click", () => {
  quizBox.classList.add("show");
  quizBox.style.display = "block";
  quizOverBox.classList.remove("show");
  resetQuiz();
  // myArray = [];
  // myArray = randomeArrayGenerator();
  // console.log(myArray);
  // answerDescription.classList.remove("show");
  // startTimer();
  // load();
  // nextQuestion();
  quizStart();
});

goHomeBtn.addEventListener("click", () => {
  quizOverBox.classList.remove("show");
  quizHomeBox.classList.add("show");
  resetQuiz();
});

startQuizBtn.addEventListener("click", quizStart);

function quizStart() {
  quizHomeBox.classList.remove("show");
  // quizBox.classList.add("show");
  quizBox.style.display = "block";
  myArray = randomeArrayGenerator();
  console.log(myArray);
  startTimer();
  load();
}

// window.onload = () => {
//   myArray = randomeArrayGenerator();
//   console.log(myArray);
//   startTimer();
//   load();
// };
