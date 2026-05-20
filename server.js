require("dotenv").config();

const Recipe = require("./models/Recipe");

require("./db");

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();


// MULTER CONFIG
const storage = multer.diskStorage({

    destination: function(req, file, cb) {

        cb(null, "uploads/");

    },

    filename: function(req, file, cb) {

        cb(
            null,
            Date.now() + "-" + file.originalname
        );

    }

});

const upload = multer({ storage: storage });


// MIDDLEWARE
app.use(cors());

app.use(express.json());

app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);


// HOME ROUTE
app.get("/", function(req, res) {

    res.send("CrispyBites Backend Running 🔥");

});


// GET RECIPES
app.get("/recipes",
async function(req, res) {

    const recipes = await Recipe.find();

    res.json(recipes);

});


// POST RECIPE
app.post(
    "/recipes",
    upload.single("image"), 

async function(req, res) {

    try {
        console.log(req.body);
        const newRecipe = new Recipe({

            name: req.body.name,

            chef: req.body.chef,

            type: req.body.type,

            ingredients: req.body.ingredients,

            steps: req.body.steps,

            userId:req.body.userId,

            userName:req.body.userName,

            userPhoto:req.body.userPhoto,

            image: req.file.filename

        });

        await newRecipe.save();

        res.json({

            message: "Recipe uploaded successfully"

        });

    }

    catch(error) {

        console.log(error);

        res.status(500).json({

            message: "Upload failed"

        });

    }

});


// SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {

    console.log(`Server started on ${PORT} 🚀`);

});app.get("/delete-all", async function(req, res){

    await Recipe.deleteMany({});

    res.json({

        message:"All recipes deleted 🔥"

    });

});