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
let openedCards = [];

$(document).on('click', '.card', function() {
    moves ++;
    //show the cow image
    $(this).addClass('open');
    //put two opened cards into openedCards
    if ((moves % 2) != 0){
        openedCards = [];
    }
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
    card1 = openedCards[0];
    card2 = openedCards[1];
    card1List = card1.attr('class');
    card2List = card2.attr('class');

    if (card1List === card2List) {
        card1.addClass('match animated zoomIn');
        card2.addClass('match animated zoomIn');
        matchedCards(); //play sound
        $('li').on('animationend webkitAnimationEnd',function(){
            card1.removeClass('match animated zoomIn').addClass('open');
            card2.removeClass('match animated zoomIn').addClass('open');
        });
    } else if (card1List != card2List)  {
        card1.addClass('animated jello');
        card2.addClass('animated jello');
        $('li').on('animationend webkitAnimationEnd',function(){
            card1.removeClass('open animated jello');
            card2.removeClass('open animated jello');
        });
        beep(); //play sound
    }
    //when all cards match, play the music
    if ($('.card').length == $('li.open').length) {
        $('#modal').css('display', 'block');
        finale();
    }
});

//when the restart arrow clicked, reset the game
$('.restart').on('click', function() {
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
