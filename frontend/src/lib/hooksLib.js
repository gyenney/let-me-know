import { useState } from "react";

export function useFormFields(initialState) {
    // Take initial state of forms and save it in state variable 'fields'
    // object where keys are the ids of the form fields and values are what the user enters.
    const [fields, setValues] = useState(initialState);

    return [
        fields,
        function (event) {
            setValues({
                ...fields,
                [event.target.id]: event.target.value,
            });
        },
    ];
}