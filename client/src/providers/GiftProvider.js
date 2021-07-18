import React, { useState } from "react";
import { useHistory } from 'react-router';

export const GiftContext = React.createContext();

export const GiftProvider = (props) => {
    const [gift, setGift] = useState([]);

    const history = useHistory();

    const getAllGiftsByPledgeDriveId = (pledgeDriveId) => {
        return fetch(`/api/gift/getgiftsbypledgedriveid/${pledgeDriveId}`, {
            method: 'GET',
        })
            .then((res) => res.json())
    };

    const getNumOfGiftsByFrequency = (pledgeDriveId) => {
        return fetch(`/api/gift/getnumofgiftsbyfrequency/${pledgeDriveId}`, {
            method: 'GET',
        })
            .then((res) => res.json())
    };

    const getNumOfDonorsAndNumOfGift = (pledgeDriveEndDate) => {
        return fetch(`/api/gift/getnumofdonorsbynumofgifts/${pledgeDriveEndDate}`, {
            method: 'GET',
        })
            .then((res) => res.json())
    };

    const getNewRecurringGiftsFromPreviousDonors = (pledgeDriveStartDate, pledgeDriveEndDate) => {
        return fetch(`/api/gift/getnewrecurringgiftsfrompreviousdonors/${pledgeDriveStartDate}/${pledgeDriveEndDate}`, {
            method: 'GET',
        })
            .then((res) => res.json())
    };

    return (
        <GiftContext.Provider
            value={{
                gift,
                getAllGiftsByPledgeDriveId,
                getNumOfGiftsByFrequency,
                getNumOfDonorsAndNumOfGift,
                getNewRecurringGiftsFromPreviousDonors
            }}>
            {props.children}
        </GiftContext.Provider>
    );
};