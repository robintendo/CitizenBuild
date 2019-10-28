var express = require("express");
var router = express.Router();
var Project = require("../models/project");
var Comment = require("../models/comment");

// -------------------------------
// COMMENTS ROUTES
// -------------------------------


// Comments new
router.get("/projects/:id/comments/new", isLoggedIn, function(req, res){
    // find project by id
    Project.findById(req.params.id, function(err, project){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {project: project});
        }
    });
});


// Comments create
router.post("/projects/:id/comments", isLoggedIn, function(req, res){
    // lookup project using ID
    Project.findById(req.params.id, function(err, project){
        if(err){
            console.log(err);
            redirect("/projects");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    project.comments.push(comment);
                    project.save();
                    res.redirect('/projects/'+ project._id);
                }
            })
        }
    })
})


// middlewear
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;