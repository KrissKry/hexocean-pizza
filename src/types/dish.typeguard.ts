import { IDish, TimeFractions } from "./dishes";

export const instanceOfIDish = (data: unknown): data is IDish => {
    return (
        "name" in (data as IDish) &&
        "type" in (data as IDish) &&
        ((data as IDish).type === "pizza" ||
            (data as IDish).type === "soup" ||
            (data as IDish).type === "sandwich")
    );
};

export const instanceOfTimeFractions = (data: unknown): data is TimeFractions => {
    return (
        "prep_h" in (data as TimeFractions) &&
        "prep_m" in (data as TimeFractions) &&
        "prep_s" in (data as TimeFractions)
    );
};
