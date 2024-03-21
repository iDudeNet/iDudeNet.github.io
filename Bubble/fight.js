function sendClickToDeleteNo() {
    var intervalId = setInterval(function() {
        var focusedElement = document.activeElement;
        console.log(focusedElement);
        if (focusedElement && focusedElement.id !== 'yes-delete' && focusedElement.id !== 'no-delete') {
            try {
                document.querySelector('#no-delete').click();
                console.log("Clicked on #no-delete");
                clearInterval(intervalId); // Stop checking after click event
            } catch (error) {
                console.error("Error clicking on #no-delete:", error);
            }
        }
    }, 100); // Check every 100 milliseconds
}

function ensureFocusOnElementWithId(elementId) {
    var intervalId = setInterval(function() {
        var focusedElement = document.activeElement;
        if (focusedElement && focusedElement.id === elementId) {
            clearInterval(intervalId); // Stop checking once focus is on the desired element
        } else {
            try {
                document.querySelector('#' + elementId).focus();
                console.log("Focus set on #" + elementId);
                // Call the function to start checking and click on #delete-no if necessary
                sendClickToDeleteNo();
            } catch (error) {
                console.error("Error focusing on #" + elementId + ":", error);
            }
        }
    }, 100); // Check every 100 milliseconds
}

// Call the function to start checking and focusing on an element with ID 'yes-delete'
ensureFocusOnElementWithId('yes-delete');