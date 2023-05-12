import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import "./FormInput.css";

export type RequiredRule = {
    value: boolean;

    message: string;
};

export type RegExpRule = {
    value: RegExp;

    message: string;
};

export interface FormInputProps {
    displayName?: string;

    inputName: string;

    /** @default undf */
    required?: RequiredRule;

    /** @default undf */
    pattern?: RegExpRule;
}

const FormInput = ({ displayName, inputName, pattern, required }: FormInputProps): JSX.Element => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <div className="forminput flex column">
            <label className="text s w400 label">{displayName || inputName}</label>

            <input {...register(inputName, { pattern, required })} className="input" />

            <ErrorMessage
                errors={errors}
                name={inputName}
                render={({ message }) => <p className="text s err error">{message}</p>}
            />
        </div>
    );
};

export default FormInput;
