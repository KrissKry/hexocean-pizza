import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import Button from "../components/Button";
import Form from "../components/Form";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";

import { mealInputs, mealOptions, timeContraints } from "../models";
import { IDish, DishType, TimeFractions, IAPIDish } from "../types/meals";
import { prepareMealData } from "../util";
import { instanceOfIDish, instanceOfTimeFractions } from "../types/meal.typeguard";

import "./FormSection.css";

const FormSection = (): JSX.Element => {
    const methods = useForm();
    const type: DishType = methods.watch("type");
    const mutation = useMutation({
        mutationFn: (meal: IDish) => {
            return axios.post(
                "https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/",
                meal,
            );
        },
        onSuccess(data) {
            setRecvData(data.data);
        },
    });
    const [recvData, setRecvData] = useState<IAPIDish>();
    const onSubmit = (data: unknown): void => {
        if (instanceOfIDish(data) && instanceOfTimeFractions(data)) {
            const preparedMeal = prepareMealData(data);
            // send request
            mutation.mutate({ ...preparedMeal });
        }
    };

    return (
        <div className="form-wrapper">
            {/* FORM DISPLAY */}
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

                {/* CONDITIONAL INPUT RENDERING */}
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

                {/* SUBMIT */}
                <div className="flex just-c">
                    <Button
                        type="submit"
                        text="submit"
                        uppercase
                        thin
                        primary
                        hover
                        className="margin-v1"
                        disabled={mutation.isLoading}
                    />
                </div>
            </Form>

            {/* STATUS DISPLAY  */}
            <div className="flex column al-c margin-v2">
                {/* loading POST */}
                {mutation.isLoading && (
                    <>
                        <p className="text i s">Czekanie na odpowiedź API...</p>

                        <div className="lds-dual-ring margin-v1"></div>
                    </>
                )}

                {/* error on POST */}
                {mutation.isError && (
                    <>
                        <p className="text m w500">Error!</p>

                        <p className="text s red margin-v1">
                            {(mutation.error as AxiosError).message}
                        </p>

                        <p className="text s red">
                            KOD: <b className="w600">{(mutation.error as AxiosError).code}</b>
                        </p>
                    </>
                )}

                {/* data display */}
                {mutation.isSuccess && (
                    <>
                        <p className="text m w500">Success!</p>

                        <div className="margin-v1">
                            {JSON.stringify(recvData, null, 4)
                                .split(",")
                                .map((i) => (
                                    <p className="text s w300" key={i}>
                                        {i}
                                    </p>
                                ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default FormSection;
