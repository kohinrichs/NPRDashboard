import React, { useState } from "react";

export const PledgeDriveContext = React.createContext();

export const PledgeDriveProvider = (props) => {
    const [pledgeDrive, setPledgeDrive] = useState([]);

    const getAllPledgeDrives = () => {
        return fetch("/api/pledgeDrive")
            .then((res) => res.json())
            .then(setPledgeDrive);
    };

    const getPledgeDriveById = (pledgeDriveId) => {
        return fetch(`/api/pledgedrive/${pledgeDriveId}`, {
            method: 'GET',
        })
            .then((res) => res.json())
    };

    return (
        <PledgeDriveContext.Provider
            value={{
                pledgeDrive,
                getAllPledgeDrives,
                getPledgeDriveById
            }}>
            {props.children}
        </PledgeDriveContext.Provider>
    );
};