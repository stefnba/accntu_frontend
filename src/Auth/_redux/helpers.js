import moment from 'moment';
// import httpRequest from '../../_http/http.service';


const TOKEN_REFRESH_THRESHOLD = 3; // in minutes


/**
 * Helper function to decide if token needs to be refreshed
 * @param {*} tokenExp time until expiration
 * @returns true or false if token needs to be refreshed
 */
function checkRefresh(tokenExp) {
    const now = moment();
    const exp = moment.unix(tokenExp);
    const diff = moment.duration(exp.diff(now)).asMinutes();

    console.log(diff);

    if (diff < TOKEN_REFRESH_THRESHOLD) return true;
    return false;
}


/**
 * Helper function to get seconds until next token refresh will be executed in background
 * @param {*} tokenExp unix time until token expires
 * @returns Seconds until next scheduled refresh
 */
function nextAutoRefresh(tokenExp) {
    const now = moment();
    const exp = moment.unix(tokenExp);

    // TOKEN_REFRESH_THRESHOLD is in min, thus * 60
    return moment.duration(exp.diff(now)).asSeconds() - TOKEN_REFRESH_THRESHOLD * 60;
}


export {
    checkRefresh,
    nextAutoRefresh,
};
