const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comments = new mongoose.Schema({
    // User: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true, trim: true },
    upvotes: { type: Number, default: 0},
    downvotes: { type: Number, default: 0},
},{
timestamps: true,
})
const Comment = mongoose.model("COMMENT", Comments);


module.exports = Comment;
