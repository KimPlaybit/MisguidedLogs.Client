<script lang="ts">

    interface Props {
        achievementName: string,
        pictureName: string,
        criteria: string,
        description: string,
        bossAvailable: string,
    }
    let {
        achievementName,
        criteria,
        description,
        bossAvailable,
        pictureName
    }: Props = $props();

</script>

<div class="achievementdesc">
    <div class="imgdiv">
        <img src="https://misguidedlogs.com/_app/immutable/assets/achivements/{pictureName}.png" alt="{achievementName}"/>
    </div>
    <div class="info">
        <h3 style="margin-bottom: 5px;">{achievementName}</h3>
        <div><span style="font-weight: bold;">Bosses</span>: {bossAvailable}</div>
        <div><span style="font-weight: bold;">Criteria</span>: {criteria}</div>
        <div class="description">{description}</div>
    </div>
</div>

<style>
    .achievementdesc {
        display: flex;
        flex-direction: row;
        padding: 5px;
        border-radius: 5px;
        margin-bottom: 5px;
        width: 400px;
        height: 100px;
    }
    .imgdiv {
        flex: 1;
    }
    img {
        width: 100%;
    }
    .info {
        flex: 3;
        padding-left: 10px;
        display: flex;
        flex-direction: column;
        text-align: left;
    }
    .description {
        font-size: 0.9rem;
    }
    @media(max-width:900px) {
        .achievementdesc {
            margin-top: 20px;
            width: 100%;
        }
        .achievementdesc {
            height:150px;
        }
    }
</style>