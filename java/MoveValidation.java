//TODO: Pawn move validation with first move 1 or 2 spaces, then after just 1
//can move 1 diaganol space only on capture

public class MoveValidation
{

    public static boolean isValidMove(String[][] board, String pieceType, String idNumberPiece, String idNumberSpot)
    {
        boolean spotIsEmpty = isSpotEmpty(board, idNumberSpot);
        int idNumPiece = Integer.parseInt(idNumberPiece) + 1;
        int rowPiece = idNumPiece/8;
        int colPiece = idNumPiece % 8;

        int idNumSpot = Integer.parseInt(idNumberSpot);
        int rowSpot = idNumSpot/8;
        int colSpot = idNumSpot % 8;

        if((pieceType.equalsIgnoreCase("pawn")) && (spotIsEmpty) && ((idNumPiece - 8 == idNumSpot) || (idNumPiece - 16 == idNumSpot)))
        {
            return true;
        }

        if((pieceType.equalsIgnoreCase("bishop")) && (spotIsEmpty) && (isDiagonal(rowPiece, colPiece, rowSpot, colSpot)))
        {
            return true;
        }

        if((pieceType.equalsIgnoreCase("queen")) && (spotIsEmpty) && (isDiagonal(rowPiece, colPiece, rowSpot, colSpot) || isVertical(rowPiece, colPiece, rowSpot, colSpot) || isHorizontal(rowPiece, colPiece, rowSpot, colSpot)))
        {
            return true;
        }

        if((pieceType.equalsIgnoreCase("king")) && (spotIsEmpty) && ((Math.abs(rowPiece - rowSpot) <= 1 && Math.abs(colPiece - colSpot) <= 1)))
        {
            return true;
        }

        if((pieceType.equalsIgnoreCase("knight")) && (spotIsEmpty) && ((Math.abs(xfrom - xto) == 1 && Math.abs(yfrom - yto) == 2) || (Math.abs(yfrom - yto) == 1 && Math.abs(xfrom - xto) == 2)))
        {
            return true;
        }

        if((pieceType.equalsIgnoreCase("tower")) && (spotIsEmpty) && (isVertical(rowPiece, colPiece, rowSpot, colSpot) || isHorizontal(rowPiece, colPiece, rowSpot, colSpot)))
        {
            return true;
        }


        return false;
    }

    public static boolean isSpotEmpty(String[][] board, String idNumberSpot)
    {
        int idNumSpot = Integer.parseInt(idNumberSpot) + 1;
        int rowSpot = idNumSpot/8;
        int colSpot = idNumSpot % 8;

        return board[rowSpot][colSpot].equalsIgnoreCase("");
    }

    public static boolean isDiagonal(int rowPiece, int colPiece, int rowSpot, int colSpot)
    {
        return (Math.abs(rowSpot - rowPiece) == Math.abs(colSpot - colPiece));
    }

    public static boolean isVertical(int rowPiece, int colPiece, int rowSpot, int colSpot)
    {
        return (xfrom == xto && yfrom != yto);
    }

    public static boolean isHorizontal(int rowPiece, int colPiece, int rowSpot, int colSpot)
    {
        return (yfrom == yto && xfrom != xto);
    }
}