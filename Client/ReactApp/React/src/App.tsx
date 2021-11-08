import "regenerator-runtime/runtime.js";
import * as React from "react";
import "./API/Amplify";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import BrowserSupport from "./Components/BrowserSupport";
import Main from "./Page/Main";

const App: React.FunctionComponent<any> = () => {
    return (
        <React.Suspense fallback={() => <p>Loading...</p>}>
            <BrowserSupport>
                <Router>
                    <Switch>
                        <Route path={"/"} exact>
                            <Main/>
                        </Route>
                    </Switch>
                </Router>
            </BrowserSupport>
        </React.Suspense>
    )
};

export default App