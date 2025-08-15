<script lang="ts">
import type { searchresult } from "$lib/searchresult";
import type { Combination } from '$lib/combinations';
import type { ClassProbability, ProbabilityValues, TalentSpec } from '$lib/probability';

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

Player.combinations.forEach((combination: string) => {
    const [bossId, role, spec] = combination.split(":") as [number, Role, TalentSpec];
    const boss = Probabilities?.bosses.find(p => p.bossId == bossId);
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
});   

</script>

<div class="grid-container">
    {#each playerCombinations as combination}
        <div class="grid-item ">
            <img src={`https://assets.rpglogs.com/img/warcraft/bosses/${combination.bossId}-icon.jpg`} alt="Boss" width="100px"/>
            <div style="margin-left: 10px;">
                <div>{Player.class} {combination.role} as {combination.spec} spec</div>
                <div>Chance of {Player.class} as {combination.role} : {(combination.classProbability * 100).toFixed(3)}%</div>
                <div>Chance of {Player.class} as {combination.role} : {(combination.classTotalProbability * 100).toFixed(3)}%</div>
                <div>Chance of {combination.spec} as {combination.role} : {(combination.specProbability * 100).toFixed(3)}%</div>
                <div>Chance of {combination.spec} as {combination.role} : {(combination.totalProbability * 100).toFixed(3)}%</div>
            </div>
        </div>
    {/each}
</div>

<style>
    .grid-container {
        max-width:1200px;
        margin:auto;
        margin-top: 50px;
        display: grid;
        grid-template-columns: repeat(2, 1fr); /* Creates two equal columns */
        gap: 20px; /* Space between grid items */
    }

    .grid-item {
        display: flex; /* Use flexbox for alignment within each grid item */
        align-items: center; /* Vertically centers items */
    }
</style>