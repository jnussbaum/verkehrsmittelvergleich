import { Bar } from 'react-chartjs-2';
import { computeTimeString, computeDistanceString } from "../../utils/stringFormatters";
import { AllTravelDataUnformatted } from '../../models/apiModels';
import { computeDistanceAxis, computeDurationAxis } from '../../utils/computeDiagramAxis';


export enum LabelType {
    DURATION = "DURATION",
    DISTANCE = "DISTANCE",
}


interface LabeledDiagramDataProps {
    drive?: number
    transit?: number
    twoWheeler?: number
    bicycle?: number
    walk?: number
}


const labelMapper: Map<string, string> = new Map([
    ["drive", "🚗 Auto"],
    ["transit", "🚆 ÖV"],
    ["twoWheeler", "🏍 Motorrad"],
    ["bicycle", "🚴 Velo"],
    ["walk", "🚶‍♂️ Zu Fuss"],
]);


const computeLabeledData = (
    allTravelDataUnformatted: AllTravelDataUnformatted,
    label: LabelType,
): LabeledDiagramDataProps => {
    let result: LabeledDiagramDataProps = {};
    switch (label) {
        case LabelType.DURATION:
            result = {
                drive: allTravelDataUnformatted.driveRaw?.durationSeconds || 0,
                transit: allTravelDataUnformatted.transitRaw?.durationSeconds || 0,
                twoWheeler: allTravelDataUnformatted.twoWheelerRaw?.durationSeconds || 0,
                bicycle: allTravelDataUnformatted.bicycleRaw?.durationSeconds || 0,
                walk: allTravelDataUnformatted.walkRaw?.durationSeconds || 0,
            };
            break;
        case LabelType.DISTANCE:
            result = {
                drive: allTravelDataUnformatted.driveRaw?.distanceMeters || 0,
                transit: allTravelDataUnformatted.transitRaw?.distanceMeters || 0,
                twoWheeler: allTravelDataUnformatted.twoWheelerRaw?.distanceMeters || 0,
                bicycle: allTravelDataUnformatted.bicycleRaw?.distanceMeters || 0,
                walk: allTravelDataUnformatted.walkRaw?.distanceMeters || 0,
            };
            break;
        default:
            throw new Error("Invalid label type: Label must be either DURATION or DISTANCE");
    }
    // Filter out fields with value `0`
    const filteredResult = Object.fromEntries(
        Object.entries(result).filter(([_, value]) => value !== 0)
    );
    return filteredResult;
}


const computeChartOptions = (label: LabelType): any => {
    return {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    // Customize the label of the tooltip (Y-axis value)
                    label: (tooltipItem: any) => {
                        const value = tooltipItem.parsed.y;
                        return `${label === LabelType.DURATION ? computeTimeString(value) : computeDistanceString(value)}`;
                    },
                },
            }
        },
        scales: {
            y: {
                ticks: {
                    callback: label === LabelType.DURATION ? computeDurationAxis : computeDistanceAxis,
                    maxTicksLimit: 6,
                },
            },
        },
    };
};


interface DiagramDataProps {
    allTravelDataUnformatted: AllTravelDataUnformatted | null;
    label: LabelType;
}


export const Diagram: React.FC<DiagramDataProps> = ({ allTravelDataUnformatted, label }) => {
    if (!allTravelDataUnformatted || Object.values(allTravelDataUnformatted).every(value => value === undefined)) {
        return null;
    }
    const labelStr = label === LabelType.DURATION ? "Zeit" : "Distanz";
    const labeledData = computeLabeledData(allTravelDataUnformatted, label);
    const formattedDiagramData = {
        labels: Object.keys(labeledData).map((value) => labelMapper.get(value) || ""),
        datasets: [
            {
                label: labelStr,
                data: Object.values(labeledData),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
            },
        ],
    };
    const options = computeChartOptions(label);
    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>{labelStr}</h2>
            <Bar
                data={formattedDiagramData}
                options={options}
            />
        </div>
    );
};
