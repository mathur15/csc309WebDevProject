var user = require("../models/user");
var message = require("../models/message");

var middlewareObj = {};

//checks if user is logged in
middlewareObj.checkLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return true;
    }
    res.redirect("/login");
}

module.exports = middlewareObj;