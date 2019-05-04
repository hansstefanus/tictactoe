$(document).ready(function () {
    // button X click event
    $('#btnX').click(function () {
        setFigure('X', 'O');                // set figure
    });

    // button O click event
    $('#btnO').click(function () {
        setFigure('O', 'X');                // set figure
    });

    // button restart click event
    $('#btnRestart').click(function () {
        // confirmation dialog to refresh page (restart)
        if (confirm('Do you want to restart?')) {
            location.reload();  // refresh page
        }
    });

    // figure set function
    function setFigure(player, com) {
        setPlayer(player);                  // set player figure
        setCom(com);                        // set com figure
        $('#choose').html('Your figure is ' + player);
        $('#btn' + com).removeClass('btnPlayerHover');
        $('#btn' + player).removeClass('btnPlayerHover').addClass('btnSelect');

        $('#playBoard').removeClass('hide').addClass('show');
        $('#btnO, #btnX').prop('disabled', true);
    
        // if com first turn
        if (getFirstMove() === 0) {   
            setComFirstMove();              // com first move
        }

        setCurrMove('player');              // set current turn to player
    }

    // com first turn function
    function setComFirstMove() {
        let turn = getRandomBox();          // get random number between 1-9
        $('#tic' + turn).html(getCom());    // draw com figure
        $('#tic' + turn).off('click');      // disable box after draw
    }

    // draw figure function
    function turnPhase(id) {
        if (getCurrMove() === 'player') {   // if current turn is player
            $('#' + id).html(getPlayer());  // draw player figure
            $('#' + id).off('click');       // disable box after draw
            gameStatus();                   // checking game result
            setCurrMove('com');             // set next move to com
        }
        else if (getCurrMove() === 'com') { // if current turn is com
            $('#' + id).html(getCom());     // draw player figure
            $('#' + id).off('click');       // disable box after draw
            gameStatus();                   // checking game result
            setCurrMove('player');          // set next move to com
        }

        let move = getMoves();              // get number of move
        setMoves(move + 1);                 // set move + 1
        drawChecking();                     // checking result if draw

        // validation com turn
        if (getCurrMove() === 'com' && getResult() === 0) {
            comMove();
        }
    }

    // com turn funciton
    function comMove() {
        let whileCtr = 0;                   // counter variable
        let turn = getRandomBox();          // get random number between 1-9

        // validation com turn
        if (getMoves() < 9) {
            while (whileCtr == 0) {
                // if box already drawn, get another random number
                if ($('#tic' + turn).html() == getPlayer() || $('#tic' + turn).html() == getCom()) {
                    turn = getRandomBox();
                }
                else {
                    whileCtr = 1;
                }
            }
        }

        turnPhase('tic' + turn);            // draw com figure
    }

    // disable all box function
    function disableAll() {
        $('#tic1').off('click');
        $('#tic2').off('click');
        $('#tic3').off('click');
        $('#tic4').off('click');
        $('#tic5').off('click');
        $('#tic6').off('click');
        $('#tic7').off('click');
        $('#tic8').off('click');
        $('#tic9').off('click');
    }

    // check result function
    function gameStatus() {
        var currMove;

        if (getCurrMove() === 'player') {
            currMove = getPlayer();         // set currMoves to player figure
        } else if (getCurrMove() === 'com') {
            currMove = getCom();            // set currMoves to com figure
        }

        // checking all box
        switch (true) {
            // if box 1,2,3 === currMove, result render
            case $('#tic1').html() == currMove && $('#tic2').html() == currMove && $('#tic3').html() == currMove:
                result('#tic1', '#tic2', '#tic3');
                break;
            // if box 4,5,6 === currMove, result render
            case $('#tic4').html() == currMove && $('#tic5').html() == currMove && $('#tic6').html() == currMove:
                result('#tic4', '#tic5', '#tic6');
                break;
            // if box 7,8,9 === currMove, result render
            case $('#tic7').html() == currMove && $('#tic8').html() == currMove && $('#tic9').html() == currMove:
                result('#tic7', '#tic8', '#tic9');
                break;
            // if box 1,4,7 === currMove, result render
            case $('#tic1').html() == currMove && $('#tic4').html() == currMove && $('#tic7').html() == currMove:
                result('#tic1', '#tic4', '#tic7');
                break;
            // if box 2,5,8 === currMove, result render
            case $('#tic2').html() == currMove && $('#tic5').html() == currMove && $('#tic8').html() == currMove:
                result('#tic2', '#tic5', '#tic8');
                break;
            // if box 3,6,9 === currMove, result render
            case $('#tic3').html() == currMove && $('#tic6').html() == currMove && $('#tic9').html() == currMove:
                result('#tic3', '#tic6', '#tic9');
                break;
            // if box 1,5,9 === currMove, result render
            case $('#tic1').html() == currMove && $('#tic5').html() == currMove && $('#tic9').html() == currMove:
                result('#tic1', '#tic5', '#tic9');
                break;
            // if box 3,5,7 === currMove, result render
            case $('#tic3').html() == currMove && $('#tic5').html() == currMove && $('#tic7').html() == currMove:
                result('#tic3', '#tic5', '#tic7');
                break;
            // checking if there is draw result
            default:
                drawChecking();
        }
    }

    // draw result checking function
    function drawChecking() {
        // if move already limit and result still not found = draw
        if (getMoves() === 9 && getResult() === 0) {
            $('#btnTurn').html("Draw!");
            $('#btnTurn').addClass('draw');
            $('#tic1').addClass('draw');
            $('#tic2').addClass('draw');
            $('#tic3').addClass('draw');
            $('#tic4').addClass('draw');
            $('#tic5').addClass('draw');
            $('#tic6').addClass('draw');
            $('#tic7').addClass('draw');
            $('#tic8').addClass('draw');
            $('#tic9').addClass('draw');
            disableAll();                   // disable all box
        }
    }

    // result rendering function
    function result(first, second, third) {
        let cssClass;
        setResult(1);                       // set result variable to 1, means there is already have a winner
        if(getCurrMove() === 'player') {    // check if player win
            cssClass = 'win';
            $('#btnTurn').html("You Win!");
            $('#btnTurn').addClass('win');
        }
        else if(getCurrMove() === 'com') {  // check if com win
            cssClass = 'lose';
            $('#btnTurn').html("You Lose!");
            $('#btnTurn').addClass('lose');
        }

        $(first).addClass(cssClass);        // set css to box
        $(second).addClass(cssClass);       // set css to box
        $(third).addClass(cssClass);        // set css to box

        disableAll();                       // disable all box
    }

    // start: box button click event for player
    $("#tic1").click(function () {
        turnPhase('tic1');
    });

    $("#tic2").click(function () {
        turnPhase('tic2');
    });

    $("#tic3").click(function () {
        turnPhase('tic3');
    });

    $("#tic4").click(function () {
        turnPhase('tic4');
    });

    $("#tic5").click(function () {
        turnPhase('tic5');
    });

    $("#tic6").click(function () {
        turnPhase('tic6');
    });

    $("#tic7").click(function () {
        turnPhase('tic7');
    });

    $("#tic8").click(function () {
        turnPhase('tic8');
    });

    $("#tic9").click(function () {
        turnPhase('tic9');
    });
    // end: box button click event for player
});