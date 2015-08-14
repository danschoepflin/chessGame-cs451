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

            var condition = selectedPiece.attr('id') != selectedPosition.attr('id');
            if (condition) {
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
                    fullClass = $(this).find('span').attr('class');
                    lastMoveColor = $(this).find('span').attr('data-color');
                }
            }
        }
    });
});