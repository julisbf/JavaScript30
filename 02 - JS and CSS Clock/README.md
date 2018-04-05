# Day 2 - Javascript30 JS + CSS Clock


Paused the video and worked on my own version. Made changes on the hands css, so I could see it clearly. Got stuck with the hour functionality but eventually solved it.

Because of the extra 90deg, minutes after 45 where starting above 360, so I decided to reset it using this code:

```javascript
let degMins = (minutes < 46) ? ((minutes / 60) * 360) + 90 : (minutes - 45) * 6; // 6 = 360deg / 60mins
```  

How to reset the degrees from 360 to 0 without weird jump? I did it by adding and removing a notransition class.

##### Original Solution
	    								
![](images/original.png?raw=true) 

```javascript
const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

function setDate() {
  const now = new Date();

  const seconds = now.getSeconds();
  const secondsDegrees = ((seconds / 60) * 360) + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  const mins = now.getMinutes();
  const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
  minsHand.style.transform = `rotate(${minsDegrees}deg)`;

  const hour = now.getHours();
  const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

setInterval(setDate, 1000);

setDate();

```

##### My Solution

![](images/mine.png?raw=true)

```javascript
 const secondHand = document.querySelector(".second-hand");
const minHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");

let nowTime = new Date();
let seconds = nowTime.getSeconds();
let degSec = ((seconds / 60) * 360) + 90;
let minutes = nowTime.getMinutes();
let degMins = (minutes < 46) ? ((minutes / 60) * 360) + 90 : (minutes - 45) * 6; // 6 = 360deg / 60mins
let hour = (nowTime.getHours() <= 12) ? nowTime.getHours() : nowTime.getHours() - 12;
let degHour = hour * 30 + 90; // 30 = (360deg / 12hrs)
degHour += Math.floor(minutes / 2);


hourHand.style.transform = `rotate(${degHour}deg)`;
minHand.style.transform = `rotate(${degMins}deg)`;
secondHand.style.transform = `rotate(${degSec}deg)`;

window.setInterval(changeClock, 1000);

function changeClock() {

  if (seconds === 59) {
    degSec += 6;
    secondHand.style.transform = `rotate(${degSec}deg)`;
    degMins += 6;
    minHand.style.transform = `rotate(${degMins}deg)`;
    if (minutes % 2 === 0) {
      degHour++;
      hourHand.style.transform = `rotate(${degHour}deg)`;
    }
    minutes++;
    if (minutes === 59) {
      minutes = 0;   
    }
    seconds = 0;
  }else {
    if(degSec === 360) {
      secondHand.classList.add('notransition');
      degSec = 6;
    } else {
      degSec += 6;
    }
    secondHand.style.transform = `rotate(${degSec}deg)`;
    seconds++;
    if (degSec === 12) {
      secondHand.classList.remove('notransition');
    }
  }
}
```

