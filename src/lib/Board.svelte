<script>
    import {createBoard, fillBoard, getStyles} from "./script";
    const [fields, board] = fillBoard();
    const KEYS = ["1","2","3","4","5","6","7","8","9"];

    let bad = 0;
    let mode = "p";
    let howMuchMore = 81 - 36;
    var positionRow = 0;
    var positionCol = 0;

    const handleKeydown = (event)=>{
        let key = event.key;
        if(KEYS.includes(key))
        {
            if(fields[positionRow][positionCol].value != -1) return;

            if(mode == "p")
            {
                if(board[positionRow][positionCol].value == key){fields[positionRow][positionCol].value = key; howMuchMore--}
                else{fields[positionRow][positionCol].value = parseInt(key) + 10; bad += 1}
            }else{
                if(!fields[positionRow][positionCol].notes.includes(key)) { 
                    fields[positionRow][positionCol].notes = [...fields[positionRow][positionCol].notes, key]
                }

            }
            
        }else if(key == "ArrowRight"){
            positionCol = positionCol < 8 ? positionCol + 1 : 0;
        }else if(key == "ArrowLeft"){
            positionCol = positionCol > 0  ? positionCol - 1 : 8;
        }else if(key == "ArrowDown"){
            positionRow = positionRow < 8 ? positionRow + 1 : 0;
        }else if(key == "ArrowUp"){
            positionRow = positionRow > 0 ? positionRow - 1 : 8;
        }else if(key == "Backspace")
        {
            if(mode == "p")
            {
                let value = fields[positionRow][positionCol].value;
                fields[positionRow][positionCol].value = value > 9 ? -1 : value;
            }else{
                let array = fields[positionRow][positionCol].notes;
                array.pop();
                fields[positionRow][positionCol].notes = array;   
            }
            
        }
    }


    $: {if (bad >= 3) {alert('przegrałeś frajerze')}}

</script>

<svelte:window on:keydown={handleKeydown}/>

<div class="container">
    <div class="board">   
        {#each fields as row, rowIndex}
            {#each row as field, fieldIndex}
            <div class="field"  
            class:selected="{getStyles(rowIndex, fieldIndex)}"
            class:pointer="{(positionRow == rowIndex && positionCol == fieldIndex)}"
            >
                {#if field.value != -1}
                    {#if field.value < 10}
                        {field.value}
                        {:else}
                        <span class="wrong">{field.value - 10}</span> 
                    {/if}
                    
                {:else}
                    <div class="notes">
                        {#each field.notes as note}
                            <div>{note}</div>
                        {/each}
                    </div>
                {/if}
            </div>
            {/each}
             
        {/each}
    
    </div>
    
    
    <div class="menu">
        <h1>SUDOKU!</h1>
        <ul>
            <li>Błędne wstawienie: {bad} / 3</li>
            <li>Tryb: {#if mode == "p"}
                pióro
                {:else}
                  notatki  
            {/if} 
            <button on:click={()=>{mode = mode == "p" ? "n" : "p"}}>Zmień</button>
        </li>
            <li>Pozostało: {howMuchMore}</li>
            {#if howMuchMore == 0}
                 <button>Wydrukuj</button>
                 <button></button>
            {/if}
            
        
        </ul>
    </div>
</div>

<style>
    .container{
        width: 100%;
    }
    .menu{
        position: absolute;
        right: 0;
        top: 5%;    
        width: 30%;
        background-color: #2e2e2e;
    }

    .menu h1{
        text-align: center;
        text-decoration: underline;
    }

    .board{
        width: 50%;
        max-width: 90vh;
        display: grid;
        grid-template-columns: repeat(9, [col-start] 1fr);
        margin-left: 5%;
    }

    .field{
        display: flex;
        justify-content: center; /* Align horizontal */
        align-items: center; /* Align vertical */
        border: 1px solid rgba(0, 0, 0, 0.8);
        font-size: 30px;
        aspect-ratio: 1;
        background-color: #d2d2d2;
        color: black;
    }
    .selected{
        background-color: blanchedalmond;
    }

    .notes{
        display: grid;
        width: 100%;
        height: 100%;
        grid-template-columns: repeat(3, [col-start] 1fr);
    }

    .notes div{
        display: flex;
        justify-content: center; /* Align horizontal */
        align-items: center; /* Align vertical */
        font-size: 11px;
        aspect-ratio: 1;
    }

    .pointer{
        animation: border-pulsate 0.5s infinite;
    }

    .wrong{
        color: red;
    }

    @keyframes border-pulsate {
    0%   { background-color: rgb(255, 0, 128); }
    100% { background-color: rgb(255, 0, 234); }
}


    @media screen and (max-width: 1200px)
    {
        .board{
            width: 75%;
        }
    }

    @media screen and (max-width: 600px)
        {
            .board{
                width: 100%;
                margin: 0;
            }
        }
</style>

