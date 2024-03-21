// Function to execute
var firstButton = null;
var isSpatialNavInitialized = false;    


// Expand code here for last selected for page back history
function getFirstButton(buttonSelector) {
    return document.querySelector('#load_spatialNav .focusable');
}

function SpatialNav() {

    // Reset previous instance
    var previousFocusableElements = document.querySelectorAll('.focusable');
    previousFocusableElements.forEach(function(element) {
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

    var focusableElements = document.querySelectorAll('.focusable');
    focusableElements.forEach(function(element) {
        element.addEventListener('keydown', handleKeyPress);
    });
    
    var firstButton = getFirstButton();
    if (firstButton) {
        SpatialNavigation.focus(firstButton);
        firstButton.focus();
    } else {
        console.error("First button not set.");
    }    

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
    const targetNode = document.getElementById('load_spatialNav');
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
    const targetNode = document.getElementById('load_spatialNav');
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