<script>
    import {fillBoard, getStyles } from "./script";
    const fields = fillBoard();

    
</script>

<div class="board">   

    {#each fields as row, rowIndex}
        {#each row as field, fieldIndex}
        <div class="field"  class:selected="{getStyles(rowIndex, fieldIndex)}">
            {#if field.value != -1}
                {field.value} 
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

<style>
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

