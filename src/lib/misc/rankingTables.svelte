<script lang="ts">
	import { AchievementName, type Achievement, type RecentAchievement, type TableAchievement } from "$lib/achivement";
	import { Role, TalentSpec, type ProbabilityValues, type RankedProbability } from "$lib/probability";
    import BunnyCdnClientFetcher from "$lib/repository/probabilityFetcher";
	import Table from "./table.svelte";

    let probabilities: RankedProbability[] = $state([]);
    let achivements: TableAchievement[] = $state([]);
    let recent: RecentAchievement[] = $state([]);
    let loaded: boolean[] = $state([]);
    const style = "flex 1; width: 450px;";
    const achivementCustom = new Map<string,string>([['name', 'flex: 2;']]);

    BunnyCdnClientFetcher.GetProbabilityData<Achievement[]>("achivements/achivementvalues-top-10.json.gz")
    .then(data => {
        if (data) {
            achivements = data.map(x => {
                return {
                    name: x.name, // Assuming x.name is of type AchievementName
                    boss: x.boss,
                    probability: x.probability,
                    percentage: (x.probability * 100).toFixed(2) + "%" // Corrected spelling
                };
            });
            loaded.push(true);
        }
    });
    BunnyCdnClientFetcher.GetProbabilityData<RecentAchievement[]>("achivements/achivementrecent.json.gz")
    .then(data => {
        if (data) {
            recent = data.map(x => {
                return {
                    name: x.name, // Assuming x.name is of type AchievementName
                    boss: x.boss,
                    achivedAt: x.achivedAt,
                    achived: x.achivedAt.toISOString().slice(2, 16).replace('T', ' ').replace(/-/g, '-'),
                    reportCode: x.reportCode, // Corrected spelling
                    report: `<a href="https://sod.warcraftlogs.com/reports/${x.reportCode}" style="display: flex; align-items: center;" target="_blank">
                                <img src="https://assets.rpglogs.com/img/warcraft/favicon.png?v=4" alt="Player Icon" width="20px" style="margin:auto"/>
                            </a>`
                };
            });
            loaded.push(true);
        }
    });


    BunnyCdnClientFetcher.GetProbabilityData<ProbabilityValues>("2018_stripped.json.gz").then(data => {
        if (data) {
            data.bosses.forEach(boss => {
                boss.tanks.forEach(tank => {
                    tank.specs.forEach(spec => {
                        probabilities.push({
                            bossId: boss.bossId,
                            spec: spec.spec,
                            role: Role[Role.Tank],
                            class: tank.class,
                            probabilityValue: spec.totalProbability,
                            probability: (spec.totalProbability * 100).toFixed(2) + "%"
                        });
                    });
                });
                boss.dps.forEach(dps => {
                    dps.specs.forEach(spec => {
                        probabilities.push({
                            bossId: boss.bossId,
                            spec: spec.spec,
                            role: Role[Role.Dps],
                            class: dps.class,
                            probabilityValue: spec.totalProbability,
                            probability: (spec.totalProbability * 100).toFixed(2) + "%"
                        });
                    });
                });
                boss.hps.forEach(healer => {
                    healer.specs.forEach(spec => {
                        probabilities.push({
                            bossId: boss.bossId,
                            spec: spec.spec,
                            role: Role[Role.Healer],
                            class: healer.class,
                            probabilityValue: spec.totalProbability,
                            probability: (spec.totalProbability * 100).toFixed(2) + "%"
                        });
                    });
                });
                boss.hybrids.forEach(hybrid => {
                    hybrid.specs.forEach(spec => {
                        probabilities.push({
                            bossId: boss.bossId,
                            spec: spec.spec,
                            role: Role[Role.Hybrid],
                            class: hybrid.class,
                            probabilityValue: spec.totalProbability,
                            probability: (spec.totalProbability * 100).toFixed(2) + "%"
                        });
                    });
                });
            });
            probabilities = probabilities.sort((a, b) => a.probabilityValue - b.probabilityValue).slice(0, 10);
            loaded.push(true);
        } else {
            console.error('No probability data found for the specified boss ID.');
        }
    }).catch(error => {
        console.error('Error fetching probability data:', error);
    });
    
</script>

<div>
    {#if loaded.length >= 3 }
    <div class="grid-container row-direction" style="margin: auto;">
        <Table 
            Style={style + "margin-left:auto;margin-right:5px;"}
            Title="Most Rare Played Spec" 
            RowNames={["Boss", "Class", "Spec", "Role", "probability" ]}
            ColumnInfo={probabilities.map(x => {
                const img = `<div class="class-icon"><img src="./src/lib/assets/class/18/${x.class}.gif" alt="" width="20px"/></div>`;
                const bossImg = `<div class="class-icon"><img src="https://assets.rpglogs.com/img/warcraft/bosses/${x.bossId}-icon.jpg" alt="${x.bossId}" width="20px"/></div>`;
                const roleImg = `<div class="class-icon"><img src="./src/lib/assets/role/${x.role}.png" alt="" width="20px"/></div>`;
                const specImg = x.spec !== TalentSpec.Hybrid ? 
                `<div class="class-icon"><img src="./src/lib/assets/spec/${x.class}/${x.spec}.png" alt="${x.spec}" width="20px"/></div>` :
                `<div class="class-icon">${x.spec}</div>` ;
                return {
                    ...x,
                    Class: img,
                    Boss: bossImg,
                    Role: roleImg,
                    Spec: specImg
                };
            })}
            StyleRow={undefined}
            CustomRow={["Boss", "Class", "Role", "Spec"]}></Table>
        <Table 
            Style={style + "margin-left:5px;margin-right:5px;"}
            Title="Most Rare Achivement" 
            RowNames={["Name", "Boss", "Rarity"]}
            ColumnInfo={achivements.filter(x => x.probability != 0).map(x => {
                const bossImg = `<div class="class-icon"><img src="https://assets.rpglogs.com/img/warcraft/bosses/${x.boss}-icon.jpg" alt="${x.boss}" width="20px"/></div>`;
                return {
                    ...x,
                    Name: x.name,
                    Boss: bossImg,
                    Rarity: x.percentage
                };
            })}
            StyleRow={achivementCustom}
            CustomRow={["Boss"]}></Table> 
        <Table 
            Style={style + "margin-left:5px;margin-right:auto;"}
            Title="Most Recent Achivement" 
            RowNames={["Name", "Boss", "Achived", "Log"]}
            ColumnInfo={recent.map(x => {
                const bossImg = `<div class="class-icon"><img src="https://assets.rpglogs.com/img/warcraft/bosses/${x.boss}-icon.jpg" alt="${x.boss}" width="20px"/></div>`;
                return {
                    ...x,
                    Name: x.name,
                    Boss: bossImg,
                    Achived: x.achived,
                    Log: x.report
                };
            })}
            StyleRow={new Map<string,string>([['name', 'flex: 2;'],['boss', 'flex: 2;'],['achived', 'flex: 2;'],['report', 'flex: 1;']])}
            CustomRow={["report"]}></Table>
    </div>
    {:else}
        <p>..loading</p>
    {/if}
</div>