import * as React from "react";
import style from "./assets/stylesheet.scss";
import classNames from "classnames";
import chrome from "./assets/Image/logo-chrome.png";
import edge from "./assets/Image/logo-edge.png";
import firefox from "./assets/Image/logo-firefox.png";
import opera from "./assets/Image/logo-opera.png";
import safari from "./assets/Image/logo-safari.png";

const BlockedBrowser: React.FunctionComponent<any> = () => {
    return (
        <main className={style.blockedBrowserMain}>
            <div className={style.landingWindow}>
                <div className={style.landingMain}>
                    <div className={style.headlineWrapper}>
                        <h1 className={classNames(style.landingTitle, style.browsersTitle)}>Dieser Browser wird nicht mehr unterstützt!</h1>
                    </div>
                    <div className={style.textTip}>Wir empfehlen die Seite mit einem der folgenden Browser zu verwenden:</div>
                    <div className={style.browsers}>
                        <div className={style.browser}>
                            <a className={style.image} href="http://www.google.com/chrome/" target="_blank">
                                <img src={chrome} className={style.imageLogo}/>
                            </a>
                            <a href="http://www.google.com/chrome/" className={style.browserTitle} target="_blank">
                                Google Chrome
                            </a>
                        </div>
                        <div className={style.browser}>
                            <a className={style.image} href="http://www.firefox.com" target="_blank">
                                <img src={firefox} className={style.imageLogo}/>
                            </a>
                            <a href="http://www.firefox.com" className={style.browserTitle} target="_blank">Mozilla Firefox</a>
                        </div>
                        <div className={classNames(style.browser, style.browserSafari)}>
                            <a className={style.image} href="https://support.apple.com/downloads/#safari" target="_blank">
                                <img src={safari} className={style.imageLogo}/>
                            </a>
                            <a href="https://support.apple.com/downloads/#safari" className={style.browserTitle} target="_blank">Safari (macOS 10.8+ Only)</a>
                        </div>
                    </div>
                    <div className={style.textTip}>Wir unterstützen ebenfalls:</div>
                    <div className={classNames(style.browsers, style.browsersLast)}>
                        <div className={style.browser}>
                            <a className={style.image} href="https://www.microsoft.com/en-us/windows/microsoft-edge" target="_blank">
                                <img src={edge} className={style.imageLogo}/>
                            </a>
                            <a href="https://www.microsoft.com/en-us/windows/microsoft-edge" className={style.browserTitle} target="_blank">Microsoft Edge</a>
                        </div>
                        <div className={style.browser}>
                            <a className={style.image} href="http://www.opera.com" target="_blank">
                                <img src={opera} className={style.imageLogo}/>
                            </a>
                            <a href="http://www.opera.com" className={style.browserTitle} target="_blank">Opera</a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default BlockedBrowser;