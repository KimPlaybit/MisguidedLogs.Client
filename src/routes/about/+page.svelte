<script lang="ts">
	import Header from '$lib/header/header.svelte';
	import SubHeaderButtons from '$lib/header/subHeaderButtons.svelte';
	import { PageContent } from '$lib/misc/pageContent';

</script>

<div>
    <title>About - Misguided Logs</title>
    <meta name="Find out why misguidedlogs exist and what the aim is" />
    <Header searchCallback={() => {}}></Header>
    <div class="subheader"><SubHeaderButtons page={PageContent.About}></SubHeaderButtons></div>
    <div class="page-content" style="margin-top: 20px;">
        <h3>The Problem</h3>
        <span>Currently, as I am writing this, there are <span style="font-weight:bold">862</span> Paladin tanks out of <span style="font-weight:bold">350 000</span>, thats <span style="font-weight:bold">0.002%</span> out of all tanks. 
        this can be due to paladins not having taunt, but its worth noting that some bosses cannot even be taunted. If we look at warlocks, then we'll see Destruction on the list, but both Demonology and affliction is not even on the list.
        And if any player tries to bring these into play, then the community often punishes these players cause they become a burden, despite the fact that the game has been successfully completed multiple times.
        </span> 
        <h3>Solution</h3>
        <span>Misguidedlogs is a site that rewards players for doing challenges in World of Warcraft Classic Anniversary raids. Meanwhile also highlight players who used a the most unique builds.
            Enforcing players to think outside the box and try new things to fulfill the Feat of Stengths. Making Wiping a part of the journey. However, some achievements might be impossible, but I dont its up to me to decide that.
            <p></p>
            The site is currently in early development and more features will be added over time. <br>
            The site is not affiliated with Blizzard Entertainment. <br>
            In order to know reward players with achievements and feats of strength the site uses Warcraftlogs. <br></span>
        <h3>Contact, Channels and Extras</h3>
        <span>Discord: <a href="https://discord.gg/2AZTc9jZRF">https://discord.gg/2AZTc9jZRF</a>
        Here you can find guilds or players who are interested in doing the achievements. <p></p>
        Emblem: <a href="https://www.craiyon.com">https://www.craiyon.com</a>
        The webpage emblem was made with the help of Craiyon, an AI image generator. <p></p>
        The site is open source and can be found on <a href="https://github.com/KimPlaybit/MisguidedLogs.Client">www.github.com</a>
        <p></p>
        For any questions, suggestions or feedback, please contact me at <a href="mailto:">mail</a></span>
    </div>
</div>

<style>
    .page-content {
        display: flex;
        flex-direction: column;
        align-items: left;
        text-align: left;
        justify-content: center;
        margin-top: 20px;
    } 
    @media(max-width: 600px) {
        .page-content {
            margin-left: 10px;
            margin-right: 10px;
        }
        .subheader {
            display: none;
        }
    }
    
</style>