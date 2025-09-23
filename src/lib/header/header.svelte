<script lang="ts">
	import Search from "$lib/search/search.svelte";
    import smallIcon from '$lib/assets/icon-small.png';
	import ZoneSelection from "$lib/misc/zoneSelection.svelte";
	import Hamburger from "./hamburger.svelte";
    
    interface Props {
        searchCallback: (id: string) => void
    }
    let {
        searchCallback: searchCallback
    }: Props = $props();
</script>

<div class="header">
    <div class="header-content header-container">
        <div class="title">
            <img style="margin: auto; margin-left: 0px; margin-right: 10px; "src={smallIcon} alt="" class="search-icon" width="40px" height="40px"/>
            <div style="margin: auto; margin-left: 10px;">
                <a href="/" class="title-text">
                    <h2>Misguided Logs</h2>
                </a>
            </div>
            <div class="menu">
                <Hamburger></Hamburger>
            </div>
        </div>
        <Search callback={(id) => {searchCallback(id)}}></Search>
        <ZoneSelection></ZoneSelection>
    </div>
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

    .title-text {
        text-decoration: none;
    }

    .title {
        flex: 1;
        display: flex;
        flex-direction: row;
    }
    .header-container {
        width: 100%;
    }
    .menu {
        display: none;
    }
    @media (max-width: 1100px) {
        .header-container {
            flex-direction: column;
            align-items: center;
        }
        .title {
            justify-content: center;
            margin-bottom: 10px;
        }
    }
    @media (max-width: 600px) {
        .title {
            justify-content: left;
            margin-right: auto;
            margin-left: auto;
            width: 90%;
            display: flex;
        }
        .menu {
            display: flex;
            margin: auto;
            margin-right: 0px;

        }
    }
    @media (max-width: 400px) {
        .title {
            font-size: 14px;
        }
    }
    @media (max-width: 350px) {
        h2 {
            display: none
        }
    }
</style>