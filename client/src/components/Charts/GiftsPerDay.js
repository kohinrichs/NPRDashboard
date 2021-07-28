import React from 'react';
import { Line } from 'react-chartjs-2';

export const GiftsPerDay = ({ currentPledgeDrive, gifts }) => {

    const dateFormatter = (date) => {
        const allDate = date.split('T')
        const ymdDate = allDate[0].split('-')

        const year = ymdDate[0];
        const month = ymdDate[1];
        const day = ymdDate[2];

        return month + '-' + day + '-' + year;
    };

    const dateFormatter02 = (date) => {
        const allDate = date.split('T')
        const ymdDate = allDate[0].split('-')

        const year = ymdDate[0];
        const month = ymdDate[1];
        const day = ymdDate[2];

        return year + '-' + month + '-' + day;
    };

    const dateFormatter03 = (date) => {
        const ymdDate = date.split('-')

        const year = ymdDate[0];
        const month = ymdDate[1];
        const day = ymdDate[2];

        return month + '-' + day;
    };

    let arrayOfDates = [];

    // Function to get array of all the dates of the Pledge Drive
    // https://stackoverflow.com/questions/26164005/get-a-list-of-dates-between-two-dates-using-javascript
    let getDateArray = (startDate, endDate) => {

        const dateMove = new Date(startDate);
        let strDate = startDate;

        while (strDate < endDate) {
            strDate = dateMove.toISOString().slice(0, 10);
            arrayOfDates.push(strDate);
            dateMove.setDate(dateMove.getDate() + 1);
        };
    };

    if (currentPledgeDrive) {
        getDateArray(dateFormatter02(currentPledgeDrive.startDate), dateFormatter02(currentPledgeDrive.endDate))
    }

    let labelsForChart = [];
    let dataForChart = [];

    // need to loop through the arrayOfDates and count the bumber of gifts that have that
    // date as the gift date, those counts get pushed to array to become the data

    // loop through the ArrayOfDates and filter through the gifts array to find the number of gift that match that date
    if (gifts) {
        for (let i = 0; i < arrayOfDates.length; i++) {
            let giftsByDate = gifts.filter(g => (dateFormatter02(g.giftDate)) === arrayOfDates[i])
            dataForChart.push(giftsByDate.length)
        }
    }

    // format the dates for chart labels
    if (arrayOfDates.length > 0) {
        arrayOfDates.map((d) => {
            labelsForChart.push(dateFormatter03(d));
        })
    }


    const data = {
        labels: labelsForChart,
        datasets: [
            {
                label: 'Number of Gifts Per Day',
                data: dataForChart,
                fill: false,
                backgroundColor: 'rgba(34, 151, 169, 1)',
                borderColor: 'rgba(34, 151, 169, 1)',
            },
        ],
    };

    const options = {
        scales: {
            y:
            {
                ticks: {
                    beginAtZero: true,
                    precision: 1,
                    stepSize: 1,

                },
            },
        },
    };


    return dataForChart.length > 0 ? (
        <>
            <div className='giftsPerDay'>
                <h6 className='title'>Gifts Per Day</h6>
            </div>
            <Line options={options} data={data} />
        </>
    ) : null
}