const rp = require('request-promise');
const $ = require('cheerio');

//Go to the specific details page and return the Property Details block of information.
//Considered a more surgical call for each data point but decided against it for several reasons. 
//Dont have to handle failures if the subgroup/specific line is not there
//Dont have to worry about if graphicaly everything is next to eachother but not nested together, ie know everything was scraped
//Hypothosize that it is less total time/resources to ping once and search through a larger text strings multiple times than 
//  ping multiple times and do searches on smaller text strings
//Being a good citizen by causing less traffic on the cite that is being scraped

module.exports = function scrape(url){
  return rp(url)
    .then(function(html){
      //success!
      return($('.amenities-container',html).text());
    })
    .catch(function(err){
      //handle error
    })
};
