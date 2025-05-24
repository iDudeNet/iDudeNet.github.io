// Possible TIZEN APP JS that is shelved

// ======================
// CONFIGURATION SECTION
// ======================
const APP_CONFIG = {
    URL: "https://webtv.roybiverse.com/version-test/",
    MAX_RETRIES: 2,
    RETRY_DELAY: 1000,
    INITIAL_DELAY: 2000,
    VALID_STATUS_CODES: [200, 301, 302, 307, 308],
    TIMEOUT_MS: 4500 // approximate target for mid-range devices.  
};

let finalUrl = APP_CONFIG.URL;
let queryParams = '';

const MESSAGES = new Map([
    ['ERROR_CODE', `We’re sorry something went wrong.<br>Please Select (<i>Press</i>) to try again or come back later.<br>Thank you for your patience.<div class="status">(@@status@@ @@status_text@@)</div>`],
    ['ERROR_NETWORK', `Unable to connect.<br>Please Select (<i>Press</i>) to try again.<br>Please check the network settings, or<br>try restarting your home network or this device.<div class="status">@@status@@ @@status_text@@)</div>`]
]);

// ======================
// ERROR HANDLER
// ======================
function getErrorMessage(result) {
    const isNetworkError = result.status === 0 || result.status === 504;
    const template = isNetworkError ? 'ERROR_NETWORK' : 'ERROR_CODE';

    // Define short descriptions for common errors (no redundant descriptions)
    const shortDescriptions = {
        500: 'This is on our end.',
        504: 'This took too long.'
    };

    const shortDesc = shortDescriptions[result.status] || '';

    return MESSAGES.get(template)
        .replace('@@status@@', result.status || 'Unknown')
        .replace('@@status_text@@', result.statusText || 'Error')
        .replace('@@short_desc@@', shortDesc);
}

// TIZEN DEVICE PARAMETERS (DECLARATION ONLY)
const setupTizenParams = () => {
    if (typeof tizen !== 'undefined' && typeof tizen.systeminfo !== 'undefined') {
        try {
            const deviceInfo = {
                profile: tizen.systeminfo.getCapability('http://tizen.org/feature/profile'),
                platform: tizen.systeminfo.getCapability('http://tizen.org/system/platform.name'),
                manufacturer: tizen.systeminfo.getCapability('http://tizen.org/system/manufacturer'),
                model: tizen.systeminfo.getCapability('http://tizen.org/system/model_name')
            };

            // Build raw parameter string only
            queryParams = [
                `device_profile=${encodeURIComponent(deviceInfo.profile)}`,
                `device_platform=${encodeURIComponent(deviceInfo.platform)}`,
                `device_manufacturer=${encodeURIComponent(deviceInfo.manufacturer)}`,
                `device_model=${encodeURIComponent(deviceInfo.model)}`
            ].join('&');

        } catch (error) {
            console.error('Tizen Error:', error);
        }
    }
};


// ======================
// CORE FUNCTIONALITY
// ======================
async function checkStatus(url) {

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), APP_CONFIG.TIMEOUT_MS);

    try {
        const response = await fetch(url, {
            method: "HEAD",
            cache: "no-store",
            redirect: "follow",
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        return {
            success: response.ok,
            url: response.url,
            redirected: response.redirected,
            status: response.status,
            statusText: response.statusText
        };
    } catch (error) {
        clearTimeout(timeoutId);
        return {
            success: false,
            url: null,
            redirected: false,
            status: error.name === 'AbortError' ? 504 : 0,
            statusText: error.name === 'AbortError'
                ? `Timeout (${APP_CONFIG.TIMEOUT_MS}ms)`
                : "Network Error"
        };
    }
}

// targeted towards RFC 3986 compliant
function getBaseURL(url) {
    try {
        const urlObj = new URL(url);
        const path = decodeURIComponent(urlObj.pathname).replace(/\/+/g, '/'); // Normalize and decode
        const basePath = path === '/' || path === '' ? '/' : path.replace(/\/[^/]+$/, '/');
        const encodedPath = basePath.split('/').map(segment => encodeURIComponent(segment)).join('/'); // Encode segments
        return `${urlObj.origin}${encodedPath}`;
    } catch (e) {
        return null;
    }
}

async function loadApp() {
    const statusCheckUrl = APP_CONFIG.URL;
    const loader = document.querySelector('.loader-overlay');
    const messageOverlay = document.querySelector('.message-overlay');
    const messageElement = document.querySelector('.message');
    let statusResult = null;

    for (let attempt = 1; attempt <= APP_CONFIG.MAX_RETRIES; attempt++) {

        statusResult = await checkStatus(statusCheckUrl);

        // Calculate base URLs for comparison
        const configBase = getBaseUrl(APP_CONFIG.URL);
        const resultBase = getBaseUrl(statusResult.url);

        // Done if Permantly moved to different baseURL, a redirect (domain change).
        if (configBase && resultBase && configBase !== resultBase) {
            console.warn('Base Url change on Server:', resultBase, 'vs', configBase);
            finalUrl = resultBase;
        }

        console.log(`Status check attempt ${attempt}:`, {
            status: statusResult.status,
            url: statusResult.url,
            success: statusResult.success
        });

        if (APP_CONFIG.VALID_STATUS_CODES.includes(statusResult.status)) {
            console.log('Redirecting to:', finalUrl);
            window.location.href = queryParams ? `${finalUrl}?${queryParams}` : finalUrl;
            return;
        }

        if (attempt < APP_CONFIG.MAX_RETRIES) {
            await new Promise(r => setTimeout(r, APP_CONFIG.RETRY_DELAY));
        }
    }

    loader.hidden = true;
    messageElement.innerHTML = getErrorMessage(statusResult);
    messageOverlay.hidden = false;

}

// ======================
// INITIALIZATION
// ======================
document.addEventListener("DOMContentLoaded", async () => {
    let isBusy = false;
    const originalMessage = document.querySelector('.message').innerHTML;

    // Initialize Tizen parameters (EXECUTION)
    setupTizenParams();
    console.log('Using URL:', finalUrl);

    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) window.location.reload();
    });

    await new Promise(r => setTimeout(r, APP_CONFIG.INITIAL_DELAY));

    const loader = document.querySelector('.loader-overlay');
    loader.hidden = false;

    const handleRetry = () => {
        if (!isBusy) {
            isBusy = true;
            document.querySelector('.message').innerHTML = originalMessage;
            loadApp().finally(() => isBusy = false);
        }
    };

    window.addEventListener("keydown", (e) => {
        if (e.key === "Enter") handleRetry();
    });

    handleRetry();
});

