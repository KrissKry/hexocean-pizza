import { PropsWithChildren } from "react";
import { FieldErrors, FieldValues, FormProvider, UseFormReturn } from "react-hook-form";

interface FormProps<T> {
    onSuccess: (data: unknown) => void;

    onError?: (errors: FieldErrors<FieldValues>) => void;

    className?: string;

    methods: UseFormReturn;
}

const Form = <T extends FieldValues>(props: PropsWithChildren & FormProps<T>) => {
    // const methods = useForm<T>();

    return (
        <FormProvider {...props.methods}>
            <form
                onSubmit={props.methods.handleSubmit(props.onSuccess, props.onError)}
                className={props.className}
            >
                {props.children}
            </form>
        </FormProvider>
    );
};

export default Form;
