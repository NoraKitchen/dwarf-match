app.controller('GameController', function($scope, $timeout, GameService) {

    // This is a freebie we are using the GameService to help keep our controller clean. The GameServie will be in charge of creating and shuffling the deck.
    $scope.deck = GameService.getDeck();
    $scope.matchedCards = [];

    // Create two card variables on $scope. These will be responsible
    // for keeping track of our selections as we click cards.


    $scope.card1 = undefined;
    $scope.card2 = undefined;;


    // Next we need to initate a few more variables on $scope for later use
    // Let's add variables for tracking the number of guesses (pairs flipped),
    // for the total number of correct guesses (pairs matched) and finally a
    // victory boolean to let our controller know if we've won. Refer to the index.html
    // for variable names

    $scope.attempts = 0;
    $scope.totalMatches = 0;
    $scope.victory = false;


    // Next write a selectCard function on $scope that accepts a card object on click and
    // let's make it set card.show to true (boolean). Give it a test!
    // After you complete this refer back to readme.md

    $scope.selectCard = function(card) {

        if ($scope.card1 && $scope.card2) {
            return;
        }

        if (card.show) {
            return;
        }

        if ($scope.matchedCards.length) {
            for (var i = 0; i < $scope.matchedCards.length; i++) {
                var currentCard = $scope.matchedCards[i];
                if (currentCard.title === card.title) {
                    console.log("checking match")
                    return;
                }
                console.log("no match")
            }
        }


        card.show = true;
        if (!$scope.card1) {
            $scope.card1 = card;
        }
        else {
            $scope.card2 = card;
            if (isMatch($scope.card1, $scope.card2)) {
                resetCards();
            }
            else {
                $timeout(function() {
                    $scope.card1.show = false;
                    $scope.card2.show = false;
                    resetCards();
                }, 1000);
            }
        }

    }




    // Write a local resetCards function that will empty our card variables
    // and increase the number of attempts

    resetCards = function() {
        $scope.card1 = undefined;
        $scope.card2 = undefined;
        $scope.attempts++
    };



    // Next write a local isMatch function that accepts our two cards and if the card titles 
    // match, increases our totalMatches and returns true else returns false. After this refer 
    // back to readme.md

    isMatch = function(onecard, twocard) {
        if (onecard.title === twocard.title) {
            $scope.totalMatches++
            $scope.matchedCards.push(onecard);
            checkVictory();
            return true;
        }
        else {
            return false;
        }
    };



    // Finally, write a local checkVictory function that will set $scope.victory = true if the totalMatches 
    // is half the length of the deck. Tip: the game deck array is available at $scope.deck. When you're done
    // refer back to readme.md

    checkVictory = function() {
        if ($scope.totalMatches === $scope.deck.length / 2) {
            $scope.victory = true;
        }
    };



    // Bonus Challenge: Write a function on $scope that can reset the game and add a button that calls it

    $scope.resetGame = function() {
        $scope.deck = GameService.getDeck();
        $scope.matchedCards = [];
        $scope.card1 = undefined;
        $scope.card2 = undefined;
        $scope.attempts = 0;
        $scope.totalMatches = 0;
        $scope.victory = false;

    };



});