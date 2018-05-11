function startInterval(){
   //Starts an interval - every 3 seconds it will try and get a notification
   setInterval(function(){ getNotif() }, 3000);
}

function closeNotif(){
    //Closes the notification window
    $("#notif_bar").hide();
}

function getNotif(){
    //Get the most recent notification from the server
    $.ajax({
		url: 'https://kaps-a3-mathur15.c9users.io/api/notify',
		type: 'GET',
		dataType: "JSON",
		success: function(data){
		    console.log(data);
		    
		    //We get an emptry string when the user is not logged in or there are no new notifications
		    
			if (data.data != ""){
			    //If the Notification is not an empty string, generate the notification window
			    $("#notif_bar").html('<a id = "notif_close" class="close" style = "right: 1vw;" onclick = "closeNotif();" >×</a>' + "<h4>" + data.data + "<h4>");
			    $("#notif_bar").show();
			}
		},
		error: function(e){
		    console.log("failed");
		}
	});
}

// Navbar modifications for each page
function activateWild(argument) {
	$("#wild-tab").addClass('active');
}
function activateHome(argument) {
	$("#home-tab").addClass('active');
}
function activateSearch(argument) {
	$("#search-tab").addClass('active');
}
function activateMessages(argument) {
	$("#messages-tab").addClass('active');
}
function activateCollection(argument) {
	$("#collection-tab").addClass('active');
}
function activateLogin(argument) {
	$("#login-tab").addClass('active');
}
function activateRegister(argument) {
	$("#register-tab").addClass('active');
}
