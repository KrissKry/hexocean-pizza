import { useFormContext } from "react-hook-form";

import "./FormSelect.css";

type SelectOption = {
    key: string;

    name: string;
};

interface IFormSelect {
    // currentValue?: string;

    // defaultValue?: string;

    displayText?: string;

    name: string;

    values: SelectOption[];
}

const FormSelect = ({ displayText, name, values }: IFormSelect) => {
    const {
        register,
        // formState: { errors },
    } = useFormContext();
    console.log(name);

    return (
        <select {...register(name)} className="text m w300 select">
            {/* default option display (option with no value, just visibility display) */}
            <option value="" className="text sm w600">
                {displayText || name}
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
