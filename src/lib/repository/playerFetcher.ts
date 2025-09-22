import type { searchresult } from "$lib/searchresult";

const GetPlayerData = async (playerId: string) => {
    try {
        const response = await fetch(`https://api.misguidedlogs.com/search/id/${playerId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const player: searchresult = data;
        player!.combinations = player!.combinations.sort((a, b) => {
            const aPrefix = a.split(":")[0];
            const bPrefix = b.split(":")[0];
            return aPrefix.localeCompare(bPrefix);
        });
        return player;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return undefined;
    }
}

export { GetPlayerData as default };