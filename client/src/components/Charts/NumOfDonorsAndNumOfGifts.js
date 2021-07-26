import React, { useState, useContext, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { GiftContext } from '../../providers/GiftProvider';

export const NumOfDonorsAndNumOfGifts = ({ currentPledgeDrive }) => {

    const { getNumOfDonorsAndNumOfGift } = useContext(GiftContext);

    const [numOfGifts, setNumOfGifts] = useState();

    const dateFormatter = (date) => {
        const allDate = date.split('T')
        return allDate[0];
    };

    const currentPledgeDriveEndDate = dateFormatter(currentPledgeDrive.endDate);

    useEffect(() => {
        getNumOfDonorsAndNumOfGift(currentPledgeDriveEndDate)
            .then(setNumOfGifts)
    }, []);


    let labelsForChart = [];
    let dataForChart = [];

    // https://stackoverflow.com/questions/37673454/javascript-iterate-key-value-from-json
    if (numOfGifts) {
        const keys = Object.keys(numOfGifts);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            labelsForChart.push(key);
            dataForChart.push(numOfGifts[key]);
        }
    }

    let updatedLabelsForChart = [];

    if (labelsForChart) {
        for (let i = 0; i < labelsForChart.length; i++) {
            if (labelsForChart[i] === 1) {
                updatedLabelsForChart.push(labelsForChart[i] + " Gift")
            } else {
                updatedLabelsForChart.push(labelsForChart[i] + " Gifts")
            }
        }
    }

    let data = {
        labels: updatedLabelsForChart,
        datasets: [
            {
                label: 'Number Of Gifts Given By Donors Over Time',
                data: dataForChart,
                backgroundColor: [
                    'rgba(218, 63, 14, 1)',
                    'rgba(65, 78, 92, 1)',
                    'rgba(34, 151, 169, 1)',
                    'rgba(135, 159, 183, 1)',
                    'rgba(50, 55, 60, 1)',
                    'rgba(26, 83, 156, 1)',
                    'rgba(249, 249, 249, 1)',
                ],
                borderColor: [
                    'rgba(218, 63, 14, 1)',
                    'rgba(65, 78, 92, 1)',
                    'rgba(34, 151, 169, 1)',
                    'rgba(135, 159, 183, 1)',
                    'rgba(50, 55, 60, 1)',
                    'rgba(26, 83, 156, 1)',
                    'rgba(249, 249, 249, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    return dataForChart.length > 0 ? (
        <>
            <div className='numOfDonAndNumOfGift'>
                <h6 className='title'>Number Of Gifts Given To Date By Number Of Donors</h6>
            </div>
            <Doughnut data={data} />
        </>
    ) : null
}