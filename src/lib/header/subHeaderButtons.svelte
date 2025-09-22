<script lang="ts">
	import { PageContent } from '$lib/misc/pageContent';
	import Subheader from "./subheader.svelte";
	import { goto } from '$app/navigation';

    interface Props {
        page: PageContent,
    }
    let {
        page: page
    }: Props = $props();

    function setPageContent(content: PageContent) {
        goto(`/${content === PageContent.Rankings ? "" : content.toLowerCase()}`);
    }

</script>

<Subheader height="60px">
    <button style="margin: auto; margin-top: 10px; margin-bottom: 10px;" 
        class="{page === PageContent.Rankings ? 'underline' : ''}"
        onclick={() => setPageContent(PageContent.Rankings)}>
        <h3>Feats of strength</h3>
    </button>
    <button style="margin: auto; margin-top: 10px; margin-bottom: 10px;"
        class="{page === PageContent.Achievements ? 'underline' : ''}"
        onclick={() => setPageContent(PageContent.Achievements)}>
        <h3 >Achievements</h3>
    </button>
    <button style="margin: auto; margin-top: 10px; margin-bottom: 10px;"
        class="{page === PageContent.RetrieveReport ? 'underline' : ''}"
        onclick={() => setPageContent(PageContent.RetrieveReport)}>
        <h3>Retrieve Report</h3>
    </button>
    <button style="margin: auto; margin-top: 10px; margin-bottom: 10px;"
        class="{page === PageContent.About ? 'underline' : ''}"
        onclick={() => setPageContent(PageContent.About)}>
        <h3>About</h3>
    </button>
</Subheader>

<style>
    button {
        background-color: transparent;
        border: none;
        color: #C0C0C0;
        cursor: pointer;
        font-size: 1rem;
    }
    .underline {
        text-decoration: underline; 
        color: #f0ae30;
    }
    
</style>