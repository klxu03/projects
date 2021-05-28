var board;
const game = new Chess();

/*The "AI" part starts here */

var calculateBestMove =function(game) {

    var newGameMoves = game.ugly_moves();
    // game.ugly_moves() generates a list of all the possible moves

    var randomNumber = Math.floor(Math.random() * newGameMoves.length);
    return newGameMoves[randomNumber];

};

var makeBestMove = function () {
    var bestMove = getBestMove(game);
    console.log('bestMove', bestMove); // Shown in a form from ASCII number to another ASCII number
    
    // Should uncomment the line under me and comment 2 lines under
    // game.ugly_move(bestMove);
    console.log('game.ugly_move(bestMove);', game.ugly_move(bestMove)); //Actually go ahead and make the move    

    board.position(game.fen()); 
    // Believe game.fen() goes ahead and generates the board configuration with Forsynth-Edwards Notation
    console.log(game.fen())

    renderMoveHistory(game.history()); // After the bot makes a move, render it into the move history and add it into the table
    if (game.game_over()) {
        alert('Game over');
    }
};

var getBestMove = function (game) {
    if (game.game_over()) {
        alert('Game over');
    }
    var bestMove = calculateBestMove(game);
    return bestMove;
};

// Renders move history
var renderMoveHistory = function (moves) {
    var historyElement = $('#move-history').empty();
    historyElement.empty();
    for (var i = 0; i < moves.length; i = i + 2) {
        historyElement.append('<span>' + moves[i] + ' ' + ( moves[i + 1] ? moves[i + 1] : ' ') + '</span><br>')
    }
    historyElement.scrollTop(historyElement[0].scrollHeight);

};

/* Random stuff needed for CSS? starts here */
var onDragStart = function (source, piece, position, orientation) {
    if (game.in_checkmate() === true || game.in_draw() === true ||
        piece.search(/^b/) !== -1) {
        return false;
    }
};

var onDrop = function (source, target) {

    var move = game.move({
        from: source,
        to: target,
        promotion: 'q'
    });

    removeGreySquares();
    if (move === null) {
        return 'snapback';
    }

    renderMoveHistory(game.history());
    window.setTimeout(makeBestMove, 250);
};

var onSnapEnd = function () {
    board.position(game.fen());
};

var onMouseoverSquare = function(square, piece) {
    var moves = game.moves({
        square: square,
        verbose: true
    });

    if (moves.length === 0) return;

    greySquare(square);

    for (var i = 0; i < moves.length; i++) {
        greySquare(moves[i].to);
    }
};

var onMouseoutSquare = function(square, piece) {
    removeGreySquares();
};

var removeGreySquares = function() {
    $('#board .square-55d63').css('background', '');
};

var greySquare = function(square) {
    var squareEl = $('#board .square-' + square);

    var background = '#a9a9a9';
    if (squareEl.hasClass('black-3c85d') === true) {
        background = '#696969';
    }

    squareEl.css('background', background);
};
/* Random stuff needed for CSS? ends here */


// General settings for the board 
var cfg = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onMouseoutSquare: onMouseoutSquare,
    onMouseoverSquare: onMouseoverSquare,
    onSnapEnd: onSnapEnd
};

board = ChessBoard('board', cfg);