import {store} from "react-notifications-component";

export const addNotification = (message, type) => {
    let title = '';

    if (type === 'success') {
        title = 'Opération réussie.';
    }

    if (type === 'danger') {
        title = 'Opération échouée.';
    }

    store.addNotification({
        title: title,
        message: message,
        type: type,
        insert: "top",
        container: "bottom-center",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
            duration: 3000,
            onScreen: false
        }
    });
};

export const addSuccessNotification = (message) => {
    addNotification(message, 'success');
};

export const addErrorNotification = (message) => {
    addNotification(message, 'danger');
};