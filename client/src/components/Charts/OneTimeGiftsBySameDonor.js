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
        let mounted = true;

        if (currentPledgeDrive) {
            getListOfOneTimeGiftsBySameDonor(currentPledgeDriveEndDate).then((data) => {
                if (mounted) {
                    setGifts(data);
                }
            });
        }
        return () => {
            mounted = false;
        }
    }, []);

    let counter = 0;
    let arrayOfDifferences = [];
    let giftAverage = 0;

    if (gifts) {
        let compareGifts = (gift1, gift2) => {
            if (gift2.giftDate >= currentPledgeDrive.startDate && gift2.giftDate <= currentPledgeDrive.endDate) {
                if (gift2.amount > gift1.amount) {
                    counter++
                    arrayOfDifferences.push(gift2.amount - gift1.amount)
                }
            }
        }

        for (let i = 0; i < gifts.length; i += 2) {
            compareGifts(gifts[i], gifts[i + 1])
        }
    }

    if (arrayOfDifferences) {
        if (arrayOfDifferences.length === 0) {
            giftAverage = 0;
        } else if (arrayOfDifferences.length === 1) {
            giftAverage = arrayOfDifferences[0]
        } else {
            let giftAverageNum = (arrayOfDifferences) => (arrayOfDifferences.reduce((a, b) => a + b) / arrayOfDifferences.length).toFixed(2)

            giftAverage = giftAverageNum(arrayOfDifferences);

        }
    }


    return gifts ? (
        <>
            <h4 className="charts--title2">Of Previous Donors</h4>
            <div>
                {
                    counter === 1 ? <div><strong>+{counter} donor</strong> has increased their one time gift over their previous gift!<br /><strong>+${giftAverage}</strong> average increase</div>
                        :
                        <div><strong>+{counter} donors</strong> have increased their one time gift over their previous gift!<br /><strong>+${giftAverage}</strong> average increase </div>
                }
            </div>
        </>
    ) : null
}