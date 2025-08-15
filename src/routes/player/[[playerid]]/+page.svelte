<script lang="ts">  
	import { page } from '$app/state';
    import smallIcon from '$lib/assets/icon-small.png';
    import GetPlayerData from '$lib/repository/playerFetcher';
    import probabilityClass from '$lib/repository/probabilityFetcher';
	import type { ProbabilityValues } from '$lib/probability';
	import type { searchresult } from '$lib/searchresult';
	import PlayerProbability from '$lib/player/playerProbability.svelte';
	import PlayerAchivements from '$lib/player/playerAchivements.svelte';
	import Search from '$lib/search/search.svelte';
	import { AchievementName, type RecentAchievement } from '$lib/achivement';
    
    let player: (searchresult | undefined) = $state(undefined);
    let openPlayerProb: boolean = $state(true);
    let playerName: string = $state("");
    let playerRegion: string = $state("");
    let playerServer: string = $state("");
    let probabilities: ProbabilityValues | undefined = $state(undefined);
    let achivements: RecentAchievement[] | undefined = $state(undefined);
    let playerId = $state(page.params.playerid ?? "");

    const switchViewToProb = () => {
        openPlayerProb = true;
    }

    const switchViewToAchivements = () => {
        openPlayerProb = false;
    }

    const updateData = () => GetPlayerData(playerId)
        .then(data => {
            if (data) {
                player = data;
                var split = data.name.split("-");
                playerName = split[0];
                playerServer = split[1];
                playerRegion = split[2];
                achivements = data.achivements.map(x => 
                    {
                        const splitValues = x.split(":"); 
                        const date = new Date(splitValues[3]);
                        return {
                            name: AchievementName[splitValues[0] as keyof typeof AchievementName], 
                            boss: parseInt(splitValues[1]), 
                            reportCode: splitValues[2],
                            report: `<a href="https://sod.warcraftlogs.com/reports/${splitValues[2]}" style="display: flex; align-items: center;" target="_blank">`
                            + `<img src="https://assets.rpglogs.com/img/warcraft/favicon.png?v=4" alt="Player Icon" width="20px" style="margin:auto"/>` 
                            + `</a>`,
                            achivedAt: date,
                            achived: date.toISOString().slice(2, 16).replace('T', ' ').replace(/-/g, '-'),
                            
                        }
                    });
            }
        })
        .catch(error => {
            console.error('Error fetching player data:', error);
        })
        .finally(() => {
            probabilityClass.GetProbabilityData<ProbabilityValues>("2018_stripped.json.gz")
                .then(data => {
                    if (!data) {
                        console.error('No probability data found for the specified boss ID.');
                        return;
                    }
                    probabilities = data
                    openPlayerProb = true;
                    })
                .catch(error => {
                    console.error('Error fetching probability data:', error);
                });
        });
    updateData();

</script>

<div>
    <div class="header">
        <img style="margin: auto; margin-right: 10px;"src={smallIcon} alt="" class="search-icon" width="40px"/>
        <div style="margin: auto; margin-left: 10px;">
            <a href="/">
                <h1>Misguided Logs</h1>
            </a>
        </div>
    </div>
    
        {#if player}
        {#await import(`$lib/assets/class/64/${player.class.toLocaleLowerCase()}.png`) then { default: src }}
        <div class="subheader">
            <div class="container row-direction">
                <div style="margin-left:0px;">
                    <img src="https://render.worldofwarcraft.com/classic1x-{playerRegion.toLocaleLowerCase()}/character/{playerServer.replace(" ", "-").toLocaleLowerCase()}/{player.guid % 256}/{player.guid}-avatar.jpg?alt=/shadow/avatar/2-1.jpg" style="border: 0.5px solid #f0ae30;"/>
                </div>
                <div class="player-info">
                    <div class="player-name">
                        {playerName}
                    </div>
                    <div class="player-server">
                       {playerServer}-{playerRegion}
                    </div>
                    <div class="row-direction" style="margin-top: 10px;">
                        <div class="class-icon">
                            <img {src} alt="" width="100%"/>
                        </div>
                        <div class="player-wclogs-link">
                            <a href="https://sod.warcraftlogs.com/character/{playerRegion}/{playerServer.replace(" ", "-")}/{playerName}" style="display: flex; align-items: center;" target="_blank">
                                <img src="https://assets.rpglogs.com/img/warcraft/favicon.png?v=4" alt="Player Icon" width="20px"/>
                            </a>
                        </div>
                    </div>
                </div>
                <div style="flex: 1;">
                    <button onclick={switchViewToProb} >
                        <h2 style={openPlayerProb ? "text-decoration: underline; color: #f0ae30;" : ""}>Player Probabilities</h2>
                    </button>
                </div>
                <div style="flex: 1;">
                    <button onclick={switchViewToAchivements} >
                        <h2 style={!openPlayerProb ? "text-decoration: underline; color: #f0ae30;" : ""}>Player Achivements</h2>
                    </button>
                </div>
                <Search callback={(id) => { playerId=id; updateData(); }}></Search>
            </div>
        </div>
    <div class="grid-container">
        {#if probabilities && player}
            {#if openPlayerProb}
                <PlayerProbability Probabilities={probabilities!} Player={player!} />    
            {:else}
                {#if achivements}
                    <PlayerAchivements Achivements={achivements}/>
                {/if}
            {/if}
        {/if}
    </div>
        {/await}
        {:else}
            <p>Loading..</p>
        {/if}
</div>

<style>
    button {
        background-color: transparent;
        border: none;
        color: #C0C0C0;
        cursor: pointer;
        font-size: 1rem;
    }
    .class-icon {
        width: 26px;
        margin-right: 20px;
    }
    .player-info {
        display: flex;
        text-align: left;
        flex-direction: column;
        margin-left: 10px;
    }
    .player-name {
        font-size: 1.5rem;
        font-weight: bold;
    }
    .player-server {
        font-size: 0.7rem;
        font-weight: lighter;
    }
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
    .player-wclogs-link {
        margin: auto;
        margin-left: 20px;
        width: 26px;
        display: flex;
    }
    .search-input {
        margin-right: 0px;
        margin-left: auto;
    }
</style>