//Recursive merge sort

//function sorttest(){document.getElementById("output").innerHTML= "sorttest"}; 

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