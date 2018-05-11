We have further built on from the second assignment and implemented a backend to this project. We implemented
our code with Node js with express and used mongo as our database. The application now has a login feature 
where we can register users and store them in our database schema. Each user has their own unique data and collections 
of pokemon they can manaage. Users are allowed to "catch"pokemon and further add to the collection. This application 
is for people who have an interest in pokemon and this application also has the feature of having
notification messasges to update the user of current happenings with other user. We have "wilderness" tab which shows you the 
location of the pokemon which we can catch.

Instructions:
- To make a message post to all users using curl:
	curl --data "message=typeMessageHere" https://kaps-a3-mathur15.c9users.io/api/messages