<script lang="ts">
import type { searchresult } from "$lib/searchresult";
import type { Combination } from '$lib/combinations';
import type { BossProbability, ClassProbability, ProbabilityValues, TalentSpec } from '$lib/probability';

interface Props {
    Probabilities: ProbabilityValues
    Player: searchresult
}

let {
    Probabilities,
    Player
}: Props = $props();

let playerCombinations: Combination[] = $state([]);
type Role = "Tank" | "Dps" | "Healer" | "Hybrid";

Probabilities?.bosses.forEach((boss: BossProbability) => {
    const combination = Player.combinations.find(p => parseInt(p.split(":")[0])=== boss.bossId);
    if (!combination) {
           playerCombinations.push({
            bossId: boss.bossId,
            classProbability: 0,
            classTotalProbability: 0,
            specProbability: 0,
            totalProbability: 0,
            role: "N/A" as Role | "N/A",
            spec: "N/A" as TalentSpec | "N/A"
        });
    }
    else {
        const [bossId, role, spec] = combination!.split(":") as [number, Role, TalentSpec];
        console.log(Probabilities);
        const roleList: ClassProbability[] = role === "Tank" ? boss?.tanks : role === "Dps" ? boss?.dps : role === "Healer" ? boss?.hps : boss?.hybrid ?? [];
        const classProbability = roleList.find(c => c.class.toLowerCase() === Player!.class.toLowerCase());
        const specProbability = classProbability?.specs.find(s => s.spec.toLowerCase() === spec.toLowerCase());
        playerCombinations.push({ 
            bossId: bossId, 
            classProbability: classProbability?.probability || 0, 
            classTotalProbability: classProbability?.totalProbability || 0,
            specProbability: specProbability?.probability || 0, 
            totalProbability: specProbability?.totalProbability || 0 ,
            role: role,
            spec: spec
        });
    }
});   


</script>

<div class="grid-container">
    {#each playerCombinations as combination}
        <div class="grid-item ">
            <img src={`https://misguidedlogs.com/_app/immutable/assets/boss/${combination.bossId}.jpg`} alt="Boss" width="100px" class={combination.role === "N/A" ? "grey": ""}/>
            <div style="margin-left: 10px;">
                <div>{Player.class} {combination.role} as {combination.spec} spec</div>
                <div>Chance of {Player.class} as {combination.role}: {(combination.classProbability * 100).toFixed(3)}% of all {combination.role}</div>
                <div>Chance of {Player.class} as {combination.role} : {(combination.classTotalProbability * 100).toFixed(3)}% of all Players</div>
                <div>Chance of {combination.spec} as {combination.role} : {(combination.specProbability * 100).toFixed(3)}% of all {combination.role}</div>
                <div>Chance of {combination.spec} as {combination.role} : {(combination.totalProbability * 100).toFixed(3)}% of all Players</div>
            </div>
        </div>
    {/each}
</div>

<style>
    .grid-container {
        max-width:1200px;
        margin:auto;
        margin-top: 25px;
        display: grid;
        grid-template-columns: repeat(2, 1fr); /* Creates two equal columns */
        gap: 20px; /* Space between grid items */
    }

    .grid-item {
        display: flex; /* Use flexbox for alignment within each grid item */
        align-items: center; /* Vertically centers items */
    }
    .grey {
        filter: grayscale(100%);
    }
    @media(max-width:900px) {
        .grid-container {
            display: flex;
            flex-direction: column;
            margin-left: 10px;
        }
        img {
            width: 50px;
        }
    }
</style>