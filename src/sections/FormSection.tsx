import { useForm } from "react-hook-form";

import Button from "../components/Button";
import Form from "../components/Form";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";

import { mealInputs, mealOptions } from "../models";
import { IDish, DishType, TimeFractions } from "../types/meals";
import { prepareMealData } from "../util";
import { instanceOfIDish, instanceOfTimeFractions } from "../types/meal.typeguard";

import "./FormSection.css";

const FormSection = (): JSX.Element => {
    const methods = useForm();
    const type: DishType = methods.watch("type");

    const onSubmit = (data: unknown): void => {
        if (instanceOfIDish(data) && instanceOfTimeFractions(data)) {
            const preparedMeal = prepareMealData(data);
            // send request
        }
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
