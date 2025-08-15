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

        // This function can be used to handle search logic
        // For example, you could navigate to a search results page
        // or filter a list of players based on the input name.
    }
</script>

<div class="search-container">
    <div class="search-input">
        <input id="searchbar" placeholder="Search for a player..." type="text" style={searchStyle} bind:value={query} onkeyup={onSearch}/>
        <div class="search-results">
            {#each searchResults as result}
                <div class="search-result">
                    <a href={`/player/${result.id}`} onclick={() => callback(result.id)}>{result.name}</a>
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
     .search-result {
        background-color: #2E2E2E;
        color: #C0C0C0;
        padding: 0.5rem;
        max-width: 400px;
        border: 1px solid #1C1C1C;
        text-align: left;
        display: flex;
        align-content: stretch;
    }
    .search-results {
        margin: auto; 
        max-width: 400px;
        align-content: stretch;
        flex-direction: column;
        display: flex;
        position: absolute;
        margin-top: 38px;
    }
    .search-input {
        margin: auto; 
        max-width: 400px;
        margin-left: 5px;
        margin-right: 5px;
        width: 100%;
        align-content: stretch;
        flex-direction: row;
        display: flex;
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
    input[type=text]::placeholder{
        color:#1f1f1d;
    }
</style>