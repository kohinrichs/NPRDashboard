import React, { useState, useContext, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
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

    // Making Legends icons
    // https://stackoverflow.com/questions/49402490/how-to-use-icon-as-legend-in-chart-js
    // let iconLabelsForChart = [<i className="fas fa-circle"></i>, <i className="fas fa-undo-alt"></i>];

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

    return dataForChart.length > 0 ? (
        <>
            <div className='header'>
                <h6 className='title'>One Time vs Sustaining Memberships</h6>
                <div className='links'>
                    <a
                        className='btn btn-gh'
                        href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Doughnut.js'
                    >
                        {/* One Time vs Sustaining Memberships */}
                    </a>
                </div>
            </div>
            <Doughnut data={data} />
        </>
    ) : null
}