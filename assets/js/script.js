let pageDay = $('#currentDay');
let calendar = $('#calendar');
let buttons = $('.saveBtn');
let timeBlock = $('.time-block')
let startDayHour = 9;
let endDayHour = 18;
//set page title to current date.
pageDay.text(moment().format('dddd - MMM Do'));


if (localStorage.getItem("calendar")==null){
  // initialize localstorage with a holder array for our day.
  let starterCalendar = [" "," "," "," "," "," "," "," "," "];
  localStorage.setItem("calendar", JSON.stringify(starterCalendar));
}

let hourOfDay = moment().format('HH');
console.log(hourOfDay);
paintHours(hourOfDay);
populateCalendar();

function paintHours(hour){
  
  if (hour < endDayHour){
    calendar.children(`[data-hour=${hour}]`).children().eq(1).addClass('present').removeClass('past');
 
    
    for (i=hour+1; i<endDayHour; i++){
      calendar.children(`[data-hour=${i}]`).children().eq(1).addClass('future').removeClass('past');
 
    }
  }
}



function saveItem(event){
  // how do I pull this jquery style?  
  // $(event.target).parent().
  //... done below
  let hourToSave = $(event.target).parent().attr("data-hour");
  let description = $(event.target).siblings("textarea").val();
  
  // alternative ways to pull these elements/values
  //console.log(event.target.parentElement.getAttribute("data-hour"));
  //console.log(event.target.parentElement.querySelector('textarea').value);
  
  //convert for easy array use 0-8 = 9am-5pm
  hourToSave = hourToSave-startDayHour;
  
  // pull existing local storage array.
  let fullCalendar = JSON.parse(localStorage.getItem("calendar")|| "[]");
  // add appointment into time slot, and overwrite what was there
  fullCalendar.splice(hourToSave, 1, description);
  // put back in local storage
  localStorage.setItem("calendar", JSON.stringify(fullCalendar));
  //re-populate the calendar
  populateCalendar();
}

function populateCalendar(){
  let fullCalendar = JSON.parse(localStorage.getItem("calendar")|| "[]");
  for (i=0; i<fullCalendar.length; i++){
    $(`div [data-hour=${i+startDayHour}]`).children().eq(1).val(fullCalendar[i]);
  }
  console.log(fullCalendar);
}
//calendar.on('click', '.saveBtn', saveItem);
buttons.on('click', saveItem);