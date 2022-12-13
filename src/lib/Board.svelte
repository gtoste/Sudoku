<script>
    const boardValues = Array.from(Array(9), () => new Array(9).fill(-1))
</script>

<div class="board">   

    {#each boardValues as line, row}
         <div class="line">
            {#each line as number, pos}
                <div class="block {(pos + 1) % 3 == 0  && pos + 1 != 9? "outlineRight" : ""}">
                    {#if number != -1}
                        {number}
                    {:else}
                        <span class="invis">...</span>
                    {/if}
                    
                </div>
            {/each}
         </div>
    {/each}


</div>

<style>
    .board{
        width: 40%;
        min-width: 500px;
    }

    .line{
        width: 100%;    
    }

    .block{
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 10%;
        border-right: 1px solid rgb(231, 162, 162);
        border-bottom: 1px solid rgb(231, 162, 162);
        aspect-ratio: 1;
    }

    .block:last-child{
        border-right: none;
    }

    .outlineRight{
        border-right: 1px solid red !important;
    }

    .invis{
        visibility: hidden;
    }
</style>

