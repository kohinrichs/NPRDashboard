import React, { useState, useContext, useEffect } from 'react';
import { Container, Col, FormGroup, Input } from 'reactstrap';
import { GiftContext } from "../providers/GiftProvider";
import { PledgeDriveContext } from "../providers/PledgeDriveProvider";
import { GiftTable } from './GiftTable'
import { RecurringVsOneTime } from './Charts/RecurringVsOneTime'
import { NumOfDonorsAndNumOfGifts } from './Charts/NumOfDonorsAndNumOfGifts';
import { NewRecurringGiftsFromPreviousDonor } from './Charts/NewRecurringGiftsFromPreviousDonors';
import { OneTimeGiftsBySameDonor } from './Charts/OneTimeGiftsBySameDonor';
import "./MakeItPretty.css"
import { GiftsPerDay } from './Charts/GiftsPerDay';

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
            <Container className="mainContainer">
                {/* className="col-sm-6 col-lg-10 justify-content-center" */}
                <div className="pledgeDriveHeader">
                    <h2>WPLN | Pledge Drive Dashboard</h2>
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

                <div className="content">
                    {currentPledgeDrive ?
                        <>
                            <div className="giftTable">
                                <div>
                                    {currentPledgeDrive ?
                                        <GiftTable key={currentPledgeDrive.id} currentPledgeDrive={currentPledgeDrive}
                                            key={gifts} gifts={gifts} /> : null
                                    }

                                </div>

                                {/* {
                                    <GiftsPerDay key={currentPledgeDrive.id + 4} currentPledgeDrive={currentPledgeDrive}
                                        key={gifts + 1} gifts={gifts} />
                                } */}

                            </div>

                            {gifts.length !== 0 ?
                                <div className="charts">

                                    <RecurringVsOneTime key={currentPledgeDrive.id} currentPledgeDrive={currentPledgeDrive} />

                                    <NumOfDonorsAndNumOfGifts key={currentPledgeDrive.id + 1} currentPledgeDrive={currentPledgeDrive} />

                                    <OneTimeGiftsBySameDonor key={currentPledgeDrive.id + 2} currentPledgeDrive={currentPledgeDrive} />

                                    <NewRecurringGiftsFromPreviousDonor key={currentPledgeDrive.id + 3} currentPledgeDrive={currentPledgeDrive} />
                                </div> : null
                            }
                        </> : <h3 className="hello">hello. select a pledge drive. <i className="fas fa-level-up-alt"></i></h3>
                    }
                </div>
                <div className="footer">
                    <h6>Keep up the good work! :)</h6>
                </div>
            </Container >
        </>
    );
}