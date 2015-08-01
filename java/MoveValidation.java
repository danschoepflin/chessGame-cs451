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

        return false;
    }

    public static boolean isSpotEmpty(String[][] board, String idNumberSpot)
    {
        int idNumSpot = Integer.parseInt(idNumberSpot) + 1;
        int rowSpot = idNumSpot/8;
        int colSpot = idNumSpot % 8;

        return board[rowSpot][colSpot].equalsIgnoreCase("");
    }
}