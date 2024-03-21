// Set to store processed select elements
var processedSelectElements = new Set();

// Function to handle the detection of select elements
function detectSelectElements() {
    // Define a callback function to handle mutations
    var mutationCallback = function(mutationsList, observer) {
        // Iterate over each mutation
        mutationsList.forEach(function(mutation) {
            // Check if nodes have been added to the DOM
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Iterate over added nodes
                mutation.addedNodes.forEach(function(node) {
                    // Check if the added node is a select element
                    if (node.tagName && node.tagName.toLowerCase() === 'select') {
                        // Check if the select element has not been processed yet
                        if (!processedSelectElements.has(node)) {
                            // Do something with the select element
                            attachEventListeners(node);
                            // Add the select element to the processed set
                            processedSelectElements.add(node);
                        }
                    }
                });
            }
        });
    };

    // Create a MutationObserver instance
    var observer = new MutationObserver(mutationCallback);

    // Start observing changes to the document's subtree
    observer.observe(document.documentElement, { childList: true, subtree: true });
}

// Function to attach event listeners to a select element
function attachEventListeners(selectElement) {
    // Add event listener for focus event
    selectElement.addEventListener('focus', function(event) {
        // Dropdown is activated and displaying options
        console.log('Dropdown activated');
    });

    // Add event listener for click event
    selectElement.addEventListener('click', function(event) {
        // Dropdown is activated and displaying options
        console.log('Dropdown activated');
        // Pause Spatial Navigation
        SpatialNavigation.pause();
    });

    // Add event listener for change event
    selectElement.addEventListener('change', function(event) {
        // Option has been selected
        var selectedOption = event.target.value;
        console.log('Selected option:', selectedOption);
        // Resume Spatial Navigation
        SpatialNavigation.resume();
    });
}

// Call the function to start detecting select elements
detectSelectElements();



if (webOS.keyboard.isShowing() === true) {
    // other div style fade out
    console.log('Keyboard is Showing');
    SpatialNavigation.pause();
  } else {
    console.log('Keyboard is Closed');
    SpatialNavigation.resume();
  }

  


// Define a variable to store the previous keyboard state
let previousKeyboardState = webOS.keyboard.isShowing();

// Define a function to check keyboard status and perform actions
function checkKeyboardStatus() {
  const currentKeyboardState = webOS.keyboard.isShowing();

  // Check if the keyboard state has changed
  if (currentKeyboardState !== previousKeyboardState) {
    if (currentKeyboardState === true) {
      // Keyboard is showing
      console.log('Keyboard is Showing');
      console.log('Currently focused element:', document.activeElement);
      SpatialNavigation.pause();
    } else {
      // Keyboard is closed
      console.log('Keyboard is Closed');
      SpatialNavigation.resume();
    }
    
    // Update the previous state
    previousKeyboardState = currentKeyboardState;
    console.log('Currently focused element:', document.activeElement);
  }
}

// Run the function initially
checkKeyboardStatus();

// Set up the loop to continuously check the keyboard status
setInterval(checkKeyboardStatus, 100); // Adjust the interval as needed (e.g., every second)

