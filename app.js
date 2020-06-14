var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Project     = require("./models/project"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");


// Requiring routes
var projectRoutes       = require("./routes/projects"),
    indexRoutes         = require("./routes/index");

// Avoid depreciation warning on mongoose.connect
mongoose.set('useNewUrlParser', true);


// mongoose.connect("mongodb://localhost/yelp_camp");

// From Gorm IDE video
mongoose.connect('mongodb+srv://robinnorman:cloudyday@cluster0-dqohx.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log('Connected to BD!');
}).catch(err => {
    console.log('ERROR:', err.message);
});


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// Seed the data
seedDB();

// PASSPORT CONFIGURATION (AUTHORIZATION)
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUnitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use(indexRoutes);
app.use(projectRoutes);


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

