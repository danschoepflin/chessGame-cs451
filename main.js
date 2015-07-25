$(document).ready(function() {
    var selectedPiece = undefined;
    var selectedPosition = undefined;
    var fullClass;

    $('td').on('click', function() {
        console.log($(this).find('span').attr('class'));
        if(selectedPiece != undefined) {
            selectedPosition = $(this);
            var block = selectedPosition.find('span');
            var tempClass = block.attr('class');

            block.removeClass(tempClass);
            block.addClass(fullClass);
            selectedPiece.find('span').removeClass(fullClass);
            selectedPiece = undefined;
            selectedPosition = undefined;
        }
        if($(this).find('span').hasClass('glyphicon') && selectedPiece == undefined) {
            selectedPiece = $(this);
            fullClass = $(this).find('span').attr('class');
            console.log(selectedPiece);
        }
    });
});