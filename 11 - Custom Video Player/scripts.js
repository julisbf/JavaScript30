// Add visual elements
const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const ranges = document.querySelectorAll('.player__slider');
const skips = document.querySelectorAll('[data-skip]');
const fullscreen = document.querySelector('.fullscreen');
const speedLabel = document.querySelector('.player__label');

let mousedown = false;

video.addEventListener('click', toggleVideo);
video.addEventListener('pause', updateButton);
video.addEventListener('play', updateButton);
video.addEventListener('timeupdate', updateProgress);

toggle.addEventListener('click', toggleVideo);

ranges.forEach(range => range.addEventListener('change', handleRange));
ranges.forEach(range => range.addEventListener('mousemove', handleRange));

progress.addEventListener('click', updateVideoProgress);
progress.addEventListener('mousemove', evt => {
  if (mousedown) updateVideoProgress(evt);
});
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));

skips.forEach(skip => skip.addEventListener('click', skipVideo));

fullscreen.addEventListener('click', handleFullscreen);

function toggleVideo() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function handleRange() {
  video[this.name] = this.value;
  if (this.name === 'playbackRate') {
    speedLabel.textContent = `${this.value}x`;
  }
}

function updateProgress(evt) {
  const position = video.currentTime / video.duration * 100;
  progressBar.style.flexBasis = `${position}%`;
}

function updateVideoProgress(evt) {
  evt.preventDefault();
  const position = evt.offsetX / progress.offsetWidth * video.duration;
  video.currentTime = position;
}

function skipVideo() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleFullscreen() {
  const elem = player;
  const isFullScreen =
    (document.fullscreenElement && document.fullscreenElement !== null) ||
    (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
    (document.webkitFullScreenElement &&
      document.webkitFullScreenElement !== null) ||
    (document.msFullscreenElement && document.msFullscreenElement !== null);

  if (isFullScreen) {
    fullscreen.innerHTML = `<i class="material-icons">fullscreen</i>`;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (document.mozFullScreenElement) {
      document.mozCancelFullScreen();
    } else if (document.webkitFullScreenElement) {
      document.webkitExitFullscreen();
    } else if (document.msFullscreenElement) {
      document.msExitFullscreen();
    }
  } else {
    fullscreen.innerHTML = `<i class="material-icons">fullscreen_exit</i>`;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  }
}
