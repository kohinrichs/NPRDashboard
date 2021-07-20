import { Switch, Route } from "react-router-dom";
import { ViewDashboard } from "./ViewDashboard";

export default function ApplicationViews() {

    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    <ViewDashboard />
                </Route>

            </Switch>
        </main>
    );
};