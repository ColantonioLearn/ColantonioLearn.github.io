// just here as an example of how to make
// function activators probabilistic instead
// of deterministic.

function duckSqueak(part, currentStatus) {
    var whiteDuckImage = $('.function.whiteDuckImage');
    var whiteDuckIcon = $('.icon.whiteDuckIcon');
    var inertDuckIcon = $('.icon.inertDuckIcon');
    var notificationSound = $('#notification-sound1')[0];
    notificationSound.volume = 0.15;
  
    // Check if the image has the 'initial' class and remove it
    if (whiteDuckImage.hasClass('initial')) {
      whiteDuckImage.removeClass('initial');
    }
  
    if (inertDuckIcon.hasClass('initial')) {
      inertDuckIcon.removeClass('initial');
    }
  
    if (whiteDuckIcon.hasClass('initial')) {
  
      // "ignore" the first click on the activator icon
      whiteDuckIcon.removeClass('initial');
      console.log('First click on button for white duck');
  
    } else {
  
      // Check the currentStatus to determine the action
      if (whiteDuckIcon.hasClass('off')) {
  
        // Flip a coin to decide if it activates
        coinFlipNow = Math.random();
        console.log('Coin flip for white duck:');
        console.log(coinFlipNow);
  
        // Activate only half the time it is clicked after the first attempt
        if (coinFlipNow >= 0.5) {
  
          console.log('Coin flip successful');
  
          // Start squeak animation
          whiteDuckImage.removeClass('off');
          whiteDuckImage.addClass('on');
  
          whiteDuckIcon.removeClass('off');
          whiteDuckIcon.addClass('on');
  
          inertDuckIcon.removeClass('off');
          inertDuckIcon.addClass('on');
  
          console.log('White Duck Pop-up & Squeak');
  
          // Play the sound once when activating
          if (notificationSound.paused) {
            notificationSound.play();
            notificationSound.loop = false; // Set to only play on activation
          }
        
        // Fail to activate on the other half of clicks 
        } else {
          console.log('Coin flip failed');
        }
      } else {
          // If the current status is 'on', stop animation and hide the image
          whiteDuckImage.removeClass('on');
          whiteDuckImage.addClass('off');
  
          whiteDuckIcon.removeClass('on');
          whiteDuckIcon.addClass('off');
  
          inertDuckIcon.removeClass('on');
          inertDuckIcon.addClass('off');
  
          console.log('White Duck Hides Back in Tube');
  
          // Pause the sound only if it's currently playing
          if (!notificationSound.paused) {
            notificationSound.pause();
            notificationSound.currentTime = 0; // Reset audio to the beginning
          }
      }
    }  
  }