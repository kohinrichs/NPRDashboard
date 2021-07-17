import React, { useState } from "react";
import { useHistory } from 'react-router';

export const GiftContext = React.createContext();

export const GiftProvider = (props) => {
    const [gift, setGift] = useState([]);

    const history = useHistory();

    const getAllGiftsByPledgeDriveId = (pledgeDriveId) => {
        return fetch(`/api/gift/getbypledgedriveid/${pledgeDriveId}`, {
            method: 'GET',
        })
            .then((res) => res.json())
    };

    return (
        <GiftContext.Provider
            value={{
                gift,
                getAllGiftsByPledgeDriveId
            }}>
            {props.children}
        </GiftContext.Provider>
    );
};