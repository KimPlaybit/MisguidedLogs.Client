
<script lang="ts">
    import YoutubeVid from './youtubeVid.svelte';

    // Example video IDs, replace with your own data
    let videos = [
        { id: 'BQngwYkgiEQ', title: '20 mage ZulGurub' },
        { id: 'vXBI15oF78k', title: '40 mages Molten Core' },
        { id: 'yAmXZPuS7L0', title: '40 Priests Onyxia' }
    ];
</script>

<div style="margin-top:40px; margin-bottom:40px;">
    <h2>Successful runs</h2>
    <div class="grid">
        {#each videos as video}
            <div class="video-container">
                <YoutubeVid videoId={video.id} title={video.title} />
            </div>
        {/each}
    </div>
</div>

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 1.5rem;
        justify-items: center;
        align-items: start;
        width: 100%;
    }
    .video-container {
        width: 100%;
        max-width: 560px;
        aspect-ratio: 16 / 9;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
