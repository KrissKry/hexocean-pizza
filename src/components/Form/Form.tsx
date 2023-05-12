import { PropsWithChildren } from "react";
import { FieldErrors, FieldValues, FormProvider, useForm } from "react-hook-form";

interface FormProps<T> {
    onSuccess: (data: T) => void;

    onError?: (errors: FieldErrors<FieldValues>) => void;

    className?: string;
}

const Form = <T extends FieldValues>(props: PropsWithChildren & FormProps<T>) => {
    const methods = useForm<T>();

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(props.onSuccess, props.onError)}
                className={props.className}
            >
                {props.children}
            </form>
        </FormProvider>
    );
};

export default Form;
