"use strict";

const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const newgame = document.querySelector(".btn--newgame");
const darkmode = document.querySelector(".btn--Darkmode");
const rolldice = document.querySelector(".btn--roll");
const hold = document.querySelector(".btn--hold");
const currentscoredis = document.querySelector(".current-score");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const playeractive0El = document.querySelector(".player--0");
const playeractive1El = document.querySelector(".player--1");
const scoredisplay = document.querySelector(".score");

score0.textContent = 0;
score1.textContent = 0;

let score = [0, 0];
let currentScore = 0;
let activeplayer = 0;
let playing = true;

const switchplayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activeplayer}`).textContent =
    currentScore;
  activeplayer = activeplayer === 0 ? 1 : 0;
  playeractive0El.classList.toggle("player--active");
  playeractive1El.classList.toggle("player--active");
};

// diceEl.classList.add('hidden');

rolldice.addEventListener("click", function () {
  let dice = Math.floor(Math.random() * 6) + 1;

  diceEl.classList.remove("hidden");
  diceEl.src = `dice-${dice}.png`;

  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activeplayer}`).textContent =
      currentScore;
  } else {
    switchplayer();
    //   if (playeractive0El.classList.contains('player--active')) {
    //     playeractive0El.classList.remove('player--active')(
    //       playeractive1El.classList.add('player--active')
    //     );
    //   } else if (playeractive1El.classList.contains('player--active'))
    //     playeractive1El.classList.remove('player--active');
    //   playeractive0El.classList.add('player--active');
    // }
    score[activeplayer] += currentScore;
  }
});

hold.addEventListener("click", function () {
  score[activeplayer] += currentScore;
  document.getElementById(`score--${activeplayer}`).textContent =
    score[activeplayer];

  if (score[activeplayer] >= 100) {
    rolldice.disabled = playing;
    hold.disabled = playing;
    diceEl.classList.add("hidden");

    document
      .querySelector(`.player--${activeplayer}`)
      .classList.add("player--winner");

    document
      .querySelector(`.player--${activeplayer}`)
      .classList.remove("player--active");
  } else {
    switchplayer();
  }
});

newgame.addEventListener("click", function () {
  currentScore = 0;
  activeplayer = 0;
  current0El.textContent = currentScore;
  current1El.textContent = currentScore;
  rolldice.disabled = false;
  hold.disabled = false;
  diceEl.classList.add("hidden");
  score[0] = 0;
  score[1] = 0;
  score0.textContent = score[0];
  score1.textContent = score[1];
  playeractive0El.classList.remove("player--winner");
  playeractive1El.classList.remove("player--winner");
  playeractive0El.classList.add("player--active");
  playeractive1El.classList.remove("player--active");
});

darkmode.addEventListener("click", function () {
  playeractive0El.classList.remove("player--winner");
  playeractive1El.classList.remove("player--winner");
  document.body.classList.toggle("Dmode");
  if (darkmode.textContent === "🌞 Day mode") {
    darkmode.textContent = "🌙 Dark mode";
    document.body.style.backgroundColor = "black";
  } else {
    darkmode.textContent = "🌞 Day mode";
    document.body.style.backgroundColor = "yellow";
  }
  if (score[activeplayer] >= 20) {
    rolldice.disabled = playing;
    hold.disabled = playing;
    diceEl.classList.add("hidden");

    document
      .querySelector(`.player--${activeplayer}`)
      .classList.add("player--winner");
    document
      .querySelector(`.player--${activeplayer}`)
      .classList.remove("player--active");
  } else {
    switchplayer();
  }
});
