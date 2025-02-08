import React from "react";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { de } from "date-fns/locale";

interface Props {
    label: string;
    value: Date | null;
    onChange: (value: Date | null) => void;
}

export function DatePicker({ label, value, onChange }: Props) {
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
                <DateTimePicker
                    label={label}
                    value={value}
                    onChange={onChange}
                />
            </LocalizationProvider>

        </>
    );
}

