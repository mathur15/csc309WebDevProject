var pokemons = [];  //Holds all pokemon names
var currPokeID = null;	//Holds the id of the pokemon that is currently being displayed

//get all pokemon names from the third party api
function loadAllNames(){
	$.ajax({
		url: "https://pokeapi.co/api/v2/pokemon/?limit=802&offset=0",
		type: 'GET',
		dataType: 'JSON',
		success: function(data){
			var i = 1;
			for(var obj in data.results){
				pokeName = data.results[obj].name;
				pokemons.push({"id" : i, "name" : pokeName});
				i++;
			}
		},
		error: function(e){
			loadAllNames();
			//This is most likely due to some sort of connection error, we just retry again.
		}
	});
}

//look up for one pokemon-if found then you request the data for the particular pokemon
function lookupPokemon(){
	$("#myModal").show();
	refreshModal();
	var input = $("#inputHelpBlock").val();
	if(isNaN(input)){
		var pokeName = input.toLowerCase(); //Not case specific
		var found = false; // Flag for finding a pokemon

		for (var i in pokemons){
			if (pokemons[i].name == pokeName){
				found = true;
				pokemonRequestData(pokemons[i].id);
			}
		}
		if (found == false) {
			errorModal();
		}
	}

	else if(!(isNaN(input))){
		//When the input is a number, we check if the number is valid and then perform the request to the third party api
		var num = parseInt(input);
		if(0 <= num && num <= pokemons.length){
			pokemonRequestData(num);
		}
		else{
			//This modal is created when the input is invalid
			errorModal();
		}
	}

	$("#inputHelpBlock").val(''); //Clear the search bar
}

$("#inputHelpBlock").keypress(function(key) {
	//start a request to the third party api when the 'enter' key is pressed
	if(key.which == 13) {
		lookupPokemon();
	}
});

//fetching the data for the pokemon
function pokemonRequestData(id){
	refreshModal();
	var abilitiesNames = ""; 
	var moveNames = "";
	var stat = ""; 
	$.ajax({
		url: "https://pokeapi.co/api/v2/pokemon/"+id+"/",
		type: 'GET',
		dataType: 'JSON',
		success: function(data){
			pokeName = data.name.charAt(0).toUpperCase() + data.name.substr(1).toLowerCase(); //Capitalize first letter
			currPokeID = id;

			for(var obj in data.abilities){
				if(obj !=0){
					abilitiesNames += ", ";
				}
				abilitiesNames += data.abilities[obj].ability.name;
			}
			for(var obj in data.moves){
				if(obj !=0){
					moveNames += ", ";
				}
				moveNames += data.moves[obj].move.name;
			}
			for(var obj in data.stats){
				if(obj !=0){
					stat += ", ";
				}
				stat += data.stats[obj].stat.name + " = " + data.stats[obj].base_stat;
			}

			var imgsrc = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + id + ".png";
			//Get an image from the github repo containing the sprites (meant to go with the api)
			
			//Create a block of text containing the information pertaining to the pokemon
			$("#modalImg").attr('src', imgsrc);
			$("#modalText").html("<b>Name: </b>" + pokeName + "<br /><b>ID</b>: " + id);
			$("#pokeData").html("<li><b>Height:</b> "+ data.height +" </li>"
				+"<li><b>Weight:</b> "+ data.weight +" </li>"
				+"<li><b>Abilities:</b> "+ abilitiesNames +" </li>"
				+"<li><b>Moves:</b> "+ moveNames +" </li>"
				+"<li><b>Statistics:</b> "+ stat +" </li>");

			footerButtonsActive();
		},
		error: function(e){
			//Create an error modal when the information cannot be retrieved
			errorModal();
		}
	});
}
//moving the pokemon
function movePokemon() {
  var elem = document.getElementById("modalImg");   
  var pos = 0;
  var id = setInterval(frame, 5);
  function frame() {
      pos++; 
      elem.style.top = pos + 'px'; 
      elem.style.left = pos + 'px'; 
    }
 }

function errorModal(){
	//Generates a modal with an error message
	$("#modalText").html("pokemon is lost :(");
	footerButtonsInactive();	//disable buttons on this modal
}


function refreshModal(){//clear window for new result
	$("#modalText").html("Fetching Data...");
	$("#modalImg").attr('src', "");
	$("#pokeData").html("");
	footerButtonsInactive();
}

//when we are done searching
function closeModal(){
	$("#myModal").hide();
	currPokeID = null;
}

//The next two functions disable and enable the next and previous buttons according to the situation. We want to enable these when
//a valid search has been made but disable them when an error is raised.
function footerButtonsInactive(){
	//Disable the buttons
	$('#prevBtn').prop('disabled', true);
	//prop initially starts with disabled
	$('#nextBtn').prop('disabled', true);
}
function footerButtonsActive(){
	//Enable the buttons
	$('#prevBtn').prop('disabled', false);
	$('#nextBtn').prop('disabled', false);
}

//When the user presses the next or the previous button
function nextBtnEvent(){
	//Handles the event when the previous button on the modal is clicked. It will find the pokemon whose id is one higher.
	//When the id is the highest, it will go back around to the pokemon with the lowest id (acting like a circular buffer).
	if(currPokeID != null){
		var newID = currPokeID + 1;
		if(newID > pokemons.length){
			newID = 1;
		}
		//Request to the third party api
		pokemonRequestData(newID);
	}
	else{
		errorModal();
	}	
}

function prevBtnEvent(){
	//Handles the event when the previous button on the modal is clicked. It will find the pokemon whose id is one lower.
	//When the id is 1, it will go back around to the pokemon with the highest id (acting like a circular buffer).
	if(currPokeID != null){
		var newID = currPokeID - 1;
		if(newID == 0){
			newID = pokemons.length;
		}
		//Request to the third party api
		pokemonRequestData(newID);
	}
	else{
		errorModal();
	}
}