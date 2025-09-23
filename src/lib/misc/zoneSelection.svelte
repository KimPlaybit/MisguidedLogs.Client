<script lang="ts">
	import Selection from "$lib/misc/selection";
    
    let bind = $state(Selection.GetZoneSelection());
    const values = {
        "Naxxramas": 1036,
        "Temple of Ahn'Qiraj": 1035,
        "Blackwing Lair": 1034,
        "Ruins Of Ahn'Qiraj": 1031,
        "Zul'Gurub": 1030,
        "Onyxia": 1029,
        "Molten Core": 1028
    }
    function setZoneId() {
        Selection.SetZoneSelection(bind);
    }
</script>

<div class="zone-selection">
    <span class="selection-label">Zone:</span>
    <select bind:value={bind} onchange={setZoneId}>
        {#each Object.keys(values) as zone}
            <option  value={values[zone as keyof typeof values]}>{zone}</option>
        {/each}
    </select>
</div>

<style>
    .zone-selection {
        margin-top: auto;
        margin-bottom: auto;
        display: flex;
        align-items: center;
        flex: 1;
        margin-left: auto;
        margin-right: 0px;
    }
    select {
        background-color: #2c2c2c;
        color: white;
        box-shadow: 0px;
        padding: 10px;
        font-size: 14px;
        margin-top: auto;
        margin-right: 0px;
        align-content: left;
        text-align: left;
        width: 250px;
    }
    .selection-label {
        margin-right: 10px;
        font-size: 17px;
        font-weight: bold;
        margin-left: auto;
    }
    @media (max-width: 1100px) {
        .zone-selection {
            margin: auto;
            margin-top: 20px;
            margin-bottom: 10px;
            width: 90%;
            text-align: center;
        }
        select {
            width: 90%;
        }
    }
</style>