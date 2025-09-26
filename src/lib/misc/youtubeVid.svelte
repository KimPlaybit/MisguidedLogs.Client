<script lang="ts">
    interface Props {
        videoId: string;
        title: string;
    }
    let { videoId, title }: Props = $props();
</script>

<div class="video-container">
    <iframe
        title={title}
        width="300"
        height="300"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
    ></iframe>
</div>

<style>
    .video-container {
        width: 300px;
        height: 300px;
        overflow: hidden;
    }
    .video-container iframe {
        display: block;
    }
</style>