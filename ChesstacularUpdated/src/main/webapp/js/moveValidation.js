function isValidMove(board, pieceType, pieceColor, unmoved, idNumberPiece, idNumberSpot)
{
    var idNumPiece = parseInt(idNumberPiece) + 1;
    var rowPiece = Math.ceil(idNumPiece/8) - 1;
    var colPiece = (idNumPiece % 8) - 1;

    var idNumSpot = parseInt(idNumberSpot) + 1;
    var rowSpot = Math.ceil(idNumSpot/8) - 1;
    var colSpot = (idNumSpot % 8) - 1;

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
        return true;
    }

    if((pieceType == "queen") && (isDiagonal(rowPiece, colPiece, rowSpot, colSpot) || isVertical(rowPiece, colPiece, rowSpot, colSpot) || isHorizontal(rowPiece, colPiece, rowSpot, colSpot)))
    {
        if (isPieceInPath(board, "forward", rowPiece, colPiece, rowSpot, colSpot))
        {
            return false
        }
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
    return (rowPiece != rowSpot && colPiece == colSpot);
}

function isHorizontal(rowPiece, colPiece, rowSpot, colSpot)
{
    return (colPiece == colSpot && rowPiece != rowSpot);
}

function validDirection(color, colPiece, colSpot)
{
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
    if(board[row][col].indexOf(oppositePieceColor) > -1)
    {
        return true;
    }

    if(board[row + 1][col + 1].indexOf(oppositePieceColor) > -1)
    {
        return true;
    }

    if(board[row - 1][col + 1].indexOf(oppositePieceColor) > -1)
    {
        return true;
    }

    if(board[row + 1][col - 1].indexOf(oppositePieceColor) > -1)
    {
        return true;
    }

    if(board[row - 1][col - 1].indexOf(oppositePieceColor) > -1)
    {
        return true;
    }
    return false;
}

function isPieceInPath(board, direction, rowPiece, colPiece, rowSpot, colSpot)
{
    if(direction == "forward")
    {
        while(rowPiece != rowSpot)
        {
            if(board[rowPiece][colPiece] != "")
            {
                return true;
            }
            rowPiece += 1;
        }
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