import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Col, FormGroup, Label, Input, Table } from 'reactstrap';
import { GiftContext } from "../providers/GiftProvider";
import { PledgeDriveContext } from "../providers/PledgeDriveProvider";

export const ViewDashboard = () => {

    const history = useHistory();

    const { pledgeDrive, getAllPledgeDrives, getPledgeDriveById } = useContext(PledgeDriveContext);
    const { getAllGiftsByPledgeDriveId } = useContext(GiftContext);

    const [currentPledgeDrive, setCurrentPledgeDrive] = useState();
    const [gifts, setGifts] = useState([]);

    useEffect(() => {
        getAllPledgeDrives()
    }, []);

    const dateFormatter = (date) => {
        const allDate = date.split('T')
        const ymdDate = allDate[0].split('-')

        const year = ymdDate[0];
        const month = ymdDate[1];
        const day = ymdDate[2];

        return month + '-' + day + '-' + year;
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

                {
                    gifts.length > 0 ?
                        <Container>
                            <h3>{currentPledgeDrive.name}</h3>
                            <h4>Dates: {dateFormatter(currentPledgeDrive.startDate)} to {dateFormatter(currentPledgeDrive.endDate)}</h4>
                            <h4>Goal: ${currentPledgeDrive.goal}</h4>
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
                                        gifts.map(g => {
                                            return <tr key={g.id}>
                                                <td>{g.donorProfile.lastName}</td>
                                                <td>{g.donorProfile.firstName}</td>
                                                <td>${g.amount}</td>
                                                <td>{dateFormatter(g.giftDate)}</td>
                                                <td>{g.frequency.name}</td>
                                            </tr>
                                        })
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
                }
            </Container >
        </>
    );
}