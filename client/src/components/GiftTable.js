import React, { useState, useContext, useEffect } from 'react';
import { Container, Col, FormGroup, Label, Input, Table } from 'reactstrap';
import { FrequencyContext } from '../providers/FrequencyProvider';


export const GiftTable = ({ currentPledgeDrive, gifts }) => {

    const { frequency, getAllFrequencies } = useContext(FrequencyContext);

    const [visibleGifts, setVisibleGifts] = useState([]);

    useEffect(() => {
        getAllFrequencies()
    }, []);

    useEffect(() => {
        setVisibleGifts(gifts)
    }, [gifts])

    const dateFormatter = (date) => {
        const allDate = date.split('T')
        const ymdDate = allDate[0].split('-')

        const year = ymdDate[0];
        const month = ymdDate[1];
        const day = ymdDate[2];

        return month + '-' + day + '-' + year;
    };

    // would it make more sense to hit the API again?
    const filterPledgeDriveTable = (e) => {
        if (parseInt(e.target.value) === 0) {
            setVisibleGifts(gifts)
        } else if (parseInt(e.target.value) === 1) {
            const oneTime = gifts.filter(g => g.frequencyId === 1)
            setVisibleGifts(oneTime)
        } else if (parseInt(e.target.value) === 2) {
            const sustaining = gifts.filter(g => g.frequencyId === 2)
            setVisibleGifts(sustaining)
        } else {
            setVisibleGifts(gifts)
        }
    };


    return currentPledgeDrive ? (
        <>
            <Container className="justify-content-center">
                {
                    gifts.length > 0 ?
                        <Container>
                            <div className="header1">
                                <h3>{currentPledgeDrive.name}</h3>
                                <h4>{dateFormatter(currentPledgeDrive.startDate)} to {dateFormatter(currentPledgeDrive.endDate)}</h4>
                            </div>
                            <div className="header2">
                                <h4>Goal: ${currentPledgeDrive.goal}</h4>
                                <div>
                                    <h6 className="totals">Gift Total: $
                                        {
                                            gifts.map((g) => {
                                                let giftTotal = (g.amount)
                                                return giftTotal
                                            }).reduce((a, b) => a + b, 0)
                                        }
                                    </h6>
                                    <h6 className="totals">Percentage of Goal:

                                        {" " +
                                            (gifts.map((g) => {
                                                let giftTotal = (g.amount)
                                                return giftTotal
                                            }).reduce((a, b) => a + b, 0) / currentPledgeDrive.goal * 100).toFixed(2)
                                        }
                                        %
                                    </h6>
                                </div>
                            </div>
                            <FormGroup>
                                <Input
                                    type="select"
                                    name="filterPledgeDriveTable"
                                    id="filterPledgeDriveTable"
                                    value={frequency.name}
                                    onChange={(e) => filterPledgeDriveTable(e)}
                                >
                                    <option value="0">All</option>
                                    {frequency.map((f) => {
                                        return (
                                            <option key={f.id} value={f.id}>
                                                {f.name}
                                            </option>
                                        );
                                    })}
                                </Input>
                            </FormGroup>

                            <Table hover bordered>
                                <thead>
                                    <tr>
                                        <th>Last Name</th>
                                        <th>First Name</th>
                                        <th>Amount</th>
                                        <th>Gift Date</th>
                                        <th>Frequency</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        visibleGifts.length > 0 ? visibleGifts.map(g => {
                                            return <tr key={g.id}>
                                                <td>{g.donorProfile.lastName}</td>
                                                <td>{g.donorProfile.firstName}</td>
                                                <td>${g.amount}</td>
                                                <td>{dateFormatter(g.giftDate)}</td>
                                                <td>{g.frequency.name}</td>
                                            </tr>
                                        }) : "No gifts match this filter."
                                    }
                                </tbody>
                            </Table>
                        </Container> : <h4 className="noOrders">There are no gifts for this pledge drive.</h4>
                }
            </Container >
        </>
    ) : null
}