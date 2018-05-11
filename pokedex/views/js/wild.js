// sconst request = require("request");

var pokeName = "";
var pokeID = 3;
	

function getWildPokemon(){
	//Get the current pokemon that is running around
	$.ajax({
		url: 'https://kaps-a3-mathur15.c9users.io/api/wild',
		type: 'GET',
		dataType: 'JSON',
		success: function(data){
			pokeID = Number(data.data);
			console.log("pokeID: " + pokeID);
			wildPokemonRequestData(pokeID); //Generate the Pokemon
		},
		error: function(e){
			//alert(e);
			getWildPokemon();
		}
	});
}

//fetching the data for wild pokemon
function wildPokemonRequestData(pokeID){
	$.ajax({
		url: "https://pokeapi.co/api/v2/pokemon/"+pokeID+"/",
		type: 'GET',
		dataType: 'JSON',
		success: function(data){
			pokeName = data.name.charAt(0).toUpperCase() + data.name.substr(1).toLowerCase(); //Capitalize first letter
			var imgsrc = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokeID + ".png";
			//Get the image from the api's github repo
			
			//Create the image in the screen
			$("#wildPokemon").attr('src', imgsrc);
			$("#wildPokemon").attr('title', pokeName);
		},
		error: function(e){
			//alert(e);
			wildPokemonRequestData();
		}
	});
}

function clickPokemon(){
	//When the image of the pokemon is clicked, generate a congratulatory message and add the pokemon to the user's collection.
	$("#myModal").show();
	$("#catch").text("You Caught a " + pokeName + "!");
	$("#wildPokemon").hide();
	//$("pokemonForm").submit();
	
	capturedWildPokemon();
}

function capturedWildPokemon(){
	console.log("capturedWildPokemon");
	$.ajax({
		url: 'https://kaps-a3-mathur15.c9users.io/api/collection',
		type: 'POST',
		dataType: 'JSON',
		data: {num: pokeID},
		success: function(data){
			console.log(data);
			console.log("sent");
		},
		error: function(e){
			console.log("error sending");
		}
	});
}

function closeModal(){
	//close the modal when we are done searching
	$("#myModal").hide();
}
