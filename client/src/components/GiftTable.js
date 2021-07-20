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

    // Total number of gifts for the Pledge Drive
    let totalNumberOfGifts = gifts.length;

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
                                <div>
                                    <h6>Goal: ${currentPledgeDrive.goal}</h6>
                                    <h6>Number Of Gifts: {totalNumberOfGifts}</h6>
                                </div>
                                <div>
                                    <h6 className="totals">Pledge Drive Total: $
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
                            <div className="header3">
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
                            </div>

                            {
                                visibleGifts.length > 0 ? <div className="tableBody">
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
                                                visibleGifts.map(g => {
                                                    return <tr key={g.id}>
                                                        {
                                                            g.donorProfile.numberOfGifts == 1 ? <td><b>#1</b> - {g.donorProfile.lastName}</td> : <td>{g.donorProfile.lastName}</td>
                                                        }
                                                        <td>{g.donorProfile.firstName}</td>
                                                        <td>${g.amount}</td>
                                                        <td>{dateFormatter(g.giftDate)}</td>
                                                        {
                                                            g.frequency.name === "Sustaining Membership" ? <td className="frequencyIcon"><i className="fas fa-undo-alt"></i></td> : <td className="frequencyIcon"><i className="fas fa-circle"></i></td>
                                                        }
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                                    : <h4 className="noGifts">No gifts match this filter.</h4>
                            }
                            <div className="header3--a">
                                <h6 className="header3--a__legend"> First Time Donor : <strong>#1</strong></h6>
                                <h6 className="header3--a__legend">One Time Gift : <i className="fas fa-circle"></i></h6>
                                <h6 className="header3--a__legend">Sustaining Membership: <i className="fas fa-undo-alt"></i></h6>
                            </div>
                        </Container> : <h4 className="noGifts">There are no gifts for this pledge drive.</h4>
                }
            </Container >
        </>
    ) : null
}