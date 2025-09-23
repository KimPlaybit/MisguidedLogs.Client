<script lang="ts">
	import Search from "$lib/repository/searchFetcher";
	import type { searchresult } from "$lib/searchresult";

    let searchStyle = $state("flex: 1;");
    let query = $state("");
    let searchResults: searchresult[] = $state([]);

    interface Props {
        callback: (id: string) => void
    }

    let {
        callback
    }: Props = $props();

    const clear = () => {
        searchResults = [];
        query = "";
    }

    const onSearch = () => {
        if (!query || query.length < 2) {
            searchResults = [];
            searchStyle = "flex: 1;";
            return;
        }
        Search.GetSearchResult(query)
            .then(data => {
                searchResults = data;
                searchStyle = "flex: 1;border-bottom-left-radius: 0;border-bottom-right-radius: 0";
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
            });
    }
</script>

<div class="search-container">
    <div class="search-input">
        <input id="searchbar" placeholder="Search for a player..." type="text" style={searchStyle} bind:value={query} onkeyup={onSearch} onclick={clear}/>
        <div class="search-results">
            {#each searchResults as result}
                <div class="search-result">
                    <a href={`/player/${result.id}`} onclick={() => { clear(); callback(result.id);}}>{result.name}</a>
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    
    input::placeholder{
        color:#7F7F7F;
    }
    .search-container {
        margin-right: 0px; 
        margin-left: auto;
        max-width: 500px;
        align-content: stretch;
        flex-direction: column;
        display: flex;
        position: relative;
        flex: 2;
    }
     .search-result {
        background-color: #2E2E2E;
        color: #C0C0C0;
        padding: 0.5rem;
        max-width: 500px;
        border: 1px solid #1C1C1C;
        text-align: left;
        display: flex;
        align-content: stretch;
        z-index: 99;
    }
    .search-results {
        margin: auto; 
        max-width: 500px;
        align-content: stretch;
        flex-direction: column;
        display: flex;
        position: absolute;
        margin-top: 38px;
        width: inherit;
    }
    .search-input {
        margin: auto; 
        max-width: 500px;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        align-content: stretch;
        flex-direction: row;
        display: flex;
        width: 400px;
    }

    input {
        background-color: #2E2E2E;
        color: #C0C0C0;
        padding: 0.5rem;
        border: 0px;
        outline: none;
        font-size: large;
        border-radius: 5px;
    }
    
    input:hover {
        background-color: #2E2E2E;
        color: #C0C0C0;
    }
    
    input:focus {
        background-color: #2E2E2E;
    }

    input[type=text],input[type=text]{
        color:#C0C0C0;
    }
    @media (max-width: 1100px) {
        .search-container {
            margin-top: 20px;
            margin: auto;
            width: 90%;
            max-width: 90%;
        }
        .search-input {
            width: 100%;
            max-width: 100%;
        }
        .search-result {
            width: 100%;
            max-width: 100%;
        }
        .search-results {
            width: 97.5%;
            max-width: 97.5%;
        }
    }
</style>