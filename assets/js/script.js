// Data Stores and Objects
// ***************************
  //Page elements to use
  let pageDay = $('#currentDay');
  let calendar = $('#calendar');
  let buttons = $('.saveBtn');
  let timeBlock = $('.time-block');

  // variables to adjust time begin and end day.  
  //  if these are adjusted, would still need to adjust html 
  //   or just build the page dynamically on each load.
  let startDayHour = 9;
  let endDayHour = 18;

  // get hour integer value for functionality
  let hourOfDay = parseInt(moment().format('H'));

  // if calendar storage doesn't exist, then create it.
  if (localStorage.getItem("calendar")==null){
    // initialize localstorage with a holder array for our day.
    let starterCalendar = [" "," "," "," "," "," "," "," "," "];
    localStorage.setItem("calendar", JSON.stringify(starterCalendar));
  }
// ***************************



// Set Content in page:
// ***************************

  // set page title to current date.
  pageDay.text(moment().format('dddd - MMM Do'));

  // color code the day's hours
  paintHours(hourOfDay);

  // populate the calendar from local storage
  populateCalendar();

  // event listener for save buttons.
  buttons.on('click', saveItem);

// ***************************




// Functions:
// ***************************

  // function to color code the hour bars for present and future times.
  function paintHours(hour){

    // if it isn't the end of the day, let's color code some hour bars
    if (hour < endDayHour){
    
      // set the current hour to 'present' class, and remove 'past' class
      calendar.children(`[data-hour=${hour}]`).children().eq(1).addClass('present').removeClass('past');
    
      // set all future hours to 'future' class, and remove 'past' class
      for (i=hour+1; i<endDayHour; i++){
        calendar.children(`[data-hour=${i}]`).children().eq(1).addClass('future').removeClass('past');
      }
    }
  }

  //function to populate the day's hourly calendar with appointments from local storage
  function populateCalendar(){
    
    // get the current storage, or return an empty array if one isn't available.
    let fullCalendar = JSON.parse(localStorage.getItem("calendar")|| "[]");
    
    // loop through the array and populate the appointment rows.
    // adjustment is made to index to populate based on the startDayHour
    for (i=0; i<fullCalendar.length; i++){
      $(`div [data-hour=${i+startDayHour}]`).children().eq(1).val(fullCalendar[i]);
    }
  }


  //function to save calendar item to local storage.
  function saveItem(event){
    // pull hour and calendar item description from row.
  
    let hourToSave = $(event.target).parent().attr("data-hour");
    let description = $(event.target).siblings("textarea").val();
    
    // alternative ways to pull these elements/values
    // let hourToSave = event.target.parentElement.getAttribute("data-hour");
    // let description = event.target.parentElement.querySelector('textarea').value;
    
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

// ***************************

