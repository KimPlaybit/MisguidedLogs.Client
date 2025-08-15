import type { Component } from "svelte";

export interface AchievementValues {
    achievements: Achievement[];
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
    achivedAt: Date; // Use number for float in TypeScript
    achived: string;
    reportCode: string;
    report: string;
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