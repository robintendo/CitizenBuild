var mongoose    =   require("mongoose"),
    Project  =   require("./models/project"),
    Comment     =   require("./models/comment")
    ;

var data = [
    {
        name:           "Clouds Rest",
        image:          "https://www.reserveamerica.com/webphotos/racms/articles/images/bca19684-d902-422d-8de2-f083e77b50ff_image2_GettyImages-677064730.jpg",
        description:    "are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to "
    },
    {
        name:           "standard",
        image:          "https://d2ciprw05cjhos.cloudfront.net/files/v3/styles/gs_large/public/images/18/06/gettyimages-649155058.jpg?itok=Lhx5ciAR",
        description:    "are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to "
    },
    {
        name:           "eader will be distracted",
        image:          "https://www.novascotia.com/sites/default/files/lure-images/ns-kej-2009-0113-806x759_0.jpg",
        description:    "are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to "
    },
    {
        name:           "odel senten",
        image:          "https://www.novascotia.com/sites/default/files/lure-images/ns-kej-2009-0113-806x759_0.jpg",
        description:    "are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to "
    }
]


function seedDB(){
    // remove all comments
    Comment.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Removed Comments!");
        }
    });
    // remove all projects
    Project.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed projects!");
        // add projects
        data.forEach(function(seed){
            Project.create(seed, function(err, project){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a project");
                    // // create a Comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                project.comments.push(comment);
                                project.save();
                                console.log("Created new comment");
                            }
                        }
                    );
                }
            });
        });
    });

    
}

module.exports = seedDB;