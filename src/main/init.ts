import TagManager from 'react-gtm-module'
import {Buffer} from 'buffer';

const tagManagerArgs = {
    gtmId: 'G-T2JX2G6X81'
}

function initAnalytics() {
    TagManager.initialize(tagManagerArgs)
}

function initBuffer() {
    window.Buffer = Buffer;
}

export default function initWebsite() {
    initAnalytics();
    initBuffer();
    console.log("Website initialized")
}


