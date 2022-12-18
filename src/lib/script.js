const NUMBER_OF_CLUES = 36;

const createField =(value, notes) =>{
    return {
        value : value,
        notes: notes
    }
}

const createBoard = () =>{
    var board = []
    for(let i = 0; i < 9; i++)
    {
        board.push([])
        for(let j = 0; j < 9; j++)
        {
            board[i][j] = createField(-1,[]);
        }  
    }
    return board;
}



export const getStyles = (rowIndex, fieldIndex)=>{
    return (rowIndex < 3 || rowIndex > 5) && (fieldIndex >= 3 && fieldIndex <= 5 ) || ( rowIndex >= 3 && rowIndex <= 5 ) && (fieldIndex <= 2 || fieldIndex >= 6)
}



export const fillBoard = () =>{
    var board = createBoard();

    for(let i = 0; i <= 6; i+=3){ fillDiagonaly(board, i); }

    fillRemaining(board, 0, 3);

    return board;
} 

const fillMatrix = (board, startRow, startCol)=>{
    for(let row = startRow; row < startRow + 3; row++)
    {
        for(let col = startCol; col < startCol + 3; col++)
        {
            while(true){
                let number = getRandomInt(1,9);
                if(validatePosition(board, row, col, number)){
                    board[row][col].value = number;
                    break;
                }
            }
        }
    }
}


const N = 9;
const SRN = 3;
//naprawić to spaggeti
const fillRemaining = (board, i,j)=>
{
    if (j>=N && i<N-1)
    {
        i = i + 1;
        j = 0;
    }
    if (i>=N && j>=N) return true;

    if (i < SRN)
    { if (j < SRN)j = SRN; }
    else if (i < N-SRN)
    {
    if (j==Math.floor(i/SRN)*SRN) j =  j + SRN;}
    else{
        if (j == N-SRN)
        {
            i = i + 1;
            j = 0;
            if (i>=N) return true;
        }
    }

    for (let num = 1; num<=N; num++)
    {
        if (validatePosition(board,i, j, num))
        {
            board[i][j].value = num;
            if (fillRemaining(board, i, j+1))
            return true;

            board[i][j].value = -1;
        }
    }
    return false;
}

const fillDiagonaly = (board, i)=>{
    fillMatrix(board, i, i);
}


const getRandomInt = (min, max) =>{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}


const validatePosition = (board, row, col, value) =>{

    const validateRow = (row)=>{
        for(let i = 0; i < board[row].length; i++)
        {
            if(board[row][i].value == value) return false; 
        }
        return true;
    }
    const validateColumn = (col)=>{
        for(let i = 0; i < board.length; i++){
            if(board[i][col].value == value) return false;
        }
        return true;
    }

    const validateBox = (row, col) =>{
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


    return validateRow(row) && validateColumn(col) && validateBox(row, col); 
}