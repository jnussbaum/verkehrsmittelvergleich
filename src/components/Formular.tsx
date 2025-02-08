import React, { useState } from "react";
import { InputField } from "./sub-components/InputField";
import { DatePicker } from "./sub-components/DatePicker";
import { MUIButton } from "./sub-components/MUIButton";
import { formValidationHandler } from "../utils/formValidationHandler";
import { eventBus } from "../utils/EventBus";
import { Messages } from "../models/messages";
import { getAllTravelData } from "../utils/googleMapsAPI";


export function Formular() {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [departureTime, setDepartureTime] = useState<Date | null>(new Date());
    const { validateForm } = formValidationHandler();

    const handleSubmit = () => {
        const isValid = validateForm(from, to, departureTime);

        if (!isValid) {
            return;
        }

        const requestData = { from, to, departureTime };
        console.log("Formulardaten erfolgreich veröffentlicht:", requestData);
        eventBus.publish(Messages.FORM_SUBMITTED, "Einen Moment bitte, wir gehen bei Google nachfragen...");
        getAllTravelData(from, to, departureTime);

    };

    return (
        <div className="MainContainer">
            <InputField label="Abfahrtsort" value={from} onChange={setFrom} fieldName="from" />
            <DatePicker label="Abfahrtszeit" value={departureTime} onChange={setDepartureTime} />
            <InputField label="Zielort" value={to} onChange={setTo} fieldName="to" />
            <MUIButton onClick={handleSubmit}>Los geht's!</MUIButton>
        </div>
    )
}
