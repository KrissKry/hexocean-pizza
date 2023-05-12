import { useFormContext } from "react-hook-form";

import "./FormSelect.css";
import { FocusEvent, useState } from "react";
import { SelectOption } from "../../types/select";

interface IFormSelect {
    className?: string;

    displayName?: string;

    inputName: string;

    values: SelectOption[];
}

const FormSelect = ({ className = "", displayName, inputName, values }: IFormSelect) => {
    const { register } = useFormContext();

    const [selectClasses, setSelectClasses] = useState<string[]>([
        "text m w300 select",
        className,
        "default",
    ]);

    const addDefaultClass = () => setSelectClasses(["text m w300 select", className, "default"]);
    const removeDefaultClass = () => setSelectClasses(["text m w300 select", className]);

    const onFocus = () => removeDefaultClass();
    const onBlur = (e: FocusEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        if (value === "") addDefaultClass();
    };

    return (
        <select
            {...register(inputName)}
            name={inputName}
            className={selectClasses.filter((c) => c !== "").join(" ")}
            onBlur={onBlur}
            onFocus={onFocus}
            defaultValue=""
        >
            {/* default option display (option with no value, just visibility display) */}
            <option value="" disabled>
                {displayName || inputName}
            </option>

            {/* render all options for the select */}
            {values.map((item) => (
                <option key={item.key} value={item.key}>
                    {item.name}
                </option>
            ))}
        </select>
    );
};

export default FormSelect;
