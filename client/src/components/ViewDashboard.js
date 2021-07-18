import React, { useState, useContext, useEffect } from 'react';
import { Container, Col, FormGroup, Label, Input, Table } from 'reactstrap';
import { GiftContext } from "../providers/GiftProvider";
import { PledgeDriveContext } from "../providers/PledgeDriveProvider";
import { FrequencyContext } from '../providers/FrequencyProvider';
import { GiftTable } from './GiftTable'
import { RecurringVsOneTime } from './Charts/RecurringVsOneTime'
import { NumOfDonorsAndNumOfGifts } from './Charts/NumOfDonorsAndNumOfGifts';
import { NewRecurringGiftsFromPreviousDonor } from './Charts/NewRecurringGiftsFromPreviousDonors';

export const ViewDashboard = () => {

    const { pledgeDrive, getAllPledgeDrives, getPledgeDriveById } = useContext(PledgeDriveContext);
    const { getAllGiftsByPledgeDriveId } = useContext(GiftContext);

    const [currentPledgeDrive, setCurrentPledgeDrive] = useState();
    const [gifts, setGifts] = useState([]);

    useEffect(() => {
        getAllPledgeDrives()
    }, []);


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
                    currentPledgeDrive ?
                        <RecurringVsOneTime key={currentPledgeDrive.id} currentPledgeDrive={currentPledgeDrive} /> : null
                }

                {
                    currentPledgeDrive ?
                        <NumOfDonorsAndNumOfGifts key={currentPledgeDrive.id + 1} currentPledgeDrive={currentPledgeDrive} /> : null
                }

                {
                    currentPledgeDrive ?
                        <NewRecurringGiftsFromPreviousDonor key={currentPledgeDrive.id + 2} currentPledgeDrive={currentPledgeDrive} /> : null
                }
            </Container >
        </>
    );
}