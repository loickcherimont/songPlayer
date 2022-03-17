// AUDIO PLAYER LOGIC

// Required elements:
// from HTML page
const playPauseBtn = document.querySelector('#playPauseBtn'),
      actualTimeIndic = document.querySelector('#currentTime'),
      totalDurationIndic = document.querySelector('#totalDuration'),
      backwardBtn = document.querySelector('#backwardBtn'),
      forwardBtn = document.querySelector('#forwardBtn'),
      playPauseIcon = document.querySelector('#playPauseIcon'),
      progressBar = document.querySelector('#audioProgressBar');
      
// Init the track
const music = new Audio('assets/track/An-Epic-Story.mp3');


////////////////////////////////////////////
//////////////// EXECUTION ////////////////
////////////////////////////////////////////


// *** Buttons ***
// Play/Pause button
playPauseBtn.addEventListener('click', playPauseTrack);

// Music ended
// Change icon pause in play
music.onended = () => {
    playPauseIcon.classList.remove('fa-pause');
    playPauseIcon.classList.add('fa-play');
    // reset track
    music.currentTime = 0;
};

// Backward and forward btns
forwardBtn.onclick = () => music.currentTime += 10;
backwardBtn.onclick = () => music.currentTime -= 10;

// *** Times ***
music.onplay = () => {
    setInterval(updateCurrentTime, 1000);
    setInterval(updateProgressBar, 1000);
}

// Go to selected time
progressBar.oninput = () => controlProgressBar();

////////////////////////////////////////////
//////////////// FUNCTIONS ////////////////
////////////////////////////////////////////
function playPauseTrack() {
    
    displayTotalDuration();

    if(music.paused) {
        // Play it
        // Change icon play into pause
        music.play();
        playPauseIcon.classList.remove('fa-play');
        playPauseIcon.classList.add('fa-pause');
        // Music playing
        
    } else {
        // Pause it
        // Change icon pause into play
        music.pause();
        playPauseIcon.classList.remove('fa-pause');
        playPauseIcon.classList.add('fa-play');
    }
    
}

function updateCurrentTime() {
    let actualTime;
    let currentMin, currentSec;
    
    actualTime = Math.floor(music.currentTime);
    currentMin = Math.floor(actualTime/60);
    // currentSec calculation
    // Number of sec lower than 10
    //  2 digits for currentSec
    currentSec = (actualTime % 60 < 10) ? `0${actualTime % 60}` : actualTime % 60;
    
    actualTimeIndic.innerHTML = `${currentMin}:${currentSec}`;
}

function updateProgressBar() {
    // Calculate in percent
    // position of progress bar
    let barPosition = Math.floor(music.currentTime) * (100 / Math.floor(music.duration));
    
    progressBar.value = barPosition;
}


function displayTotalDuration() {
    let totalDuration;
    let totalMin, totalSec;
    
    totalDuration = Math.floor(music.duration);
    // totalSec calculation
    // Number of sec lower than 10
    //  2 digits for totalSec
    totalSec = (totalDuration % 60 < 10) ? `0${totalDuration%60}` : totalDuration % 60;
    totalMin = Math.floor(totalDuration/60);

    
    totalDurationIndic.innerHTML = `${totalMin}:${totalSec}`; 
}

function controlProgressBar() {
    let goTo = music.duration * (progressBar.value / 100);
    music.currentTime = goTo;
}



