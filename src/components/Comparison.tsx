import React, { useEffect, useState } from "react";
import { ComparisonTable } from "./sub-components/ComparisonTable";
import { Diagram, LabelType } from "./sub-components/Diagram";
import { AllTravelData, AllTravelDataUnformatted } from "../models/apiModels";
import { eventBus } from "../utils/EventBus";
import { Messages } from "../models/messages";

export function Comparison() {

    const [allTravelData, setAllTravelData] = useState<AllTravelData | null>(null);
    const [diagramData, setDiagramData] = useState<AllTravelDataUnformatted | null>(null);

    useEffect(() => {

        const handleTravelDataReceived = (data: any) => {
            setAllTravelData(data.formatted);
            setDiagramData(data.raw);
        };

        eventBus.subscribe(Messages.TRAVELDATA_RECEIVED, handleTravelDataReceived);

        return () => {
            eventBus.unsubscribe(Messages.TRAVELDATA_RECEIVED, handleTravelDataReceived);
        };
    }, []);

    return (
        <div className="MainContainer">
            <ComparisonTable allTravelData={allTravelData} />
            <Diagram allTravelDataUnformatted={diagramData} label={LabelType.DURATION} />
            <Diagram allTravelDataUnformatted={diagramData} label={LabelType.DISTANCE} />
        </div>
    )
}
