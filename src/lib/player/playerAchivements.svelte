<script lang="ts">
	import type { AchievementValues, RecentAchievement } from "$lib/achivement";
	import Table from "$lib/misc/table.svelte";
	import BunnyCdnClientFetcher from "$lib/repository/probabilityFetcher";
    
    let achivementValues: AchievementValues | undefined = $state(undefined);

    interface Props {
        Achivements: RecentAchievement[]
    }

    let {
        Achivements,
    }: Props = $props();

    BunnyCdnClientFetcher.GetProbabilityData<AchievementValues>("achivements/achivementvalues-stripped.json.gz")
    .then(data => {
        if (data) {
            achivementValues = data
        }
    });


</script>

<div style="flex-direction:row" class="container row-direction">
    {#if achivementValues}
        <div style="flex:1; border-right: 1px solid #f0ae30;"> 
            <Table 
                Style=""
                Title="Most Rare Achivement" 
                RowNames={["Name", "Boss", "Achived", "Rarity", "Log"]}
                ColumnInfo={Achivements.map(x => {
                    const rarity = achivementValues?.achievements.find(y => y.name == x.name && y.boss == x.boss)?.probability ?? 0;
                    const bossImg = `<div class="class-icon"><img src="https://assets.rpglogs.com/img/warcraft/bosses/${x.boss}-icon.jpg" alt="${x.boss}" width="20px"/></div>`;
                    return {
                        ...x,
                        Name: x.name,
                        Achived: x.achived,
                        Boss: bossImg,
                        Log: x.report,
                        Rarity: rarity
                    };
                }).sort((a,b) => b.Rarity - a.Rarity).slice(0, 5)}
                StyleRow={new Map<string,string>([['name', 'flex: 2;'],['boss', 'flex: 2;'],['achived', 'flex: 2;'],['achived', 'flex: 2;'],['report', 'flex: 1;']])}
                CustomRow={["Boss", "Log"]}></Table>
        </div>
         <div style="flex:1; border-left: 1px solid #f0ae30;">
            <Table 
                Style=""
                Title="Recent Achivement" 
                RowNames={["Name", "Boss", "Achived", "Log"]}
                ColumnInfo={Achivements.sort((a,b) => b.achivedAt.getTime() - a.achivedAt.getTime()).map(x => {
                    const bossImg = `<div class="class-icon"><img src="https://assets.rpglogs.com/img/warcraft/bosses/${x.boss}-icon.jpg" alt="${x.boss}" width="20px"/></div>`;
                     return {
                        ...x,
                        Name: x.name,
                        Boss: bossImg,
                        Achived: x.achived,
                        Log: x.report,
                    };
                })}
                StyleRow={new Map<string,string>([['name', 'flex: 2;'],['boss', 'flex: 2;'],['achived', 'flex: 2;'],['report', 'flex: 1;']])}
                CustomRow={["Log"]}></Table>
        </div>
    {/if}
</div>