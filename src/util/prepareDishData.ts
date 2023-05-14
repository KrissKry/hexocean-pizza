import { IDish, TimeFractions } from "../types/dishes";
import { combineTimeString } from "./combineTimeString";

/** This whole function makes me sad :c. Lack of time to write in a better way */
export const prepareDishData = (e: IDish & TimeFractions): IDish => {
    /* get time string */
    const preparation_time = combineTimeString(e.prep_h, e.prep_m, e.prep_s);

    /* clean the object from keys with undefined values (disabled inputs) */
    const cleanData = Object.fromEntries(Object.entries(e).filter(([_, v]) => v !== undefined));

    /* delete time fractions */
    delete cleanData.prep_h;
    delete cleanData.prep_m;
    delete cleanData.prep_s;

    /* add preparation time to the object */
    cleanData.preparation_time = preparation_time;

    return cleanData as IDish;
};
