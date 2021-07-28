import React, { useState } from "react";

export const GiftContext = React.createContext();

export const GiftProvider = (props) => {
    const [gift, setGift] = useState([]);

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

    const getNumOfDonorsAndNumOfGift = (pledgeDriveEndDate, pledgeDriveId) => {
        return fetch(`/api/gift/getnumofdonorsbynumofgifts/${pledgeDriveEndDate}/${pledgeDriveId}`, {
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

    const getListOfOneTimeGiftsBySameDonor = (pledgeDriveEndDate) => {
        return fetch(`/api/gift/getlistofonetimegiftsbysamedonor/${pledgeDriveEndDate}`, {
            method: 'GET',
        })
            .then((res) => res.json())
    };

    const getFirstTimeDonorIds = (pledgeDriveEndDate) => {
        return fetch(`/api/gift/getfirsttimedonorids/${pledgeDriveEndDate}`, {
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
                getNewRecurringGiftsFromPreviousDonors,
                getListOfOneTimeGiftsBySameDonor,
                getFirstTimeDonorIds
            }}>
            {props.children}
        </GiftContext.Provider>
    );
};