export const teamNum = {
    label: "Team Number",
    path: "teamNum",
    invert: false,
    value: (_val) => _val
};

export const avePts = {
    label: "Average Points",
    path: "avgPts",
    invert: true,
    value: (_val) => _val
};

export const maxPts = {
    label: "Max Points",
    path: "maxPts",
    invert: true,
    value: (_val) => _val
};

export const avgNonHabPts = {
    label: "Average Non-Hab Points",
    path: "avgNonHabPts",
    invert: true,
    value: (_val) => _val
};

export const maxNonHabPts = {
    label: "Max Non-Hab Points",
    path: "maxNonHabPts",
    invert: true,
    value: (_val) => _val
};

export const avgRocketPts = {
    label: "Rocket Points",
    path: "avgRocketPts",
    invert: true,
    value: (_val) => _val
};

export const avgRocketCargoPts = {
    label: "Rocket Cargo Points",
    path: "avgRocketCargoPts",
    invert: true,
    value: (_val) => _val
};

export const avgRocketHatchPts = {
    label: "Rocket Hatch Points",
    path: "avgRocketHatchPts",
    invert: true,
    value: (_val) => _val
};

export const avgCargoShipPts = {
    label: "Cargo Ship Points",
    path: "avgCargoShipPts",
    invert: true,
    value: (_val) => _val
};

export const avgHabPts = {
    label: "Hab Points",
    path: "avgHabPts",
    invert: true,
    value: (_val) => _val
};

// Event specific types

// Cargo

export const avgCargoShipCargoPts = {
    label: "Cargo Ship Cargo Points",
    path: "taskAverageMap.C_CS.count",
    invert: true,
    value: (_val) => _val * 3
};

export const avgRocketLvl1CargoPts = {
    label: "Rocket Lvl1 Cargo Points",
    path: "taskAverageMap.C_R1.count",
    invert: true,
    value: (_val) => _val * 3
};

export const avgRocketLvl2CargoPts = {
    label: "Rocket Lvl2 Cargo Points",
    path: "taskAverageMap.C_R2.count",
    invert: true,
    value: (_val) => _val * 3
};

export const avgRocketLvl3CargoPts = {
    label: "Rocket Lvl3 Cargo Points",
    path: "taskAverageMap.C_R3.count",
    invert: true,
    value: (_val) => _val * 3
};

// Hatch

export const avgCargoShipHatchPts = {
    label: "Cargo Ship Hatch Points",
    path: "taskAverageMap.H_CS.count",
    invert: true,
    value: (_val) => _val * 2
};

export const avgRocketLvl1HatchPts = {
    label: "Rocket Lvl1 Hatch Points",
    path: "taskAverageMap.H_R1.count",
    invert: true,
    value: (_val) => _val * 2
};

export const avgRocketLvl2HatchPts = {
    label: "Rocket Lvl2 Hatch Points",
    path: "taskAverageMap.H_R2.count",
    invert: true,
    value: (_val) => _val * 2
};

export const avgRocketLvl3HatchPts = {
    label: "Rocket Lvl3 Hatch Points",
    path: "taskAverageMap.H_R3.count",
    invert: true,
    value: (_val) => _val * 2
};

