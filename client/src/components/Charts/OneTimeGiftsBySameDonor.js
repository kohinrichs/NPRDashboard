import React, { useState, useContext, useEffect } from 'react';
import { GiftContext } from '../../providers/GiftProvider';

export const OneTimeGiftsBySameDonor = ({ currentPledgeDrive }) => {

    const { getListOfOneTimeGiftsBySameDonor } = useContext(GiftContext);

    const [gifts, setGifts] = useState();

    const dateFormatter = (date) => {
        const allDate = date.split('T')
        return allDate[0];
    };

    const currentPledgeDriveEndDate = dateFormatter(currentPledgeDrive.endDate);

    useEffect(() => {
        getListOfOneTimeGiftsBySameDonor(currentPledgeDriveEndDate)
            .then(setGifts)
    }, []);

    let counter = 0;
    let arrayOfDifferences = [];
    let giftAverage = 0;

    if (gifts) {
        let compareObjects = (obj1, obj2) => {

            if (obj2.giftDate >= currentPledgeDrive.startDate && obj2.giftDate <= currentPledgeDrive.endDate) {
                if (obj2.amount > obj1.amount) {
                    counter++
                    arrayOfDifferences.push(obj2.amount - obj1.amount)
                }
            }
            giftAverage = (arrayOfDifferences) => arrayOfDifferences.reduce((a, b) => a + b) / arrayOfDifferences.length;
            return giftAverage;
        }

        for (let i = 0; i < gifts.length; i += 2) {
            compareObjects(gifts[i], gifts[i + 1])
        }
    }

    return gifts && gifts.length > 0 ? (
        <>
            <div className='header'>
                <h1 className='title'>Pie Chart</h1>
                <div className='links'>
                    {
                        counter = 1 ? <div>{counter} Donor has increased their one time gift over their previous gift! Average Increase: ${arrayOfDifferences[0]} </div>
                            : <div>{counter} Donors have increased their one time gift over their previous gift! Average Increase: ${giftAverage} </div>
                    }
                </div>
            </div>
        </>
    ) : null
}