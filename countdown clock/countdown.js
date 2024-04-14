// styling the array for months and weekdays
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  
  //This line finds the part of the webpage where we'll put our giveaway info(h4).
  const giveaway = document.querySelector ('.giveaway');

//   addressing the deadline class inside the html
  const deadline = document.querySelector('.deadline');

  //addressing the individual h4 of parent div of each hours, days, etc
  //querySelector all selects all the div with class name deadline-format
  const deadlineFormat = document.querySelectorAll ('.deadline-format h4');
 


  // working on the date when the giveaway will end
  // since month in js is 0-index based, june will be 5 not 06
  // ===========
  // let futureDate = new Date (2024, 5, 19, 21, 0, 0);
  // ===========
  // stands for year, month(june is 6-1 =5), date, hours(24 e.g 21:00 for 9pm), mins(30) i used (0), secs(0), millisecs
  // console.log (futureDate); showed the actual date when new Date is ()



  // To setup the code to check the current date of each year calender in real world(daily)
  let tempDate = new Date();
  let tempYear = tempDate.getFullYear();
  let tempMonth = tempDate.getMonth();
  let tempDay = tempDate.getDate();


  // To set up date in the future and to add 10 days to the main date of the year
  //with time of  9pm 0mins and 0 sec
  const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 21, 0, 0);


  
 
  // Extracting the date, hours, etc one by one from the let futureDate
  const year = futureDate.getFullYear();
  const hours = futureDate.getHours();
 //   const day = futureDate.getDate ();. This directly gave a direct date when applied with ${date}
  const minutes = futureDate.getMinutes();


 //  To access the array of months set upwards
 let month = futureDate.getMonth();
 //  console.log(months [month]);
 month = months[month];

 //  To access the date(19) from the array 
 const date = futureDate.getDate();
 


 // To get the weekdays from the arrays which is also zero-index(7-1=6)
 const weekday = weekdays[futureDate.getDay()];
//  console.log(weekday);



 //   setup the functionality for updating one after the other in the html. 
 // textContent controls text content using js
 giveaway.textContent = `giveaway ends on ${weekday}, ${date}th  ${month} ${year}.  ${hours}:${minutes}pm`;
 //  the year reflected on the web is the date displayed on futureDate
 //  giveaway.textContent = `giveaway ends on ${days}`. Did not work;


 // future date in milliseconds
 const futureTime = futureDate.getTime();   //this is bigger than today
 //This shows how many days, hours, etc we have left
 
 function getRemainingTime() {

    // getting our current date
    const today = new Date().getTime(); //this is smaller than future time, so we subtract

    const t = futureTime - today; 
    //that is, t = difference between current time and future time
    //console.log(t);
    /* 1 sec = 1000 millisec; 
    1 min= 60 sec;
    1hr = 60 mins
    1 day = 24 hrs */

    //setting up the functionality to calculate how many days, hrs, mins, etc are left after the subtraction


    //setting up how many millisec are in a day, hours, minutes
    //values of ms in a day
    const oneDay = 24 * 60 * 60 * 1000;
    
    // checking how many millisecs are in one hour
    const oneHour = 60 * 60 * 1000;

    //checking how many ms are in one minute
    const oneMinute = 60 * 1000;

    

    // calculate all values for days
    let days = t / oneDay;
    // console.log(days);
    // console.log(days); shows 70.242 days from 10th april, 2024

    days = Math.floor(days);

    /* calculation for hours
     let hours = t / oneHour;
     console.log(hours); displayed 1685.7654141666667 */


    // to get remainder use % (margelise)
                //let hours = (t % oneDay) /oneHour;
            // console.log(hours); // displayed 3.88414 (real: 3.8337802777777776)

    let hours = Math.floor (t % oneDay / oneHour);
    /* console.log(hours) //displayed 3 */


    // To check how many mins are there
    let minutes = Math.floor ((t % oneHour) / oneMinute);
    let seconds = Math.floor ((t % oneMinute) / 1000);
    // console.log(seconds);


    // setup values array
    const values = [days, hours, minutes, seconds];


    // If the values < 10, 0 should be in front of it
    function format (item) {
        if (item < 10) {
            return item = `0${item}`
        }

        return item
    }



    // To get the index of the item in the array to display 0... if its less than 10
    deadlineFormat.forEach (function(item, index) {
        item.innerHTML =  format (values[index]); //eg 70 days, 03 hours, 10mins and 02 secs
    });
    // When (t) d current time is bigget than our future time, clear d interval 
    if (t < 0) {
        clearInterval(countdown);
        deadline.innerHTML = `<h4 class = "expired"> sorry, this giveaway is expired and over. </h4> `
    }
    
 }

 // countdown style functionality
 /* setInterval needs 1)callback function and 2)how often the function will be called */
 let countdown = setInterval(getRemainingTime, 1000) //this starts the countdown to call every second(1000)


 // 
 getRemainingTime();