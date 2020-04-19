// Foursquare API Info
const clientId = 'R3E2MB4C0YSKIVKJJAVT0HRRT1HF10KOFTVSTFANTMWJJST3';
const clientSecret = 'LID0JTGBCJYEWCD31GBZPHTOOLU3RY15HJUKRPYXADM5G2TV';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = '39e099512e214d3ce4de87ec486baa75';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$('#venue1'), $('#venue2'), $('#venue3'), $('#venue4')];
const $weatherDiv = $('#weather1');
const weekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

// AJAX functions
const getVenues = () => {
  const city = $input.val();
  const urlToFetch = `${url}${city}&limit=10&cliend_id=${clientId}&client_secret=${clientSecret}&v=20200417`;
  try {
    const response = await fetch(urlToFetch);
    if(reponse.ok){
      const jsonResponse = await response.json();
      const venues = jsonResponse.response.group[0].items.map(item => item.venue);
      return venues;
    }
  } catch(error) {
    console.log(error);
  }
}

const getForecast = async () => {
  const urlToFetch = `${weatherUrl}?&q=${$input.val()}&APPID=${openWeatherKey}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok){
      const jsonResponse = await response.json();   
      return  jsonResponse
    }
  } catch(error) {
    console.log(error)
  }
}

// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:
    const venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;


    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (day) => {
  const weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
}

const executeSearch = () => {
  $venueDivs.forEach((venue) => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css('visibility', 'visible');
  getVenues();
  getForecast();
  return false;
};

$submit.click(executeSearch);
