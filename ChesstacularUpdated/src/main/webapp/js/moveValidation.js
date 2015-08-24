function isCheck(board, pieceType, pieceColor, unmoved, idNumberPiece, idNumberSpot)
{
    // make new board without the king we're looking for there

    var newBoard = $.extend(true,board);
    var idNumSpot = parseInt(idNumberSpot);
    var rowSpot = Math.floor(idNumSpot/8);
    var colSpot = (idNumSpot % 8);
    var idNumPiece = parseInt(idNumberPiece);
    
    // check if that space is now a valid move
	newBoard[rowSpot][colSpot] = "";
	
	// handle special pawn rules
	if(isValidMove(newBoard, pieceType, pieceColor, unmoved, idNumberPiece, idNumberSpot))
	{
		if (pieceType === "pawn")
		{
			if (pieceColor === "white")
			{
				if ( (idNumSpot === (idNumPiece - 7)) ||  (idNumSpot === (idNumPiece - 9)) )
				{
					return true;
				}
				else
				{
					return false;
				}
			}
			if (pieceColor === "black")
			{
				if ( (idNumSpot === (idNumPiece + 7)) ||  (idNumSpot === (idNumPiece + 9)) )
				{
					return true;
				}
				else
				{
					return false;
				}
			}
		}
		else
		{
			return (isValidMove(newBoard, pieceType, pieceColor, unmoved, idNumberPiece, idNumberSpot));
		}
	}
}

function isValidMove(board, pieceType, pieceColor, unmoved, idNumberPiece, idNumberSpot)
{
    //Changed from adding 1 and subtracting 1 and using ceiling to simply use floor.
    //Makes it easier to read and easier use.
    var idNumPiece = parseInt(idNumberPiece);
    var rowPiece = Math.floor(idNumPiece/8);
    var colPiece = (idNumPiece % 8);

    var idNumSpot = parseInt(idNumberSpot);
    var rowSpot = Math.floor(idNumSpot/8);
    var colSpot = (idNumSpot % 8);

    if(pieceType == "pawn")
    {
        if((board[rowSpot][colSpot] != "") && isVertical(rowPiece, colPiece, rowSpot, colSpot))
        {
            return false;
        }
        var capture = isCaptureTerritory(board, rowPiece, colPiece, pieceColor);
        if(capture && isDiagonal(rowPiece, colPiece, rowSpot, colSpot))
        {
            return true;
        }
        var validDir = validDirection(pieceColor, colPiece, colSpot);
        var firstMove;
        if(unmoved)
        {
            firstMove = ((Math.abs(rowSpot - rowPiece) == 2) || (Math.abs(rowSpot - rowPiece) == 1));
        }
        else
        {
            firstMove = (Math.abs(rowSpot - rowPiece) == 1);
        }

        if(!isBackwards(pieceColor, unmoved, rowPiece, rowSpot))
        {
            return false;
        }

        if((validDir) && (firstMove) && ((capture) && (Math.abs(colSpot - colPiece) == 1) && (Math.abs(rowSpot - rowPiece) == 1)))
        {
            return true;
        }
        if((validDir) && (firstMove) && (colPiece == colSpot))
        {
            return true;
        }
        return false;
    }

    if((pieceType == "bishop") && (isDiagonal(rowPiece, colPiece, rowSpot, colSpot)))
    {
        if (rowSpot < rowPiece && colSpot < colPiece && isPieceInPath(board, "NW", rowPiece, colPiece, rowSpot, colSpot))
        {
            return false;
        }
        if (rowSpot < rowPiece && colSpot > colPiece && isPieceInPath(board, "NE", rowPiece, colPiece, rowSpot, colSpot))
        {
            return false;
        }
        if (colSpot < colPiece && rowSpot > rowPiece && isPieceInPath(board, "SW", rowPiece, colPiece, rowSpot, colSpot))
        {
            return false;
        }
        if (colSpot > colPiece && rowSpot > rowPiece && isPieceInPath(board, "SE", rowPiece, colPiece, rowSpot, colSpot))
        {
            return false;
        }
        return true;
    }

    if((pieceType == "queen") && (isDiagonal(rowPiece, colPiece, rowSpot, colSpot) || isVertical(rowPiece, colPiece, rowSpot, colSpot) || isHorizontal(rowPiece, colPiece, rowSpot, colSpot)))
    {
        if (rowSpot > rowPiece && colSpot == colPiece && isPieceInPath(board, "forward", rowPiece, colPiece, rowSpot, colSpot))
        {
            return false;
        }
        if (rowSpot < rowPiece && colSpot == colPiece && isPieceInPath(board, "backward", rowPiece, colPiece, rowSpot, colSpot))
        {
            return false;
        }
        if (colSpot > colPiece && rowSpot == rowPiece && isPieceInPath(board, "right", rowPiece, colPiece, rowSpot, colSpot))
        {
            return false;
        }
        if (colSpot < colPiece && rowSpot == rowPiece && isPieceInPath(board, "left", rowPiece, colPiece, rowSpot, colSpot))
        {
            return false;
        }
        if (rowSpot < rowPiece && colSpot < colPiece && isPieceInPath(board, "NW", rowPiece, colPiece, rowSpot, colSpot))
        {
            return false;
        }
        if (rowSpot < rowPiece && colSpot > colPiece && isPieceInPath(board, "NE", rowPiece, colPiece, rowSpot, colSpot))
        {
            return false;
        }
        if (colSpot < colPiece && rowSpot > rowPiece && isPieceInPath(board, "SW", rowPiece, colPiece, rowSpot, colSpot))
        {
            return false;
        }
        if (colSpot > colPiece && rowSpot > rowPiece && isPieceInPath(board, "SE", rowPiece, colPiece, rowSpot, colSpot))
        {
            return false;
        }
        return true;
    }

    if(pieceType == "king")

    {

        var direction;

        if(colPiece < colSpot)

        {
            direction = "castling right";

        }

        else

        {

            direction = "castling left";

        }

        var closestCastle;

        if(direction == "castling right")

        {
           closestCastle = idNumPiece + 3; 

        }

        else

        {

            closestCastle = idNumPiece - 4;

        }

        var isPathClear = isPieceInPath(board, direction, rowPiece, colPiece, rowSpot, colSpot);

        var castleId = "#" + closestCastle.toString();

        var isCastleUnmoved = $(castleId).find('span').hasClass("unmoved");

        console.log(unmoved);
        console.log(isPathClear);
        console.log(isCastleUnmoved);
        if(unmoved && isPathClear && isCastleUnmoved)

        {
                var selectedPiece = $("#" + idNumberPiece);

                var selectedPosition = $("#" + idNumberSpot);

                var block = selectedPosition.find('span');

                var tempClass = block.attr('class');

                var fullClass = selectedPiece.find('span').attr('class');

                

                if (tempClass !== undefined) {

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

                

                

                var newCastleSpot;

                if (direction == "castling right")

                {
                    console.log('got all the way here');
                    newCastleSpot = closestCastle - 2;

                }

                else

                {

                    newCastleSpot = closestCastle + 3;

                }

                selectedPiece = $("#" + closestCastle);

                selectedPosition = $("#" + newCastleSpot.toString());

                block = selectedPosition.find('span');

                tempClass = block.attr('class');

                fullClass = selectedPiece.find('span').attr('class');

                

                if (tempClass !== undefined) {

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

                return true;
        }

        else if(Math.abs(rowPiece - rowSpot) <= 1 && Math.abs(colPiece - colSpot) <= 1)

        {

            return true;

        }

        

    }

    if((pieceType == "knight") && ((Math.abs(rowPiece - rowSpot) == 1 && Math.abs(colPiece - colSpot) == 2) || (Math.abs(colPiece - colSpot) == 1 && Math.abs(rowPiece - rowSpot) == 2)))
    {
        return true;
    }

    if((pieceType == "tower") && (isVertical(rowPiece, colPiece, rowSpot, colSpot) || isHorizontal(rowPiece, colPiece, rowSpot, colSpot)))
    {
        if (rowSpot > rowPiece && colSpot == colPiece && isPieceInPath(board, "forward", rowPiece, colPiece, rowSpot, colSpot))
        {
            return false;
        }
        if (rowSpot < rowPiece && colSpot == colPiece && isPieceInPath(board, "backward", rowPiece, colPiece, rowSpot, colSpot))
        {
            return false;
        }
        if (colSpot > colPiece && rowSpot == rowPiece && isPieceInPath(board, "right", rowPiece, colPiece, rowSpot, colSpot))
        {
            return false;
        }
        if (colSpot < colPiece && rowSpot == rowPiece && isPieceInPath(board, "left", rowPiece, colPiece, rowSpot, colSpot))
        {
            return false;
        }
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
    return (rowPiece != rowSpot && colPiece == colSpot);
}

function isHorizontal(rowPiece, colPiece, rowSpot, colSpot)
{
    return (rowPiece == rowSpot && colPiece != colSpot);
}

function validDirection(color, colPiece, colSpot)
{
    //Should this be involving rows?
    if(color == "white")
    {
        return colPiece <= colSpot;
    }

    return colPiece >= colSpot;
}

function isBackwards(pieceColor, unmoved, rowPiece, rowSpot)
{
    if(pieceColor == "white")
    {
        return rowSpot - rowPiece != 1;
    }
    if(unmoved)
    {
        return rowSpot - rowPiece == 1 || rowSpot - rowPiece != 1;
    }

    return rowSpot - rowPiece == 1;
}

function isCaptureTerritory(board, rowPiece, colPiece, pieceColor)
{
    var row = rowPiece;
    var col = colPiece;
    var oppositePieceColor = pieceColor == "white" ? "black" : "white";
    
    //Added checks below to ensure that pieces are capturable by pawns without exceeding boundaries
    if(board[row][col].indexOf(oppositePieceColor) > -1)
    {
        return true;
    }

    if(row + 1 < 8 && col + 1 < 8 &&board[row + 1][col + 1].indexOf(oppositePieceColor) > -1)
    {
        return true;
    }

    if(row - 1 >= 0 && col + 1 < 8 && board[row - 1][col + 1].indexOf(oppositePieceColor) > -1)
    {
        return true;
    }

    if(row + 1 < 8 && col - 1 >= 0 && board[row + 1][col - 1].indexOf(oppositePieceColor) > -1)
    {
        return true;
    }

    if(row - 1 >= 0 && col - 1 >= 0 && board[row - 1][col - 1].indexOf(oppositePieceColor) > -1)
    {
        return true;
    }
    return false;
}

function isPieceInPath(board, direction, rowPiece, colPiece, rowSpot, colSpot)
{
    if(direction == "castling right")
    {
        var colPiece2 = colPiece + 1;
        var colPiece3 = colPiece2 + 1;
        if((board[rowPiece][colPiece2] == "") && (board[rowPiece][colPiece3] == ""))
        {
            return true;
        }
    }

    

    if(direction == "castling left")
    {
        var colPiece2 = colPiece - 1;
        var colPiece3 = colPiece2 - 1;
        if((board[rowPiece][colPiece2] == "") && (board[rowPiece][colPiece3] == ""))
        {
            return true;
        }
    }
    
    if(direction == "forward")
    {
        var rowPiece2 = rowPiece + 1;
        while(rowPiece2 !== rowSpot)
        {
            if(board[rowPiece2][colPiece] != "")
            {
                return true;
            }
            rowPiece2 += 1;
        }
    }
    if(direction == "backward")
    {
        var rowPiece2 = rowPiece - 1;
        while(rowPiece2 !== rowSpot)
        {
            if(board[rowPiece2][colPiece] != "")
            {
                return true;
            }
            rowPiece2 -= 1;
        }
    }
    if(direction == "left")
    {
        var colPiece2 = colPiece - 1;
        while(colPiece2 !== colSpot)
        {
            if(board[rowPiece][colPiece2] != "")
            {
                return true;
            }
            colPiece2 -= 1;
        }
    }
    if(direction == "right")
    {
        var colPiece2 = colPiece + 1;
        while(colPiece2 !== colSpot)
        {
            if(board[rowPiece][colPiece2] != "")
            {
                return true;
            }
            colPiece2 += 1;
        }
    }
    
    if(direction == "NW")
    {
        var rowPiece2 = rowPiece - 1;
        var colPiece2 = colPiece - 1;
        while(rowPiece2 !== rowSpot)
        {
            if(board[rowPiece2][colPiece2] != "")
            {
                return true;
            }
            rowPiece2 -= 1;
            colPiece2 -= 1;
        }
    }
    if(direction == "NE")
    {
        var rowPiece2 = rowPiece - 1;
        var colPiece2 = colPiece + 1;
        while(rowPiece2 !== rowSpot)
        {
            if(board[rowPiece2][colPiece2] != "")
            {
                return true;
            }
            rowPiece2 -= 1;
            colPiece2 += 1;
        }
    }
    if(direction == "SW")
    {
        var rowPiece2 = rowPiece + 1;
        var colPiece2 = colPiece - 1;
        while(colPiece2 !== colSpot)
        {
            if(board[rowPiece2][colPiece2] != "")
            {
                return true;
            }
            colPiece2 -= 1;
            rowPiece2 += 1;
        }
    }
    if(direction == "SE")
    {
        var colPiece2 = colPiece + 1;
        var rowPiece2 = rowPiece + 1;
        while(colPiece2 !== colSpot)
        {
            if(board[rowPiece2][colPiece2] != "")
            {
                return true;
            }
            colPiece2 += 1;
            rowPiece2 += 1;
        }
    }
    return false;
}

function isPieceColor(board, color, rowSpace, colSpace)
{
    if(board[rowSpace][colSpace].indexOf(color) !== -1)
    {
        return true;
    }
    return false;
}

function getCurrentBoard()
{
    var board = [];
    var row = [];
    $("td").each(function() {
        var isNotBlank = $(this).find("span").hasClass("black") || $(this).find("span").hasClass("white");
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