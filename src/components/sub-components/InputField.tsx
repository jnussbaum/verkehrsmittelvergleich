import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { eventBus } from "../../utils/EventBus";
import { Messages } from "../../models/messages";

interface Props {
    label: string;
    value: string;
    onChange: (value: string) => void;
    fieldName: string;
}

export function InputField({ label, value, onChange, fieldName }: Props) {

    const [isError, setIsError] = useState(false);
    const [helperText, setHelperText] = useState("");

    useEffect(() => {
        const handleFormError = (errorMessage: { field: string, message: string }) => {
            if (errorMessage.field === fieldName) {
                setIsError(true);
                setHelperText(errorMessage.message);
            }
        };

        eventBus.subscribe(Messages.FORM_ERROR, handleFormError);
        return () => {
            eventBus.unsubscribe(Messages.FORM_ERROR, handleFormError);
        }
    });

    const handleChange = (value: string) => {
        if (value.trim() !== "") {
            setIsError(false);
            setHelperText("");
        }
        onChange(value);
    };

    return (
        <>
            <TextField
                type="text"
                id="outlined-basic"
                label={label}
                value={value}
                onChange={(e) => handleChange(e.target.value)}
                error={isError}
                helperText={helperText}
            >
            </TextField>
        </>
    );
}
