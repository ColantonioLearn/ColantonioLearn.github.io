// boxToy.js

// Wait for the DOM to be ready
$(document).ready(function () {

    // Cache the reference to the Orange Pinwheel icon
    var orangePinwheelIcon = $(".orangePinwheelIcon");
  
    // Cache the reference to the Orange Pinwheel image
    var orangePinwheelImage = $(".orangePinwheelIcon img");
  
    // Cache the reference to the notification sound
    var notificationSound = $("#notification-sound1")[0]; // [0] gets the raw DOM element
  
    // Variable to track if the pinwheel is currently spinning
    var isSpinning = false;
  
    // Function to handle the click event on the Orange Pinwheel icon
    orangePinwheelIcon.click(function () {
  
      // Check if the pinwheel is currently spinning
      if (isSpinning) {
        // If spinning, stop the spin animation
        orangePinwheelIcon.removeClass("spin on");
  
        // Pause the notification sound
        notificationSound.pause();
  
        // Set spinning state to false
        isSpinning = false;
      } else {
        // If not spinning, start the spin animation
        orangePinwheelIcon.addClass("spin on");
  
        // Play the notification sound and make it loop
        notificationSound.volume = 1;
        notificationSound.currentTime = 0; // Reset to the beginning
        notificationSound.loop = true;
        notificationSound.play();
  
        // Set spinning state to true
        isSpinning = true;
      }
    });
  
    // Function to handle the end of the spin animation (when it completes one full rotation)
    orangePinwheelIcon.on("animationiteration", function () {
      // Check if the pinwheel is spinning
      if (isSpinning) {
        // If spinning, continuously play the notification sound
        notificationSound.play();
      }
    });
  });
  
