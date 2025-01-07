import TagManager from 'react-gtm-module'
import {Buffer} from 'buffer';
import logo from './assets/logo.svg';

const tagManagerArgs = {
    gtmId: 'G-T2JX2G6X81'
}

function initAnalytics() {
    TagManager.initialize(tagManagerArgs)
}

function initBuffer() {
    window.Buffer = Buffer;
}

function initLogo() {
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = logo;
    window.document.head.appendChild(link);
}

export default function initWebsite() {
    initAnalytics();
    initBuffer();
    initLogo();
    console.log("Website initialized")
}


