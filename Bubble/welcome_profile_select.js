   // Function to execute
    var firstButton = null;
    var isSpatialNavInitialized = false;    

    // Expand code here for last selected for page back history
    function getFirstButton(buttonSelector) {
        return document.querySelector('.focusable');
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

// Delay code execution by 1 seconds
setTimeout(SpatialNav, 1000); // 1000 milliseconds = 3 seconds
