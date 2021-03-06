var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object

var ArticleSchema = new Schema({

  title: {
    type: String,
    required: true
  },
 
  link: {
    type: String,
    required: true
  },

  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
});

  // This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Articles", ArticleSchema);
  
// Export the Article model
module.exports = Article;
