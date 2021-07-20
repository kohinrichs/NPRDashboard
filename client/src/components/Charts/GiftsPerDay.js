import React, { useState, useContext, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { GiftContext } from '../../providers/GiftProvider';

export const GiftsPerDay = ({ currentPledgeDrive, gifts }) => {

    const { getNumOfDonorsAndNumOfGift } = useContext(GiftContext);

    const [numOfGifts, setNumOfGifts] = useState();

    const dateFormatter = (date) => {
        const allDate = date.split('T')
        const ymdDate = allDate[0].split('-')

        const year = ymdDate[0];
        const month = ymdDate[1];
        const day = ymdDate[2];

        return month + '-' + day + '-' + year;
    };


    const currentPledgeDriveStartDate = dateFormatter(currentPledgeDrive.startDate);
    const currentPledgeDriveEndDate = dateFormatter(currentPledgeDrive.endDate);

    // https://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
    // Research more on Date.parse
    var numOfDays = Math.floor((Date.parse(currentPledgeDriveEndDate) - Date.parse(currentPledgeDriveStartDate)) / 86400000);

    let arrayOfDates = [];

    if (currentPledgeDriveEndDate) {

        for (let i = 0; i < numOfDays + 1; i++) {

            const dateFormatterPlusOne = (date) => {
                const ymdDate = date.split('-')

                const year = ymdDate[2];
                const month = ymdDate[1]
                const day = parseInt((ymdDate[0]), 10)
                let dayPlusOne = day + i
                // if index of one, add string "0" to front

                if (dayPlusOne.toString().length === 1) {
                    dayPlusOne = "0" + dayPlusOne.toString()
                }

                arrayOfDates.push(year + '-' + month + '-' + dayPlusOne);
            };

            dateFormatterPlusOne(currentPledgeDriveStartDate)
        }
    }

    let labelsForChart = [];
    let dataForChart = [];

    // need to loop through the arrayOfDates and count the bumber of gifts that have that
    // date as the gift date, those counts get pushed to array to become the data

    debugger
    for (let i = 0; i < arrayOfDates.length; i++) {
        let giftsByDate = gifts.filter(g => g.giftDate === arrayOfDates[i].giftDate)

        dataForChart.push(giftsByDate.length)
    }


    const data = {
        labels: arrayOfDates,
        datasets: [
            {
                label: 'Number of Gifts Per Day',
                data: dataForChart,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };


    return dataForChart.length > 0 ? (
        <>
            <div className='header'>
                <h6 className='title'>Number Of Gifts Given By Donors To Date</h6>
                <div className='links'>
                    <a
                        className='btn btn-gh'
                        href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Line.js'
                    >
                    </a>
                </div>
            </div>
            <Line data={data} options={options} />
        </>
    ) : null
}