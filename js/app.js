//a list that holds all of the cards
var cardClass = ['alps', 'calf', 'head', 'winter', 'alpine', 'farm', 'highland', 'tyrol'];

// Shuffle function from http://stackoverflow.com/a/2450976
$(function setDeck() {
    function shuffle(cardClass) {
        var currentIndex = cardClass.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = cardClass[currentIndex];
            cardClass[currentIndex] = cardClass[randomIndex];
            cardClass[randomIndex] = temporaryValue;
        }
        return cardClass;
    }

    cardClass = shuffle(cardClass);
    for (var x = 0; x < 2; x++) {
        for (var i = 0; i < cardClass.length; i++) {
            $('.deck').append('<li class="card ' + cardClass[i] + '">\n</li>');
        }
    }
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
var card = $('.card');
var moves = 0;
var stars = $('.stars');

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

card.click (function() {
    moves ++;
    //show the cow image
    $(this).addClass('open');
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
    if ($('.open:eq(0)').attr('class') == $('.open:eq(1)').attr('class')) {
    $('.open:eq(0)').addClass('match');
    $(this).addClass('match');
    matchedCards(); //play sound
    } else if ($('.open:eq(0)').attr('class') != $('.open:eq(1)').attr('class')) {
    $(this).addClass('animated shake');
    beep(); //play sound
    setTimeout(function(){
        $('.open:eq(0)').removeClass('open');
        $(this).removeClass('open');
        }, 1000);
}
    return false;
});

//when the restart arrow clicked, reset the game
$('.restart').click (function() {
    card.removeClass('open match'); //turn all cards face down
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