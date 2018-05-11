var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

var viewDest = String(__dirname).replace('routes', 'views');
//root route

router.get("/", function(req, res){
    res.render("home");
});

router.get("/pokedex", function(req, res){
    // res.sendFile(viewDest + "/search.html");
    res.render("search");
});

router.get("/wilderness", function(req, res){
    res.render("wild");
});

router.get("/messages", function(req, res){
    res.render("messages");
});

router.get("/collection", function(req, res){
    res.render("collection");
});


// show register form
router.get("/register", function(req, res){
   res.render("register"); 
});



//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username, password: req.body.password});
    User.register(newUser,req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.send("register");
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to Pokedex " + user.username);
           res.redirect("/"); 
        });
    });
});

//show login form
router.get("/login", function(req, res){
   res.render("login"); 
});

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash:true
        
    }),function(req,res){
        var username = req.body.username;
        User.find({username:username},function(err,foundUser){
            if(err){
                console.log(err);
            }
            var pokemon = foundUser.pokemon;
        })
    });

// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged you out!");
   res.redirect("/");
});

// router.post("/wilderness", function(req, res){
    
// })


module.exports = router;