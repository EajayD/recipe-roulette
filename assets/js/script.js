var appID = "5b0bc97a"
var appKey = "600a06288209a9a4ab877ddf6c0e29fc"

function getData(recipe) {
    var requestUrl = "https://api.edamam.com/search?app_id=" + appID + "&app_key=" + appKey + "&q=" + recipe;
    fetch(requestUrl)
        .then(function (response) {
            console.log(response)
            return response.json();
        })
        .then(function (data){
            console.log(data, recipe);
        })
}


function getBeerData(beerData){
    var requestUrl = 'https://api.punkapi.com/v2/beers/'
    fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data, beerData);
   
  });
}

