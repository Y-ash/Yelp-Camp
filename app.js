var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose');

mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');


var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Granite Hill",
//     image: "https://images.wallpaperscraft.com/image/tent_night_camping_127903_2560x1440.jpg",
//     description: "This a Huge Granite Hill, Beautiful as nothing can ever be."
// }, function(err, campground){
//     if(err){
//         console.log(error);
//     } else{
//         console.log("Newly created Campground");
//         console.log(campground);
//     }
// })

app.get('/', function(req, res){
    res.render('landing');
});

app.get('/campgrounds', function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            consol.log(err);
        } else{
            res.render('index', {campgrounds: allCampgrounds});
        }
    })
});

app.post('/campgrounds', function(req, res){
    // get data from form and add to campground array
    // redirect to campground page
    var name = req.body.name;
    var imageurl = req.body.image;
    var desc = req.body.description;
    var newCampground = {
        name: name,
        image: imageurl,
        description: desc
    }
    Campground.create(newCampground, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    })
});

app.get('/campgrounds/new', function(req, res){
    res.render('new')
});

//Shows Info about a CampGround

app.get('/campgrounds/:id', function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render('show', {campground: foundCampground});
        }
    })
});

app.listen(3000, function(){
    console.log('Yelp-Camp Server has been started');
})