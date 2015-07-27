/*jslint browser: true*/
/*jslint node: true*/
/*global $, jQuery, alert*/

$(document).ready(function() {

    var selectedPiece = undefined;          /* [Holds the currently selected piece] @type {[JSON]} */
    var selectedPosition = undefined;       /* [Holds the position where the selected piece is to be moved] @type {[JSON]} */
    var fullClass;                          /* [Holds all classes of the selected piece] @type {[String]} */
    var lastMoveColor;                      /* [What was the color of the last piece that was moved] @type {[String]} */

    $('td').on('click', function() {
        console.log($(this).find('span').attr('class'));
        console.log('lastMoveColor: ' + lastMoveColor);
        console.log($(this).find('span').attr('data-color'));
        if(selectedPiece != undefined) {
            console.log('selecting SECOND piece');
            selectedPosition = $(this);

            console.log(selectedPiece);
            console.log(selectedPosition);

            var condition = selectedPiece.attr('id') != selectedPosition.attr('id');
            console.log(condition);
            if (condition) {
                var block = selectedPosition.find('span');
                var tempClass = block.attr('class');
                console.log('tempClass: ' + tempClass);

                if (tempClass != undefined) {
                    console.log('executing remove class');
                    block.removeClass(tempClass);
                }

                block.addClass(fullClass);
                selectedPiece.find('span').removeClass(fullClass);
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
                    $(this).find('span').attr('data-color', '');
                    console.log(selectedPiece);
                }
            }
        }
    });
});