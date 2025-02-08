import { eventBus } from "./EventBus";
import { Messages } from "../models/messages";

export const formValidationHandler = () => {
    const validateForm = (
        from: string,
        to: string,
        departureTime: Date | null
    ): boolean => {
        if (!from && !to) {
            eventBus.publish(Messages.FORM_ERROR, { field: "from", message: "Abfahrtsort fehlt" });
            eventBus.publish(Messages.FORM_ERROR, { field: "to", message: "Zielort fehlt" });
            return false;
        }

        if (!from) {
            eventBus.publish(Messages.FORM_ERROR, { field: "from", message: "Abfahrtsort fehlt" });
            return false;
        }

        if (!to) {
            eventBus.publish(Messages.FORM_ERROR, { field: "to", message: "Zielort fehlt" });
            return false;
        }

        if (to.toLowerCase() === from.toLowerCase()) {
            eventBus.publish(Messages.FORM_ERROR, {
                field: "to",
                message: "Abfahrts- und Zielort dürfen nicht identisch sein!"
            });
            return false;
        }

        return true;
    };

    return { validateForm };
};
