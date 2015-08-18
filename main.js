/*jslint browser: true*/
/*jslint node: true*/
/*global $, jQuery, alert*/

$(document).ready(function() {
    var board;
    var selectedPiece = undefined;          /* [Holds the currently selected piece] @type {[JSON]} */
    var selectedPosition = undefined;       /* [Holds the position where the selected piece is to be moved] @type {[JSON]} */
    var fullClass;                          /* [Holds all classes of the selected piece] @type {[String]} */
    var lastMoveColor;                      /* [What was the color of the last piece that was moved] @type {[String]} */

    $('td').on('click', function() {
        if(selectedPiece != undefined) {
            selectedPosition = $(this);

            var condition_selectingSamePiece = selectedPiece.attr('id') != selectedPosition.attr('id');
            var condition_selectingSameColor = selectedPiece.find('span').attr('data-color') != $(this).find('span').attr('data-color');
                //condition_selectingSameColor: Checking if the piece you're moving to is of the same color
            if (condition_selectingSamePiece && condition_selectingSameColor) 
            {
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