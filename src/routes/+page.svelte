<script lang="ts">
	import Footer from '$lib/footer/footer.svelte';
	import Header from '$lib/header/header.svelte';
	import SubHeaderButtons from '$lib/header/subHeaderButtons.svelte';
	import { PageContent } from '$lib/misc/pageContent';
	import RankingTables from '$lib/misc/rankingTables.svelte';
	import VidGrid from '$lib/misc/vidGrid.svelte';

</script>

<div>
    <div class="page-container">
        <title>Feats of Strength - Misguided Logs</title>
        <meta name="View the Feats of Strength of players and raids" />
        <Header searchCallback={() => {}}></Header>
        <div class="subheader"><SubHeaderButtons page={PageContent.Rankings}></SubHeaderButtons></div>
        <div class="page-content">
            <RankingTables></RankingTables>
            <VidGrid></VidGrid>
        </div>
    </div>
    <Footer></Footer>
</div>

<style>
    .page-content {
        margin-top: 10px;
    }
    @media(max-width: 600px) {
        .subheader {
            display: none;
        }
    }
</style>