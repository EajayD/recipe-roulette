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
            previous.unshift({recipe});
            foodInput.value = "";
        }
        save();
        history(recipe);
}

mealSearch.addEventListener("submit", formSubmit);

var meals = document.querySelector("#meals");
var foodAppend = document.querySelector("#food-append");

function foodResults(recipeInput){

  // clear old data
  foodAppend.textContent = ""
  meals.textContent = recipeInput.q;

  var cards = recipeInput.hits;
  for(var i=0 ; i < cards.length - 4; i++){
   var recipe = cards[i];
  
  console.log(recipe);

     var foodResultEl=document.createElement("div");
     foodResultEl.classList = "card bg-body text-dark col-2 md-2";
     
     //display picture
     var recipePicture = document.createElement("img")
     recipePicture.classList = "card-img-top text-center";
     recipePicture.setAttribute("src", recipeInput.hits[i].recipe.image);  
     foodResultEl.appendChild(recipePicture);
     
     //display recipe name
     var recipeName = document.createElement("h4");
     recipeName.classList = "card-body text-center";
     recipeName.textContent = " " + recipeInput.hits[i].recipe.label + " ";

     //clickable link to recipe
     var recipeLink = document.createElement("a");
     recipeLink.classList = "card-body text-center";
     recipeLink.setAttribute("href", recipeInput.hits[i].recipe.url);  
     recipeLink.textContent = "Link to Recipe";

     //append to card
     foodResultEl.appendChild(recipeName);
     foodResultEl.appendChild(recipeLink);


     //append to container to display as row
      foodAppend.appendChild(foodResultEl);
  
  }
}

// empty array for searches
var previous = [];
// pointer to html
var pastSearch = document.querySelector("#past-search-results");


// function to set local storage
function save(){
  localStorage.setItem("previous", JSON.stringify(previous));
};

// create a button element that shows up as a clickable object in order to show its data when clicked
function history(previous){
  oldRecipe = document.createElement("button");
  oldRecipe.textContent = previous;
  oldRecipe.classList = "d-flex w-100 btn-light border p-2";
  oldRecipe.setAttribute("data-recipe", previous); 
  oldRecipe.setAttribute("type", "submit");

  pastSearch.prepend(oldRecipe);
}


// calls on the data previously searched for
function historySearch(event){
  var prev = event.target.getAttribute("data-recipe");
  if (prev){
      getFood(prev);
  }
}

//event listener for previously searched recipes now clickable as a button, will run that history search function when clicked
pastSearch.addEventListener("click", historySearch);

var drinkButton = document.getElementById('drink-button');
//function that fetches drink name and image from beer api
function getBeerData(){
    var requestUrl = 'https://api.punkapi.com/v2/beers/random'

    fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  
      var beerName = document.querySelector('#alcohol');//points to the alcohol name in html
      var beerPic = document.querySelector('#drink-append');//points to the image of the drink
      var description= document.querySelector('#desc');
      beerName.textContent = data[0].name;
      beerPic.src=data[0].image_url;
      description.textContent = data[0].description;
    
  });
}
//event listener for 'get drink' button
drinkButton.addEventListener('click', getBeerData);

