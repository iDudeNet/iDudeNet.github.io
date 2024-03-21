// Source URL for more information about system UI visibility:
// https://webostv.developer.lge.com/develop/guides/system-ui-visibility

var InputLogger = (function() {
    // Function to handle keyboard visibility change event
    function keyboardVisibilityChange(event) {
      // Get the visibility status from the event detail
      var visibility = event.detail.visibility;
      // Log whether the virtual keyboard appeared or disappeared
      log(visibility ? 'Virtual keyboard appeared' : 'Virtual keyboard disappeared');
      
      // Pause or resume Spatial Navigation based on keyboard visibility
      if (visibility) {
        SpatialNavigation.pause();
        console.log('Spatial Navigation paused.');
      } else {
        SpatialNavigation.resume();
        console.log('Spatial Navigation Reset resumed.');
      }
    }
  
    // Function to handle input events
    function inputfunc(event) {
      // Get the target input element
      var x = event.target;
      // Log the input event type and value
      log(event.type + ': ' + x.value);
    }
  
    // Function to handle key events
    function keyfunc(event) {
      // Log the key event type, keyCode, and which properties
      log(
        event.type + ': keyCode=' + event.keyCode + ' which=' + event.which
      );
    }
  
    // Function to log messages
    function log(msg) {
      // Log the message to the console
      console.log(msg);
    }
  
    // Function to initialize event listeners
    function load() {
      // Add event listener for keyboard visibility change event
      document.addEventListener(
        'keyboardStateChange',
        keyboardVisibilityChange,
        false
      );
      
      // Get all elements with class name 'focusable'
      var focusableElements = document.querySelectorAll('.focusable');
      
      // Add event listeners for input-related events to each focusable element
      focusableElements.forEach(function(element) {
        element.addEventListener('input', inputfunc, false);
        element.addEventListener('change', inputfunc, false);
        element.addEventListener('keypress', keyfunc, false);
        element.addEventListener('keyup', keyfunc, false);
        element.addEventListener('keydown', keyfunc, false);
      });
    }
  
    // Expose public methods
    return {
      load: load
    };
  })();
  
  // Usage: Initialize the InputLogger module
  InputLogger.load();
