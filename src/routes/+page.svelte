
<script lang="ts">
    import smallIcon from '$lib/assets/icon-small.png';
	import RankingTables from '$lib/misc/rankingTables.svelte';
	import Search from '$lib/search/search.svelte';
</script>

<div>
    <div class="header">
        <img style="margin: auto; margin-right: 10px;"src={smallIcon} alt="" class="search-icon" width="40px"/>
        <div style="margin: auto; margin-left: 10px;">
            <a href="/">
                <h1>Misguided Logs</h1>
            </a>
        </div>
    </div>
    <div class="container">
        <p style="margin-bottom:10px">We're not lost, just misguided</p>
        <Search callback={() => {}}></Search>
    </div>
    <RankingTables></RankingTables>
</div>


<style>
    .header {
        background-color: #1C1C1C;
        padding: 0.1rem;
        text-align: center;
        border-bottom: 0.5px solid #f0ae30;
        flex-direction: row;
        display: flex;
    }
    .container {
        max-width: 400px;
        margin: 0 auto;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        text-align: center;
    }

   
</style>