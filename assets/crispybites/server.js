const Recipe =
require("./models/Recipe");

require("./db");

const express =
require("express");

const multer =
require("multer");

const cors =
require("cors");

const app =
express();


// MULTER CONFIG
const storage =
multer.diskStorage({

    destination:function(req,file,cb){

        cb(null,"uploads/");

    },

    filename:function(req,file,cb){

        cb(
            null,
            Date.now() + "-" + file.originalname
        );

    }

});

const upload =
multer({ storage:storage });


// MIDDLEWARE
app.use(cors());

app.use(express.json());

app.use(
    "/uploads",
    express.static("uploads")
);


// GET RECIPES
app.get("/recipes",
async function(req,res){

    const recipes =
    await Recipe.find();

    res.json(recipes);

});


// POST RECIPE
app.post(
    "/recipes",
    upload.single("image"),

async function(req,res){

    try{

        const newRecipe =
        new Recipe({

            name:req.body.name,

            chef:req.body.chef,

            type:req.body.type,

            ingredients:req.body.ingredients,

            steps:req.body.steps,

            image:req.file.filename

        });

        await newRecipe.save();

        res.json({

            message:"Recipe uploaded successfully"

        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            message:"Upload failed"

        });

    }

});


// SERVER
app.listen(3000,function(){

    console.log("Server started");

});