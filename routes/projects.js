var express = require("express");
var router = express.Router();
var Project = require("../models/project.js")

// INDEX ROUTE
router.get("/projects", function(req, res){
    // get all projects from DB
    Project.find({}, function (err, allProjects){
        if(err){
            console.log(err);
        } else {
            res.render("projects/index", {projects:allProjects});
        }
    })
    // res.render("projects", {projects:projects});
});

// CREATE ROUTE
router.post("/projects", function(req, res){
    // get data from form and add to projects array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newProject = {name: name, image:image, description:description}
    // create new project and save to db
    Project.create(newProject, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/projects");
        }
    });

});


// NEW ROUTE - SHOW FORM to create new project
router.get("/projects/new", function(req, res){
    res.render("projects/new");
});

// SHOW ROUTE - one item in particular
router.get("/projects/:id", function(req, res){
    // find project with id
    Project.findById(req.params.id).populate("comments").exec(function(err, project){
        if(err){
            console.log(err);
            res.redirect("/projects");
        } else {
            // console.log(project);
            // render show template with that project
            res.render("projects/show", {project: project});
        }
    });


});


module.exports = router;