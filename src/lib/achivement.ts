export interface AchievementValues {
    achivements: Achievement[];
}

export interface Achievement {
    name: AchievementName; // Assuming Achievements is an enum or another interface
    boss: number;
    probability: number; // Use number for float in TypeScript
}

export interface TableAchievement {
    name: AchievementName; // Assuming Achievements is an enum or another interface
    boss: number;
    probability: number; // Use number for float in TypeScript
    percentage: string;
}

export interface RecentAchievement {
    name: AchievementName; // Assuming Achievements is an enum or another interface
    boss: number;
    achivedAt: Date | undefined; // Use number for float in TypeScript
    achived: string;
    reportCode: string | undefined;
    report: string| undefined;
}

export enum AchievementName {
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
}