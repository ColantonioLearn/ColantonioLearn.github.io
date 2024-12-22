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

// counters for activation failures
let tubeDuck = 0;
let tubeStar = 0;
let tubeBall = 0;
let tubeSqueak = 0;
let boxKnobPin = 0;
let boxCordPin = 0;
let boxMarbles = 0;
let boxLight = 0;

$(document).ready(function () {
  console.log('Document ready');

  // Add click event listeners to interactive elements
  $('.icon').click(function () {
      
      var part = $(this);
      var partName = part.attr('id');
      
      console.log('Icon clicked: ' + partName);
      
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
  // console.log('Toggle part status');

  var currentStatus = part.data('status');
  var updatedStatus = currentStatus === 'on' ? 'off' : 'on';

  // Update the data-status attribute
  part.data('status', updatedStatus);

  // **Note: possibly redundant with below code
  // Remove the 'initial' class to enable animation on subsequent clicks
  // part.removeClass('initial');
}

//  TUBE TOY FUNCTIONS

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

      // Activate 75% of the time it is clicked after the first attempt
      if (coinFlipNow < 0.75) {

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
        tubeDuck++;
        console.log('TubeToy duck failed activations:');
        console.log(tubeDuck);
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
  if (inertToggleIcon.hasClass('off')) {
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
    if (starLightButtonImage.hasClass('initial')) {
      starLightButtonImage.removeClass('initial');
    }

    if (starLightImage.hasClass('initial')) {
      starLightImage.removeClass('initial');
    }

    if (starLightButtonIcon.hasClass('initial')) {
      starLightButtonIcon.removeClass('initial');

      console.log('First click on button for star light');
    }

    if (starLightButtonIcon.hasClass('off')) {

      // Flip a coin to decide if it activates
      coinFlipNow = Math.random();
      console.log('Coin flip for star light:');
      console.log(coinFlipNow);

      // Activate 75% of the time it is clicked after the first attempt
      if (coinFlipNow < 0.75) {

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
      // Fail to activate on the other half of clicks 
      } else {
        console.log('Coin flip failed');
        tubeStar++;
        console.log('TubeToy starlight failed activations:');
        console.log(tubeStar);
      }
    } else {
      // If the current status is 'on', return to starting state
      starLightButtonImage.removeClass('on');
      starLightButtonImage.addClass('off');

      starLightImage.removeClass('on');
      starLightImage.addClass('off');

      starLightButtonIcon.removeClass('on');
      starLightButtonIcon.addClass('off');

      console.log('Star Light turned off');

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
  var notificationSoundR = $('#notification-sound3R')[0];
  notificationSoundR.volume = 0.28;

  var rainbow1 = $('.function.rainbow1');
  var rainbow2 = $('.function.rainbow2');
  
    // Check if the image has the 'initial' class and remove it
    if (squeakerImage.hasClass('initial')) {
      squeakerImage.removeClass('initial');
    }

    if (rainbow1.hasClass('initial')) {
      rainbow1.removeClass('initial');
    }

    if (rainbow2.hasClass('initial')) {
      rainbow2.removeClass('initial');
    }

    if (squeakerIcon.hasClass('initial')) {
      squeakerIcon.removeClass('initial');

      console.log('First click on yellow squeaker tube');

    }

    // Check the currentStatus to determine the action
    if (squeakerIcon.hasClass('off')) {

      // Flip a coin to decide if it activates
      coinFlipNow = Math.random();
      console.log('Coin flip squeaker tube:');
      console.log(coinFlipNow);

      // Activate 75% of the time it is clicked after the first attempt
      if (coinFlipNow < 0.75) {
        // Flip switch flip if in starting position to "on" position
        squeakerImage.removeClass('off');
        squeakerImage.addClass('on');

        squeakerIcon.removeClass('off');
        squeakerIcon.addClass('on');

        rainbow1.removeClass('off');
        rainbow1.addClass('on');

        rainbow2.removeClass('off');
        rainbow2.addClass('on');

        console.log('Squeaker tube pulled, rainbow gems shimmer');

        // Play the sounds once when activating

        // squeaker tube sound
        if (notificationSound.paused) {
          notificationSound.play();
          notificationSound.currentTime = 0; // Reset audio to the beginning
          notificationSound.loop = false; // Set to only play on activation
        }
        // Rainbow gems shimmer
        if (notificationSoundR.paused) {
          notificationSoundR.play();
          notificationSoundR.loop = true; // 
        }
      // Fail to activate on the other half of clicks 
      } else {
        console.log('Coin flip failed');
        tubeSqueak++;
        console.log('TubeToy squeaker failed activations:');
        console.log(tubeSqueak);
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
      if (!notificationSoundR.paused) {
        notificationSoundR.pause();
        notificationSoundR.currentTime = 0; // Reset audio to the beginning
      }

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

  var notificationSoundB = $('#notification-sound4Ball')[0];
  notificationSoundB.volume = 0.3;
  
    // Check if the icons have the 'initial' class and remove it
    if (inertDomeIcon.hasClass('initial')) {
      inertDomeIcon.removeClass('initial');
    }

    if (leverIcon.hasClass('initial')) {
      leverIcon.removeClass('initial');

      console.log("First click on dome's red lever");
    }

    // Check the currentStatus to determine the action
    if (leverIcon.hasClass('off')) {
        
      // Flip a coin to decide if it activates
      coinFlipNow = Math.random();
      console.log('Coin flip for red lever activation:');
      console.log(coinFlipNow);

      // Activate 75% of the time it is clicked after the first attempt
      if (coinFlipNow < 0.75) {

        // Flip switch flip if in starting position to "on" position
        if (leverImage.hasClass('initial')) {
          leverImage.removeClass('initial');
        }
    
        if (duckDomeImage.hasClass('initial')) {
          duckDomeImage.removeClass('initial');
        }
    
        if (bounceBallImage.hasClass('initial')) {
          bounceBallImage.removeClass('initial');
        }

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

        // ball bouncing in dome
        if (notificationSoundB.paused) {
          notificationSoundB.play();
          notificationSoundB.loop = true; // 
        }
      // Fail to activate on the other half of clicks 
      } else {
        console.log('Coin flip failed');
        tubeBall++;
        console.log('TubeToy ball dome failed activations:');
        console.log(tubeBall);
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

      console.log('Dome becomes occluded');

      // Pause the sound only if it's currently playing
      if (notificationSoundBuild.paused) {
        notificationSoundBuild.play();
        notificationSoundBuild.loop = false; 
      }

      // Pause the sound only if it's currently playing
      if (!notificationSoundB.paused) {
        notificationSoundB.pause();
        notificationSoundB.currentTime = 0; // Reset audio to the beginning
      }
    }
  
  
}

// TUBE TOY FUNCTIONS END HERE

//  BOX TOY FUNCTIONS

// Orange Pinwheel function
function spinOrangePinwheel(part, currentStatus) {
  

  // adding rotation of blue knob
  var blueKnobImage = $('.function.blueKnobImage');
  var blueKnobIcon = $('.icon.blueKnobIcon ');

  var orangePinwheelImage = $('.function.orangePinwheelImage');
  var orangePinwheelIcon = $('.icon.orangePinwheelIcon');  // Corrected selector
  var notificationSound = $('#notification-sound1')[0]; // Get the audio element
  notificationSound.volume = 0.7;

  // Check if the image has the 'initial' class and remove it
  if (blueKnobIcon.hasClass('initial')) {
    
    blueKnobIcon.removeClass('initial');

    console.log('First click on blue knob for orange pinwheel');
  } else {
    // Toggle spinning elements based on status
    if (blueKnobIcon.hasClass('off')) {

      // Flip a coin to decide if it activates
      coinFlipNow = Math.random();
      console.log('Coin flip for orange pinwheel:');
      console.log(coinFlipNow);

      // Activate 75% of the time it is clicked after the first attempt
      if (coinFlipNow < 0.75) {

        console.log('Spin Orange Pinwheel');
      
        orangePinwheelImage.removeClass('initial');
        orangePinwheelIcon.removeClass('initial');
        blueKnobImage.removeClass('initial');
  
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

      // Fail to activate on the other half of clicks 
      } else {
        console.log('Coin flip failed');
        boxKnobPin++;
        console.log('BoxToy knob failed activations:');
        console.log(boxKnobPin);
      }
      
    } else {
      
      // If the current status is 'on', stop spinning and pause sound
      
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
}

// Green Light & Switch
function boxLightOn(part, currentStatus) {
  var middleSwitchIcon = $('.icon.middleSwitchIcon');
  var middleSwitchImage = $('.function.middleSwitchImage');
  var boxLightImage = $('.function.boxLightImage');
  
  var notificationSound = $('#notification-sound2')[0];
  notificationSound.volume = 0.45;
  
    // Check if the image has the 'initial' class and remove it
    if (middleSwitchImage.hasClass('initial')) {
      middleSwitchImage.removeClass('initial');
    }

    if (boxLightImage.hasClass('initial')) {
      boxLightImage.removeClass('initial');
    }

    if (middleSwitchIcon.hasClass('initial')) {

      middleSwitchIcon.removeClass('initial');
      
      console.log('First click on switch for box light');
    }

    // Check the currentStatus to determine the action
    if (middleSwitchIcon.hasClass('off')) {

      // Flip a coin to decide if it activates
      coinFlipNow = Math.random();
      console.log('Coin flip for box light:');
      console.log(coinFlipNow);

      // Activate 75% of the time it is clicked after the first attempt
      if (coinFlipNow < 0.75) {
        console.log('Coin flip successful');

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
        console.log('Coin flip failed');
        boxLight++;
        console.log('BoxToy light switch failed activations:');
        console.log(boxLight);
      }

    } else {
      // If the current status is 'on', return to starting state
      middleSwitchIcon.removeClass('on');
      middleSwitchIcon.addClass('off');

      middleSwitchImage.removeClass('on');
      middleSwitchImage.addClass('off');

      boxLightImage.removeClass('on');
      boxLightImage.addClass('off');

      console.log('Box Light turned off');

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
      console.log('First click on button on blue cord for rainbow pinwheel');
    }
    
    
    // Check the currentStatus to determine the action
    if (blueCordIcon.hasClass('off')) {
  
      // Flip a coin to decide if it activates
      coinFlipNow = Math.random();
      console.log('Coin flip for blue cord pull:');
      console.log(coinFlipNow);

      // Activate 75% of the time it is clicked after the first attempt
      if (coinFlipNow < 0.75) {

        if (blueCordImage.hasClass('initial')) {
          blueCordImage.removeClass('initial');
        }
    
        if (rainbowPinwheelImage.hasClass('initial')) {
          rainbowPinwheelImage.removeClass('initial');
        }

        console.log('Coin flip successful');

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

      // Fail to activate on the other half of clicks 
      } else {
        console.log('Coin flip failed');
        boxCordPin++;
        console.log('BoxToy cord pull failed activations:');
        console.log(boxCordPin);
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
    console.log('First click on button for marble rattle');      
  } 
  
  // Check the currentStatus to determine the action
  if (marbleButtonIcon.hasClass('off')) {

    // Flip a coin to decide if it activates
    coinFlipNow = Math.random();
    console.log('Coin flip for marble rattle:');
    console.log(coinFlipNow);

    // Activate 75% of the time it is clicked after the first attempt
    if (coinFlipNow < 0.75) { 

      // Flip switch flip if in starting position to "on" position
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

   // Fail to activate on the other half of clicks 
    } else {
      console.log('Coin flip failed');
      boxMarbles++;
      console.log('BoxToy marble button failed activations:');
      console.log(boxMarbles);
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
  if (orangeSliderIcon.hasClass('off')) {
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