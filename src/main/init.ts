import TagManager from 'react-gtm-module'

const tagManagerArgs = {
    gtmId: 'G-T2JX2G6X81'
}

function initAnalytics() {
    TagManager.initialize(tagManagerArgs)
}

export default function initWebsite(){
    initAnalytics()
    console.log("Website initialized")
}


