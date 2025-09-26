<script lang="ts">
	import { AchievementName, type Achievement, type RecentAchievement, type TableAchievement } from "$lib/achivement";
	import { TalentSpec, type RarestPlays } from "$lib/probability";
    import BunnyCdnClientFetcher from "$lib/repository/probabilityFetcher";
	import Table from "./table.svelte";
	import Selection from "$lib/misc/selection";
    import { getUnFulfilledAchievements as getUnfulfilledAchievements } from "./unfulfilledAchievements";

    let probabilities: RarestPlays[] = $state([]);
    let achivements: TableAchievement[] = $state([]);
    let recent: RecentAchievement[] = $state([]);
    let loaded: boolean[] = $state([]);
    const style = "flex 1; width: 450px;";
    const achivementCustom = new Map<string,string>([['name', 'flex: 2;']]);

    const getAchievements = () => BunnyCdnClientFetcher.GetProbabilityData<Achievement[]>("achivements/achivementvalues-top-10.json.gz")
    .then(data => {
        if (data && typeof data.map === 'function') {
            achivements = data.filter(x => x.probability != 0).map(x => {
                return {
                    name: x.name, // Assuming x.name is of type AchievementName
                    boss: x.boss,
                    probability: x.probability,
                    percentage: x.probability == 0 ? "Unfulfilled" : (x.probability * 100).toFixed(2) + "%" // Corrected spelling
                };
            });
        }
        const showUnfulfilledAchivements = 10 - (achivements?.length ?? 0);
        const unfulfilled = getUnfulfilledAchievements(probabilities.map(x => x.bossId), achivements.map(x => { return { bossId: x.boss, achievementName: x.name} })).slice(0, showUnfulfilledAchivements);
        unfulfilled.forEach(achievement => {
            achivements.push({
                name: achievement.name,
                boss: achievement.boss,
                probability: achievement.probability,
                percentage: "Unfulfilled"
            });
        });
        loaded.push(true);
    });

    const getRecentAchivements = () => BunnyCdnClientFetcher.GetProbabilityData<RecentAchievement[]>("achivements/achivementrecent.json.gz")
    .then(data => {
        const showUnfulfilledAchivements = 10 - (data?.length ?? 0);
        
        if (data && typeof data.map === 'function') {
            recent = data.map(x => {
                return {
                    name: x.name, // Assuming x.name is of type AchievementName
                    boss: x.boss,
                    achivedAt: x.achivedAt,
                    achived: x.achivedAt?.toISOString().slice(2, 16).replace('T', ' ').replace(/-/g, '-') ?? "",
                    reportCode: x.reportCode, // Corrected spelling
                    report: `<a href="https://fresh.warcraftlogs.com/reports/${x.reportCode}" style="display: flex; align-items: center;" target="_blank">
                                <img src="https://assets.rpglogs.com/img/warcraft/favicon.png?v=4" alt="Player Icon" width="20px" style="margin:auto"/>
                            </a>`
                };
            });
        }
        const unfulfilled = getUnfulfilledAchievements(
            probabilities.map(x => x.bossId), 
            recent.map(x => { return { bossId: x.boss, achievementName: x.name} }))
            .slice(0, showUnfulfilledAchivements);

        unfulfilled.forEach(avhievement => {
            recent.push({
                name: avhievement.name,
                boss: avhievement.boss,
                achivedAt: undefined,
                achived: "Unfulfilled",
                reportCode: undefined, // Corrected spelling
                report: undefined
            });
        });
        loaded.push(true);
    });


    const getProbability = (zone: number) => BunnyCdnClientFetcher.GetProbabilityData<RarestPlays[]>("zones/" + zone + "_rarestplays.json.gz").then(data => {
        if (data) {
            probabilities = [];
            data.forEach(player => {
                 probabilities.push(player);
            });
            getAchievements();
            getRecentAchivements();
        } else {
            console.error('No probability data found for the specified boss ID.');
        }
        loaded.push(true);
    }).catch(error => {
        console.error('Error fetching probability data:', error);
    });
    Selection.AddSubscription((value => {
        getProbability(value);
    }));
    
</script>

<div>
    {#if loaded.length >= 3 }
    <div class="grid-container row-direction" style="margin: auto; margin-top: 20px;">
        <Table 
            Style={style + "margin-left:auto;margin-right:5px;"}
            Title="Most Rare Played Spec" 
            RowNames={["Boss", "Class", "Role", "Rarity", "By" ]}
            ColumnInfo={probabilities.map(x => {
                 const specImg = x.spec !== TalentSpec.Hybrid ? 
                `<img src="https://misguidedlogs.com/_app/immutable/assets/spec/${x.class}/${x.spec}.png" alt="${x.spec}" width="20px" height= "20px"/>` :
                `` ;
                const img = `<div class="class-icon"><img src="https://misguidedlogs.com/_app/immutable/assets/${x.class}.gif" alt="" width="20px" height= "20px"/>${specImg}</div>`;
                const bossImg = `<div class="class-icon"><img src="https://misguidedlogs.com/_app/immutable/assets/boss/${x.bossId}.jpg" alt="${x.bossId}" width="20px" height= "20px"/></div>`;
                const roleImg = `<div class="class-icon"><img src="https://misguidedlogs.com/_app/immutable/assets/${x.role}.png" alt="" width="20px" height= "20px"/></div>`;
                const link = x.code ? `<a href="https://fresh.warcraftlogs.com/reports/${x.code}" style="display: flex; align-items: center;" target="_blank">` 
                            + `<img src="https://assets.rpglogs.com/img/warcraft/favicon.png?v=4" alt="Player Icon" width="20px" style="margin:auto"/>` 
                        + `</a>` : `<a href="https://fresh.warcraftlogs.com/character/${x.name.split("-")[2]}/${x.name.split("-")[1].replace(" ", "-")}/${x.name.split("-")[0]}" style="display: flex; align-items: center;" target="_blank">` 
                            + `<img src="https://assets.rpglogs.com/img/warcraft/favicon.png?v=4" alt="Player Icon" width="20px" style="margin:auto"/>` 
                        + `</a>`;
                return {
                    ...x,
                    Class: img,
                    Boss: bossImg,
                    Role: roleImg,
                    Rarity: x.probability > 0 
                        ? (() => {
                            const n = Math.round(1 / x.probability);
                            if (n >= 1_000_000) return `1 in ${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
                            if (n >= 1_000) return `1 in ${(n / 1_000).toFixed(1).replace(/\.0$/, '')}k`;
                            return `1 in ${n.toLocaleString()}`;
                            if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
                            return n.toLocaleString();
                        })()
                        : "Unfulfilled",
                    By: link
                };
            })}
            StyleRow={undefined}
            CustomRow={["Boss", "Class", "Role", "Spec", "By"]}></Table>
        <Table 
            Style={style + "margin-left:5px;margin-right:5px;"}
            Title="Most Rare Achievement" 
            RowNames={["Name", "Boss", "Rarity"]}
            ColumnInfo={achivements.map(x => {
                const bossImg = `<div class="class-icon"><img style="${x.percentage === "Unfulfilled" ? "filter: grayscale(100%);" : ""}" src="https://misguidedlogs.com/_app/immutable/assets/boss/${x.boss}.jpg" alt="${x.boss}" width="20px" height= "20px"/></div>`;
                const nameImg = `<div class="class-icon"><img style="${x.percentage === "Unfulfilled" ? "filter: grayscale(100%);" : ""}" src="https://misguidedlogs.com/_app/immutable/assets/achivements/${x.name}.png" alt="${x.name}" width="20px" height= "20px"/></div>`;
                
                return {
                    ...x,
                    Name: nameImg,
                    Boss: bossImg,
                    Rarity: x.percentage
                };
            })}
            StyleRow={achivementCustom}
            CustomRow={["Name", "Boss"]}></Table> 
        <Table 
            Style={style + "margin-left:5px;margin-right:auto;"}
            Title="Most Recent Achievement" 
            RowNames={["Name", "Boss", "Achived", "By"]}
            ColumnInfo={recent.map(x => {
                const bossImg = `<div class="class-icon"><img style="${x.achived === "Unfulfilled" ? "filter: grayscale(100%);" : ""}" src="https://misguidedlogs.com/_app/immutable/assets/boss/${x.boss}.jpg" alt="${x.boss}" width="20px" height= "20px"/></div>`;
                const nameImg = `<div class="class-icon"><img style="${x.achived === "Unfulfilled" ? "filter: grayscale(100%);" : ""}" src="https://misguidedlogs.com/_app/immutable/assets/achivements/${x.name}.png" alt="${x.name}" width="20px" height= "20px"/></div>`;
                
               return {
                    ...x,
                    Name: nameImg,
                    Boss: bossImg,
                    Achived: x.achived,
                    By: x.report
                };
            })}
            StyleRow={new Map<string,string>([['name', 'flex: 2;'],['boss', 'flex: 2;'],['achived', 'flex: 2;'],['report', 'flex: 1;']])}
            CustomRow={["Name", "report", "Boss", "By"]}></Table>
    </div>
    {:else}
        <p>..loading</p>
    {/if}
</div>

<style>
    @media(max-width: 1200px) {
        .grid-container {
            flex-direction: column !important;
        } 
    }
</style>