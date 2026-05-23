import {
    auth,
    onAuthStateChanged
}
from "./firebase.js";
const nonvegBtn =
document.getElementById(
    "nonveg-btn"
);

const vegBtn =
document.getElementById(
    "veg-btn"
);

window.updateRecipe = async function(){

    const updatedRecipe = {

        name:
        document.getElementById(
            "edit-name"
        ).value,

        ingredients:
        document.getElementById(
            "edit-ingredients"
        ).value,

        steps:
        document.getElementById(
            "edit-steps"
        ).value,

        type:
        document.getElementById(
            "edit-type"
        ).value

    };

    const response =
    await fetch(

        `https://crispybites.onrender.com/recipes/${currentEditId}`,

        {

            method:"PUT",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:JSON.stringify(
                updatedRecipe
            )

        }

    );

    const data =
    await response.json();

    alert(data.message);

    location.reload();

}
// CONTAINER
const recipeContainer =
document.getElementById(
    "my-recipe-container"
);


// USER CHECK
onAuthStateChanged(
    auth,

async function(user){

    // NOT LOGGED IN
    if(!user){

        window.location.href =
        "index.html";

        return;

    }


    // PROFILE INFO
    document
    .getElementById("profile-user-name")
    .textContent =
    user.displayName;


    document
    .getElementById("profile-user-photo")
    .src =
    user.photoURL;



    // FETCH RECIPES
    const response =
    await fetch(
        "https://crispybites.onrender.com/recipes"
    );

    const recipes =
    await response.json();



    // FILTER USER RECIPES
const myRecipes =
recipes.filter(function(recipe){

    return recipe.userId === user.uid;

});

 

nonvegBtn.addEventListener(
    "click",

    function(){

        nonvegBtn.classList.add(
            "active-switch"
        );

        vegBtn.classList.remove(
            "active-switch"
        );

        renderRecipes("Non Veg");

});

vegBtn.addEventListener(

    "click",

    function(){

        vegBtn.classList.add(
            "active-switch"
        );

        nonvegBtn.classList.remove(
            "active-switch"
        );

        renderRecipes("Veg");

});
const vegRecipes =
myRecipes.filter(function(recipe){

    return recipe.type === "Veg";

});


const nonVegRecipes =
myRecipes.filter(function(recipe){

    return recipe.type === "Non Veg";

});

    // UPDATE COUNTS
    document
    .getElementById("v-count")
    .textContent =
    vegRecipes.length;


    document
    .getElementById("n-count")
    .textContent =
    nonVegRecipes.length;



    // EMPTY STATE
    if(myRecipes.length === 0){

        recipeContainer.innerHTML =

        `
        <h2 style="
            color:white;
            margin-top:50px;
        ">

            No recipes uploaded yet 😭🔥

        </h2>
        `;

        return;

    }



    // RENDER RECIPES
   renderRecipes("Non Veg");

function renderRecipes(type){

    recipeContainer.innerHTML = "";

    myRecipes.forEach(recipe => {

        if(recipe.type === type){

            const cardClass =
            recipe.type === "Veg"
            ? "vg-card"
            : "card";

            const inCardClass =
            recipe.type === "Veg"
            ? "vg-in-card"
            : "in-card";

            recipeContainer.innerHTML += `

            <div class="${cardClass}"onclick="
openPopup(
'${recipe.name}',
'${recipe.image}',
'${recipe.ingredients}',
'${recipe.steps}',
'${recipe.chef}'
)">

                <img
                src="${recipe.image}"

                onerror="this.src='fallback.svg'">

                <div class="${inCardClass}">

                    <h4 class="N-name">
                        ${recipe.name}
                    </h4>

                    <p class="chef-name">
                        By ${recipe.chef}
                    </p>
                       <div class="action-box">

                            <img class="edit-icon"
                                src="edit.svg"

                                onclick="event.stopPropagation(); editRecipe(
                                '${recipe._id}',
                                '${recipe.name}',
                                '${recipe.ingredients}',
                                '${recipe.steps}',
                                '${recipe.type}'
                            )">

                            <img
                                class="delete-icon"
                                src="delete.svg"

                                onclick="event.stopPropagation(); deleteRecipe(
                                '${recipe._id}'
                            )">

                        </div>

                </div>

            </div>

            `;

        }

    });

}
});
window.openPopup = function(

    name,
    image,
    ingredients,
    steps,
    chef

){

    document.getElementById(
        "popup"
    ).style.display = "flex";


    document.getElementById(
        "popup-title"
    ).textContent = name;


    document.getElementById(
        "popup-image"
    ).src =

    `https://crispybites.onrender.com/uploads/${image}`;


    document.getElementById(
        "popup-chef"
    ).textContent =

    `By ${chef}`;


    document.getElementById(
        "popup-ingredients"
    ).textContent = ingredients;


    document.getElementById(
        "popup-steps"
    ).textContent = steps;

}
window.closePopup = function(){

    document.getElementById(
        "popup"
    ).style.display = "none";

}

window.deleteRecipe = async function(id){

    const confirmDelete =
    confirm(
        "Delete this recipe? 😭"
    );

    if(!confirmDelete){

        return;

    }

    try{

        const response =
        await fetch(

            `https://crispybites.onrender.com/recipes/${id}`,

            {
                method:"DELETE"
            }

        );

        const data =
        await response.json();

        alert(data.message);

        location.reload();

    }

    catch(error){

        console.log(error);

        alert(
            "Delete failed 😭🔥"
        );

    }

}
let currentEditId = "";

window.editRecipe = function(

    id,
    name,
    ingredients,
    steps,
    type

){

    currentEditId = id;

    document
    .getElementById("edit-popup")
    .style.display = "flex";

    document
    .getElementById("edit-name")
    .value = name;

    document
    .getElementById("edit-ingredients")
    .value = ingredients;

    document
    .getElementById("edit-steps")
    .value = steps;

    document
    .getElementById("edit-type")
    .value = type;

}
const editPopup =
document.getElementById(
    "edit-popup"
);

window.addEventListener(

    "click",

    function(event){

        if(event.target === editPopup){

            editPopup.style.display =
            "none";

        }

});
const popup =
document.getElementById(
    "popup"
);

window.addEventListener(

    "click",

    function(event){

        if(event.target === popup){

            popup.style.display =
            "none";

        }

});