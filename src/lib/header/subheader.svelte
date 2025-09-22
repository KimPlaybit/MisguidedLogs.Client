<script lang="ts">
    interface Props {
        height: string,
    }
    let {
        height: height
    }: Props = $props();
</script>

<div class="subheader">
    <div class="container row-direction" style="{height == undefined ? "" : `height: ${height}`}">
        <slot></slot>
    </div>
</div>

<style>
    .subheader {
        margin: auto;
        display: flex;
        align-items: center;
        background-color: #1C1C1C;
        width: 100%;
        border-bottom: 0.1px solid #f0ae30;
    }
    .subheader .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0.1rem;
        display: flex;
        align-items: center;
        width: 100%;
    }
</style>