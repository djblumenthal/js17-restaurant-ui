// Constructors

var FoodItem = function (name, calories, vegan, glutenFree, citrusFree){
	this.name = name;
	this.calories = calories;
	this.vegan = vegan;
	this.glutenFree = glutenFree;
	this.citrusFree = citrusFree;
	this.toString = function(){
		return this.name +' '+  this.calories +' '+ this.vegan +' '+ this.glutenFree +' '+ this.citrusFree;
	}
};

var Drink = function (name, description, price, ingredients){
	this.name = name;
	this.description = description;
	this.price = price;
	this.ingredients = ingredients;
	this.toString = function(){
		return this.name +' '+  this.description +' '+ this.price +' '+ this.ingredients.join(', ');
	}
	this.isVegan = function(ingredients){
		for (var i=0; i<this.ingredients.length; i++){
			if (!this.ingredients[i].vegan){
				return false;
			}
		}return true;
	}	
	this.isGlutenFree = function(ingredients){
		for (var i=0; i<this.ingredients.length; i++){
			if (!this.ingredients[i].glutenFree){
				return false;
			}
		}return true;
	}	
	this.isCitrusFree = function(ingredients){
		for (var i=0; i<this.ingredients.length; i++){
			if (!this.ingredients[i].citrusFree){
				return false;
			}
		}return true;
	}
}

var Plate = function (name, description, price, ingredients){
	this.name = name;
	this.description = description;
	this.price = price;
	this.ingredients = ingredients;
	this.isVegan = function(ingredients){
		for (var i=0; i<this.ingredients.length; i++){
			if (!this.ingredients[i].vegan){
				return false;
			}
		}return true;
	}	
	this.isGlutenFree = function(ingredients){
		for (var i=0; i<this.ingredients.length; i++){
			if (!this.ingredients[i].glutenFree){
				return false;
			}
		}return true;
	}
	this.isCitrusFree = function(ingredients){
		for (var i=0; i<this.ingredients.length; i++){
			if (!this.ingredients[i].citrusFree){
				return false;
			}
		}return true;
	}
	this.toString = function(){
		return this.name +' '+  this.description +' '+ this.price +' '+ this.ingredients.join(', ');
	}
}

var Order = function (plates){
	this.plates = plates;
	this.toString = function(){
		return this.plates.join();
	}
}

var Menu = function (plates){
	this.plates = plates;
	this.toString = function(){
		return this.plates.join();
	}
}

var Restaurant = function (name, description, menu){
	this.name = name;
	this.description = description;
	this.menu = menu;
	this.toString = function(){
		return console.log(this.name + ' ' + this.description + ' ' + this.menu);
	}
}

var Customer = function (dietaryPreference) {
	this.dietaryPreference = dietaryPreference;
	this.toString = function(){
		return console.log(this.dietaryPreference);
	}
}

// FoodItem instances (used in ingredients)
var egg = new FoodItem('egg', 180, false, true, true);
var apple = new FoodItem('apple', 80, true, true, true);
var hamburger = new FoodItem('hamburger', 600, false, false, true);

// Drink instances
var appleJuice = new Drink ('apple juice', 'juiced apples', 2.00, [apple]);
var proteinShake = new Drink ('protein shake', 'hamburger and egg shake', 7.00, [hamburger, egg]);

// plate instances

var appleBurger = new Plate ('apple burger', 'apple with a burger in it!', 10.00, [apple, hamburger]);
var eggBurger = new Plate ('egg burger', 'hamburger with an egg in it (burger came first)', 8.00, [hamburger, egg]);

// Order instances
var order1 = new Order ([appleBurger, eggBurger, appleJuice]);

//Menu instances
var menu1 = new Menu ([appleJuice, proteinShake, appleBurger, eggBurger]);

//Restaurant Instances
var restaurant1 = new Restaurant ('Apple Burgers and More', 'We sell the ORIGINAL apple burger, eggs, and notorious shakes!', menu1);

// Customer Instances
var customer1 = new Customer ('glutenFree, citrusFree');
var customer2 = new Customer ('vegan');



// Console.log toString calls on FoodItems (part i, step 3)
console.log(egg.toString());
console.log(apple.toString());
console.log(hamburger.toString());