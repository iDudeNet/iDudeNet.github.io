/*
* Custom Spatial Navigation setup and control
* Handles Mutations on DOM
* All focusable Elements should have the class="focusable"
* assigned to them in HTML for this to work
*/

(function () {

    // Configuration Vars
    var startFocusElementSelect = '#load_spatialNav .focusable';
    var loadingElementID = 'load_spatialNav';
    // internal use Wars
    var isSpatialNavInitialized = false;

    // Function to asynchronously find the starting focus element
    function getStartFocus() {
        var elementSelector = startFocusElementSelect;
        var maxAttempts = 10;
        var interval = 300; // milliseconds
        var durationInSeconds = 3;
        var duration = durationInSeconds * 1000; // Convert duration to milliseconds

        return new Promise(function (resolve, reject) {
            var attempts = 0;
            var startTime = Date.now();

            function findElement() {
                var element = document.querySelector(elementSelector);
                if (element) {
                    resolve(element);
                } else if (attempts < maxAttempts && (Date.now() - startTime) < duration) {
                    attempts++;
                    setTimeout(findElement, interval);
                } else {
                    reject(new Error('Element not found within the specified time and attempts.'));
                }
            }
            findElement();
        });
    }

    function SpatialNav() {

        // Remove previous event listeners (prevents duplicate listners)
        var previousFocusableElements = document.querySelectorAll('.enterkey2click');
        previousFocusableElements.forEach(function (element) {
            element.removeEventListener('keydown', handleKeyPress);
        });

        // Initialize SpatialNavigation if not already initialized
        if (!isSpatialNavInitialized) {
            SpatialNavigation.init();
            isSpatialNavInitialized = true;
        }

        // Add focusable elements
        SpatialNavigation.add({
            selector: ".focusable",
        });

        SpatialNavigation.makeFocusable();

        // Add Keydown Event listeners to focusable Elements
        var focusableElements = document.querySelectorAll('.enterkey2click');
        focusableElements.forEach(function (element) {
            element.addEventListener('keydown', handleKeyPress);
        });

        // updated to work with a promises
        getStartFocus()
            .then(function (startFocusElement) {
                //console.log('Start focus element found:', startFocusElement);
                SpatialNavigation.focus(startFocusElement);
                startFocusElement.focus();
                // Starting focus element
            })
            .catch(function (error) {
                console.error('Error:', error.message);
            });
    }

    // Function to handle keyboard events
    function handleKeyPress(event) {
        // Check if the key pressed is Enter (key code 13)
        if (event.keyCode === 13) {
            // Trigger a click event on the focused element
            event.target.click();
        }
    }

    // Dealing with total counts since detection of actually mutations on nodes by specific class do not work with bubble
    var focusableCount = 0;

    // Function to update the count of elements with class "focusable"
    function updateFocusableCount() {
        const targetNode = document.getElementById(loadingElementID);
        if (!targetNode) return;

        const focusableElements = targetNode.querySelectorAll('.focusable');
        const newCount = focusableElements.length;

        // Call function only if the count has changed
        if (newCount !== focusableCount) {
            focusableCount = newCount;
            handleFocusableCountChange();
        }
    }

    // Function to handle focusable count change
    function handleFocusableCountChange() {
        console.log('Focusable count changed:', focusableCount);
        // Call any function or perform any action here
        SpatialNav();
    }

    // Function to be executed when target element changes
    function onChangeCallback(mutationsList, observer) {
        updateFocusableCount();
    }

    // Initialize the observer
    function initializeObserver(targetNode) {
        // Options for the observer (which mutations to observe from Bubble.io India Lag fest) 
        const config = { childList: true, subtree: true };
        // Create an observer instance linked callback function
        const observer = new MutationObserver(onChangeCallback);
        // Start observing the target node for configured mutations
        observer.observe(targetNode, config);
    }


    // Function to periodically check for the presence of the target node (hydration check)!
    function waitForTargetNode() {
        const targetNode = document.getElementById(loadingElementID);
        if (targetNode) {
            SpatialNav();
            // If the target node is available...initialize the observer!
            initializeObserver(targetNode);
            // focusable start count
            var start_focusableElements = targetNode.querySelectorAll('.focusable');
            focusableCount = start_focusableElements.length; //0
        } else {
            // If the target node is not yet available, wait...try again
            setTimeout(waitForTargetNode, 100);
        }
    }

    // Start waiting for the target node
    waitForTargetNode();
})();