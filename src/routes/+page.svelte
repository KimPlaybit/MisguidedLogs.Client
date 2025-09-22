<script lang="ts">
	import Header from '$lib/header/header.svelte';
	import SubHeaderButtons from '$lib/header/subHeaderButtons.svelte';
	import { PageContent } from '$lib/misc/pageContent';
	import RankingTables from '$lib/misc/rankingTables.svelte';

</script>

<div>
    <title>Feats of Strength - Misguided Logs</title>
    <meta name="View the Feats of Strength of players and raids" />
    <Header searchCallback={() => {}}></Header>
    <div class="subheader"><SubHeaderButtons page={PageContent.Rankings}></SubHeaderButtons></div>
    <div class="page-content">
        <RankingTables></RankingTables>
    </div>
</div>

<style>
    @media(max-width: 600px) {
        .subheader {
            display: none;
        }
    }
</style>