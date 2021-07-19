import React, { useState, useContext, useEffect } from 'react';
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

    let counter = 0;

    return numOfGifts && numOfGifts.length > 0 ? (
        <>
            <div className='header'>
                <h1 className='title'>Pie Chart</h1>
                <div className='links'>
                    {
                        numOfGifts.map(g => {
                            counter++
                            return <div key={g.id}>a</div>
                        })
                    }
                </div>
                <div>
                    {counter} new sustaining memberships from previous donors
                </div>
            </div>
        </>
    ) : null
}