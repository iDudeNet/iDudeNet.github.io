SpatialNavigation.init();
SpatialNavigation.add({
  selector: ".focusable",
});
SpatialNavigation.makeFocusable();


const videoRowContainer = document.querySelector('.video_row');

if (videoRowContainer) {
// Find the first element with the class 'focusable' inside the container
const focusableElement = videoRowContainer.querySelector('.focusable');

if (focusableElement) {
    // Set focus to the found focusable element
    focusableElement.focus();
}
}



SpatialNavigation.init();
SpatialNavigation.add({
  selector: ".focusable",
});
SpatialNavigation.makeFocusable();
var firstButton = document.querySelector('.focusable');
SpatialNavigation.focus(firstButton);