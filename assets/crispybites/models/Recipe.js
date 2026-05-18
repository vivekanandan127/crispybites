const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({

    name:String,

    type:String,

    image:String,

    ingredients:String,

    steps:String,

    chef:String

});

module.exports =
mongoose.model(
    "Recipe",
    recipeSchema
);