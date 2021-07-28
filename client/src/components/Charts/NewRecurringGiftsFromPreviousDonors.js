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
        let mounted = true;

        if (currentPledgeDrive) {
            getNewRecurringGiftsFromPreviousDonors(currentPledgeDriveStartDate, currentPledgeDriveEndDate).then((data) => {
                if (mounted) {
                    setNumOfGifts(data);
                }
            });
        }
        return () => {
            mounted = false;
        }
    }, []);

    let counter = 0;

    return numOfGifts ? (
        <>
            {numOfGifts.length > 0 ?
                <div>
                    <div className='sustainingMembership'>
                        {
                            numOfGifts.map(g => {
                                counter++
                                return <i key={g.id} className="far fa-smile"></i>
                            })
                        }
                    </div>
                    <div>
                        {
                            counter === 1 ? <p><strong>+{counter} new sustaining membership</strong> from previous donors</p> : <p><strong>+{counter} new sustaining memberships</strong> from previous donors</p>
                        }
                    </div>
                </div> : <div className='sustainingMembership'><i className="far fa-frown"></i> No new sustaining memberships from previous donors.</div>
            }
        </>
    ) : null
}