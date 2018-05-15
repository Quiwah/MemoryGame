//a list that holds all of the cards
var cardClass = ['alps', 'calf', 'head', 'winter', 'alpine', 'farm', 'highland', 'tyrol'];
var cows = cardClass.concat(cardClass);
// Shuffle function from http://stackoverflow.com/a/2450976
$(function setDeck() {
    function shuffle(cows) {
        var currentIndex = cows.length, temporaryValue, randomIndex;

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

        for (var i = 0; i < cows.length; i++) {
            $('.deck').append('<li class="card ' + cows[i] + '">\n</li>');
        }

});

//sound effects
function matchedCards() {
    var matched = new Audio('./sound/Cow-And-Bell-SoundBible.com-1243222141.mp3');
    matched.play();
}
function beep() {
    var wrong = new Audio('sound/Bike-Horn-602544869.mp3');
    wrong.play();
}
function finale() {
    var won = new Audio('./sound/Icy-bell-gliss-ascending.mp3');
    won.play();
}

const card = $('.card');
var moves = 0;
const stars = $('.stars');
var openedCards = [];

$(document).on('click', '.card', function() {
    moves ++;
    //show the cow image
    $(this).addClass('open');
    //add opened cards to openedCards
    openedCards.length = 2;
    openedCards.push($(this));
    openedCards.shift();
    //display the number of clicks
    $('.moves').html(moves);
    //when move is 1, remove "s" from "moves"
    if (moves === 1) {
        $('.plural').css('display', 'none');
        } else {
        $('.plural').css('display', '');
    }
    //rate and decrease the stars
    if (moves < 17) {
    stars.css('color', '#00ae5a'); //green stars for less than 16 moves
    } else if (moves >= 25) {
    $('#second-star').remove();
    stars.css('color', '#ff0012'); //red star for over 25 moves
    } else {
    $('#third-star').remove();
    stars.css('color', '#fce200'); //yellow stars for between 17 to 24
    }
    //check if the clicked cards are matched
    //var card1Class = openedCards[0].attr('class');
    //var card2Class = openedCards[1].attr('class');

    if (openedCards[0] == openedCards[1]) {
        openedCards[0].addClass('match animated zoomIn');
        openedCards[1].addClass('match animated zoomIn');
        matchedCards(); //play sound
        $('.card').on('animationend webkitAnimationEnd',function(){
            $('.card').removeClass('animated zoomIn');
            openedCards = [];
        });
        } else {
            openedCards[0].addClass('animated jello');
            openedCards[1].addClass('animated jello');
            setTimeout(function(){
                openedCards[0].removeClass('open animated jello');
                openedCards[1].removeClass('open animated jello');
            }, 1000);
            beep(); //play sound
            }
    }
);

//when the restart arrow clicked, reset the game
$('.restart').click (function() {
    $('.card').removeClass('open'); //turn all cards face down
    openedCards = [];
    moves = 0; //count reset
    $('.moves').html('0'); //count number for display reset
    stars.css('color', '#00ae5a'); //change the star color to green
    //put back three stars
    if (stars.children().length === 2) {
        stars.append('<li id="third-star"><i class="fa fa-star"></i></li>');
    } else if (stars.children().length === 1) {
        stars.append('<li id="second-star"><i class="fa fa-star"></i></li>\n<li id="third-star"><i class="fa fa-star"></i></li>');
    };
});