export interface ProbabilityValues {
    zone: number;
    bosses: BossProbability[];
}

export interface BossProbability {
    [key: string]: any;
    bossId: number;
    tanks: ClassProbability[];
    dps: ClassProbability[];
    hps: ClassProbability[];
    hybrids: ClassProbability[];
    getProbabilityOfRole(role: Role): ClassProbability[];
}

export interface ClassProbability {
    class: Class;
    specs: SpecProbability[];
    probability: number;
    totalProbability: number;
}

export interface SpecProbability {
    spec: TalentSpec;
    probability: number;
    totalProbability: number;
}

export interface RankedProbability {
    bossId: number;
    class: Class;
    spec: TalentSpec;
    role: string;
    probabilityValue: number;
    probability: string;
}

export enum Role {
    Tank,
    Dps,
    Healer,
    Hybrid
}

export enum Class {
    Priest = "Priest",
    Warlock = "Warlock",
    Mage = "Mage",
    Rogue = "Rogue",
    Druid = "Druid",
    Shaman = "Shaman",
    Hunter = "Hunter",
    Warrior = "Warrior",
    Paladin = "Paladin",
    Monk = "Monk",
    DemonHunter = "DemonHunter",
    DeathKnight = "DeathKnight",
    Evoker = "Evoker"
}

export enum TalentSpec {
    Discipline = "Discipline",
    Holy = "Holy",
    Shadow = "Shadow",
    Affliction = "Affliction",
    Demonology = "Demonology",
    Destruction = "Destruction",
    Arcane = "Arcane",
    Fire = "Fire",
    Frost = "Frost",
    Assassination = "Assassination",
    Combat = "Combat",
    Subtlety = "Subtlety",
    Balance = "Balance",
    Feral = "Feral",
    Restoration = "Restoration",
    BeastMastery = "BeastMastery",
    Marksmanship = "Marksmanship",
    Survival = "Survival",
    Elemental = "Elemental",
    Enhancement = "Enhancement",
    Protection = "Protection",
    Retribution = "Retribution",
    Arms = "Arms",
    Fury = "Fury",
    Blood = "Blood",
    Unholy = "Unholy",
    Hybrid = "Hybrid"
}