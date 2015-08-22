/*jslint browser: true*/
/*jslint node: true*/
/*global $, jQuery, alert*/

$(document).ready(function() {
    var board;
    var selectedPiece = undefined;          /* [Holds the currently selected piece] @type {[JSON]} */
    var selectedPosition = undefined;       /* [Holds the position where the selected piece is to be moved] @type {[JSON]} */
    var fullClass;                          /* [Holds all classes of the selected piece] @type {[String]} */
    var lastMoveColor;                      /* [What was the color of the last piece that was moved] @type {[String]} */

    Parse.initialize("W7MogVvTat6u5JoXgo4qP5qqB5ldvH4sWrvPmkB3", "oCxcrfx1IJ8yBz24rxkRBiAuh7xbOxe5ycJ5Gh8C");


    createTable();

    /**
     * [Function that created the chess board table to start the game.]
     *  NOTE:  This function is only for starting a new game. If loadGame is chosen, the table is pulled from the database
     *         and appended to the column.
     */
    function createTable() {
        var newHtml = '';
        newHtml = newHtml + '<table id="chess_board" style="display: none;">';
        newHtml = newHtml + '<tr>';
        newHtml = newHtml + '<td id="0"><span data-color="black" data-piece="tower" class="unmoved black glyphicon glyphicon-tower"></span></td>';
        newHtml = newHtml + '<td id="1"><span data-color="black" data-piece="knight" class="unmoved black glyphicon glyphicon-knight"></span></td>';
        newHtml = newHtml + '<td id="2"><span data-color="black" data-piece="bishop" class="unmoved black glyphicon glyphicon-bishop"></span></td>';
        newHtml = newHtml + '<td id="3"><span data-color="black" data-piece="queen" class="unmoved black glyphicon glyphicon-queen"></span></td>';
        newHtml = newHtml + '<td id="4"><span data-color="black" data-piece="king" class="unmoved black glyphicon glyphicon-king"></span></td>';
        newHtml = newHtml + '<td id="5"><span data-color="black" data-piece="bishop" class="unmoved black glyphicon glyphicon-bishop"></span></td>';
        newHtml = newHtml + '<td id="6"><span data-color="black" data-piece="knight" class="unmoved black glyphicon glyphicon-knight"></span></td>';
        newHtml = newHtml + '<td id="7"><span data-color="black" data-piece="tower" class="unmoved black glyphicon glyphicon-tower"></span></td>';
        newHtml = newHtml + '</tr>';
        newHtml = newHtml + '<tr>';
        newHtml = newHtml + '<td id="8"><span data-color="black" data-piece="pawn" class="unmoved black pawn glyphicon glyphicon-pawn"></span></td>';
        newHtml = newHtml + '<td id="9"><span data-color="black" data-piece="pawn" class="unmoved black pawn glyphicon glyphicon-pawn"></span></td>';
        newHtml = newHtml + '<td id="10"><span data-color="black" data-piece="pawn" class="unmoved black pawn glyphicon glyphicon-pawn"></span></td>';
        newHtml = newHtml + '<td id="11"><span data-color="black" data-piece="pawn" class="unmoved black pawn glyphicon glyphicon-pawn"></span></td>';
        newHtml = newHtml + '<td id="12"><span data-color="black" data-piece="pawn" class="unmoved black pawn glyphicon glyphicon-pawn"></span></td>';
        newHtml = newHtml + '<td id="13"><span data-color="black" data-piece="pawn" class="unmoved black pawn glyphicon glyphicon-pawn"></span></td>';
        newHtml = newHtml + '<td id="14"><span data-color="black" data-piece="pawn" class="unmoved black pawn glyphicon glyphicon-pawn"></span></td>';
        newHtml = newHtml + '<td id="15"><span data-color="black" data-piece="pawn" class="unmoved black pawn glyphicon glyphicon-pawn"></span></td>';
        newHtml = newHtml + '</tr>';
        newHtml = newHtml + '<tr>';
        newHtml = newHtml + '<td id="16"><span></span></td>';
        newHtml = newHtml + '<td id="17"><span></span></td>';
        newHtml = newHtml + '<td id="18"><span></span></td>';
        newHtml = newHtml + '<td id="19"><span></span></td>';
        newHtml = newHtml + '<td id="20"><span></span></td>';
        newHtml = newHtml + '<td id="21"><span></span></td>';
        newHtml = newHtml + '<td id="22"><span></span></td>';
        newHtml = newHtml + '<td id="23"><span></span></td>';
        newHtml = newHtml + '</tr>';
        newHtml = newHtml + '<tr>';
        newHtml = newHtml + '<td id="24"><span></span></td>';
        newHtml = newHtml + '<td id="25"><span></span></td>';
        newHtml = newHtml + '<td id="26"><span></span></td>';
        newHtml = newHtml + '<td id="27"><span></span></td>';
        newHtml = newHtml + '<td id="28"><span></span></td>';
        newHtml = newHtml + '<td id="29"><span></span></td>';
        newHtml = newHtml + '<td id="30"><span></span></td>';
        newHtml = newHtml + '<td id="31"><span></span></td>';
        newHtml = newHtml + '</tr>';
        newHtml = newHtml + '<tr>';
        newHtml = newHtml + '<td id="32"><span></span></td>';
        newHtml = newHtml + '<td id="33"><span></span></td>';
        newHtml = newHtml + '<td id="34"><span></span></td>';
        newHtml = newHtml + '<td id="35"><span></span></td>';
        newHtml = newHtml + '<td id="36"><span></span></td>';
        newHtml = newHtml + '<td id="37"><span></span></td>';
        newHtml = newHtml + '<td id="38"><span></span></td>';
        newHtml = newHtml + '<td id="39"><span></span></td>';
        newHtml = newHtml + '</tr>';
        newHtml = newHtml + '<tr>';
        newHtml = newHtml + '<td id="40"><span></span></td>';
        newHtml = newHtml + '<td id="41"><span></span></td>';
        newHtml = newHtml + '<td id="42"><span></span></td>';
        newHtml = newHtml + '<td id="43"><span></span></td>';
        newHtml = newHtml + '<td id="44"><span></span></td>';
        newHtml = newHtml + '<td id="45"><span></span></td>';
        newHtml = newHtml + '<td id="46"><span></span></td>';
        newHtml = newHtml + '<td id="47"><span></span></td>';
        newHtml = newHtml + '</tr>';
        newHtml = newHtml + '<tr>';
        newHtml = newHtml + '<td id="48"><span data-color="white" data-piece="pawn" class="unmoved white pawn glyphicon glyphicon-pawn"></span></td>';
        newHtml = newHtml + '<td id="49"><span data-color="white" data-piece="pawn" class="unmoved white pawn glyphicon glyphicon-pawn"></span></td>';
        newHtml = newHtml + '<td id="50"><span data-color="white" data-piece="pawn" class="unmoved white pawn glyphicon glyphicon-pawn"></span></td>';
        newHtml = newHtml + '<td id="51"><span data-color="white" data-piece="pawn" class="unmoved white pawn glyphicon glyphicon-pawn"></span></td>';
        newHtml = newHtml + '<td id="52"><span data-color="white" data-piece="pawn" class="unmoved white pawn glyphicon glyphicon-pawn"></span></td>';
        newHtml = newHtml + '<td id="53"><span data-color="white" data-piece="pawn" class="unmoved white pawn glyphicon glyphicon-pawn"></span></td>';
        newHtml = newHtml + '<td id="54"><span data-color="white" data-piece="pawn" class="unmoved white pawn glyphicon glyphicon-pawn"></span></td>';
        newHtml = newHtml + '<td id="55"><span data-color="white" data-piece="pawn" class="unmoved white pawn glyphicon glyphicon-pawn"></span></td>';
        newHtml = newHtml + '</tr>';
        newHtml = newHtml + '<tr>';
        newHtml = newHtml + '<td id="56"><span data-color="white" data-piece="tower" class="unmoved white glyphicon glyphicon-tower"></span></td>';
        newHtml = newHtml + '<td id="57"><span data-color="white" data-piece="knight" class="unmoved white glyphicon glyphicon-knight"></span></td>';
        newHtml = newHtml + '<td id="58"><span data-color="white" data-piece="bishop" class="unmoved white glyphicon glyphicon-bishop"></span></td>';
        newHtml = newHtml + '<td id="59"><span data-color="white" data-piece="queen" class="unmoved white glyphicon glyphicon-queen"></span></td>';
        newHtml = newHtml + '<td id="60"><span data-color="white" data-piece="king" class="unmoved white glyphicon glyphicon-king"></span></td>';
        newHtml = newHtml + '<td id="61"><span data-color="white" data-piece="bishop" class="unmoved white glyphicon glyphicon-bishop"></span></td>';
        newHtml = newHtml + '<td id="62"><span data-color="white" data-piece="knight" class="unmoved white glyphicon glyphicon-knight"></span></td>';
        newHtml = newHtml + '<td id="63"><span data-color="white" data-piece="tower" class="unmoved white glyphicon glyphicon-tower"></span></td>';
        newHtml = newHtml + '</tr>';
        newHtml = newHtml + '</table>';
        $('.tableColumn').append(newHtml);
    }

    /**
     * [Listening for a click on the .startButton. Clicking this removes the opening screen and creates the game screen]
     * @triggers: startGame {body} [Event triggered to notify that the game has been started]
     */
    $('.startButton').on('click', function(event) {
        $('body').trigger('startGame');
        var forfeitButton = '<button class="forfeitButton">Forfeit</button>';   /* [Holds the button HTML for the forfeitButton] */
        var saveButton = '<button class="saveButton">Save</button>';            /* [Holds the button HTML for the saveButton] */

        $('.openingButton').remove();
        $('table').fadeIn('400');
        $('.chat').fadeIn('400');
        $('.forfeitButtonDiv').append(forfeitButton);
        $('.saveButtonDiv').append(saveButton);
        runTimer();
    });

    /**
     * [Listening for a click on the .forfeitButton. Clicking this ends the game(without saving it) and takes the user to the end screen]
     * @triggers: endGame {body} [Event triggered to notify that endGame condition has been met]
     */
    $('body').on('click', '.forfeitButton', function(event) {
        console.log(getBoardAsHTML());
        var c = confirm('Are you sure you want to QUIT the game and FORFEIT?');     /* Holding the boolean return based on what the user chose */
        if (c) {
            $('body').trigger('endGame');
        }
    });

    /**
     * [Listening for a click on the .saveButton. Clicking this saves the current table to the database which can be retrieved on load.]
     * NOTE: This also gives the user a key which is specific to the board they saved to retrieve their saved game later.
     * @triggers: none;
     */
    $('body').on('click', '.saveButton', function(event) {
        var c = confirm('Are you sure you want to QUIT the game and SAVE it for later?');   /* Holding the boolean return based on what the user chose */

        if (c) {
            var ChessBoard = Parse.Object.extend("ChessBoard");     /* Creating a subclass of the class ChessBoard */
            var board = new ChessBoard();                           /* Creating a new Object of this subclass ChessBoard */

            board.set("savedBoard", getBoardAsHTML());
            board.save(null, {
                success: function(board) {
                    // Execute any logic that should take place after the object is saved.
                    alert('Please save this key to load this game later: \n' + board.id);
                },
                error: function(board, error) {
                    // Execute any logic that should take place if the save fails.
                    // error is a Parse.Error with an error code and message.
                    alert('Save Failed: ' + error.message);
                }
            });
        }
    });

    /**
     * [Listening for a click on the .loadButton. Clicking this allows the user to load an already saved board.]
     * NOTE: This also a key from the user which is specific to the board they saved.
     * @triggers: click {.startButton} [Triggers this click to render the board that has been loaded]
     */
    $('body').on('click', '.loadButton', function(event) {
        var ChessBoard = Parse.Object.extend("ChessBoard");             /* Creating a subclass of the class ChessBoard */
        var query = new Parse.Query(ChessBoard);                        /* Creating a new Query Object of this subclass ChessBoard */
        var key = window.prompt("Please enter you key her:", "[key]")   /* Taking the key input from the user */
        query.get(key, {
            success: function(board) {
                var newBoard = board.get("savedBoard");
                console.log(newBoard);
                $('table').remove();
                $('.tableColumn').append(newBoard);
                $('.startButton').trigger('click');
            },
            error: function(object, error) {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
            }
        });
    });

    /**
     * [Detecting click on the pieces/spaces on the board. This is also calling the moveValidation to check if a move is valid or not
     *  and performing moves based on the return from isValidMove()]
     */
    $('td').on('click', function() {
        if(selectedPiece != undefined) {
            selectedPosition = $(this);

            var condition_selectingSamePiece = selectedPiece.attr('id') != selectedPosition.attr('id');
            /* Same piece selected or not */
            var condition_selectingSameColor = selectedPiece.find('span').attr('data-color') != $(this).find('span').attr('data-color');
            /* Same color selected or not */

            if (!condition_selectingSamePiece) {
                selectedPiece.removeClass('selected');
                selectedPiece = undefined;
                selectedPosition = undefined;
                if (lastMoveColor == 'white') {
                    lastMoveColor = 'black';
                } else {
                    lastMoveColor = 'white';
                }
            }  else if (condition_selectingSamePiece && condition_selectingSameColor) {
                 board = getCurrentBoard();
                 var pieceType = selectedPiece.find("span").attr('data-piece');
                 var idNumberPiece = selectedPiece.attr('id');
                 var idNumberSpot = selectedPosition.attr('id');
                 var color = selectedPiece.find("span").attr('data-color');
                 var isFirstMove = selectedPiece.find("span").hasClass('unmoved') ? true : false;
                 if(isValidMove(board, pieceType, color, isFirstMove, idNumberPiece, idNumberSpot))
                 {
                     var block = selectedPosition.find('span');
                     var tempClass = block.attr('class');

                     if (tempClass != undefined) {
                         block.removeClass(tempClass);
                     }

                     block.addClass(fullClass);
                     block.removeClass('unmoved');

                     var newColor = selectedPiece.find('span').data('color');
                     var newPiece = selectedPiece.find('span').data('piece');
                     block.attr('data-color', newColor);
                     block.attr('data-piece', newPiece);

                     /* Resetting the board to have no selectedPiece and selectedPosition and removing all their attributes. */
                     selectedPiece.find('span').removeClass(fullClass);
                     selectedPiece.removeClass('selected');
                     selectedPiece.find('span').attr('data-color', '');
                     selectedPiece.find('span').attr('data-piece', '');

                     selectedPiece = undefined;
                     selectedPosition = undefined;
                 }

             }

        } else {
            console.log('selecting first piece');
            if($(this).find('span').hasClass('glyphicon')) {
                if($(this).find('span').attr('data-color') != lastMoveColor) {
                    selectedPiece = $(this);
                    selectedPiece.addClass('selected');
                    fullClass = $(this).find('span').attr('class');
                    lastMoveColor = $(this).find('span').attr('data-color');
                }
            }
        }
    });

    /**
     * [Creates the flipclock]
     */
    function runTimer() {
        var timer = $('.timer').FlipClock(1320, {
            clockFace: 'MinuteCounter',
            countdown: true,
            callbacks: {
                stop: function() {
                    $('.message').html('The clock has stopped!');
                }
            }
        });
    }

    /**
     * [Return the current state of the table as a jQuery object]
     * @return {[Object]} [A jQuery object of the table]
     */
    function getBoardAsJQuery() {
        var table = $('table');
        return table;
    }

    /**
     * [Return the current state of the table as a JSON object]
     * @return {[JSON]} [A JSON object of the table]
     */
    function getBoardAsJSON() {
        var table = $('table')[0];
        return table;
    }

    /**
     * [Return the current state of the table as a HTML string]
     * @return {[String]} [The table HTML as a string]
     */
    function getBoardAsHTML() {
        var table = $('table')[0].outerHTML;
        return table;
    }

    /**
     * [Confirms on refresh whether the user wants to leave the game or not]
     */
    $(window).bind('beforeunload',function(){
        return 'Are you sure you want to reload this page?\n\nYou will lose this state of the board and have to restart!';
    });
});