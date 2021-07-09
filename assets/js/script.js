var appID = "5b0bc97a";
var appKey = "600a06288209a9a4ab877ddf6c0e29fc";

var mealSearch = document.querySelector("#meal-search");
var foodInput = document.querySelector("#food");

function getFood(recipe) {
    var requestUrl = "https://api.edamam.com/search?app_id=" + appID + "&app_key=" + appKey + "&q=" + recipe;
    fetch(requestUrl)
        .then(function (response) {
            console.log(response)
            return response.json();
        })
        .then(function (data){
            console.log(data, recipe);
            foodResults(data, recipe);
        })
}

function formSubmit(event) {
    event.preventDefault();
    var recipe = foodInput.value.trim();
        if (recipe){
            getFood(recipe);
        }
}

mealSearch.addEventListener("submit", formSubmit);

var meals = document.querySelector("#meals");
var foodAppend = document.querySelector("#food-append");

function foodResults(recipeInput){

  // clear old data
  foodAppend.textContent = ""
  meals.textContent = recipeInput.q;

     var foodResultEl=document.createElement("div");
     foodResultEl.classList = "card bg-body text-dark col-2 md-2";
     
     //display picture
     var recipePicture = document.createElement("img")
     recipePicture.classList = "card-img-top text-center";
     recipePicture.setAttribute("src", recipeInput.hits[2].recipe.image);  
     foodResultEl.appendChild(recipePicture);
     
     //display recipe name
     var recipeName = document.createElement("h4");
     recipeName.classList = "card-body text-center";
     recipeName.textContent = " " + recipeInput.hits[2].recipe.label + " ";

     //clickable link to recipe
     var recipeLink = document.createElement("a");
     recipeLink.classList = "card-body text-center";
     recipePicture.setAttribute("href", recipeInput.hits[2].recipe.url);  
     recipeLink.textContent = "Link to Recipe";

     //append to card
     foodResultEl.appendChild(recipeName);
     foodResultEl.appendChild(recipeLink);


     //append to container to display as row
      foodAppend.appendChild(foodResultEl);
  

}



function getBeerData(data){
    var requestUrl = 'https://api.punkapi.com/v2/beers/'
    fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      var beerName = document.querySelector('#alcohol');//points to the alcohol name in html
      var beerImage = document.querySelector('#drink-append');//points to the image of the drink
      beerName.textContent = data[i].name;//
      beerPic.textContent = data[i].image_url;
      issueContainer.append(beerName);
      issueContainer.append(beerImage);
    }
  });
}
addEventListener('click', 'btn-primary', getBeerData(data));
