// Wrap the code inside setTimeout to load it after 1 second
setTimeout(function () {

  // Get the contents of the element with ID 2click-label
  var profilename = document.getElementById('2click-profilename');
  var contents = profilename.innerHTML;

  // Check if the contents are empty
  if (!contents.trim()) {
    // Set the contents to "Profile"
    profilename.innerHTML = "Select Profile";
  }

  // Get the element with ID "2click"
  const element = document.getElementById('2click');
  // Add focus event listener
  element.addEventListener('focus', () => {
    // Add keydown event listener to accept Enter key
    element.addEventListener('keydown', event => {
      if (event.keyCode === 13) { // 13 is the key code for Enter
        // Send mouse click event to the element
        element.click();
      }
    });
  });
}, 3000); // 1000 milliseconds = 1 second


setTimeout(function () {
  // Get the elements
  var clickElement = document.getElementById('2click');
  var labelElement = document.getElementById('2click-profilename');
  var imageElement = document.getElementById('2click-profileimage');

  // Function to apply the profile-select-focus class
  function applyStyle() {
    labelElement.classList.add('profile-select-focus');
    imageElement.classList.add('profile-selectimage-focus');
  }

  // Function to remove the profile-select-focus class
  function removeStyle() {
    labelElement.classList.remove('profile-select-focus');
    imageElement.classList.remove('profile-selectimage-focus');
  }

  // Add event listener for focus event to apply style
  clickElement.addEventListener('focus', applyStyle);

  // Add event listener for blur event to remove style
  clickElement.addEventListener('blur', removeStyle);

}, 3000); // 1000 milliseconds = 1 second


// Function to add the spinner HTML after a delay
function addSpinner() {
  // Define the spinner HTML structure as a string
  const spinnerHTML = `
        <div class="loader-overlay">
            <div class="loader"></div>
        </div>
  `;

  // Append the spinner HTML to the body
  document.body.insertAdjacentHTML('beforeend', spinnerHTML);
}

// Set a timeout to execute the addSpinner function after 1000 milliseconds (1 second)
setTimeout(addSpinner, 200);




<script>
  window.addEventListener('keydown', function(event) {
  if (event.keyCode === 461) {
    // Your code to handle the back button press
    // Function to add the spinner HTML after a delay
    function addSpinner() {
      // Define the spinner HTML structure as a string
      const spinnerHTML = `
        <div class="loader-overlay">
            <div class="loader"></div>
        </div>
  `;

      // Append the spinner HTML to the body
      document.body.insertAdjacentHTML('beforeend', spinnerHTML);
    }

// Set a timeout to execute the addSpinner function after 1000 milliseconds (1 second)
setTimeout(addSpinner, 200);
  }  
});

</script>
