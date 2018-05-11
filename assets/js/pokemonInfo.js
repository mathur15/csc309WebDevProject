var pokemons = [];  //Holds all pokemon names
var currPokeID = null;

//get all pokemon names
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
			alert("Can not be found"); 
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
		var num = parseInt(input);
		if(0 <= num && num <= pokemons.length){
			pokemonRequestData(num);
		}
		else{
			errorModal();
		}
	}

	$("#inputHelpBlock").val(''); //Clear the search bar
}

$("#inputHelpBlock").keypress(function(key) {
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

//in case there is an error

function errorModal(){
	$("#modalText").html("pokemon is lost :(");
	footerButtonsInactive();
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

//The next two functions disable and enable the next and previous buttons according to the situation
function footerButtonsInactive(){
	$('#prevBtn').prop('disabled', true);
	//prop initially starts with disabled
	$('#nextBtn').prop('disabled', true);
}
function footerButtonsActive(){
	$('#prevBtn').prop('disabled', false);
	$('#nextBtn').prop('disabled', false);
}

//When the user presses the next or the previous button
function nextBtnEvent(){
	if(currPokeID != null){
		var newID = currPokeID + 1;
		if(newID > pokemons.length){
			newID = 1;
		}
		pokemonRequestData(newID);
	}
	else{
		errorModal();
	}	
}

function prevBtnEvent(){
	if(currPokeID != null){
		var newID = currPokeID - 1;
		if(newID == 0){
			newID = pokemons.length;
		}
		pokemonRequestData(newID);
	}
	else{
		errorModal();
	}
}