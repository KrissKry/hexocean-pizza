import { PropsWithChildren } from "react";
import { FieldErrors, FieldValues, FormProvider, UseFormReturn } from "react-hook-form";

interface FormProps<TFieldValues extends FieldValues> {
    // ts-2322 -> lack of time to debug
    onSuccess: (data: any) => void;

    onError?: (errors: FieldErrors<FieldValues>) => void;

    className?: string;

    methods: UseFormReturn;
}

const Form = <TFieldValues extends FieldValues>(
    props: PropsWithChildren & FormProps<TFieldValues>,
) => {
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
