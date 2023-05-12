import { useForm } from "react-hook-form";

import Button from "../components/Button";
import Form from "../components/Form";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";

import { mealInputs, mealOptions } from "../models";
import { IDish, DishType } from "../types/meals";

import "./FormSection.css";

type TimeFractions = {
    prep_h: number;
    prep_m: number;
    prep_s: number;
};
const FormSection = (): JSX.Element => {
    const methods = useForm();
    const type: DishType = methods.watch("type");

    const combineTimeString = (h: number, m: number, s: number): string => {
        // prettier-ignore
        return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    /** This whole function makes me sad :c. Lack of time to write in a TS-way */
    const onSubmit = (e: IDish & TimeFractions) => {
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
    };

    const timeContraints = {
        min: {
            value: 0,
            message: "Ujemny czas!",
        },
        max: {
            value: 59,
            message: "Zbyt duży czas",
        },
    };
    return (
        <div className="form-wrapper">
            <Form<IDish & TimeFractions> onSuccess={onSubmit} className="form" methods={methods}>
                <FormInput inputName="name" type="string" placeholder="nazwa dania" />

                <p className="text time">Czas przygotowania hh:mm:ss</p>
                <div className="flex time-wrapper">
                    <FormInput
                        inputName="prep_h"
                        type="number"
                        placeholder="HH"
                        {...timeContraints}
                    />
                    <FormInput
                        inputName="prep_m"
                        type="number"
                        placeholder="MM"
                        {...timeContraints}
                    />
                    <FormInput
                        inputName="prep_s"
                        type="number"
                        placeholder="SS"
                        {...timeContraints}
                    />
                </div>

                <FormSelect inputName="type" displayName="Rodzaj dania" values={mealOptions} />

                <div style={{ display: type !== "pizza" ? "none" : "inherit" }}>
                    {mealInputs.pizzaInputs.map((i) => (
                        <FormInput key={i.inputName} {...i} disabled={type !== "pizza"} />
                    ))}
                </div>

                <div style={{ display: type !== "soup" ? "none" : "inherit" }}>
                    {mealInputs.soupInputs.map((i) => (
                        <FormInput key={i.inputName} {...i} disabled={type !== "soup"} />
                    ))}
                </div>

                <div style={{ display: type !== "sandwich" ? "none" : "inherit" }}>
                    {mealInputs.sandwichInputs.map((i) => (
                        <FormInput key={i.inputName} {...i} disabled={type !== "sandwich"} />
                    ))}
                </div>

                <Button
                    type="submit"
                    text="submit"
                    uppercase
                    thin
                    primary
                    hover
                    className="margin-v1"
                />
            </Form>
        </div>
    );
};

export default FormSection;
