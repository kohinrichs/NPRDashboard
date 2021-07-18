import React, { useState, useContext, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { GiftContext } from '../../providers/GiftProvider';

export const RecurringVsOneTime = ({ currentPledgeDrive }) => {

    const { getNumOfGiftsByFrequency } = useContext(GiftContext);

    const [giftsByFrequency, setGiftsByFrequency] = useState();

    const currentPledgeDriveId = currentPledgeDrive.id;

    useEffect(() => {
        getNumOfGiftsByFrequency(currentPledgeDriveId)
            .then(setGiftsByFrequency)
    }, []);

    let labelsForChart = [];
    let dataForChart = [];

    if (giftsByFrequency) {
        const keys = Object.keys(giftsByFrequency);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            labelsForChart.push(key);
            dataForChart.push(giftsByFrequency[key]);
        }
    }

    let data = {
        labels: labelsForChart,
        datasets: [
            {
                label: '# of Donors',
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

    return (
        <>
            <div className='header'>
                <h1 className='title'>Pie Chart</h1>
                <div className='links'>
                    <a
                        className='btn btn-gh'
                        href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Pie.js'
                    >
                        Github Source
                    </a>
                </div>
            </div>
            <Pie data={data} />
        </>
    );
}

// export default RecurringVsOneTime;