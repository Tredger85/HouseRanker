let csvToJson = require('convert-csv-to-json');

//The base of this is an csv export from Redfin.com(change from photos to table for search reasults, and then at the bottom
//of that table one can download all).  As such, this program is not trying to mimic any of the filters that are available
//through their searching.  Any hard caps or base minimum requirements that can be put in place before the csv export should
//be for performance.  Conversly, part of the point of this ranker is to highlight homes that might seem a bit outside the 
//comfort zone but can be quantified as valueable for review.  The 'WOW' factor and curb appeal not included.

//Currently a number of variables seem to be needlessly created, this though is so that a UI can be later droped on top
//to controll these variables.  The thought with building the weighted system at this point is not to get so fine detailed 
//hence the rounding.  It is concieveable that over time and with a large data set that the fine grain differences (ie .1 or .01)
//could make a difference, but users and their needs are so vastly different that they dont know what they dont know
var csvlist = 'redfin_2019-04-06-08-01-55.csv';

let listing = csvToJson.fieldDelimiter(',').formatValueByType().getJsonFromCsv(csvlist);

var houses = new Array();

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
    var address = listing[i].ADDRESS + ' ' +listing[i].CITY+', '+listing[i].STATEORPROVINCE+' '+listing[i].ZIPORPOSTALCODE;

    //Setting an acceptable size of the lot and then incrementing better/worse
    var lotgoal = 6000;
    var lotincrement = 1000;
    score+=Math.round((listing[i].LOTSIZE-lotgoal)/lotincrement);

    //listing[i].'HOA\MONTH'
    var url='linkhere';
    //listing[i].'URL(SEEhttp://www.redfin.com/buy-a-home/comparative-market-analysisFORINFOONPRICING)'

    houses[i] = new Array(score,listing[i].LOCATION,'URL');
};
function sorter (array) {
    if (array.length < 2) {
      return array
    }
    const mid = Math.floor(array.length/2)
    const starthalf = array.slice(0, mid)
    const endhalf = array.slice(mid)
    return sort(sorter(starthalf), sorter(endhalf))
  }
  
  sort = (smallOne, smallTwo) => {
    const sorted = []
    while(smallOne.length && smallTwo.length) {
      if (smallOne[0][0] >= smallTwo[0][0]) {
        sorted.push(smallOne.shift())
      } else {
        sorted.push(smallTwo.shift())
      }
    }
    const output = [...sorted, ...smallOne, ...smallTwo]
    //console.log(output)
    return output
  }


//console.log(listing[i]);
console.log(sorter(houses));
//console.log(url);
