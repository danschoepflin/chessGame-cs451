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