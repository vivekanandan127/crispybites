const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({

    name:String,

    type:String,

    image:String,

    ingredients:String,

    steps:String,

    eatingTime:String,

    chef:String,

    userId:String,

    userName:String,

    userPhoto:String

});

module.exports =
mongoose.model(
    "Recipe",
    recipeSchema
);