<script lang="ts">  
	import { page } from '$app/state';
    import GetPlayerData from '$lib/repository/playerFetcher';
    import probabilityClass from '$lib/repository/probabilityFetcher';
	import type { Class, ProbabilityValues } from '$lib/probability';
	import type { searchresult } from '$lib/searchresult';
	import PlayerProbability from '$lib/player/playerProbability.svelte';
	import PlayerAchivements from '$lib/player/playerAchivements.svelte';
	import { AchievementName, type RecentAchievement } from '$lib/achivement';
	import Subheader from "$lib/header/subheader.svelte";
	import Header from '$lib/header/header.svelte';
    import Selection from '$lib/misc/selection';

    let player: (searchresult | undefined) = $state(undefined);
    let openPlayerProb: boolean = $state(true);
    let playerName: string = $state("");
    let playerRegion: string = $state("");
    let playerServer: string = $state("");
    let probabilities: ProbabilityValues | undefined = $state(undefined);
    let achivements: RecentAchievement[] | undefined = $state(undefined);
    let playerId = $state(page.params.playerid ?? "");
    let zone = $state(Selection.GetZoneSelection())
    let loading = $state(true);

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
                            report: `<a href="https://fresh.warcraftlogs.com/reports/${splitValues[2]}" style="display: flex; align-items: center;" target="_blank">`
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
            probabilityClass.GetProbabilityData<ProbabilityValues>(`zones/${zone}_stripped.json.gz`)
                .then(data => {
                    if (!data) {
                        console.error('No probability data found for the specified boss ID.');
                        return;
                    }
                    probabilities = data
                    openPlayerProb = true;
                    loading = false;  
                    })
                .catch(error => {
                    console.error('Error fetching probability data:', error);
                });
        });
    Selection.AddSubscription((newZone) => {
        zone = newZone;
        loading = true;
        updateData();   
    });

</script>

<div>
    <title>{playerName} - Misguided Logs</title>
    <meta name="see {playerName} feat of strengths" />
    <Header searchCallback={(id) => {playerId=id; updateData(); }}></Header>
    {#if player}
    {#await import(`$lib/assets/class/64/${player.class.toLocaleLowerCase()}.png`) then { default: src }}
    <Subheader height="80px">
        <div style="margin-left:0px; display: flex;">
            <img 
                src="https://render.worldofwarcraft.com/classic1x-{playerRegion.toLocaleLowerCase()}/character/{playerServer.replace(" ", "-").toLocaleLowerCase()}/{player.guid % 256}/{player.guid}-avatar.jpg?alt=/shadow/avatar/2-1.jpg" 
                alt="Avatar"
                style="height:83px; border: 0.5px solid #f0ae30; border-top: none; border-bottom: none; margin-top: auto; margin-bottom: auto;"/>
        </div>
        <div class="player-info">
            <div class="player-name">
                {playerName}
            </div>
            <div class="player-server">
               {playerServer}-{playerRegion}
            </div>
            <div class="row-direction" style="margin-top: 2px;">
                <div class="class-icon">
                    <img {src} alt="" width="100%"/>
                </div>
                <div class="player-wclogs-link">
                    <a href="https://fresh.warcraftlogs.com/character/{playerRegion}/{playerServer.replace(" ", "-")}/{playerName}" style="display: flex; align-items: center;" target="_blank">
                        <img src="https://assets.rpglogs.com/img/warcraft/favicon.png?v=4" alt="Player Icon" width="20px"/>
                    </a>
                </div>
            </div>
        </div>
        <div class="options"> 
            <div style="flex: 1;">
                <button onclick={switchViewToProb} >
                    <h3 style={openPlayerProb ? "text-decoration: underline; color: #f0ae30;" : ""}>Player Probabilities</h3>
                </button>
            </div>
            <div style="flex: 1;">
                <button onclick={switchViewToAchivements} >
                    <h3 style={!openPlayerProb ? "text-decoration: underline; color: #f0ae30;" : ""}>Player Achivements</h3>
                </button>
            </div>
        </div>
    </Subheader>
    <div class="grid-container">
        {#if probabilities && player && !loading}
            {#if openPlayerProb}
                <PlayerProbability Probabilities={probabilities!} Player={player!} />    
            {:else}
                {#if achivements}
                    <PlayerAchivements Achivements={achivements} bosses={probabilities.bosses.map(x => x.bossId)} playerClass={player.class as Class}/>
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
        width: 25px;
        margin-right: 20px;
    }
    .player-info {
        display: flex;
        text-align: left;
        flex-direction: column;
        margin-left: 10px;
    }
    .player-name {
        font-size: 1.3rem;
        font-weight: bold;
    }
    .player-server {
        font-size: 0.7rem;
        font-weight: lighter;
    }
    .player-wclogs-link {
        margin: auto;
        margin-left: 20px;
        width: 25px;
        display: flex;
    }
    .options {
        margin: auto;
        flex-direction: row;
        display: flex;
        width: 100%;
    }
    @media(max-width: 600px) {
        .options {
            h3 {
                font-size: 15px;
            }
        }
    }
    @media(max-width: 450px) {
        .options {
            flex-direction: column;
            h3 {
                margin-top:4px;
                margin-bottom:4px;
            }
        }
    }
    @media(max-width: 350px) {
        .options {
            h3 {
                font-size: 12px;
            }
        }
    }
    
</style>