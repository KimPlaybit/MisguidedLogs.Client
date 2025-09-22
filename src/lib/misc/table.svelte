<script lang="ts">


 interface Props {
    Title: string
    RowNames: string[]
    ColumnInfo: any[]
    Style: string
    StyleRow: Map<string, string> | undefined,
    CustomRow: string[]| undefined
}

let {
    Title,
    RowNames,
    ColumnInfo,
    Style,
    StyleRow,
    CustomRow
}: Props = $props();

const getStyle = (rowName: string) => {
    if (StyleRow) {
        return StyleRow.get(rowName);
    }
    return ""
}

</script>

  <div class="table-container" style={Style}>
        <h3 style="text-align:center">{Title}</h3>
        <div>
            <div style="flex-direction:row; border-bottom: 2px solid #f0ae30;" class="container">
                {#each RowNames as rowName}
                    <div style={"flex: 1;" + getStyle(rowName)}>{rowName}</div>
                {/each}
            </div>
            {#each ColumnInfo as columnInfo}
            <div style="flex-direction:row; border-bottom: 0.5px solid #f0ae30;" class="container">
                {#each RowNames as rowName}
                <div style={"flex: 1;" + getStyle(rowName)}>
                    {#if CustomRow && CustomRow.find(x => x == rowName)}
                        {@html columnInfo[rowName]}
                    {:else}
                        <strong>{columnInfo[rowName]}</strong>
                    {/if}
                </div>
                {/each}
            </div>
            {/each}
        </div>
    </div>

<style>
    @media (max-width: 1200px) {
        .table-container {
            width: 100% !important;
        }
    }
    @media (max-width: 1300px) {
        .table-container {
            margin-right:auto !important;
            margin-left:auto !important;
        }
    }
</style>