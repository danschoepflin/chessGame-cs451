var testBoardPawnMovement = [
    ["black tower", "black knight", "black bishop","black queen", "black king", "black bishop", "black knight", "black tower"], 
    ["black pawn","black pawn","black pawn","black pawn","black pawn","black pawn","black pawn","black pawn"],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["white pawn","white pawn","white pawn","white pawn","white pawn","white pawn","white pawn","white pawn"],
["white tower", "white knight", "white bishop","white queen", "white king", "white bishop", "white knight", "white tower"] 
];

QUnit.test( "Pawn can move two spaces on first move (with white pawn)", function ( assert ) {
   var testVal = isValidMove(testBoardPawnMovement, "pawn", "white", true, 49, 33);
   assert.ok(testVal, "Passed!");
});

QUnit.test( "Pawn can't move two spaces on second move (with white pawn)", function ( assert ) {
   var testVal = isValidMove(testBoardPawnMovement, "pawn", "white", false, 49, 33);
   assert.notOk(testVal, "Passed!");
});

QUnit.test("Pawn can move one space on first move (with black pawn)", function (assert) {
    var testVal = isValidMove(testBoardPawnMovement, "pawn", "black", true, 8, 16);
    assert.ok(testVal, "Passed!");
});

QUnit.test("Pawn can move one space on first move (with black pawn)", function (assert) {
    var testVal = isValidMove(testBoardPawnMovement, "pawn", "black", false, 8, 16);
    assert.ok(testVal, "Passed!");
});

var testBoardTakeOwn = [
    ["black tower", "black knight", "black bishop","black queen", "black king", "black bishop", "black knight", "black tower"], 
    ["black pawn","black pawn","black pawn","black pawn","black pawn","black pawn","black pawn","black pawn"],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["white pawn","white pawn","white pawn","white pawn","white pawn","white pawn","white pawn","white pawn"],
["white tower", "white knight", "white bishop","white queen", "white king", "white bishop", "white knight", "white tower"] 
];

QUnit.test("Attempt to take a piece of own color", function (assert) {
    //This move should be valid assuming a piece of own color is not in the target location
    var testVal = isValidMove(testBoardTakeOwn, "tower", "white", true, 56, 57) && !isPieceColor(testBoardTakeOwn, "white", Math.floor(57/8), 57%8);
    assert.notOk(testVal, "Passed!");
});

var testBoardCheck = [
    ["black tower", "black knight", "black bishop","black queen", "black king", "black bishop", "black knight", "black tower"], 
    ["black pawn","black pawn","black pawn","white pawn","black pawn","black pawn","black pawn","black pawn"],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["white pawn","white pawn","","white pawn","white pawn","white pawn","white pawn","white pawn"],
["white tower", "white knight", "white bishop","white queen", "white king", "white bishop", "white knight", "white tower"] 
];

QUnit.test("Check should return true if check state is reached", function (assert) {
    var testVal = isCheck(testBoardCheck, "pawn", "white", false, 11, 4);
    assert.ok(testVal, "Passed!");
});

var testBoardTakeOpponent = [
    ["black tower", "black knight", "black bishop","black queen", "black king", "black bishop", "black knight", "black tower"], 
    ["black pawn","","black pawn","black pawn","black pawn","black pawn","black pawn","black pawn"],
["","","","","","","",""],
["","black pawn","","","","","",""],
["white pawn","","","","","","",""],
["","","","","","","",""],
["","white pawn","white pawn","white pawn","white pawn","white pawn","white pawn","white pawn"],
["white tower", "white knight", "white bishop","white queen", "white king", "white bishop", "white knight", "white tower"] 
];

QUnit.test("Attempt to take a piece of opposing color", function (assert) {
    var testVal = isValidMove(testBoardTakeOpponent, "pawn", "white", false, 32, 25) && !isPieceColor(testBoardTakeOpponent, "white", Math.floor(25/8), 25%8);
    assert.ok(testVal, "Passed!");   
});

var testBoardCastle = [
    ["black tower", "black knight", "black bishop","black queen", "black king", "black bishop", "black knight", "black tower"], 
    ["black pawn","black pawn","black pawn","black pawn","black pawn","black pawn","black pawn","black pawn"],
["","","","","","","",""],
["white pawn","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["","white pawn","white pawn","white pawn","white pawn","white pawn","white pawn","white pawn"],
["white tower", "white knight", "white bishop","white queen", "white king", "white bishop", "white knight", "white tower"] 
];

QUnit.test("Moving a castle", function (assert) {
    var testVal = isValidMove(testBoardCastle, "tower", "white", false, 56, 32);
    assert.ok(testVal, "Passed!");
});

var testBoardKnight = [
    ["black tower", "black knight", "black bishop","black queen", "black king", "black bishop", "black knight", "black tower"], 
    ["black pawn","black pawn","black pawn","black pawn","black pawn","black pawn","black pawn","black pawn"],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["white pawn","white pawn","white pawn","white pawn","white pawn","white pawn","white pawn","white pawn"],
["white tower", "white knight", "white bishop","white queen", "white king", "white bishop", "white knight", "white tower"] 
];

QUnit.test("Moving a knight", function (assert) {
    var testVal = isValidMove(testBoardKnight, "knight", "white", false, 57, 42);
    assert.ok(testVal, "Passed!");
});

var testBishopMovement = [
    ["black tower", "black knight", "black bishop","black queen", "black king", "black bishop", "black knight", "black tower"], 
    ["black pawn","black pawn","black pawn","","","black pawn","black pawn","black pawn"],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["","","black pawn","","black pawn","","",""],
["white pawn","white pawn","white pawn","white pawn","white pawn","white pawn","white pawn","white pawn"],
["white tower", "white knight", "white bishop","white queen", "white king", "white bishop", "white knight", "white tower"] 
];

QUnit.test("Bishop can move diagonally down two spaces", function (assert) {
    var testVal = isValidMove(testBishopMovement, "bishop", "black", false, 2, 20);
    assert.ok(testVal, "Passed!");
});

var testQueenMovement = [
    ["black tower", "black knight", "black bishop","black queen", "black king", "black bishop", "black knight", "black tower"], 
    ["black pawn","black pawn","black pawn","","black pawn","black pawn","black pawn","black pawn"],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["","","","","black pawn","","",""],
["white pawn","white pawn","white pawn","white pawn","white pawn","white pawn","white pawn","white pawn"],
["white tower", "white knight", "white bishop","white queen", "white king", "white bishop", "white knight", "white tower"] 
];

QUnit.test("Queen can move forward two spaces", function (assert) {
    var testVal = isValidMove(testQueenMovement, "queen", "black", false, 3, 19);
    assert.ok(testVal, "Passed!");
});

var testKingMovement = [
    ["black tower", "black knight", "black bishop","black queen", "black king", "black bishop", "black knight", "black tower"], 
    ["black pawn","black pawn","black pawn","black pawn","","black pawn","black pawn","black pawn"],
["","","","","","","",""],
["","","","","","","",""],
["","","","","black pawn","","",""],
["","","","","","","",""],
["white pawn","white pawn","white pawn","white pawn","white pawn","white pawn","white pawn","white pawn"],
["white tower", "white knight", "white bishop","white queen", "white king", "white bishop", "white knight", "white tower"] 
];

QUnit.test("King can move forward one space", function (assert) {
    var testVal = isValidMove(testKingMovement, "king", "black", false, 4, 12);
    assert.ok(testVal, "Passed!");
});