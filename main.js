/*jslint browser: true*/
/*jslint node: true*/
/*global $, jQuery, alert*/

$(document).ready(function() {
    var board;
    var selectedPiece = undefined;          /* [Holds the currently selected piece] @type {[JSON]} */
    var selectedPosition = undefined;       /* [Holds the position where the selected piece is to be moved] @type {[JSON]} */
    var fullClass;                          /* [Holds all classes of the selected piece] @type {[String]} */
    var lastMoveColor;                      /* [What was the color of the last piece that was moved] @type {[String]} */

    createTable();

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
        $('body').append(newHtml);
    }

    $('.startButton').on('click', function(event) {
        $('.startButton').remove();
        $('table').fadeIn('400');
    });

    $('td').on('click', function() {
        if(selectedPiece != undefined) {
            selectedPosition = $(this);

            var condition_selectingSamePiece = selectedPiece.attr('id') != selectedPosition.attr('id');
            var condition_selectingSameColor = selectedPiece.find('span').attr('data-color') != $(this).find('span').attr('data-color');
                //condition_selectingSameColor: Checking if the piece you're moving to is of the same color
            if (!condition_selectingSamePiece) {
                selectedPiece.removeClass('selected');
                selectedPiece = undefined;
                selectedPosition = undefined;
                if (lastMoveColor == 'white') {
                    lastMoveColor = 'black';
                } else {
                    lastMoveColor = 'white';
                }
            } else if (condition_selectingSamePiece && condition_selectingSameColor) {
                board = getCurrentBoard();
                var pieceType = selectedPiece.find("span").attr('data-piece');
                var idNumberPiece = selectedPiece.attr('id');
                var idNumberSpot = selectedPosition.attr('id');
                if(isValidMove(board, pieceType, idNumberPiece, idNumberSpot))
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

    $(window).on('beforeunload',function(){
        var c = confirm('Are you sure you want to reload this page?\nYou will lose this state of the board and have to restart!');
        if (c) {
            $('body').trigger('endGame');
        }
    });
});

function isValidMove(board, pieceType, idNumberPiece, idNumberSpot)
{
    var idNumPiece = parseInt(idNumberPiece) + 1;
    var rowPiece = Math.ceil(idNumPiece/8);
    var colPiece = idNumPiece % 8;

    var idNumSpot = parseInt(idNumberSpot) + 1;
    var rowSpot = Math.ceil(idNumSpot/8);
    var colSpot = idNumSpot % 8;

    if((pieceType == "pawn") && ((idNumPiece - 8 == idNumSpot) || (idNumPiece - 16 == idNumSpot)))
    {
        return true;
    }

    if((pieceType == "bishop") && (isDiagonal(rowPiece, colPiece, rowSpot, colSpot)))
    {
        return true;
    }

    if((pieceType == "queen") && (isDiagonal(rowPiece, colPiece, rowSpot, colSpot) || isVertical(rowPiece, colPiece, rowSpot, colSpot) || isHorizontal(rowPiece, colPiece, rowSpot, colSpot)))
    {
        return true;
    }

    if((pieceType == "king") && ((Math.abs(rowPiece - rowSpot) <= 1 && Math.abs(colPiece - colSpot) <= 1)))
    {
        return true;
    }

    if((pieceType == "knight") && ((Math.abs(rowPiece - rowSpot) == 1 && Math.abs(colPiece - colSpot) == 2) || (Math.abs(colPiece - colSpot) == 1 && Math.abs(rowPiece - rowSpot) == 2)))
    {
        return true;
    }

    if((pieceType == "tower") && (isVertical(rowPiece, colPiece, rowSpot, colSpot) || isHorizontal(rowPiece, colPiece, rowSpot, colSpot)))
    {
        return true;
    }


    return false;
}

function isDiagonal(rowPiece, colPiece, rowSpot, colSpot)
{
    return (Math.abs(rowSpot - rowPiece) == Math.abs(colSpot - colPiece));
}

function isVertical(rowPiece, colPiece, rowSpot, colSpot)
{
    return (rowPiece == rowSpot && colPiece != colSpot);
}

function isHorizontal(rowPiece, colPiece, rowSpot, colSpot)
{
    return (colPiece == colSpot && rowPiece != rowSpot);
}

function getCurrentBoard()
{
    var board = [];
    var row = [];
    $("td").each(function() {
        var isNotBlank = $(this).find("span").attr("data-color");

        if (typeof isNotBlank !== typeof undefined && isNotBlank !== false)
        {
            if(((row.length + 1) % 9) == 0)
            {
                board.push(row);
                row = [];
                var color = $(this).find("span").attr('data-color');
                var pieceName = $(this).find("span").attr('data-piece');
                row.push(color + " " + pieceName);
            }
            else
            {
                var color = $(this).find("span").attr('data-color');
                var pieceName = $(this).find("span").attr('data-piece');
                row.push(color + " " + pieceName);
            }
        }
        else
        {
            if(((row.length + 1) % 9) == 0)
            {
                board.push(row);
                row = [];
                row.push("");
            }
            else
            {
                row.push("");
            }
        }
    });
    board.push(row);
    return board;
}