/*
 *  Lookup tables: use these arrays to index the day and month from a Date.
 * */
let months = [ 'January', 'February', 'March', 'April', 'May', 'June',
               'July', 'August', 'September', 'October', 'November',
               'December' ];
let days   = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
               'Friday', 'Saturday' ];

// Get the root element
let root = document.getElementById('header');

// Create the image container
let bannerContainer = document.createElement('div');

// Create the image banner
let banner        = document.createElement('img');
banner.setAttribute('src', 'images/old-timey-banner.svg');
banner.setAttribute('alt', 'You can\'t handle a thousand words');

// Add the content to the first container
bannerContainer.appendChild(banner);

// Create the date bar
let dateBar    = document.createElement('div');
dateBar.setAttribute('id', 'date-bar');
let dateHeader = document.createElement('h4');

// Add the date to the header
let today   = new Date(Date.now());
let dateStr = days[today.getDay()] + ', ' + months[today.getMonth()] + ' ' +
                today.getDate() + ', ' + today.getFullYear();
dateHeader.innerHTML = dateStr;

// Add the date bar to the second container
dateBar.appendChild(dateHeader);

// Add the two containers to the site
root.appendChild(bannerContainer);
root.appendChild(dateBar);
