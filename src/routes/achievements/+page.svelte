<script lang="ts">
	import Header from '$lib/header/header.svelte';
	import SubHeaderButtons from '$lib/header/subHeaderButtons.svelte';
	import { PageContent } from '$lib/misc/pageContent';
    import AchievementDesc from '$lib/achivements/achievementDesc.svelte';

</script>

<div>
    <title>Achivements - Misguided Logs</title>
    <meta name="See all Achievements available" />
    <Header searchCallback={() => {}}></Header>
    <div class="subheader"><SubHeaderButtons page={PageContent.Achievements}></SubHeaderButtons></div>
    <div class="page-content">
        <div class="column">
            <div class="row">
                <AchievementDesc 
                    achievementName="For The Light" 
                    criteria="Only have Paladins in the raid" 
                    pictureName="ForTheLight"
                    bossAvailable="All"
                    description="Kill a boss using only Paladins"></AchievementDesc>
                <AchievementDesc 
                    achievementName="Brute Force" 
                    criteria="Only have Warriors in the raid" 
                    pictureName="BruteForce"
                    bossAvailable="All"
                    description="Kill a boss using only Warriors"></AchievementDesc>
                <AchievementDesc 
                    achievementName="The Big Hunt" 
                    criteria="Only have Hunters in the raid" 
                    pictureName="TheBigHunt"
                    bossAvailable="All"
                    description="Kill a boss using only Hunters"></AchievementDesc>
            </div>
            <div class="row">
                <AchievementDesc 
                    achievementName="Storm Earth Fire" 
                    criteria="Only have Shamans in the raid" 
                    pictureName="StormEarthFire"
                    bossAvailable="All"
                    description="Kill a boss using only Shamans"></AchievementDesc>
                <AchievementDesc 
                    achievementName="Assassination" 
                    criteria="Only have Rogues in the raid" 
                    pictureName="Assassination"
                    bossAvailable="All"
                    description="Kill a boss using only Rogues"></AchievementDesc>
                <AchievementDesc 
                    achievementName="Earth mother is watching" 
                    criteria="Only have Druids in the raid" 
                    pictureName="EarthMotherIsWatching"
                    bossAvailable="All"
                    description="Kill a boss using only Druids"></AchievementDesc>
            </div>
            <div class="row">
                <AchievementDesc 
                    achievementName="Arcane Power" 
                    criteria="Only have Mages in the raid" 
                    pictureName="ArcanePower"
                    bossAvailable="All"
                    description="Kill a boss using only Mages"></AchievementDesc>
                <AchievementDesc 
                    achievementName="Light will guide us" 
                    criteria="Only have Priests in the raid" 
                    pictureName="LightWillGuideUs"
                    bossAvailable="All"
                    description="Kill a boss using only Priests"></AchievementDesc>
                <AchievementDesc 
                    achievementName="Embrace the Shadows" 
                    criteria="Only have Warlocks in the raid" 
                    pictureName="EmbraceTheShadows"
                    bossAvailable="All"
                    description="Kill a boss using only Warlocks"></AchievementDesc>
            </div>
            <div class="row">
                <AchievementDesc 
                    achievementName="No Taunt" 
                    criteria="Use Tanks with no taunt abilities" 
                    pictureName="HeyNoTaunt"
                    bossAvailable="All"
                    description="Use classes that can't taunt as tanks"></AchievementDesc>
            </div>
        </div>
    </div>
</div>

<style>
    .column {
        display: flex;
        flex-direction: column;
    }
    .row {
        margin-top: 30px;
        display: flex;
        flex-direction: row;
    }
    @media(max-width:900px) {
        .row {
            margin-top:0px;
            flex-direction: column;
        }
    }
    
    @media(max-width: 600px) {
        .subheader {
            display: none;
        }
    }
</style>