import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Col, FormGroup, Label, Input, Table } from 'reactstrap';
import { GiftContext } from "../providers/GiftProvider";
import { PledgeDriveContext } from "../providers/PledgeDriveProvider";

export const ViewDashboard = () => {

    const history = useHistory();

    const { getAllGiftsByPledgeDriveId } = useContext(GiftContext);

    const [gifts, setGifts] = useState([]);

    useEffect(() => {
        getAllGiftsByPledgeDriveId(5)
            .then(setGifts)
        // getAllPledgeDrives()
    }, []);

    // const dateFormatter = (date) => {
    //     const [yyyymmdd] = date.split('T');
    //     return yyyymmdd;
    // };

    return (
        <>
            <Container className="col-sm-6 col-lg-10 justify-content-center">
                <div className="ordersHeader">
                    <h2>View Gifts By Pledge Drive</h2>
                    {/* <Col xs="6">
                        <FormGroup>
                            <Input
                                type="select"
                                name="holiday"
                                id="holiday"
                                value={holiday.name}
                                onChange={(e) => {
                                    getAllOrdersByHolidayId(parseInt(e.target.value))
                                        .then(setOrders)
                                }}
                            >
                                <option value="0">Select A Pledge Drive</option>
                                {holiday.map((h) => {
                                    return (
                                        <option key={h.id} value={h.id}>
                                            {h.name} - {dateFormatter(h.date)}
                                        </option>
                                    );
                                })}
                            </Input>
                        </FormGroup>
                    </Col> */}
                </div>

                {
                    gifts.length > 0 ? <Table hover bordered>
                        <thead>
                            <tr>
                                <th>Last Name</th>
                                <th>First Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                gifts.map(g => {
                                    return <tr key={g.id}>
                                        <td>{g.donorProfile.lastName}</td>
                                        <td>{g.donorProfile.firstName}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </Table> : <h4 className="noOrders">Please select a pledge drive.</h4>
                }
            </Container >
        </>
    )
}