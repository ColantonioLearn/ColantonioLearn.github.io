// Get the necessary elements
var whiteDuckIcon = document.querySelector('.whiteDuckIcon');
var whiteDuckImage = document.querySelector('.whiteDuckImage');
var sound = document.getElementById('notification-sound1');
var isImageVisible = false;

// Add a click event listener to the whiteDuckIcon
whiteDuckIcon.addEventListener('click', function() {
    // Toggle the 'on' class to start or stop the animation
    whiteDuckImage.classList.toggle('on');

    // If the image is currently visible, hide it; otherwise, show it after a delay
    if (isImageVisible) {
        whiteDuckImage.style.display = 'none';
    } else {
        sound.play(); 
        setTimeout(function() {
            whiteDuckImage.style.display = 'block';
            // Play the sound only when the image becomes visible
        }, 200); // 200 milliseconds (0.2 seconds) delay
    }

    // Update the visibility state
    isImageVisible = !isImageVisible;
});
