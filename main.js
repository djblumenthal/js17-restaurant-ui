// Constructors

var FoodItem = function (name, calories, vegan, glutenFree, citrusFree){
	this.name = name;
	this.calories = calories;
	this.vegan = vegan;
	this.glutenFree = glutenFree;
	this.citrusFree = citrusFree;
	this.create = function(){
		return $('<li>').text(this.name);
	}
	this.toString = function(){
		return this.name +' '+  this.calories +' '+ this.vegan +' '+ this.glutenFree +' '+ this.citrusFree;
	}
};

var drinks = [];
var Drink = function (name, description, price, ingredients){
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
	var thisDrink = $('<li data-price="'+this.price+'" data-vegan="'+this.isVegan()+'" data-glutenfree="'+this.isGlutenFree()+'" data-citrusfree="'+this.isCitrusFree()+'">').text(this.name).append($('<ul>'))
	drinks.push(thisDrink);
	for (var i=0; i<ingredients.length; i++) {
		drinks[drinks.indexOf(thisDrink)].children('ul').append(ingredients[i].create());
	}
	this.toString = function(){
		return this.name +' '+  this.description +' '+ this.price +' '+ this.ingredients.join(', ');
	}
}

var plates = [];
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
	var thisPlate = $('<li data-price="'+this.price+'" data-vegan="'+this.isVegan()+'" data-glutenfree="'+this.isGlutenFree()+'" data-citrusfree="'+this.isCitrusFree()+'">').text(this.name).append($('<ul>'))
	plates.push(thisPlate);
	for (var i=0; i<ingredients.length; i++) {
		plates[plates.indexOf(thisPlate)].children('ul').append(ingredients[i].create());
	}


	this.toString = function(){
		return this.name +' '+  this.description +' '+ this.price +' '+ this.ingredients.join(', ');
	}
}
var Order = function (plates){
	this.plates = plates;
	this.create = function() {
		return $('<ul id="order">');
	}
	this.toString = function(){
		return this.plates.join();
	}
}

var Menu = function (plates){
	this.plates = plates;
	this.create = function(){
		return $('<ul id="menu">').html('<li><span>Drinks:</span><ul id="drinks"></ul></li><li><span>Plates:</span><ul id="plates"></ul></li>');
	}
	this.toString = function(){
		return this.plates.join();
	}
}

var Restaurant = function (name, description, menu){
	this.name = name;
	this.description = description;
	this.menu = menu;
	this.create = function(){
		return $('<h1>').text(this.name);
	}
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

	var total = 0
$(function(){
	$('body').append(restaurant1.create());
	$('body').append(menu1.create());
	for (var i=0; i<plates.length; i++){
		$('#plates').append(plates[i]);
	}	
	for (var i=0; i<drinks.length; i++){
		$('#drinks').append(drinks[i]);
	}
	$('body').append($('<h2 id="myOrder">').text('My Order: $' + total));
	$('body').append($('<label>').html('<input type="checkbox" id="vegan"> Vegan'));
	$('body').append($('<label>').html('<input type="checkbox" id="gluten-free"> Gluten Free'));
	$('body').append($('<label>').html('<input type="checkbox" id="citrus-free"> Citrus Free'));
	$('body').append(order1.create());

	$('#plates > li, #drinks > li').click(function () {
		$('#order').append($(this).clone());
		total += $(this).data('price');
		$('#myOrder').text('My Order: $' + total);
	});

	$('#vegan').change(function() {
		if ($(this).is(':checked')) {
			$('[data-vegan="true"]').css('background', 'yellow');
		}
		else {
			$('[data-vegan="true"]').css('background', 'white');
		}
	});

	$('#gluten-free').change(function() {
		if ($(this).is(':checked')) {
			$('[data-glutenfree="true"]').css('background', 'yellow');
		}
		else {
			$('[data-glutenfree="true"]').css('background', 'white');
		}
	});

	$('#citrus-free').change(function() {
		if ($(this).is(':checked')) {
			$('[data-citrusfree="true"]').css('background', 'yellow');
		}
		else {
			$('[data-citrusfree="true"]').css('background', 'white');
		}
	});

});