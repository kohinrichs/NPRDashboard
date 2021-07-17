import React, { useState } from "react";

export const PledgeDriveContext = React.createContext();

export const PledgeDriveProvider = (props) => {
    const [pledgeDrive, setPledgeDrive] = useState([]);

    const getAllPledgeDrives = () => {
        return fetch("/api/pledgeDrives")
            .then((res) => res.json())
            .then(setPledgeDrive);
    };

    return (
        <PledgeDriveContext.Provider
            value={{
                pledgeDrive,
                getAllPledgeDrives
            }}>
            {props.children}
        </PledgeDriveContext.Provider>
    );
};