import { FormInputProps } from "../components/FormInput/FormInput";
import { SelectOption } from "../types/select";

export const dishOptions: SelectOption[] = [
    {
        key: "pizza",
        name: "pizza",
    },
    {
        key: "soup",
        name: "zupa",
    },
    {
        key: "sandwich",
        name: "kanapka",
    },
];

const pizzaInputs: FormInputProps[] = [
    {
        inputName: "no_of_slices",
        placeholder: "liczba kawałków",
        type: "number",
        pattern: {
            value: /[\d*]/,
            message: "Tylko liczby całkowite!",
        },
        min: {
            value: 1,
            message: "Zbyt mała liczba kawałków pizzy",
        },
        max: {
            value: 20,
            message: "Zbyt duża liczba kawałków pizzy",
        },
        required: {
            value: true,
            message: "Wybierz liczbę kawałków!",
        },
    },
    {
        inputName: "diameter",
        placeholder: "średnica",
        type: "number",
        min: {
            value: 1,
            message: "Nieprawidłowa średnica",
        },
        max: {
            value: 60,
            message: "Nieprawidłowa średnica",
        },
        pattern: {
            value: /([0-9]*[.])?[0-9]+$/,
            message: "Średnica nieodpowiedniego formatu",
        },
        required: {
            value: true,
            message: "Brak średnicy!",
        },
    },
];

const soupInputs: FormInputProps[] = [
    {
        inputName: "spiciness_scale",
        placeholder: "skala ostrości (1-10)",
        type: "number",
        min: {
            value: 1,
            message: "Ostrość poza skalą",
        },
        max: {
            value: 10,
            message: "Ostrość poza skalą",
        },
        required: {
            value: true,
            message: "Brak ostrości!",
        },
    },
];

const sandwichInputs: FormInputProps[] = [
    {
        inputName: "slices_of_bread",
        placeholder: "Kromki chleba (min. 1)",
        type: "number",
        min: {
            value: 1,
            message: "Zbyt mała liczba kromek",
        },
        max: {
            value: 10000,
            message: "Zbyt duża liczba kromek",
        },
        pattern: {
            value: /[\d*]/,
            message: "Tylko liczby całkowite!",
        },
        required: {
            value: true,
            message: "Brak liczby kromek",
        },
    },
];

export const dishInputs = {
    pizzaInputs,
    soupInputs,
    sandwichInputs,
};

export const timeContraints = {
    min: {
        value: 0,
        message: "Ujemny czas!",
    },
    max: {
        value: 59,
        message: "Zbyt duży czas",
    },
};
