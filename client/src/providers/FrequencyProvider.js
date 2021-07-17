import React, { useState } from "react";

export const FrequencyContext = React.createContext();

export const FrequencyProvider = (props) => {
    const [frequency, setFrequency] = useState([]);

    const getAllFrequencies = () => {
        return fetch("/api/frequency")
            .then((res) => res.json())
            .then(setFrequency);
    };

    // const getPledgeDriveById = (pledgeDriveId) => {
    //     return fetch(`/api/pledgedrive/${pledgeDriveId}`, {
    //         method: 'GET',
    //     })
    //         .then((res) => res.json())
    // };

    return (
        <FrequencyContext.Provider
            value={{
                frequency,
                getAllFrequencies
            }}>
            {props.children}
        </FrequencyContext.Provider>
    );
};