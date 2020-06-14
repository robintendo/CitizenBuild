var mongoose = require("mongoose");

// Schema Setup
var projectSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    jobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job"
        }
    ],
    tools: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tool"
        }
    ],
    workspaces: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workspace"
        }
    ]
});

module.exports = mongoose.model("Project", projectSchema);