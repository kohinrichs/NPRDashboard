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

    // <i class="far fa-edit editButton"
    //     onClick={() => {
    //         history.push(`/order/edit/${order.id}/${currentHoliday.id}`)
    //     }}></i>

    return numOfGifts && numOfGifts.length > 0 ? (
        <>
            <div className='header'>
                <h1 className='title'>Pie Chart</h1>
                <div className='links'>
                    {
                        numOfGifts.map(g => {
                            counter++
                            return <i key={g.id} class="far fa-smile"></i>
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