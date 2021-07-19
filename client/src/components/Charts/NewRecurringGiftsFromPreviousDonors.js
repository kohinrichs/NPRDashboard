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
                <h4 className='title'></h4>
                <div className='sustainingMembership'>
                    {
                        numOfGifts.map(g => {
                            counter++
                            return <i key={g.id} className="far fa-smile"></i>
                        })
                    }
                </div>
                <div>
                    +{counter} New Sustaining Memberships From Previous Donors
                </div>
            </div>
        </>
    ) : null
}