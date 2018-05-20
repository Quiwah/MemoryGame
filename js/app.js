//a list that holds all of the cards
let cardClass = [
  "alps",
  "calf",
  "head",
  "winter",
  "alpine",
  "farm",
  "highland",
  "tyrol"
];
let cows = cardClass.concat(cardClass);
// Shuffle function from http://stackoverflow.com/a/2450976
function setDeck() {
  function shuffle(cows) {
    let currentIndex = cows.length,
      temporaryValue,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = cows[currentIndex];
      cows[currentIndex] = cows[randomIndex];
      cows[randomIndex] = temporaryValue;
    }
    return cows;
  }

  cows = shuffle(cows);

  for (let i = 0; i < cows.length; i++) {
    $(".deck").append('<li class="card ' + cows[i] + '">\n</li>');
  }
}

$(setDeck());

//Timer
let startTime = new Date();
let currentTime = 0;
let min = 0;
let sec = 0;
let passedTime = 0;

function timer() {
  currentTime = new Date();
  passedTime = parseInt((currentTime.getTime() - startTime.getTime()) / 1000);

  min = parseInt((passedTime / 60) % 60);
  sec = passedTime % 60;

  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }

  $(".timer").text(min + ":" + sec);
}

function timerStop() {
  clearTimeout(resultTime);
}

//sound effects
function matchedCards() {
  const matched = new Audio(
    "./sound/Cow-And-Bell-SoundBible.com-1243222141.mp3"
  );
  matched.play();
}
function beep() {
  const wrong = new Audio("sound/Bike-Horn-602544869.mp3");
  wrong.play();
}
function finale() {
  const won = new Audio("./sound/Icy-bell-gliss-ascending.mp3");
  won.play();
}

const card = $(".card");
let clicks = 0;
const stars = $(".stars");
let openedCards = [];
let moves = 0;

$(document).on("click", ".card", function() {
  let resultTime = setTimeout("timer()", 1000);
  clicks++;
  //show the cow image
  $(this).addClass("open");
  //put two opened cards into openedCards
  if (clicks % 2 != 0 && clicks != 1) {
    openedCards = [];
  }
  openedCards.length = 2;
  openedCards.push($(this));
  openedCards.shift();
  //display the number of moves
  if (clicks % 2 == 0) {
    moves++;
  }
  $(".moves-number").html(moves);
  //when move is 1, remove "s" from "clicks"
  if (moves === 1) {
    $(".plural").css("display", "none");
  } else {
    $(".plural").css("display", "");
  }
  //rate and decrease the stars
  if (moves < 20) {
    stars.css("color", "#00ae5a"); //green stars for less than 20 moves
  } else if (moves >= 30) {
    $(".second-star").remove();
    stars.css("color", "#ff0012"); //red star for over 30 moves
  } else {
    $(".third-star").remove();
    stars.css("color", "#fce200"); //yellow stars for between 21 to 29
  }
  //check if the clicked cards are matched
  let card1 = openedCards[0];
  let card2 = openedCards[1];
  let card1List = card1.attr("class");
  let card2List = card2.attr("class");

  if (card1List === card2List) {
    card1.addClass("match animated zoomIn");
    card2.addClass("match animated zoomIn");
    matchedCards(); //play sound
    $("li").on("animationend webkitAnimationEnd", function() {
      card1.removeClass("animated zoomIn").addClass("open");
      card2.removeClass("animated zoomIn").addClass("open");
    });
  } else if (card1List != card2List) {
    card1.addClass("animated jello");
    card2.addClass("animated jello");
    $("li").on("animationend webkitAnimationEnd", function() {
      card1.removeClass("open animated jello");
      card2.removeClass("open animated jello");
    });
    beep(); //play sound
  }
  //check how many stars the user got
  let resultStars = stars.children().length;
  let starsPlural;
  if (resultStars >= 2) {
    starsPlural = "stars";
  } else {
    starsPlural = "star";
  }
  //when all cards match
  if ($(".card").length === $("li.open").length) {
    //sound effect
    finale();
    //display the modal
    $(".modal").css("display", "block");
    $(".result-time").html(" " + min + ":" + sec);
    $(".result-stars").html(resultStars + " " + starsPlural);
    //stop the timer
    timerStop();
  }
});

//when the restart arrow clicked, reset the game
$(".restart").on("click", function() {
  location.reload();
});
//close the modal window and start new game
function closeModal() {
  $(".modal").css("display", "none");
  location.reload();
}
