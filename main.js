/*jslint browser: true*/
/*jslint node: true*/
/*global $, jQuery, alert*/

$(document).ready(function() {

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

            if (condition_selectingSamePiece && condition_selectingSameColor) {
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
    var spotIsEmpty = isSpotEmpty(board, idNumberSpot);
    var idNumPiece = parseInt(idNumberPiece) + 1;
    var rowPiece = idNumPiece/8;
    var colPiece = idNumPiece % 8;

    var idNumSpot = parseInt(idNumberSpot);
    var rowSpot = idNumSpot/8;
    var colSpot = idNumSpot % 8;

    if((pieceType == "pawn") && (spotIsEmpty) && ((idNumPiece - 8 == idNumSpot) || (idNumPiece - 16 == idNumSpot)))
    {
        return true;
    }

    if((pieceType == "bishop") && (spotIsEmpty) && (isDiagonal(rowPiece, colPiece, rowSpot, colSpot)))
    {
        return true;
    }

    if((pieceType == "queen") && (spotIsEmpty) && (isDiagonal(rowPiece, colPiece, rowSpot, colSpot) || isVertical(rowPiece, colPiece, rowSpot, colSpot) || isHorizontal(rowPiece, colPiece, rowSpot, colSpot)))
    {
        return true;
    }

    if((pieceType == "king") && (spotIsEmpty) && ((Math.abs(rowPiece - rowSpot) <= 1 && Math.abs(colPiece - colSpot) <= 1)))
    {
        return true;
    }

    if((pieceType == "knight") && (spotIsEmpty) && ((Math.abs(xfrom - xto) == 1 && Math.abs(yfrom - yto) == 2) || (Math.abs(yfrom - yto) == 1 && Math.abs(xfrom - xto) == 2)))
    {
        return true;
    }

    if((pieceType == "tower") && (spotIsEmpty) && (isVertical(rowPiece, colPiece, rowSpot, colSpot) || isHorizontal(rowPiece, colPiece, rowSpot, colSpot)))
    {
        return true;
    }


    return false;
}

function isSpotEmpty(board, idNumberSpot)
{
    int idNumSpot = parseInt(idNumberSpot) + 1;
    int rowSpot = idNumSpot/8;
    int colSpot = idNumSpot % 8;

    return board[rowSpot][colSpot] === "";
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