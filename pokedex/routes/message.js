var express = require("express");
var router  = express.Router();
var message = require("../models/message");
var user = require("../models/user");
var middleware = require("../middleware/middle");
var latest = ""; 
var pokeID =1+ Math.floor(Math.random() * 860);

router.get("/wild", function(req,res){
    res.send({"data" : pokeID});
});


function randomPoke(){
    pokeID = 1+ Math.floor(Math.random() * 860);
}


setInterval(function(){ randomPoke(); }, 30000);


router.post("/collection", function(req, res){
        //post a pokemon to db
    if(middleware.checkLoggedIn){
        if(req.user!= null){
        var idNum = req.body.num;

        console.log(req.user._id + " and "+ idNum); 
        var newvalues = {$push: {pokemon : idNum}};
        user.update({_id: req.user._id}, newvalues, function(err,result){
        if(err){
            console.log("err1");
        }
        res.send("Added pokemon to collection"); 

        });

        }else{
            console.log("not logged in");
        }
    }
});

router.get("/collection",function(req,res){
    
    if(middleware.checkLoggedIn){
        if(req.user!= null){
            user.find({_id: req.user._id},function(err,currUser){
                if(err){
                    console.log("err");
                }else{
                    console.log(JSON.stringify({"data" : currUser[0].pokemon}));
                    res.send(JSON.stringify({"data" : currUser[0].pokemon}));
                }
            });
        }else{
            console.log("not logged in"); 
        }
    }
    
});

router.get("/notify",function(req, res) {
    if(middleware.checkLoggedIn){
        if(req.user!= null){
            user.find({_id: req.user._id},function(err, currUser){
                if(err){
                    console.log("Error");
                }else{

                
                if(!currUser[0].checkedNote){
                    console.log(latest + "\n");
                   
                    res.send('{ "data":"' + latest + '" }');
                    var newvalues = {$set: {checkedNote: true} };
                    user.update({_id: req.user._id}, newvalues, function(err,result){
                    if(err){
                        console.log("err");
                    } 
                    

                    });
                   
                }else{
                    res.send('{ "data":"" }'); 
                }
                
                }});
        }
        
        
    }else{
        console.log("Not logged in"); 
    }
});

router.get("/messages", function(req, res){
    // get for all messages
    message.find({}, function(err, allmessages){
      if(err){
          console.log(err);
      } else {
          console.log("Messages sent!");
          res.send(JSON.stringify(allmessages));
      }
    });
});

router.post("/messages", function(req,res){
    //post a new message
    var mess = req.body.message; 
    latest = mess; 
    var newMessage = {message: mess}; 
    message.create(newMessage, function(err, newly){
        if (err){
            console.log("err");
        }else{
            var newvalues = {$set: {checkedNote: false} };
            user.updateMany({}, newvalues, function(err){
                if(err){
                    console.log("err");
                }
              
            });
            res.send("New message posted!");
            console.log("Added item" + newly); 

        }
    });
  
});

router.delete("/messages/:id", function(req, res){
    message.find({_id: req.params.id}, function(err1, result){
        if(err1){
            res.send("err");
        }else if (!result.length){
            res.send("Message not found!");
        }else{
            message.findByIdAndRemove({_id: req.params.id}, function(err){
          if(err){
              res.send("Error");
          }else{
              res.send("Message deleted!");
          }
     
        });
    
        }
    });

    

});

  

 module.exports = router;

