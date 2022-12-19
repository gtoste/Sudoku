const NUMBER_OF_CLUES = 36;
const boardWidth = 9;
const matrixWidth = 3;

const createField =(value, notes) =>{
    return {
        value : value,
        notes: notes
    }
}

export const createBoard = () =>{
    var b = []
    for(let i = 0; i < 9; i++)
    {
        b.push([])
        for(let j = 0; j < 9; j++)
        {
            b[i][j] = createField(-1,[]);
        }  
    }
    return b;
}


var board = createBoard();
var playerBoard = board;

export const getStyles = (rowIndex, fieldIndex)=>{
    return (rowIndex < 3 || rowIndex > 5) && (fieldIndex >= 3 && fieldIndex <= 5 ) || ( rowIndex >= 3 && rowIndex <= 5 ) && (fieldIndex <= 2 || fieldIndex >= 6)
}

export const fillBoard = () =>{
    for(let i = 0; i <= 6; i+=3){ fillDiagonaly(i); }
    fillRemaining(0, 3);

    playerBoard = JSON.parse(JSON.stringify(board));
    setBlankPattern();
    return [playerBoard,board];
} 

const fillMatrix = (startRow, startCol)=>{
    for(let row = startRow; row < startRow + 3; row++)
    {
        for(let col = startCol; col < startCol + 3; col++)
        {
            while(true){
                let number = getRandomInt(1,9);
                if(validatePosition(row, col, number)){
                    board[row][col].value = number;
                    break;
                }
            }
        }
    }
}

const fillRemaining = (boardRow, boardColumn)=>
{
    if (boardColumn >= boardWidth && boardRow < boardWidth - 1)
    {
        boardRow = boardRow + 1;
        boardColumn = 0;
    }

    if (boardRow >= boardWidth && boardColumn >= boardWidth) return true; //some sort of break

    if (boardRow < matrixWidth)
    { if (boardColumn < matrixWidth) boardColumn = matrixWidth; }
    else if (boardRow < boardWidth-matrixWidth)
    {
        if (boardColumn == Math.floor(boardRow/matrixWidth)*matrixWidth) boardColumn =  boardColumn + matrixWidth;
    }
    else{
        if (boardColumn == boardWidth-matrixWidth)
        {
            boardRow = boardRow + 1;
            boardColumn = 0;
            if (boardRow>=boardWidth) return true;
        }
    }

    for (let num = 1; num<=boardWidth; num++)
    {
        if (validatePosition(boardRow, boardColumn, num))
        {
            board[boardRow][boardColumn].value = num;
            if (fillRemaining(boardRow, boardColumn+1))
            return true;

            board[boardRow][boardColumn].value = -1;
        }
    }
    return false;
}

const fillDiagonaly = (i)=>{
    fillMatrix(i, i);
}


const getRandomInt = (min, max) =>{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}


const validateRow = (row, value)=>{
    for(let i = 0; i < board[row].length; i++)
    {
        if(board[row][i].value == value) return false; 
    }
    return true;
}
const validateColumn = (col, value)=>{
    for(let i = 0; i < board.length; i++){
        if(board[i][col].value == value) return false;
    }
    return true;
}

const validateBox = (row, col, value) =>{
    let rowModulo = row % 3;
    let colModulo = col % 3;

    let startIndexRow = row - rowModulo;
    let startIndexCol = col - colModulo;

    for(let indexRow = startIndexRow; indexRow <= startIndexRow + 2; indexRow++)
    {
        for(let indexCol = startIndexCol; indexCol <= startIndexCol + 2; indexCol++)
        {
            if (board[indexRow][indexCol].value == value) return false;
        }
    }  
    return true;
}


const validatePosition = (row, col, value) =>{
    return validateRow(row, value) && validateColumn(col, value) && validateBox(row, col, value); 
}

const setBlankPattern = ()=>{
    var taken = []
    for(let i = 0; i < (81-NUMBER_OF_CLUES); i++)
    {
        while(true)
        {
            let row = getRandomInt(0,8);
            let col = getRandomInt(0,8);

            if(!taken.some(pair=>(pair.row == row && pair.col == col)))
            {
                taken.push({"row": row, "col": col});
                playerBoard[row][col].value = -1;
                break;
            }
        }
    }
}   







