import { AllTravelData } from "../../models/apiModels";


const meansToTitle: Record<string, string> = {
    drive: "🚗 Auto",
    transit: "🚆 Öffentliche Verkehrsmittel",
    twoWheeler: "🏍 Motorrad",
    bicycle: "🚴 Velo",
    walk: "🚶‍♂️ Zu Fuss",
}


interface ComparisonTableProps {
    allTravelData: AllTravelData | null;
}


export const ComparisonTable: React.FC<ComparisonTableProps> = ({ allTravelData }) => {
    if (!allTravelData) {
        return null;
    }
    else if (Object.values(allTravelData).every(value => value === undefined)) {
        return (
            <div className="NothingFound">
                🤷 Für diesen Abfahrtsort und Zielort wurde leider keine Route gefunden. <br/>
                Wie wär's mit was anderem?
            </div>
        );
    }
    const allMeans = Object.keys(allTravelData);
    const allValues = Object.values(allTravelData);
    return (
        <table>
            <thead>
                <tr>
                    <th className="TableHeader">Verkehrsmittel</th>
                    <th className="TableHeader">Distanz</th>
                    <th className="TableHeader">Zeit</th>
                </tr>
            </thead>
            <tbody>
                {allMeans.map((means, index) => {
                    if (allValues[index] === undefined) {
                        return null
                    } else {
                        return <tr key={means}>
                            <td className="TableCell">{meansToTitle[means]}</td>
                            <td className="TableCell">{allValues[index].formattedDistance}</td>
                            <td className="TableCell">{allValues[index].formattedTime}</td>
                        </tr>
                    }
                })}
            </tbody>
        </table>
    );
};
