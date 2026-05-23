const mongoose =
require("mongoose");
const recipeSchema =
new mongoose.Schema({

    name:String,

    type:String,

    image:String,

    ingredients:String,

    steps:String,

    chef:String,

    eatingTime:String,

    userId:String,

    userName:String,

    userPhoto:String,

    likes:{

        type:[String],

        default:[]

    }

});

module.exports =
mongoose.model(
    "Recipe",
    recipeSchema
);