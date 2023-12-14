import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { SimpleController as G11nController } from "@vebgen/g11n";

import roMessages from "../i18n/ro.json";
import enMessages from "../i18n/en.json";
import App from './app/app';


// Translation set-up.
const messages: Record<string, Record<string, string>> = {
    "ro": roMessages as any,
    "ro-RO": roMessages as any,
    "ro-MD": roMessages as any,
    "en": enMessages as any,
    "en-US": enMessages as any,
    "en-GB": enMessages as any,
}


// Render the app.
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    <StrictMode>
        <G11nController messages={messages}>
            <App />
        </G11nController>
    </StrictMode>,
);
