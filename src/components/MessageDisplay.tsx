import { useEffect } from 'react';
import { eventBus } from '../utils/EventBus';
import { Messages } from '../models/messages';
import { toast, ToastContainer } from "react-toastify";

export const MessageDisplay = () => {

    useEffect(() => {
        const handleFormError = (errorMessage: { field: string, message: string }) => {
            toast.error(errorMessage.message);
        };

        const handleFormSuccess = (successMessage: string) => {
            toast.success(successMessage);
        }

        eventBus.subscribe(Messages.FORM_ERROR, handleFormError);
        eventBus.subscribe(Messages.FORM_SUBMITTED, handleFormSuccess);

        return () => {
            eventBus.unsubscribe(Messages.FORM_ERROR, handleFormError);
            eventBus.unsubscribe(Messages.FORM_SUBMITTED, handleFormSuccess);
        };
    }, []);

    return (
        <div>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />
        </div>
    );
};
