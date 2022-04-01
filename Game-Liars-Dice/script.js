//testing github changes


let HTMLPieces = {
    titleClass:document.querySelector(".title"),
    beginGameClass:document.querySelector(".begin-Game"),
    startNextRoundClass:document.querySelector(".start-Next-Round"),

    playingBoardClass:document.querySelector(".playing-Board"),
    diceClass:document.querySelectorAll(".dice"),

    computerSideClass:document.querySelector(".computer-Side"),
    computerTurnTextID: document.querySelector("#computer-Turn-Text"),
    computerDie1ID:document.querySelector("#Computer-Die-1"),
    computerDie2ID:document.querySelector("#Computer-Die-2"),
    computerDie3ID:document.querySelector("#Computer-Die-3"),
    computerDie4ID:document.querySelector("#Computer-Die-4"),
    computerDie5ID:document.querySelector("#Computer-Die-5"),
    computerDie6ID:document.querySelector("#Computer-Die-6"),

    computerLastMoveClass:document.querySelector(".computer-Last-Move"),
    computerLastMoveLabelID:document.querySelector("#computer-Last-Move-Label"),
    computerLastMoveTextID:document.querySelector("#computer-Last-Move-Text"),

    humanSideClass:document.querySelector(".human-Side"),
    humanTurnTextID:document.querySelector("#human-Turn-Text"),
    humanDie1ID:document.querySelector("#human-Die-1"),
    humanDie2ID:document.querySelector("#human-Die-2"),
    humanDie3ID:document.querySelector("#human-Die-3"),
    humanDie4ID:document.querySelector("#human-Die-4"),
    humanDie5ID:document.querySelector("#human-Die-5"),
    humanDie6ID:document.querySelector("#human-Die-6"),

    moveOptionsClass:document.querySelector(".move-Options"),
    orTextID:document.querySelector("#or-Text"),

    option1Class:document.querySelector(".option-1"),
    increaseBidLabelID:document.querySelector("#increase-Bid-Label"),
    bidDisplayClass:document.querySelector(".bid-Display"),
    upButtonClass:document.querySelector(".up-Button"),
    downButtonClass:document.querySelector(".down-Button"),

    increaseCountBoxID:document.querySelector("#increase-Count-Box"),
    countLabelID:document.querySelector("#count-Label"),
    setCountID:document.querySelector("#set-Count"),
    countUpButtonID:document.querySelector("#count-Up-Button"),

    changeValueBoxID:document.querySelector("#change-Value-Box"),
    valueLabelID:document.querySelector("#value-Label"),
    setValueID:document.querySelector("#set-Value"),
    valueUpButtonID:document.querySelector("#value-Up-Button"),
    valueDownButtonID:document.querySelector("#value-Down-Button"),

    option2Class:document.querySelector(".option-2"),
}


var turnFunctions = {

    switchTurn: function () {
        //switch turns
        if (turn === human) {turn = computer}
        else if (turn === computer) {turn = human}

        //reset the rule-count/value trackers
        ruleCount = HTMLPieces.setCountID.innerHTML;
        ruleValue = HTMLPieces.setValueID.innerHTML;
    },

    startRound: function () {
        //showDiceFunctions.removeMarkWinningDice()
        diceFunctions.showDiceFunctions.removeMarkWinningDice()
        
        //set count and value to 0
        HTMLPieces.setCountID.innerHTML = 0;
        HTMLPieces.setValueID.innerHTML = 1;

        //reroll dice
        diceFunctions.manipulateDiceFunctions.roll(human.dice);
        diceFunctions.manipulateDiceFunctions.roll(computer.dice);
       
        //hide computer dice
        diceFunctions.showDiceFunctions.hideDice(computer.dice);
       
        //show human dice
        diceFunctions.showDiceFunctions.showDice(human.dice);
       
        //Activate choice buttons
        buttonFunctions.activatingButtonFunctions.activateCountAndValue();
        buttonFunctions.activatingButtonFunctions.activateRaiseBidAndPass();
        buttonFunctions.activatingButtonFunctions.activateCallThemOut();

        //hide and deactivate "Start Next Round" button
        buttonFunctions.hidingButtonFunctions.hideStartRound();
        buttonFunctions.activatingButtonFunctions.deactivateStartRound();

        //reset the rule-count/value trackers
        ruleCount = HTMLPieces.setCountID.innerHTML;
        ruleValue = HTMLPieces.setValueID.innerHTML;

        //if computers turn, computer makes decision
        if (turn === computer) {
            compDecisionFunctions.computerDecision();
        }
    },

    endRound: function () {
        //deactivate all buttons
        buttonFunctions.activatingButtonFunctions.deactivateCountAndValue();
        buttonFunctions.activatingButtonFunctions.deactivateRaiseBidAndPass();
        buttonFunctions.activatingButtonFunctions.deactivateCallThemOut();

        //show all dice
        diceFunctions.showDiceFunctions.showDice(computer.dice);
        diceFunctions.showDiceFunctions.showDice(human.dice);

        //mark winning dice
        diceFunctions.showDiceFunctions.markWinningDice(human.dice);
        diceFunctions.showDiceFunctions.markWinningDice(computer.dice);

        //show and activate "Start Round" button
        buttonFunctions.displayingButtonFunctions.showStartRound();
        buttonFunctions.activatingButtonFunctions.activateStartRound();



    },

    raiseBidandPassTurn: function() {
        //check for bid rule violations
        if (ruleFunctions.bidRuleFunctions() == "violated") {
            alert("You cant pass the turn if either the count or value equal zero!  You also must increase the bid in order to pass the turn (AKA not `calling out')!")
            return;
        }
        
        subjectOfAlert = (function() {
            if (turn === human) {return "You"} 
            else {return "The computer"}
        }());
        alert(`${subjectOfAlert} raised the bid to ${HTMLPieces.setCountID.innerHTML} ${HTMLPieces.setValueID.innerHTML}'s and passed the turn`)

        turnFunctions.switchTurn()

        //if computers turn, computer makes decision
        if (turn === computer) {
            compDecisionFunctions.computerDecision();
        }
    },

    callThemOut: function () {
        //check for callThemOut rule violations
        if (ruleFunctions.callOutRuleFunctions() == "violated") {
            alert("You cant call them out if you've already increased the bid this turn or if the count/value are set to 0!")
            return;
        }
        
        //if the computer called out the human, alert human
        if (turn === computer) {messageFunctions.instructionTextFunctions.alertCallOut}

        //end round function: disables all buttons except for "click for next round" button // also reveals computer dice and places red borders around all dice of interest
        turnFunctions.endRound();

        //create variable goodCall and set it to true or false depending on whether the caller was correct
        let goodCall;

        //count up all the dice of interest and compare actual count to the bid
        if (HTMLPieces.setCountID.innerHTML <= diceFunctions.countDiceFunctions.countWinningDice()) {
            goodCall = false;
        } else {goodCall = true}

        //if goodcall = true, loseADie(opposite player) >>> check for win >>> switch turns >>> start new round
        //if goodcall = false, loseADie(calling player) >>> check for win >>> start new round
        if (goodCall === true) {
            
            //opposite player loses a die
            let oppositePlayer;
            if (turn == human) {oppositePlayer = computer}
            else {oppositePlayer = human}
            diceFunctions.manipulateDiceFunctions.loseADie(oppositePlayer.dice);

            //swith turns
            turnFunctions.switchTurn()       
        } else {
            //current player loses a die
            diceFunctions.manipulateDiceFunctions.loseADie(turn.dice);
        }
 
        //check for win
        winConditionFunctions.checkForWin();
    },

}
var buttonFunctions = {

    displayingButtonFunctions: {
        showStartRound: function() {
            HTMLPieces.beginGameClass.style.width = "145px"
            HTMLPieces.beginGameClass.style.height = "55px"
            HTMLPieces.beginGameClass.style.backgroundColor = "grey";
            HTMLPieces.beginGameClass.innerHTML = "Start Next Round";
        }
    },

    hidingButtonFunctions: {
        hideStartRound: function() {
            HTMLPieces.beginGameClass.style.width = "0px"
            HTMLPieces.beginGameClass.style.height = "0px"
            HTMLPieces.beginGameClass.style.backgroundColor = "bisque";
            HTMLPieces.beginGameClass.innerHTML = "";
        }
    },

    activatingButtonFunctions: {

        incCount: function() {HTMLPieces.setCountID.innerHTML ++;},
        incValue:function() {if(HTMLPieces.setValueID.innerHTML < 6) {HTMLPieces.setValueID.innerHTML ++;}},
        decValue: function() {if(HTMLPieces.setValueID.innerHTML > 1) {HTMLPieces.setValueID.innerHTML --;}},
        activateCountAndValue: function() {
            HTMLPieces.countUpButtonID.addEventListener("click", buttonFunctions.activatingButtonFunctions.incCount);
            HTMLPieces.valueUpButtonID.addEventListener("click", buttonFunctions.activatingButtonFunctions.incValue);
            HTMLPieces.valueDownButtonID.addEventListener("click", buttonFunctions.activatingButtonFunctions.decValue);
        },
        deactivateCountAndValue: function() {
            HTMLPieces.countUpButtonID.removeEventListener("click", buttonFunctions.activatingButtonFunctions.incCount);
            HTMLPieces.valueUpButtonID.removeEventListener("click", buttonFunctions.activatingButtonFunctions.incValue);
            HTMLPieces.valueDownButtonID.removeEventListener("click", buttonFunctions.activatingButtonFunctions.decValue);
        },

        activateRaiseBidAndPass: function() {
            HTMLPieces.increaseBidLabelID.addEventListener("click", turnFunctions.raiseBidandPassTurn);
        },
        deactivateRaiseBidAndPass: function() {
            HTMLPieces.increaseBidLabelID.removeEventListener("click", turnFunctions.raiseBidandPassTurn);
        },

        activateCallThemOut: function() {
            HTMLPieces.option2Class.addEventListener("click", turnFunctions.callThemOut);
        },
        deactivateCallThemOut: function() {
            HTMLPieces.option2Class.removeEventListener("click", turnFunctions.callThemOut);
        },

        activateStartRound: function() {
            HTMLPieces.beginGameClass.addEventListener("click", turnFunctions.startRound);
        },
        deactivateStartRound: function() {
            HTMLPieces.beginGameClass.removeEventListener("click", turnFunctions.startRound);
        },
    },
}
var messageFunctions = {
    warningTextFunctions: {},
    instructionTextFunctions: {

        alertCallOut: function() {
            alert(`The Computer Called You Out!`)
        },

        youLostADie: function() {
            if (turn === human) {alert(`You lost a die!`)}
            else {alert(`The computer lost a die!`)}
        }
    },
}
var winConditionFunctions = {
    //if winner = true, prompts user and refreshes
    checkForWin: function() {
            if (computer.dice.length === 0) {
                alert(`You won!  Click okay to start a new game!`)
                location.reload();
            } else if (human.dice.length === 0) {
                alert(`The computer won!  Click okay to start a new game!`)
                location.reload();
            }
    },
    
    createWinner: function() {

    }
}
var ruleFunctions = {
    bidRuleFunctions: function () {
        if (HTMLPieces.setCountID.innerHTML == 0 || HTMLPieces.setValueID.innerHTML == 0) {
            return "violated"
        } else if ((HTMLPieces.setCountID.innerHTML == ruleCount && HTMLPieces.setValueID.innerHTML <= ruleValue)) {
            return "violated"
        }

    },
    callOutRuleFunctions: function () {
        if (HTMLPieces.setCountID.innerHTML == 0 || HTMLPieces.setValueID.innerHTML == 0) {
            return "violated"
        } else if (HTMLPieces.setCountID.innerHTML != ruleCount || HTMLPieces.setValueID.innerHTML != ruleValue){
            return "violated"
        }
    },
}
var compDecisionFunctions = {
    computerDecision: function() {

        //opening rounds (greater than 10 dice)
                //evaluate to raise bid or call out

                //if calling out

                //if raising bid
                    //theres a random number generator, and for each number generated, the computer follows a different decision making path.  this decreases predictability of the computer.
                    //1 - no bluff - comp bids on whatever they have the most of - done
                        //ONLY INCREASE COUNT IF HAVE TO
                    //2 - bluff - comp bids on something they have nothing of and then calls them out the next round
                    //3 - follow humans lead - comp switches value to whatever the human last bid on 
                        //no bluff - only increase the count by one
                        //bluff - increase the count by 2


        //middle rounds (5 to 9 dice)
                //evaluate to raise bid or call out

                //if calling out



        //last rounds (4 or fewer dice)
                //evaluate to raise bid or call out

                //if calling out


        
        //if count is greater than expected value, call them out, otherwise increase bid
        if (compDecisionFunctions.probabilityFunctions.expectedValue() >= HTMLPieces.setCountID.innerHTML) {
            HTMLPieces.setCountID.innerHTML ++;
            HTMLPieces.setValueID.innerHTML = compDecisionFunctions.probabilityFunctions.mostCommonDie();

            //the computer should raise the count to the expected value if its not already there

            //the computer can raise just the value if the count is already at the expected value

            turnFunctions.raiseBidandPassTurn();
        } else {
            turnFunctions.callThemOut();
        }

        //if human started bidding for the round, add 1 to the expected value of whatever they set the bid to
        

        //set the value to whatever the computer has the most of - DONE
        //for each comp bid, there is a 33% chance they will bluff ()
            //bluffing could be setting the value to a random number, or keeping it the same despite it not being the computers most common die 

    
    },
    probabilityFunctions: {
        chanceOfDiceOfInterest: 1/6,
        chanceOfDiceEqualOne: 1/6,
        chancePerDie: 0,

        expectedValue: function() {
                if (HTMLPieces.setValueID.innerHTML == 1) {
                    this.chancePerDie = this.chanceOfDiceEqualOne;
                    return ((human.dice.length + computer.dice.length) * this.chancePerDie)
                } else {
                    this.chancePerDie = this.chanceOfDiceEqualOne + this.chanceOfDiceOfInterest;
                    return ((human.dice.length + computer.dice.length) * this.chancePerDie)
                }
        },

        mostCommonDie: function () {
            let numberOfOnes = 0;
            let numberOfTwos = 0;
            let numberOfThrees = 0;
            let numberOfFours = 0;
            let numberOfFives = 0;
            let numberOfSixes = 0;

            for (let eachDie = 1; eachDie <= 6; eachDie ++) {
                for (let cycleThroughDice = 0; cycleThroughDice <= computer.dice.length - 1; cycleThroughDice ++) {
                    if (computer.dice[cycleThroughDice] == eachDie) {
                        if (eachDie == 1) {numberOfOnes ++;}
                        if (eachDie == 2 || eachDie == 1) {numberOfTwos ++;}
                        if (eachDie == 3 || eachDie == 1) {numberOfThrees ++;}
                        if (eachDie == 4 || eachDie == 1) {numberOfFours ++;}
                        if (eachDie == 5 || eachDie == 1) {numberOfFives ++;}
                        if (eachDie == 6 || eachDie == 1) {numberOfSixes ++;}
                    }
                }
            }
        let max = Math.max(numberOfOnes,numberOfTwos,numberOfThrees,numberOfFours,numberOfFives,numberOfSixes);
            if (numberOfSixes === max) {return 6}
            if (numberOfFives === max) {return 5}
            if (numberOfFours === max) {return 4}
            if (numberOfThrees === max) {return 3}
            if (numberOfTwos === max) {return 2}
            if (numberOfOnes === max) {return 1}
        }
    },
}
var diceFunctions = {

    manipulateDiceFunctions: {
        roll: function(whoseDice) {
            for (let i=0;i < whoseDice.length;i++) {
                whoseDice[i] = Math.floor(Math.random() * 6) + 1;}
        },

        loseADie: function(whoseDice) {
            whoseDice.pop();
            if (whoseDice === human.dice) {
                alert(`You lost a die!`)
                let i = human.dice.length
                eval("HTMLPieces.humanDie" + (i+1) + "ID").src = "red x.png"
            } else {
                alert(`The computer lost a die!`)
                let i = computer.dice.length
                eval("HTMLPieces.computerDie" + (i+1) + "ID").src = "red x.png"
            }
        },
    },

    showDiceFunctions: {
        logDice: function(whoseDice) {console.log(whoseDice)},

        showDice: function(whoseDice) {
            for (var die = 0; die < whoseDice.length; die++) {
                for (var side = 1; side <= 6; side++){
                    if (whoseDice[die] == side && whoseDice == human.dice) {
                        eval("HTMLPieces.humanDie" + (die+1) + "ID").src = "Die " + side + ".png"
                    } else if (whoseDice[die] == side && whoseDice == computer.dice) {
                        eval("HTMLPieces.computerDie" + (die+1) + "ID").src = "Die " + side + ".png"
                    }
                }
            }
        },
        
        hideDice: function(whoseDice) {
            for (die = 0; die < whoseDice.length; die++) {
                if (whoseDice == human.dice) {
                    eval("HTMLPieces.humanDie" + (die+1) + "ID").src = "Mystery Die.jpeg"
                } else if (whoseDice == computer.dice) {
                    eval("HTMLPieces.computerDie" + (die+1) + "ID").src = "Mystery Die.jpeg"
                }
            }
        },
    
        markWinningDice: function(whoseDice) {
            //debugger;
            for (var die = 0; die < whoseDice.length; die++) {
                if (whoseDice[die] == HTMLPieces.setValueID.innerHTML || whoseDice[die] === 1) {
                    let tempDie;
                    if (whoseDice === human.dice) {tempDie = 'humanDie'}
                    else if (whoseDice === computer.dice) {tempDie = 'computerDie'}
                    eval(`HTMLPieces.${tempDie}` + (die + 1) + "ID").style.borderWidth = "4px";
                }
            }   
        },

        removeMarkWinningDice: function() {
            //resets the borders for all dice back to invisible
            for ( i = 0; i < 12; i++) {
                HTMLPieces.diceClass[i].style.borderWidth = "0px";
            }
        }
    
    },

    countDiceFunctions: {
        countWinningDice: function() {
            allDice = human.dice + computer.dice;
            winningDice = 0;
            for (i = 0; i < allDice.length; i++) {
                if (allDice[i] == 1 || allDice[i] == HTMLPieces.setValueID.innerHTML) {
                    winningDice ++;
                }
            }
            return winningDice;
        }
    }
}  


let computer = { 
    dice: [1,1,1,1,1,1],
}
let human = {
    dice: [1,1,1,1,1,1],
}


//initiators
let turn = human
buttonFunctions.activatingButtonFunctions.activateStartRound();

//global variables - rule trackers
let ruleCount = HTMLPieces.setCountID.innerHTML;
let ruleValue = HTMLPieces.setValueID.innerHTML;

//let gameSequence = function() 
    // 1 start a round >>> takes a decision
    // 3.i  if raise bid is chosen, switch turns and if turn === computer, computer makes decision
    // 3.ii if callThemOut is chosen
    //     endRound function: disable all buttons
    //     3.ii.a showDice(human), showDice(computer)
    //     showDiceFunctions.markWinningDice() to place red boxes
    //     3.ii.b count all of setValue and set to variable
    //     3.ii.c run call out function to compare variable to the bid
        // 3.ii.d if variable is >= the bid
            // 1 person who calledOut loses a die
            // 2 check for win
            // 3 dont switch turns 
            // 4 show and activate "start next round" button

        // 3.ii.e if variable < the bid
            // 1 non-current turn person loses a die
            // 2 check for win
            // 3 switch turns
            // 4 show and activate "start next round" button
//}




//-------------------Testing area-----------------------

//rolling and logging dice
//showing dice

//buttonFunctions.activatingButtonFunctions.deactivateCountAndValue();
//show and hide winning dice
//HTMLPieces.setValueID.innerHTML = 2;

