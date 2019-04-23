//This is the start and seems to be pulling something, further work to be done

const googleMapsClient = require('@google/maps').createClient({
    key: 'API Key Here', //I havent over looked this, just didnt want to put my personal
    //key on github
    Promise: Promise
  });
  
 /*googleMapsClient.geocode({
    address: '1600 Amphitheatre Parkway, Mountain View, CA'
    })
    .asPromise()
    .then((response) => {
      console.log(response.json.results);
    })
    .catch((err) => {
      console.log(err);
    });*/

    var arrayContaining = jasmine.arrayContaining;
    var objectContaining = jasmine.objectContaining;
    var stringMatching = jasmine.stringMatching;
    var googleMaps = require('./service');
    var inTwoHour = Math.round((new Date().getTime() + 120 * 60 * 1000)/1000);

it('accepts driving options', function(done) {
    googleMaps.directions({
      origin: '4522 47th Ave SW, Seattle, WA 98116',
      destination: '3650 131st Ave SE, Bellevue, WA 98006',
      arrival_time: inTwoHour,
    })
    .asPromise()
    .then((response) => {
        console.log(response.json.results);
      })
    .then(done, fail);
  });