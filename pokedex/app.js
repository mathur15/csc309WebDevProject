var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    message  = require("./models/message"),
    User        = require("./models/user")
    
//requiring routes
var messagesRoutes = require("./routes/message"),
    indexRoutes      = require("./routes/index")
 
var url = process.env.DATABASEURL || "mongodb://localhost/pokemon";
mongoose.connect(url);

var viewDest = String(__dirname) + "/views";  
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set("views", viewDest); 
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.use(express.static(__dirname + "/views"));

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "poke",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.pokemon = req.pokemon;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/api", messagesRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Pokedex Started");
});