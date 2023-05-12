import "./App.css";
import "./common/index.common.css";

import { useForm } from "react-hook-form";

import Button from "./components/Button";
import Form from "./components/Form";
import FormInput from "./components/FormInput";
import FormSelect from "./components/FormSelect";
import { mealInputs, mealOptions } from "./models";
import { IDish, DishType, SoupType } from "./types/meals";

function App() {
    const onSubmit = (e: unknown) => {
        console.log(e as SoupType);
    };

    const methods = useForm();
    const type: DishType = methods.watch("type");

    return (
        <div className="form-wrapper">
            <Form<IDish> onSuccess={onSubmit} className="form" methods={methods}>
                <FormInput inputName="name" type="string" placeholder="nazwa dania" />

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
}

export default App;
