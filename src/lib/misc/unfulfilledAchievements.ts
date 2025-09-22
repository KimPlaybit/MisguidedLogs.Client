import { AchievementName, type Achievement } from "$lib/achivement";
import { Class } from "$lib/probability";

interface AchievementCombination {
    bossId: number;
    achievementName: AchievementName;
}
export const getUnFulfilledAchievements = (bosses: number[], fulfilled: AchievementCombination[], classSpecific: Class | undefined = undefined): Achievement[] => {
    const availableAchievements = Object.values(AchievementName);
    const unfulfilled: AchievementCombination[] = [];
    bosses.forEach(element => {
        unfulfilled.push(...availableAchievements.map(a => ({ bossId: element, achievementName: a })));
    });
    const classSpecificAchievements = classSpecific ? getClasstoAchievementMap().filter(ca => ca.Classes.includes(classSpecific)).map(ca => ca.AchievementName) : [];
    const filteredUnfulfilled = unfulfilled.filter(ua => 
        !fulfilled.some(fa => fa.bossId === ua.bossId && fa.achievementName === ua.achievementName)
        && (classSpecificAchievements.length === 0 || classSpecificAchievements.includes(ua.achievementName)));
    
    return filteredUnfulfilled.map(ua => ({ boss: ua.bossId, name: ua.achievementName, probability: 0 }));
}

const getClasstoAchievementMap = (): AchievementForClass[] => {
    return [
        { AchievementName: AchievementName.ForTheLight, Classes: [Class.Paladin] },
        { AchievementName: AchievementName.BruteForce, Classes: [Class.Warrior] },
        { AchievementName: AchievementName.TheBigHunt, Classes: [Class.Hunter] },
        { AchievementName: AchievementName.StormEarthFire, Classes: [Class.Shaman] },
        { AchievementName: AchievementName.EarthMotherIsWatching, Classes: [Class.Druid] },
        { AchievementName: AchievementName.Assassination, Classes: [Class.Rogue] },
        { AchievementName: AchievementName.ArcanePower, Classes: [Class.Mage] },
        { AchievementName: AchievementName.LightWillGuideUs, Classes: [Class.Priest] },
        { AchievementName: AchievementName.EmbraceTheShadows, Classes: [Class.Warlock] },
        { AchievementName: AchievementName.HeyNoTaunt, Classes: [Class.Paladin, Class.Hunter, Class.Shaman, Class.Rogue, Class.Priest, Class.Mage, Class.Warlock] }
    ]
}

interface AchievementForClass {
    AchievementName : AchievementName;
    Classes: Class[];
}

/*export enum AchievementName {
    ForTheLight = "ForTheLight",
    BruteForce = "BruteForce",
    TheBigHunt = "TheBigHunt",
    StormEarthFire = "StormEarthFire",
    EarthMotherIsWatching = "EarthMotherIsWatching",
    Assassination = "Assassination",
    ArcanePower = "ArcanePower",
    LightWillGuideUs = "LightWillGuideUs",
    EmbraceTheShadows = "EmbraceTheShadows",
    HeyNoTaunt = "HeyNoTaunt",
    TheAntiMeta = "TheAntiMeta"
}*/