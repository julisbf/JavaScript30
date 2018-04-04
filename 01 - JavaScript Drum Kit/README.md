# Day 1 - Javascript30 Drum Kit


Paused the video and worked on my own version. Struggled with some vanilla js but after checked MDN, would able 
to continue and finish it. After watched the solution video, learned how to access element's attributes and transitioned event. Only changed that I made to my solution was get access to element's attributes.

##### Original Solution

```javascript
function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
 }

function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if (!audio) return;
  
  key.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
}
const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);
```

##### My Solution

```javascript
	
window.addEventListener("keydown", playSound);
window.addEventListener("keyup", playSound);

function playSound(evt) {

//keyCode is deprecated, that's why need to get its value
  const pressKey = evt.key.toUpperCase().charCodeAt(0).toString(); 
  const key = document.querySelector(`div[data-key="${pressKey}"`);

  if (!key) return;

  if (evt.type === "keydown") {
   key.classList.add("playing");
   getSound(pressKey);
  } else {
   key.classList.remove("playing");
  }
 }

function getSound(key) {
  const sound = document.querySelector(`audio[data-key="${key}"]`); // Access tag attibute
  sound.currentTime = 0; // Reset audio current time
  sound.play();	
}
```
