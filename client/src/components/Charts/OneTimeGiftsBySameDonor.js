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
            if (arrayOfDifferences.length === 0) {
                giftAverage = 0;
                return giftAverage
            } else if (arrayOfDifferences.length === 1) {
                giftAverage = arrayOfDifferences[0]
                return giftAverage
            } else {
                giftAverage = (arrayOfDifferences) => arrayOfDifferences.reduce((a, b) => a + b) / arrayOfDifferences.length;
                return giftAverage;
            }
        }

        for (let i = 0; i < gifts.length; i += 2) {
            compareObjects(gifts[i], gifts[i + 1])
        }
    }

    return gifts ? (
        <>
            <h4 className="charts--title2">Of Previous Donors</h4>
            <div>
                {
                    // // make this an if else
                    counter === 1 ? <div><strong>+{counter} donor</strong> has increased their one time gift over their previous gift!<br /><strong>+${giftAverage}</strong> average increase</div>
                        :
                        <div><strong>+{counter} donors</strong> have increased their one time gift over their previous gift!<br /><strong>+${giftAverage}</strong> average increase: </div>
                }
            </div>
        </>
    ) : null
}