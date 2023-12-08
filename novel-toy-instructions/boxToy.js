// Get the necessary elements
var orangePinwheelIcon = document.querySelector('.orangePinwheelIcon');
var orangePinwheelImage = document.querySelector('.orangePinwheelImage');
var sound = document.getElementById('notification-sound1');
var isSpinning = false;

// Function to play the sound
function playSound() {
    sound.play(); // Play the sound
}

// Function to stop the sound
function stopSound() {
    sound.pause(); // Pause the sound
    sound.currentTime = 0; // Reset the sound to the beginning
}

// Add a click event listener to the orangePinwheelIcon
orangePinwheelIcon.addEventListener('click', function() {
    // If the image is currently spinning, stop it; otherwise, start it and play the sound
    if (isSpinning) {
        // Get the current rotation angle of the image
        var computedStyle = window.getComputedStyle(orangePinwheelImage);
        var transform = computedStyle.getPropertyValue('transform');
        var values = transform.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));

        // Set the final state of the animation to the current rotation angle
        orangePinwheelIcon.style.animation = 'none';
        orangePinwheelIcon.style.transform = 'rotate(' + angle + 'deg)';
        
        orangePinwheelImage.style.animation = 'none';
        orangePinwheelImage.style.transform = 'rotate(' + angle + 'deg)';
        
        stopSound(); // Stop the sound when the spinning animation stops
    } else {
        setTimeout(function() {
          orangePinwheelIcon.style.animation = 'spinAnimation 0.7s linear infinite';
          orangePinwheelImage.style.animation = 'spinAnimation 0.7s linear infinite';
        }, 100); // 100 milliseconds (0.1 seconds) delay

        playSound(); // Play the sound only when the spinning animation starts
    }

    // Update the spinning state
    isSpinning = !isSpinning;
});

// Ensure the image is not spinning on load
orangePinwheelImage.style.animation = 'none';
orangePinwheelIcon.style.animation = 'none';
