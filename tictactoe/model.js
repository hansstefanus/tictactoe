var game = {
    player: '',
    com: '',
    currMove: '',
    moves: 1,
    result: 0,
};

function setPlayer(player) {
    game.player = player;
}

function getPlayer() {
    return game.player;
}

function setCom(com) {
    game.com = com;
}

function getCom() {
    return game.com;
}

function setCurrMove(currMove) {
    game.currMove = currMove;
}

function getCurrMove() {
    return game.currMove;
}

function setMoves(moves) {
    game.moves = moves;
}

function getMoves() {
    return game.moves;
}

function setResult(result) {
    game.result = result;
}

function getResult() {
    return game.result;
}

function getRandomBox() {
    return Math.floor((Math.random() * 9) + 1);
}

function getFirstMove() {
    return Math.floor(Math.random() * Math.floor(2));
}