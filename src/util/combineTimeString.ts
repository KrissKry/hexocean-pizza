export const combineTimeString = (h: number, m: number, s: number): string => {
    // prettier-ignore
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};
