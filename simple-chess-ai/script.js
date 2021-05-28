var board;
const game = new Chess();

/*The "AI" part starts here */

var calculateBestMove = function(game) {

    var newGameMoves = game.ugly_moves();
    // game.ugly_moves() generates a list of all the possible moves

    var bestMove = null;
    var bestValue = -999999;

    for(let i = 0; i < newGameMoves.length; i++) {
        let newGameMove = newGameMoves[i];
        
        // Actually really quickly make the move on the board
        game.ugly_move(newGameMove);

        // Take the current board value. However, take the negative of it since the bot is making the move, which is black so negative (want more black pieces than white pieces. but since each black piece is a negative, negative negative is positive and you want to maximize that)
        const boardValue = -evaluateBoard(game.board()); // game.board() gives the current state of the board?
        game.undo(); // Undo doing that move since it might not actually be the move the bot does
        if (boardValue > bestValue) {
            bestValue = boardValue;
            bestMove = newGameMove;
        }
    }

    return bestMove;
};

const evaluateBoard = (board) => {
    let totalEvaluation = 0;
    for (let i = 0; i < 8; i++) {
        for (let i2 = 0; i2 < 8; i2++) {
            totalEvaluation = totalEvaluation + getPieceValue(board[i][i2]);
        }
    }

    return totalEvaluation;
}

const getPieceValue = ( piece ) => {
    if (piece === null) {
        return 0;
    }

    const pieceValues = {
        p: 10,
        r: 50,
        n: 30,
        b: 30,
        q: 90,
        k: 900
    }
    
    const value = pieceValues[piece.type];
    return piece.color === 'w' ? value : -value;
}

var makeBestMove = function () {
    var bestMove = getBestMove(game);
    console.log('bestMove', bestMove); // Shown in a form from ASCII number to another ASCII number
    
    // Should uncomment the line under me and comment 2 lines under
    // game.ugly_move(bestMove);
    console.log('game.ugly_move(bestMove);', game.ugly_move(bestMove)); // Actually go ahead and make the move using the ugly_move(move) function    

    board.position(game.fen()); 
    // game.fen() goes ahead and generates the board configuration with Forsynth-Edwards Notation
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