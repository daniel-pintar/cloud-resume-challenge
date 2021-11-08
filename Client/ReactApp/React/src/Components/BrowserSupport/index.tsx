import * as React from "react";
const { detect } = require('detect-browser');
import {BrowserRouterProps} from "react-router-dom";
import BlockedBrowser from "./BlockedBrowser";

interface BrowserSupportProps {
    children: React.ReactNode
}

const BrowserSupport: React.FunctionComponent<BrowserRouterProps> = ({children}) => {
    const browser = detect();

    switch (browser && browser.name) {
        case "ie":
            return <BlockedBrowser/>;

        default:
            return (
                <React.Fragment>
                    {children}
                </React.Fragment>
            );
    }
};

export default BrowserSupport;