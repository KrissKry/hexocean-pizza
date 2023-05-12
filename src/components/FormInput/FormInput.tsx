import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import "./FormInput.css";

interface IRule {
    value: unknown;
    message: string;
}

interface INumRule extends IRule {
    value: number;
}

interface IRegexRule extends IRule {
    value: RegExp;
}

interface IBoolRule extends IRule {
    value: boolean;
}

export interface FormInputProps {
    disabled?: boolean;

    /**
     * Come on, it's literally in the name of the variable
     */
    placeholder?: string;

    /**
     * name of input used as reference in the form (for submit and watch purposes)
     */
    inputName: string;

    /** @default string */
    type?: "number" | "string" | "time";

    /**
     * Used with type=number, min,max value
     */
    min?: INumRule;
    max?: INumRule;

    /**
     * Used with type=string, min,max string length
     */
    minLength?: INumRule;
    maxLength?: INumRule;

    /**
     * used with type=time
     */
    step?: number;

    /** @default undf */
    required?: IBoolRule;

    /** @default undf */
    pattern?: IRegexRule;
}

const FormInput = ({
    disabled = false,
    inputName,
    max,
    maxLength,
    min,
    minLength,
    placeholder,
    pattern,
    required,
    step,
    type = "string",
}: FormInputProps): JSX.Element => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const inputAttr =
        type === "string"
            ? Object.assign(
                  {},
                  pattern && { pattern },
                  maxLength && { maxLength },
                  minLength && { minLength },
              )
            : Object.assign({}, min && { min }, max && { max });

    return (
        <div className="forminput flex column margin-v05">
            <input
                {...register(inputName, { ...inputAttr, required, disabled })}
                className="input"
                placeholder={placeholder || ""}
                step={step ?? undefined}
                type={type}
            />

            <ErrorMessage
                errors={errors}
                name={inputName}
                render={({ message }) => (
                    <p className="text s red margin-v05 margin-h05">{message}</p>
                )}
            />
        </div>
    );
};

export default FormInput;
