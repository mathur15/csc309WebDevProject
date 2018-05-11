
var pokeList = [];

function get_collection(){
	$.ajax({
		url: 'https://kaps-a3-mathur15.c9users.io/api/collection',
		type: 'GET',
		dataType: 'JSON',
		success: function(data){
			if(data.data){
				pokeList = data.data;
			}
			create_collection();
		},
		error: function(e){
			console.log("failure");
		}
	});
}

function create_collection(){
    for(var i = 0; i < pokeList.length; i++){
        var id = pokeList[i];
        var imgsrc = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + id + ".png";
        $("#p").append("<img id = p_img" + id + " class = 'p_img' title = " + id + " src = " + imgsrc + " onclick = pokemonRequestData(" + id + ")>");
    }
}

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

			$("#myModal").show();
		},
		error: function(e){
			errorModal();
		}
	});
}

function refreshModal(){//clear window for new result
	$("#modalText").html("Fetching Data...");
	$("#modalImg").attr('src', "");
	$("#pokeData").html("");
}

//when we are done searching
function closeModal(){
	$("#myModal").hide();
	//currPokeID = null;
}

function errorModal(){
	$("#modalText").html("pokemon is lost :(");
	//footerButtonsInactive();
}