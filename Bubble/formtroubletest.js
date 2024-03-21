   // Function to execute
   var firstButton = null;
   var isSpatialNavInitialized = false;    

   // Expand code here for last selected for page back history
   function getFirstButton(buttonSelector) {
       return document.querySelector('.focusable');
   }

  function SpatialNav() {

   // Initialize SpatialNavigation if not already initialized
       SpatialNavigation.init();

   // Add focusable elements
   SpatialNavigation.add({
       selector: ".focusable",
   });

   SpatialNavigation.makeFocusable();
   
   var firstButton = getFirstButton();
   if (firstButton) {
       SpatialNavigation.focus(firstButton);
   } else {
       console.error("First button not set.");
   }    

}

// Delay code execution by 1 seconds
setTimeout(SpatialNav, 3000); // 1000 milliseconds = 3 seconds
