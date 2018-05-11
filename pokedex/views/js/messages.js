var messages_list = [];			//List of all the messages recorded in the database

function create_messages(){
	//Generates a bunch of DOM elements containing the messages, one for each message.
    for(var i = 0; i < messages_list.length; i++){
        $("#body").append("<div id = m_" + i + " class='alertLOG'><h2>" + messages_list[i].message + "</h2><small>message id: " + messages_list[i]._id + "</small></div>");

    }
}

function getMessages(){
	//Retrieve a list containing all the messages from the database.
	$.ajax({
		url: 'https://kaps-a3-mathur15.c9users.io/api/messages',
		type: 'GET',
		dataType: 'JSON',
		success: function(data){
			console.log(data);
			for(var i = 0; i < data.length; i++){
				messages_list.push(data[i]);	//Add the message to the list of messages
			}
			create_messages();	//Generate the dom elements
		},
		error: function(e){
			//alert(e);
			getMessages(); //This will occur most likey due to a bad connection, try and recall to see if it works
		}
	});
}

