
  // Function to add focus simulation behavior to form inputs
  function setupFocusSimulation() {
    // Add event listener for focusin event at the document level
    document.addEventListener('focusin', function(event) {
        // Log when focusin event is triggered
        console.log('Focusin event triggered');

        // Check if the active element is an input with the class 'focusable'
        if (event.target.classList.contains('focusable')) {
            // Apply the custom-focus class to simulate focus appearance
            event.target.classList.add('custom-focus');
            console.log('Custom focus applied');
        }
    });

    // Add event listener for focusout event at the document level
    document.addEventListener('focusout', function(event) {
        // Log when focusout event is triggered
        console.log('Focusout event triggered');

        // Check if the active element is an input with the class 'focusable'
        if (event.target.classList.contains('focusable')) {
            // Remove the custom-focus class
            event.target.classList.remove('custom-focus');
            console.log('Custom focus removed');
        }
    });

    // Get all form inputs with the class 'focusable'
    var inputs = document.querySelectorAll('.focusable');

    // Add event listeners to each input
    inputs.forEach(function(input) {
        // Add focus listener
        input.addEventListener('focus', function() {
            // Apply the custom-focus class to simulate focus appearance
            input.classList.add('custom-focus');
            console.log('Focus event triggered');
        });

        // Add blur listener
        input.addEventListener('blur', function() {
            // Remove the custom-focus class
            input.classList.remove('custom-focus');
            console.log('Blur event triggered');
        });
    });
}

// Call the setup function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupFocusSimulation();
});
