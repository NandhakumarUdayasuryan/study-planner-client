import { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { AlertContext } from "./AlertContext";

export function AlertProvider({ children }) {
    const [alertMessage, setAlertMessage] = useState({message: "", type: "info"});
    // Initialize alertMessage with an object to allow for future extensibility (e.g., type of alert)
    // If you want to handle different types of alerts (success, error, info), you can extend the state structure
    // to include a type property or similar.

    const value = useMemo(
        () => ({ alertMessage, setAlertMessage }),
        [alertMessage, setAlertMessage]
    );


    const onClose = () => {
        // Logic to close the alert
        setAlertMessage({message:''}); // Hide the alert by clearing the message
    };

    useEffect(() => {
        if (alertMessage.message) {
            const timer = setTimeout(() => {
                setAlertMessage({message:''}); 
                // Hide the alert by clearing the message
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [alertMessage]);
    // Extract alert class based on type
    let alertClass = "bg-amber-50 text-gray-800";
    if (alertMessage.type === "success") {
        alertClass = "bg-green-100 text-green-800";
    } else if (alertMessage.type === "error") {
        alertClass = "bg-red-100 text-red-800";
    } else if (alertMessage.type === "info") {
        alertClass = "bg-blue-100 text-blue-800";
    }

    return (
        <AlertContext.Provider value={value}>
            {alertMessage.message ?
                (<div className={`custom-alert fixed top-30 left-6/12 -translate-6/12 m-2 p-5 px-7  rounded shadow-lg transition-transform ${alertClass}`}>
                    <div className="alert-content">
                        <span>{alertMessage.message}</span>
                        <button onClick={onClose} className="close-button border-1 rounded-md px-2 py-1 ml-5 border-gray-500 cursor-pointer">Close</button>
                    </div>
                </div>) : <div className="hidden"></div>
            }
            {children}
        </AlertContext.Provider>)
}

AlertProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
