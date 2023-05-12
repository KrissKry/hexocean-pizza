export type DishType = "pizza" | "soup" | "sandwich";

export interface IDish {
    name: string;

    preparation_time: string;

    type: DishType;

    no_of_slices?: number;

    diameter?: number;

    spiciness_scale?: number;

    slices_of_bread?: number;
}

interface IPizza extends IDish {
    type: "pizza";
}

interface ISoup extends IDish {
    type: "soup";
}

interface ISandwich extends IDish {
    type: "sandwich";
}

export type PizzaType = Required<Omit<IPizza, "spiciness_scale" | "slices_of_bread">>;
export type SoupType = Required<Omit<ISoup, "no_of_slices" | "diameter" | "slices_of_bread">>;
export type SandwichType = Required<
    Omit<ISandwich, "no_of_slices" | "diameter" | "spiciness_scale">
>;

export type TimeFractions = {
    prep_h: number;
    prep_m: number;
    prep_s: number;
};
