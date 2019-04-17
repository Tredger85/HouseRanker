/*included installed

npm install --save request request-promise cheerio puppeteer
npm install -g convert-csv-to-json
npm install -g browserify
browserify -r convert-csv-to-json -r request-promise -r cheerio > bundle.js
*/

//Currently a number of variables seem to be needlessly created, this though is so that a UI can be later droped on top
//to controll these variables.  The thought with building the weighted system at this point is not to get so fine detailed 
//hence the rounding.  It is concieveable that over time and with a large data set that the fine grain differences (ie .1 or .01)
//could make a difference, but users and their needs are so vastly different that they dont know what they dont know

let csvToJson = require('convert-csv-to-json');
var csvlist = 'redfin_2019-04-06-08-01-55.csv';
let listing = csvToJson.fieldDelimiter(',').formatValueByType().getJsonFromCsv(csvlist);  

var houses = new Array();

//Test for output formatting
//houses[0] = new Array(55,'West Seattle','http://www.redfin.com/WA/Snohomish/22031-Villa-Dr-98296/home/2680250');

for(i=0; i<listing.length; i++) {
    var score=0

    if(listing[i].PROPERTYTYPE =='Single Family Residential'){
        score+=10;
    }

    //Setting price goal as the ideal amount paid and then increments of importance
    var pricegoal= 400000
    //Hypothosize that 5% increments of price is where you can feel a difference
    var priceincrement = pricegoal*.05;
    score+=Math.round((pricegoal-listing[i].PRICE)/priceincrement);

    //Direct peak and deminishing return
    var bed=listing[i].BEDS
    score+=bed;
    if (bed>3){
        score-=(bed-3);
    }

    //Ideal range
    var bath=listing[i].BATHS
    if (bath>=1.5&&bath<2.5){
        score+=5;
    } else if(bath>=2.5){
        score-=3;
    }

    //creating a scoring that has platoues and deminishing returns
    var sqft = listing[i].SQUAREFEET;
    if(sqft<750){
        score+=Math.round((sqft-750)/50);
    }else if(sqft>1250&&sqft<2250){
        score+=Math.abs(Math.round((sqft-1700)/50));
    }else if(sqft>2250){
        score-=Math.round((sqft-2250)/50);
    }

    //to be used in relation to the google map API
    var address = listing[i].ADDRESS + ' ' +listing[i].CITY+', '+listing[i].STATEORPROVINCE+' '+listing[i].ZIPORPOSTALCODE;

    //Setting an acceptable size of the lot and then incrementing better/worse
    var lotgoal = 6000;
    var lotincrement = 1000;
    score+=Math.round((listing[i].LOTSIZE-lotgoal)/lotincrement);

    houses[i] = new Array(score,listing[i].LOCATION,listing[i].URL);
};
function runner(){     
    document.getElementById("output").innerHTML= (houses[0][1]+": "+houses[0][0]).link(houses[0][2]);
};

console.log(listing);