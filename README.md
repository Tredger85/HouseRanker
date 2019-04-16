# HouseRanker

The idea behind this project was to compare different houses in a quantifable way and then return the link for review.
Currently both Zillow and Redfin have a number of different filters and search parameters but no way to compare the returned
results.  I understand why neither Zillow or Redfin does this, looking for houses generates a very emotional response and there
for is not quantifable.  Additionally, one would think that realators would be hesitant to work with a site in case some of
the properties they are trying to sell would be rated poorly, there for get less in commisions.  The site would then have less
houses to view and then downward spiral with less potential buyers.

I, as a potential buyer, have none of the economic constraints.  I also just wanted to try my hand at web scrapping, sorting
algorithms and API calls related to something tangible.

Much of the fallowing is also commented in the related files but will include current sore spots and some more not yet built 
direction.

The base of this is an csv export from Redfin.com(change from photos to table for search reasults, and then at the bottom
of that table one can download all).  As such, this program is not trying to mimic any of the filters that are available
through their searching.  Any hard caps or base minimum requirements that can be put in place before the csv export should
be for performance.  Conversly, part of the point of this ranker is to highlight homes that might seem a bit outside the 
comfort zone but can be quantified as valueable for review.  The 'WOW' factor and curb appeal not included. 

Ranker.js

Currently a number of variables seem to be needlessly created, this though is so that a UI can be later droped on top
to controll these variables.  The thought with building the weighted system at this point is not to get so fine detailed 
hence the rounding.  It is concieveable that over time and with a large data set that the fine grain differences (ie .1 or .01)
could make a difference, but users and their needs are so vastly different that they dont know what they dont know.

Problem - the headers for HOA and URL have formatting issues that prevent them from being called
Current solution - change the headers in the CSV so they can be imported
Ideal solution - code the ranker or change the underlying program to handle other format

Future build:
SubString key word scoring from the scrapped page
Problem - Node.Js aspects dont play well with front end
Current solution - broken
Possible solution - use Browserfy to package the Node.Js together

Include google map API call to determine the commute time
- Seperate moduel, unbuilt until other issues have been resolved

Scrap.js

Go to the specific details page and return the Property Details block of information.
Considered a more surgical call for each data point but decided against it for several reasons. 
Dont have to handle failures if the subgroup/specific line is not there
Dont have to worry about if graphicaly everything is next to eachother but not nested together, ie know everything was scraped
Hypothosize that it is less total time/resources to ping once and search through a larger text strings multiple times than 
  ping multiple times and do searches on smaller text strings
Being a good citizen by causing less traffic on the cite that is being scraped

Over all happy with this, could use some testing to see if speed could be imporved

Sorter.Js

Currently have a merge sort implemented and works correctly with ranker.js.

Future build:
Change this to a counting sort for improved performance

Ranker.html

This is the area that could under go the most radical change.  Idealy for this project to be good for any one besides myself the user 
would have to be able to control what is important, the relative rating of each data point and the tresholds for when data is scored.
Simply, turn all the hard coded items into dynamic ones.  This includes being able to upload/point (placeholer inputbox) to where the 
user has their CSV file.  A nice feature may be to generate a mini map and point to where the score-link that is returned refernces,
the gps coordinates are already part of the CSV export.

Future build:
My intention is to import/pointer and at least one data (possibly lot size) as dynamic to complete the Proof of Concept.
