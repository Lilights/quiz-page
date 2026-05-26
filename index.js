const questions = [
  {
    question: "what is my favorite color?",
    text: "this should be easy peasy",
    answers: ["purple", "red", "black", "blue"],

    // indexes: purple = 0, red = 1, black = 2, blue = 3
    correct: [1],

    correctReply:
      "I knew you'd get it as you literally gifted me your red car in gta hehe",
    wrongReply: "ummmmmm..... I mean I like this too but not fav...",
  },
  {
    question: "what is my favorite food?",
    text: "there are two correct answers here... tricky",
    answers: ["sushi", "cheeseburger", "spicy crisps", "pizza"],

    // indexes: sushi = 0, cheeseburger = 1, spicy crisps = 2, pizza = 3
    // edit this if your two correct answers are different
    correct: [0, 2],

    correctReply: "I mean yeah... I always talk about craving one of these...",
    wrongReply: "wrong. i am judging quietly... VERY quietly...",
  },
  {
    question: "who is my favorite artist?",
    text: "think CAREFULLY and try to remember!",
    answers: [
      "sleep token",
      "twenty one pilots",
      "britney spears",
      "lady gaga",
    ],

    // indexes: sleep token = 0, twenty one pilots = 1, britney spears = 2, lady gaga = 3
    correct: [1],

    correctReply: "I'm a little surprised ngl",
    wrongReply: "oof....",
  },
  {
    question: "what am i most likely to say?",
    text: "this is basically a personality test at this point.",
    answers: ['"gay"', '"wait"', '"bruh"', '"I\'m tired"'],

    // indexes: gay = 0, wait = 1, bruh = 2, I'm tired = 3
    // put one correct answer like [1]
    // or multiple correct answers like [0, 1, 2, 3]
    correct: [0],

    correctReply: "damn you know me so well... gayass....",
    wrongReply: "wrong, but honestly most of these sound like me",
  },
  {
    question: "what should your official title be?",
    text: "final normal question. maybe.",
    answers: [
      "situationship",
      "emotional support human",
      "boyfriend",
      "all of the above but mostly boyfriend",
    ],

    // indexes: situationship = 0, emotional support human = 1, boyfriend = 2, all of the above = 3
    correct: [3],

    correctReply: "I mean you had no other choice hehehehehehe",
    wrongReply: "WOW OK",
  },
];

let currentQuestion = -1;
let score = 0;
const NEXT_QUESTION_DELAY = 2500;

const topText = document.getElementById("topText");
const questionCounter = document.getElementById("questionCounter");
const scoreCounter = document.getElementById("scoreCounter");
const title = document.getElementById("title");
const text = document.getElementById("text");
const options = document.getElementById("options");
const footerText = document.getElementById("footerText");
const yesSound = document.getElementById("yippySound");

document.getElementById("startBtn").addEventListener("click", startQuiz);

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  renderQuestion();
}

function renderQuestion() {
  const q = questions[currentQuestion];

  topText.textContent = "how well do you know me?";
  questionCounter.textContent = `question ${currentQuestion + 1}/${
    questions.length
  }`;
  scoreCounter.textContent = `score: ${score}`;
  title.textContent = q.question;
  text.textContent = q.text;
  footerText.textContent = "pick one.";

  options.className = "options";
  options.innerHTML = "";

  q.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-btn";
    button.textContent = answer;

    button.addEventListener("click", () => checkAnswer(button, index));

    options.appendChild(button);
  });
}

function checkAnswer(selectedButton, selectedIndex) {
  const q = questions[currentQuestion];
  const allButtons = document.querySelectorAll(".answer-btn");

  allButtons.forEach((button) => {
    button.disabled = true;
  });

  if (q.correct.includes(selectedIndex)) {
    score++;
    selectedButton.classList.add("correct");
    footerText.textContent = q.correctReply;
  } else {
    selectedButton.classList.add("wrong");
    footerText.textContent = q.wrongReply;
  }

  scoreCounter.textContent = `score: ${score}`;

  setTimeout(() => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
      renderQuestion();
    } else {
      renderFinalQuestion();
    }
  }, NEXT_QUESTION_DELAY);
}

function renderFinalQuestion() {
  topText.textContent = "final question";
  questionCounter.textContent = "bonus round";
  scoreCounter.textContent = `final score: ${score}/${questions.length}`;

  title.textContent = "want to make this official?";
  text.textContent =
    "you have reached the final question. there are two answers, but one of them has trust issues.";

  footerText.textContent = "choose wisely.";

  options.className = "options final-options";
  options.innerHTML = "";

  const yesButton = document.createElement("button");
  yesButton.className = "answer-btn primary";
  yesButton.textContent = "yes, I'll be your boyfriend";
  yesButton.addEventListener("click", showYesScreen);

  const noButton = document.createElement("button");
  noButton.className = "answer-btn";
  noButton.id = "noBtn";
  noButton.textContent = "no, I don't like you";

  noButton.addEventListener("mouseenter", () => moveNoButton(noButton));
  noButton.addEventListener("mouseover", () => moveNoButton(noButton));

  noButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    moveNoButton(noButton);
  });

  noButton.addEventListener(
    "touchstart",
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      moveNoButton(noButton);
    },
    { passive: false }
  );

  options.appendChild(yesButton);
  options.appendChild(noButton);
}

function moveNoButton(button) {
  button.classList.add("runaway");

  const moves = [
    { x: -150, y: -35 },
    { x: 150, y: -35 },
    { x: -145, y: 40 },
    { x: 145, y: 40 },
    { x: -120, y: -85 },
    { x: 120, y: -85 },
    { x: -120, y: 85 },
    { x: 120, y: 85 },
    { x: -170, y: 0 },
    { x: 170, y: 0 },
    { x: 0, y: -95 },
    { x: 0, y: 95 },
  ];

  const move = moves[Math.floor(Math.random() * moves.length)];

  button.style.transform = `translate(${move.x}px, ${move.y}px)`;

  footerText.textContent = "interesting. try again.";
}

function showYesScreen() {
  if (yippySound) {
    yippySound.currentTime = 0;
    yippySound.volume = 0.7;
    yippySound.play();
  }
  topText.textContent = "excellent choice";
  questionCounter.textContent = "official status";
  scoreCounter.textContent = "approved";

  title.textContent = "okay good";
  text.innerHTML =
    "you are officially stuck with me now. ♡<br><br>" +
    "<strong>anniversary date: 26.05.26</strong><br>" +
    "looks nice, don't you think?";

  options.className = "options";
  options.innerHTML = "";

  footerText.textContent = "screenshot this for legal reasons.";

  startHearts();
}

function startHearts() {
  for (let i = 0; i < 38; i++) {
    setTimeout(createHeart, i * 85);
  }
}

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.textContent = "♡";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 2 + Math.random() * 2 + "s";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 4200);
}
