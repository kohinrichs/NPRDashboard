import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Col, FormGroup, Label, Input, Table } from 'reactstrap';
import { GiftContext } from "../providers/GiftProvider";
import { PledgeDriveContext } from "../providers/PledgeDriveProvider";
import { FrequencyContext } from '../providers/FrequencyProvider';
import { GiftTable } from './GiftTable'
import { RecurringVsOneTime } from './Charts/RecurringVsOneTime'

export const ViewDashboard = () => {

    const history = useHistory();

    const { pledgeDrive, getAllPledgeDrives, getPledgeDriveById } = useContext(PledgeDriveContext);
    const { getAllGiftsByPledgeDriveId } = useContext(GiftContext);
    const { frequency, getAllFrequencies } = useContext(FrequencyContext);

    const [currentPledgeDrive, setCurrentPledgeDrive] = useState();
    const [gifts, setGifts] = useState([]);
    const [visibleGifts, setVisibleGifts] = useState([]);

    useEffect(() => {
        getAllPledgeDrives()
        // .then(getAllFrequencies)
    }, []);

    // useEffect(() => {
    //     setVisibleGifts(gifts)
    // }, [gifts])

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
        if (parseInt(e.target.value) == 0) {
            setVisibleGifts(gifts)
        } else if (parseInt(e.target.value) == 1) {
            const oneTime = gifts.filter(g => g.frequencyId === 1)
            setVisibleGifts(oneTime)
        } else if (parseInt(e.target.value) == 2) {
            const sustaining = gifts.filter(g => g.frequencyId === 2)
            setVisibleGifts(sustaining)
        } else {
            setVisibleGifts(gifts)
        }
    };

    return (
        <>
            <Container className="col-sm-6 col-lg-10 justify-content-center">
                <div className="ordersHeader">
                    <h2>Pledge Drive Dashboard</h2>
                    <Col xs="6">
                        <FormGroup>
                            <Input
                                type="select"
                                name="pledgeDrive"
                                id="pledgeDrive"
                                value={pledgeDrive.name}
                                onChange={(e) => {
                                    getPledgeDriveById(parseInt(e.target.value))
                                        .then(setCurrentPledgeDrive)
                                        .then(() =>
                                            getAllGiftsByPledgeDriveId(parseInt(e.target.value)))
                                        .then(setGifts)
                                }}
                            >
                                <option value="0">Select A Pledge Drive</option>
                                {pledgeDrive.map((pd) => {
                                    return (
                                        <option key={pd.id} value={pd.id}>
                                            {pd.name}
                                        </option>
                                    );
                                })}
                            </Input>
                        </FormGroup>
                    </Col>
                </div>

                <div>
                    {currentPledgeDrive ?
                        <GiftTable key={currentPledgeDrive.id} currentPledgeDrive={currentPledgeDrive}
                            key={gifts} gifts={gifts} /> : null
                    }
                </div>

                {
                    currentPledgeDrive ? <RecurringVsOneTime /> : null
                }

                {/* {
                    gifts.length > 0 ?
                        <Container>
                            <h3>{currentPledgeDrive.name}</h3>
                            <h4>Dates: {dateFormatter(currentPledgeDrive.startDate)} to {dateFormatter(currentPledgeDrive.endDate)}</h4>
                            <h4>Goal: ${currentPledgeDrive.goal}</h4>

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
                            <h6 className="orderSubtotal">Gift Total: $
                                {
                                    gifts.map((g) => {
                                        let giftTotal = (g.amount)
                                        return giftTotal
                                    }).reduce((a, b) => a + b, 0)
                                }
                            </h6>
                            <h6 className="orderSubtotal">Percentage of Goal:

                                {" " +
                                    (gifts.map((g) => {
                                        let giftTotal = (g.amount)
                                        return giftTotal
                                    }).reduce((a, b) => a + b, 0) / currentPledgeDrive.goal * 100).toFixed(2)
                                }
                                %
                            </h6>
                        </Container> : <h4 className="noOrders">There are no gifts for this pledge drive.</h4>
                } */}
            </Container >
        </>
    );
}