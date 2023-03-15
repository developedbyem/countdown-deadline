const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// set giveaway date---------------------------------
const giveaway = document.querySelector(".giveaway");

// today date
const todayDate = new Date();
const todayYear = todayDate.getFullYear();
const todayMonth = todayDate.getMonth();
const todayDay = todayDate.getDate();

// future date
const futureDate = new Date(todayYear, todayMonth, todayDay + 10, 11, 30, 0);

// get future year
const futureYear = futureDate.getFullYear();

// get future month
let futureMonth = futureDate.getMonth();
futureMonth = months[futureMonth];

// get future day
const futureDay = futureDate.getDate();

// get future weekday
let futureWeekday = futureDate.getDay();
futureWeekday = weekdays[futureWeekday];

const futureHour = futureDate.getHours();
const futureMin = futureDate.getMinutes();

giveaway.textContent = `giveaway ends on ${futureWeekday}, ${futureDay} ${futureMonth} ${futureYear} ${futureHour}:${futureMin}am`;

// set deadline---------------------------------
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

// get future in ms
const futureTime = futureDate.getTime();

function remainingTime() {
  // get today in ms
  const todayTime = new Date().getTime();

  // difference between today and future in ms
  const t = futureTime - todayTime;

  // how much ms is oneDay/oneHour/oneMinute
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  // remain days/hours/minutes/seconds
  const days = Math.floor(t / oneDay);
  const hours = Math.floor((t % oneDay) / oneHour);
  const minutes = Math.floor((t % oneHour) / oneMinute);
  const seconds = Math.floor((t % oneMinute) / 1000);

  const values = [days, hours, minutes, seconds];

  // if values<10
  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  }

  // set remain values
  items.forEach(function (item, index) {
    item.textContent = format(values[index]);
  });

  // if remain value is less than 0
  if (t < 0) {
    clearInterval(countDown);
    deadline.innerHTML = `<h4 class="expired">Sorry, this giveaway has expired!</h4>`;
  }
}
// set interval for countDown timer
let countDown = setInterval(remainingTime, 1000);
remainingTime();
