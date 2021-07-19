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
            if (labelsForChart[i] == 1) {
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
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    return dataForChart.length > 0 ? (
        <>
            <div className='header'>
                <h6 className='title'>Number Of Gifts Given By Donors To Date</h6>
                <div className='links'>
                    <a
                        className='btn btn-gh'
                        href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Doughnut.js'
                    >
                    </a>
                </div>
            </div>
            <Doughnut data={data} />
        </>
    ) : null
}