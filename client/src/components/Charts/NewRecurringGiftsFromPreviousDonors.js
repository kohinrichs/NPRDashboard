import React, { useState, useContext, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { GiftContext } from '../../providers/GiftProvider';

export const NewRecurringGiftsFromPreviousDonor = ({ currentPledgeDrive }) => {

    const { getNewRecurringGiftsFromPreviousDonors } = useContext(GiftContext);

    const [numOfGifts, setNumOfGifts] = useState();

    const dateFormatter = (date) => {
        const allDate = date.split('T')
        return allDate[0];
    };

    const currentPledgeDriveStartDate = dateFormatter(currentPledgeDrive.startDate);
    const currentPledgeDriveEndDate = dateFormatter(currentPledgeDrive.endDate);

    useEffect(() => {
        getNewRecurringGiftsFromPreviousDonors(currentPledgeDriveStartDate, currentPledgeDriveEndDate)
            .then(setNumOfGifts)
    }, []);

    console.log(numOfGifts)

    let printImages = () => {
        for (let i = 0; i < numOfGifts.length; i++) {
            <div>[i]</div>
        }
    }

    // let labelsForChart = [];
    // let dataForChart = [];

    // if (numOfGifts) {
    //     const keys = Object.keys(numOfGifts);
    //     for (let i = 0; i < keys.length; i++) {
    //         const key = keys[i];
    //         labelsForChart.push(key);
    //         dataForChart.push(numOfGifts[key]);
    //     }
    // }

    // getting an array of objects from the db. Need to iterate through the array an print something for each object

    return numOfGifts ? (
        <>
            <div className='header'>
                <h1 className='title'>Pie Chart</h1>
                <div className='links'>
                    {
                        numOfGifts.map(g => {
                            return <div>"a"</div>
                        })
                    }
                </div>
            </div>
        </>
    ) : null
}