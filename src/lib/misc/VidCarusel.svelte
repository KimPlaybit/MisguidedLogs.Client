
<script lang="ts">
    import YoutubeVid from './youtubeVid.svelte';

    // Example video IDs, replace with your own data
    let videos = [
        { id: 'vXBI15oF78k', title: '40 mages Molten Core' },
        { id: 'BQngwYkgiEQ', title: '25 mage ZulGurub' },
        { id: 'yAmXZPuS7L0', title: '40 Priests Onyxia' }
    ];

    let current = 0;

    function prev() {
        current = (current - 1 + videos.length) % videos.length;
    }

    function next() {
        current = (current + 1) % videos.length;
    }
</script>

<div>
    <h2>Successful runs</h2>
    <div class="carousel">
        <button onclick={prev} aria-label="Previous" style="color: #C0C0C0;">&#8592;</button>
        <div class="video-container">
            <YoutubeVid videoId={videos[current].id} title="{videos[current].id}"/>
        </div>
        <button onclick={next} aria-label="Next" style="color: #C0C0C0;">&#8594;</button>
    </div>
</div>

<style>
    .carousel {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
    }
    .video-container {
        width: 560px;
        height: 315px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    button {
        font-size: 2rem;
        background: none;
        border: none;
        cursor: pointer;
        user-select: none;
    }
</style>