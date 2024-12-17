// interaction.js

// Disable right-click on the entire document
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

// Disable dragging for all images
document.addEventListener('dragstart', function (e) {
  e.preventDefault();
});

$('toy-container').hide();
var allDoneAudio = document.getElementById("allDoneAudio");
var allDoneRepeatAudio = document.getElementById("allDoneRepeatAudio");
var timesUpAudio = document.getElementById("timesUpAudio");

// Pause all audio
function pauseAllAudio() {
  var audioElements = document.querySelectorAll('audio');

  audioElements.forEach(function(audio) {
    audio.pause();
  });
}

pauseAllAudio();

$(document).ready(function () {
  console.log('Document ready');

  // Add click event listeners to interactive elements
  $('.icon').click(function () {
      console.log('Icon clicked');

      var part = $(this);
      var partName = part.attr('id');
      
      // Retrieve toyName from the data-toy attribute of the container element
      var toyName = $('.toy-container').data('toy') || 'defaultToyName';
      
      var currentStatus = part.data('status') || 'off';

      // Toggle the status of the part (lit/darkened)
      togglePartStatus(part);

      // tubeToy Tube Toy activators

      // If the clicked part is the whiteDuckIcon, pop up and squeak, or disappear
      if (part.hasClass('whiteDuckIcon')) {
        duckSqueak(part, currentStatus);
      }

      // If the clicked part is the inertToggleIcon, flip the switch
      if (part.hasClass('inertToggleIcon')) {
        flipSwitch(part, currentStatus);
      }

      // turn on star light
      if (part.hasClass('starLightButtonIcon')) {
        starLight(part, currentStatus);
      }

      // pull squeaker tube
      if (part.hasClass('squeakerIcon')) {
        squeakerPull(part, currentStatus);
      }

      // reveal yellow duck in dome
      if (part.hasClass('leverIcon')) {
        duckDomeLever(part, currentStatus);
      }

      // boxToy Box Toy activators

      // If the clicked part is the orangePinwheelIcon, start or stop spinning
      if (part.hasClass('blueKnobIcon')) {
        spinOrangePinwheel(part, currentStatus);
      }
      
      // From old version where clicking the pinwheel made it spin
      // if (part.hasClass('orangePinwheelIcon')) {
      //   spinOrangePinwheel(part, currentStatus);
      // }

      // turn on green box light
      if (part.hasClass('middleSwitchIcon')) {
        boxLightOn(part, currentStatus);
      }

      // pull cord to spin rainbow wheel
      if (part.hasClass('blueCordIcon')) {
        cordSpinWheel(part, currentStatus);
      }

      // pull cord to spin rainbow wheel
      if (part.hasClass('marbleButtonIcon')) {
        rattleMarbles(part, currentStatus);
      }

      // If the clicked part is the orangeSliderIcon, slide the switch up or down
      if (part.hasClass('orangeSliderIcon')) {
        orangeSlide(part, currentStatus);
      }

  });

  // Add the 'initial' class to the elements on page load if 'spin' class is not present
  $('.icon, .function').addClass('initial');
});

// JS function for turning toy function on or off
function togglePartStatus(part) {
  console.log('Toggle part status');

  var currentStatus = part.data('status');
  var updatedStatus = currentStatus === 'on' ? 'off' : 'on';

  // Update the data-status attribute
  part.data('status', updatedStatus);

  // Remove the 'initial' class to enable animation on subsequent clicks
  part.removeClass('initial');
}

//  TUBE TOY FUNCTIONS

function duckSqueak(part, currentStatus) {
  var whiteDuckImage = $('.function.whiteDuckImage');
  var inertDuckIcon = $('.icon.inertDuckIcon');
  var notificationSound = $('#notification-sound1')[0];
  notificationSound.volume = 0.35;

  // Check if the image has the 'initial' class and remove it
  if (whiteDuckImage.hasClass('initial')) {
    whiteDuckImage.removeClass('initial');
  }

  if (inertDuckIcon.hasClass('initial')) {
    inertDuckIcon.removeClass('initial');
  }

  // Check the currentStatus to determine the action
  if (currentStatus === 'off') {
    // Start squeak animation
    whiteDuckImage.removeClass('off');
    whiteDuckImage.addClass('on');

    inertDuckIcon.removeClass('off');
    inertDuckIcon.addClass('on');

    console.log('White Duck Pop-up & Squeak');

    // Play the sound once when activating
    if (notificationSound.paused) {
      notificationSound.play();
      notificationSound.loop = false; // Set to only play on activation
    }
  } else {
    // If the current status is 'on', stop squeak animation and hide the image
    whiteDuckImage.removeClass('on');
    whiteDuckImage.addClass('off');

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

function flipSwitch(part, currentStatus) {
  var inertToggleImage = $('.function.inertToggleImage');
  var inertToggleIcon = $('.icon.inertToggleIcon');
  // var notificationSound = $('#notification-sound2')[0];
  
    // Check if the image has the 'initial' class and remove it
    if (inertToggleImage.hasClass('initial')) {
      inertToggleImage.removeClass('initial');
    }

    if (inertToggleIcon.hasClass('initial')) {
      inertToggleIcon.removeClass('initial');
    }
  
  // Check the currentStatus to determine the action
  if (currentStatus === 'off') {
    // Flip switch flip if in starting position to "on" position
    inertToggleImage.removeClass('off');
    inertToggleImage.addClass('on');

    inertToggleIcon.removeClass('off');
    inertToggleIcon.addClass('on');

    console.log('Toggle switched to second position');

    // Play the sound once when activating
    // if (notificationSound.paused) {
    //   notificationSound.play();
    //   notificationSound.loop = false; // Set to only play on activation
    // }
  } else {
    // If the current status is 'on', return to starting state
    inertToggleImage.removeClass('on');
    inertToggleImage.addClass('off');

    inertToggleIcon.removeClass('on');
    inertToggleIcon.addClass('off');


    console.log('Toggle switched to first position');

    // Pause the sound only if it's currently playing
    // if (!notificationSound.paused) {
    //   notificationSound.pause();
    //   notificationSound.currentTime = 0; // Reset audio to the beginning
    // }
  }
}

function starLight(part, currentStatus) {
  var starLightButtonIcon = $('.icon.starLightButtonIcon');
  var starLightButtonImage = $('.function.starLightButtonImage');
  var starLightImage = $('.function.starLightImage');
  
  var notificationSound = $('#notification-sound2')[0];
  
    // Check if the image has the 'initial' class and remove it
    if (starLightButtonIcon.hasClass('initial')) {
      starLightButtonIcon.removeClass('initial');
    }

    if (starLightButtonImage.hasClass('initial')) {
      starLightButtonImage.removeClass('initial');
    }

    if (starLightImage.hasClass('initial')) {
      starLightImage.removeClass('initial');
    }
  
  // Check the currentStatus to determine the action
  if (currentStatus === 'off') {
    // Flip switch flip if in starting position to "on" position
    starLightButtonIcon.removeClass('off');
    starLightButtonIcon.addClass('on');

    starLightButtonImage.removeClass('off');
    starLightButtonImage.addClass('on');

    starLightImage.removeClass('off');
    starLightImage.addClass('on');

    console.log('Star Light Button Pressed');

    // Play the sound once when activating
    if (notificationSound.paused) {
      notificationSound.play();
      notificationSound.loop = true;
    }
  } else {
    // If the current status is 'on', return to starting state
    starLightButtonImage.removeClass('on');
    starLightButtonImage.addClass('off');

    starLightImage.removeClass('on');
    starLightImage.addClass('off');

    starLightButtonIcon.removeClass('on');
    starLightButtonIcon.addClass('off');

    console.log('Star Light Button Pressed "un-pressed"');

    // Pause the sound only if it's currently playing
    if (!notificationSound.paused) {
      notificationSound.pause();
      notificationSound.currentTime = 0; // Reset audio to the beginning
    }
  }
}

function squeakerPull(part, currentStatus) {
  var squeakerImage = $('.function.squeakerImage');
  var squeakerIcon = $('.icon.squeakerIcon');
  var notificationSound = $('#notification-sound3')[0];

  var rainbow1 = $('.function.rainbow1');
  var rainbow2 = $('.function.rainbow2');
  
    // Check if the image has the 'initial' class and remove it
    if (squeakerImage.hasClass('initial')) {
      squeakerImage.removeClass('initial');
    }

    if (squeakerIcon.hasClass('initial')) {
      squeakerIcon.removeClass('initial');
    }

    if (rainbow1.hasClass('initial')) {
      rainbow1.removeClass('initial');
    }

    if (rainbow2.hasClass('initial')) {
      rainbow2.removeClass('initial');
    }
  
  // Check the currentStatus to determine the action
  if (currentStatus === 'off') {
    // Flip switch flip if in starting position to "on" position
    squeakerImage.removeClass('off');
    squeakerImage.addClass('on');

    squeakerIcon.removeClass('off');
    squeakerIcon.addClass('on');

    rainbow1.removeClass('off');
    rainbow1.addClass('on');

    rainbow2.removeClass('off');
    rainbow2.addClass('on');

    console.log('Squeaker tube pulled from original position');

    // Play the sound once when activating
    if (notificationSound.paused) {
      notificationSound.play();
      notificationSound.currentTime = 0; // Reset audio to the beginning
      notificationSound.loop = false; // Set to only play on activation
    }
  } else {
    // If the current status is 'on', return to starting state
    squeakerImage.removeClass('on');
    squeakerImage.addClass('off');

    squeakerIcon.removeClass('on');
    squeakerIcon.addClass('off');

    rainbow1.removeClass('on');
    rainbow1.addClass('off');

    rainbow2.removeClass('on');
    rainbow2.addClass('off');

    console.log('Squeaker tube returned to start');

    // Pause the sound only if it's currently playing
    if (notificationSound.paused) {
      notificationSound.play();
      notificationSound.currentTime = 0; // Reset audio to the beginning
      notificationSound.loop = false; // Set to only play on activation
    }
  }
}

function duckDomeLever(part, currentStatus) {
  var leverIcon = $('.icon.leverIcon');
  var leverImage = $('.function.leverImage');
  var duckDomeImage = $('.function.duckDomeImage');
  var bounceBallImage = $('.function.bounceBallImage');
  var inertDomeIcon = $('.icon.inertDomeIcon'); 
  
  var notificationSoundDissolve = $('#notification-sound4Dissolve')[0];
  var notificationSoundBuild = $('#notification-sound4Build')[0];
  
    // Check if the image has the 'initial' class and remove it
    if (leverIcon.hasClass('initial')) {
      leverIcon.removeClass('initial');
    }

    if (leverImage.hasClass('initial')) {
      leverImage.removeClass('initial');
    }

    if (duckDomeImage.hasClass('initial')) {
      duckDomeImage.removeClass('initial');
    }

    if (bounceBallImage.hasClass('initial')) {
      bounceBallImage.removeClass('initial');
    }

    if (inertDomeIcon.hasClass('initial')) {
      inertDomeIcon.removeClass('initial');
    }
  
  // Check the currentStatus to determine the action
  if (currentStatus === 'off') {
    // Flip switch flip if in starting position to "on" position
    leverIcon.removeClass('off');
    leverIcon.addClass('on');

    leverImage.removeClass('off');
    leverImage.addClass('on');

    duckDomeImage.removeClass('off');
    duckDomeImage.addClass('on');

    bounceBallImage.removeClass('off');
    bounceBallImage.addClass('on');

    console.log('Bouncing Ball revealed');

    // Play the sound once when activating
    if (notificationSoundDissolve.paused) {
      notificationSoundDissolve.play();
      notificationSoundDissolve.loop = false;
    }
  } else {
    // If the current status is 'on', return to starting state
    leverIcon.removeClass('on');
    leverIcon.addClass('off');

    leverImage.removeClass('on');
    leverImage.addClass('off');

    duckDomeImage.removeClass('on');
    duckDomeImage.addClass('off');

    bounceBallImage.removeClass('on');
    bounceBallImage.addClass('off');

    console.log('Dome Shrouded');

    // Pause the sound only if it's currently playing
    if (notificationSoundBuild.paused) {
      notificationSoundBuild.play();
      notificationSoundBuild.loop = false; 
    }
  }
}

// TUBE TOY FUNCTIONS END HERE

//  BOX TOY FUNCTIONS

// Orange Pinwheel function
var isSpinning = false; // Flag to track if spinning animation is in progress
function spinOrangePinwheel(part, currentStatus) {
  console.log('Spin Orange Pinwheel');

  // adding rotation of blue knob
  var blueKnobImage = $('.function.blueKnobImage');
  var blueKnobIcon = $('.function.blueKnobIcon ');

  var orangePinwheelImage = $('.function.orangePinwheelImage');
  var orangePinwheelIcon = $('.icon.orangePinwheelIcon');  // Corrected selector
  var notificationSound = $('#notification-sound1')[0]; // Get the audio element
  notificationSound.volume = 0.7;

  // Check if the image has the 'initial' class and remove it
  if (orangePinwheelImage.hasClass('initial')) {
    orangePinwheelImage.removeClass('initial');
    orangePinwheelIcon.removeClass('initial');
    blueKnobImage.removeClass('initial');
  }

  // Toggle spinning elements based on status
  if (currentStatus === 'off' && !isSpinning) {
    // Start spinning animation
    isSpinning = true;
    
    blueKnobImage.addClass('on');
    blueKnobImage.removeClass('off');

    blueKnobIcon.addClass('on');
    blueKnobIcon.removeClass('off');

    orangePinwheelImage.addClass('on');
    orangePinwheelImage.removeClass('off');
    orangePinwheelImage.addClass('spin');

    orangePinwheelIcon.addClass('on');
    orangePinwheelIcon.removeClass('off');
    orangePinwheelIcon.addClass('spin');
    

    // Play the sound if it's not already playing
    if (notificationSound.paused) {
      notificationSound.play();
      notificationSound.loop = true; // Set to loop continuously
    }
  } else {
    
    // If the current status is 'on', stop spinning and pause sound
    // Stop spinning animation
    isSpinning = false;
    
    blueKnobImage.addClass('off');
    blueKnobImage.removeClass('on');

    blueKnobIcon.addClass('off');
    blueKnobIcon.removeClass('on');

    orangePinwheelImage.addClass('off');
    orangePinwheelImage.removeClass('on');
    orangePinwheelImage.removeClass('spin');

    orangePinwheelIcon.addClass('off');
    orangePinwheelIcon.removeClass('on');
    orangePinwheelIcon.removeClass('spin');  // Corrected line

    // Pause the sound only if it's currently playing
    if (!notificationSound.paused) {
      notificationSound.pause();
      notificationSound.currentTime = 0; // Reset audio to the beginning
    }
  }
}

// Green Light & Switch
function boxLightOn(part, currentStatus) {
  var middleSwitchIcon = $('.icon.middleSwitchIcon');
  var middleSwitchImage = $('.function.middleSwitchImage');
  var boxLightImage = $('.function.boxLightImage');
  
  var notificationSound = $('#notification-sound2')[0];
  notificationSound.volume = 0.45;
  
    // Check if the image has the 'initial' class and remove it
    if (middleSwitchIcon.hasClass('initial')) {
      middleSwitchIcon.removeClass('initial');
    }

    if (middleSwitchImage.hasClass('initial')) {
      middleSwitchImage.removeClass('initial');
    }

    if (boxLightImage.hasClass('initial')) {
      boxLightImage.removeClass('initial');
    }
  
  // Check the currentStatus to determine the action
  if (currentStatus === 'off') {
    // Flip switch flip if in starting position to "on" position
    middleSwitchIcon.removeClass('off');
    middleSwitchIcon.addClass('on');

    middleSwitchImage.removeClass('off');
    middleSwitchImage.addClass('on');

    boxLightImage.removeClass('off');
    boxLightImage.addClass('on');

    console.log('Box Light Button Pressed');

    // Play the sound when activating
    if (notificationSound.paused) {
      notificationSound.play();
      notificationSound.loop = true; // Set to loop
    }
   } else {
    // If the current status is 'on', return to starting state
    middleSwitchIcon.removeClass('on');
    middleSwitchIcon.addClass('off');

    middleSwitchImage.removeClass('on');
    middleSwitchImage.addClass('off');

    boxLightImage.removeClass('on');
    boxLightImage.addClass('off');

    console.log('Box Light Switch "un-pressed"');

    // Pause the sound only if it's currently playing
    if (!notificationSound.paused) {
      notificationSound.pause();
      notificationSound.currentTime = 0; // Reset audio to the beginning
    }
  }
}

// Blue Cord & Rainbow Pinwheel
function cordSpinWheel(part, currentStatus) {
  var blueCordIcon = $('.icon.blueCordIcon');
  var blueCordImage = $('.function.blueCordImage');
  var rainbowPinwheelImage = $('.function.rainbowPinwheelImage');
  
  // var notificationSoundA = $('#notification-sound2a')[0];
  // var notificationSoundB = $('#notification-sound2b')[0];
  var notificationSoundC = $('#notification-sound2c')[0];
  
    // Check if the image has the 'initial' class and remove it
    if (blueCordIcon.hasClass('initial')) {
      blueCordIcon.removeClass('initial');
    }

    if (blueCordImage.hasClass('initial')) {
      blueCordImage.removeClass('initial');
    }

    if (rainbowPinwheelImage.hasClass('initial')) {
      rainbowPinwheelImage.removeClass('initial');
    }
  
  // Check the currentStatus to determine the action
  if (currentStatus === 'off') {
    // Flip switch flip if in starting position to "on" position
    blueCordIcon.removeClass('off');
    blueCordIcon.addClass('on');

    blueCordImage.removeClass('off');
    blueCordImage.addClass('on');

    rainbowPinwheelImage.removeClass('off');
    rainbowPinwheelImage.addClass('on');

    console.log('Cord pulled, rainbow wheel spinning');

    // Play the sound once when activating

    // rainbow pinwheel crank
    if (notificationSoundC.paused) {
      notificationSoundC.play();
      notificationSoundC.loop = true; // 
    }
   } else {
    // If the current status is 'on', return to starting state
    blueCordIcon.removeClass('on');
    blueCordIcon.addClass('off');

    blueCordImage.removeClass('on');
    blueCordImage.addClass('off');

    rainbowPinwheelImage.removeClass('on');
    rainbowPinwheelImage.addClass('off');

    console.log('Cord pulled, rainbow wheel stopped');

    // Pause the sound only if it's currently playing
    if (!notificationSoundC.paused) {
      notificationSoundC.pause();
      notificationSoundC.currentTime = 0; // Reset audio to the beginning
    }
  }
}

// Blue & Orange Marbles
function rattleMarbles(part, currentStatus) {
  var marbleButtonIcon = $('.icon.marbleButtonIcon');
  var marbleButtonImage = $('.function.marbleButtonImage');
  
  var orangeMarbleImage = $('.function.orangeMarbleImage');
  var blueMarbleImage = $('.function.blueMarbleImage');
  
  var orangeMarbleIcon = $('.icon.orangeMarbleIcon');
  var blueMarbleIcon = $('.icon.blueMarbleIcon');

  var notificationSound = $('#notification-sound4')[0];
  
    // Check if the image has the 'initial' class and remove it
    if (marbleButtonIcon.hasClass('initial')) {
      marbleButtonIcon.removeClass('initial');
    }

    if (marbleButtonImage.hasClass('initial')) {
      marbleButtonImage.removeClass('initial');
    }

    if (orangeMarbleImage.hasClass('initial')) {
      orangeMarbleImage.removeClass('initial');
    }
    
    if (blueMarbleImage.hasClass('initial')) {
      blueMarbleImage.removeClass('initial');
    }

    if (orangeMarbleIcon.hasClass('initial')) {
      orangeMarbleIcon.removeClass('initial');
    }

    if (blueMarbleIcon.hasClass('initial')) {
      blueMarbleIcon.removeClass('initial');
    }
  
  // Check the currentStatus to determine the action
  if (currentStatus === 'off') {
    // Flip switch flip if in starting position to "on" position
    marbleButtonIcon.removeClass('off');
    marbleButtonIcon.addClass('on');

    marbleButtonImage.removeClass('off');
    marbleButtonImage.addClass('on');

    orangeMarbleImage.removeClass('off');
    orangeMarbleImage.addClass('on');

    blueMarbleImage.removeClass('off');
    blueMarbleImage.addClass('on');

    orangeMarbleIcon.removeClass('off');
    orangeMarbleIcon.addClass('on');

    blueMarbleIcon.removeClass('off');
    blueMarbleIcon.addClass('on');

    console.log('Air pushes marbles up, rattle');

    // Play the sound once when activating
    if (notificationSound.paused) {
      notificationSound.play();
      notificationSound.loop = true;
    }
   } else {
    // If the current status is 'on', return to starting state
    marbleButtonIcon.removeClass('on');
    marbleButtonIcon.addClass('off');

    marbleButtonImage.removeClass('on');
    marbleButtonImage.addClass('off');

    orangeMarbleImage.removeClass('on');
    orangeMarbleImage.addClass('off');

    blueMarbleImage.removeClass('on');
    blueMarbleImage.addClass('off');

    orangeMarbleIcon.removeClass('on');
    orangeMarbleIcon.addClass('off');

    blueMarbleIcon.removeClass('on');
    blueMarbleIcon.addClass('off');

    console.log('Air turns off, marbles drop');

    // Pause the sound only if it's currently playing
    setTimeout(function () {
      if (!notificationSound.paused) {
          notificationSound.pause();
          notificationSound.currentTime = 0; // Reset audio to the beginning
      }
    }, 410);
    // delay by sound pausing by 0.41s, just over length of drop animation
  }
}

// Slide orange knob up and down
function orangeSlide(part, currentStatus) {
  var orangeSliderIcon = $('.icon.orangeSliderIcon');
  var orangeSliderImage = $('.orangeSliderImage');
  
    // Check if the image has the 'initial' class and remove it
    if (orangeSliderIcon.hasClass('initial')) {
      orangeSliderIcon.removeClass('initial');
    }

    if (orangeSliderImage.hasClass('initial')) {
      orangeSliderImage.removeClass('initial');
    }
  
  // Check the currentStatus to determine the action
  if (currentStatus === 'off') {
    // Flip switch flip if in starting position to "on" position
    orangeSliderIcon.removeClass('off');
    orangeSliderIcon.addClass('on');

    orangeSliderImage.removeClass('off');
    orangeSliderImage.addClass('on');

    console.log('Orange Slider moves down');

   } else {
    // If the current status is 'on', return to starting state
    orangeSliderIcon.removeClass('on');
    orangeSliderIcon.addClass('off');

    orangeSliderImage.removeClass('on');
    orangeSliderImage.addClass('off');

    console.log('Orange Slider moves up');  
  }
}

// BOX TOY FUNCTIONS END HERE