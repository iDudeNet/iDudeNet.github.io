      // Function to execute after 1 seconds
      function delayedExecution() {

        // Get all elements with the class 'button_for_file_uploader'
        var buttons = document.querySelectorAll('.button_for_file_uploader');
    
        // Loop through each button and add the class 'focusable'
        buttons.forEach(function(button) {
            button.classList.add('focusable');
        });
    
            SpatialNavigation.init();
            SpatialNavigation.add({
                selector: ".focusable",
            });
    
            SpatialNavigation.makeFocusable();
            var focusableElements = document.querySelectorAll('.focusable');
            focusableElements.forEach(function(element) {
                element.addEventListener('keydown', handleKeyPress);
            });
    
            var firstButton = document.querySelector('.focusable');
            SpatialNavigation.focus(firstButton);
        }
    
        // Delay code execution by 1 seconds change to look for Mutuations in the Page DOM
        setTimeout(delayedExecution, 1000); // 1000 milliseconds = 3 seconds
    
        // Function to handle keyboard events
        function handleKeyPress(event) {
            // Check if the key pressed is Enter (key code 13)
            if (event.keyCode === 13) {
                // Trigger a click event on the focused element
                event.target.click();
            }
        }