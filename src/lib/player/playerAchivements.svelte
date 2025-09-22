<script lang="ts">
	import type { AchievementValues, Achievement, RecentAchievement } from "$lib/achivement";
	import Table from "$lib/misc/table.svelte";
	import BunnyCdnClientFetcher from "$lib/repository/probabilityFetcher";
    import { getUnFulfilledAchievements as getUnfulfilledAchievements } from "$lib/misc/unfulfilledAchievements";
	import type { Class } from "$lib/probability";
    
    let achivementValues: Achievement[] = $state([]);
    interface RareAchivement {
        Name: string; 
        Achived: string; 
        Boss: string; 
        Log: string | undefined; 
        Rarity: string | undefined;
    }

    interface Props {
        Achivements: RecentAchievement[]
        bosses: number[]
        playerClass: Class
    }

    let {
        Achivements,
        bosses,
        playerClass
    }: Props = $props();

    let rareAchievements: RareAchivement[] = $state([]);
    let recentAchievements: RareAchivement[] = $state([]);

    BunnyCdnClientFetcher.GetProbabilityData<AchievementValues>("achivements/achivementvalues-stripped.json.gz")
    .then(data => {
        if (data) {
            achivementValues = data.achivements
            
            const unfulfilled = getUnfulfilledAchievements(bosses, 
                Achivements.map(x => { return { bossId: x.boss, achievementName: x.name} }),
                playerClass).slice(0, 5);

            rareAchievements = Achivements.map(x => {
                    const rarity = achivementValues.find(y => y.name == x.name && y.boss == x.boss)?.probability ?? 0;
                    const bossImg = `<div class="class-icon"><img src="https://misguidedlogs.com/_app/immutable/assets/boss/${x.boss}.jpg" alt="${x.boss}" width="20px" height="20px"/></div>`;
                    return {
                        Name: x.name,
                        Achived: x.achived,
                        Boss: bossImg,
                        Log: x.report,
                        Rarity: rarity
                    };
                }).sort((a,b) => b.Rarity - a.Rarity).slice(0, 5);
                

            if (rareAchievements.length < 5) {
                const showUnfulfilledAchivements = 5 - rareAchievements.length;
                const recentUnfilled = unfulfilled.slice(0, showUnfulfilledAchivements);
                recentUnfilled.forEach(element => {
                    const nameImg = `<div class="class-icon">
                    <img style="filter: grayscale(100%);" 
                    src="https://misguidedlogs.com/_app/immutable/assets/achivements/${element.name}.png" alt="${element.name}" width="20px" height="20px"/>
                    </div>`;
                    const boss = `<div class="class-icon">
                    <img style="filter: grayscale(100%);" 
                    src="https://misguidedlogs.com/_app/immutable/assets/boss/${element.boss}.jpg" alt="${element.boss}" width="20px" height="20px"/>
                    </div>`;
                    const rarity = achivementValues.find(y => y.name == element.name && y.boss == element.boss)?.probability ?? 0;
                    rareAchievements.push({
                        Name: nameImg,
                        Achived: "Never",
                        Boss: boss,
                        Log: undefined,
                        Rarity: rarity.toFixed(1) + "%"
                    });
                });
            } 
            recentAchievements = Achivements.sort((a,b) => b.achivedAt!.getTime() - a.achivedAt!.getTime()).map(x => {
                    const bossImg = `<div class="class-icon"><img src="https://misguidedlogs.com/_app/immutable/assets/boss/${x.boss}.jpg" alt="${x.boss}" width="20px" height="20px"/></div>`;
                     return {
                        Name: x.name,
                        Boss: bossImg,
                        Achived: x.achived,
                        Log: x.report,
                        Rarity: undefined
                    };
                }).slice(0, 5);
            if (recentAchievements.length < 5) {
                const showUnfulfilledAchivements = 5 - recentAchievements.length; 
                const recentUnfilled = unfulfilled.slice(0, showUnfulfilledAchivements);
                recentUnfilled.forEach(element => {
                    const nameImg = `<div class="class-icon">
                    <img style="filter: grayscale(100%);" 
                    src="https://misguidedlogs.com/_app/immutable/assets/achivements/${element.name}.png" alt="${element.name}" width="20px" height="20px"/>
                    </div>`;
                    const boss = `<div class="class-icon">
                    <img style="filter: grayscale(100%);" 
                    src="https://misguidedlogs.com/_app/immutable/assets/boss/${element.boss}.jpg" alt="${element.boss}" width="20px" height="20px"/>
                    </div>`;
                    recentAchievements.push({
                        Name: nameImg,
                        Achived: "Never",
                        Boss: boss,
                        Log: undefined,
                        Rarity: "0.0%"
                    });
                });
            }
        }
    });


</script>

<div class="container row-direction">
    {#if achivementValues}
        <div style="flex:1; margin-right: 5px;"> 
            <Table 
                Style=""
                Title="Most Rare Achivement" 
                RowNames={["Name", "Boss", "Achived", "Rarity", "Log"]}
                ColumnInfo={rareAchievements}
                StyleRow={new Map<string,string>([['name', 'flex: 2;'],['boss', 'flex: 2;'],['achived', 'flex: 2;'],['achived', 'flex: 2;'],['report', 'flex: 1;']])}
                CustomRow={["Boss", "Name", "Log"]}></Table>
        </div>
         <div style="flex:1; margin-left: 5px;">
            <Table 
                Style=""
                Title="Recent Achivement" 
                RowNames={["Name", "Boss", "Achived", "Log"]}
                ColumnInfo={recentAchievements}
                StyleRow={new Map<string,string>([['name', 'flex: 2;'],['boss', 'flex: 2;'],['achived', 'flex: 2;'],['report', 'flex: 1;']])}
                CustomRow={["Boss", "Name", "Log"]}></Table>
        </div>
    {/if}
</div>

<style>
    @media(max-width:900px) {
        .container {
            margin-top:0px;
            flex-direction: column !important;
        }
    }
</style>