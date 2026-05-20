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


// CONTAINER
const recipeContainer =
document.getElementById(
    "recipe-container"
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

        return (
            recipe.userId === user.uid
        );

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
    if(nonVegRecipes.length > 0){

    renderRecipes("Non Veg");

}

else{

    renderRecipes("Veg");

}

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
    function renderRecipes(type){

    recipeContainer.innerHTML = "";


    const filteredRecipes =
    myRecipes.filter(function(recipe){

        return recipe.type === type;

    });


    if(filteredRecipes.length === 0){

        recipeContainer.innerHTML =

        `
        <h2 style="color:white;">

            No ${type} recipes 😭🔥

        </h2>
        `;

        return;

    }


    filteredRecipes.forEach(function(recipe){

        const cardClass =
        recipe.type === "Veg"
        ? "vg-card"
        : "card";


        const inCardClass =
        recipe.type === "Veg"
        ? "vg-in-card"
        : "in-card";


        recipeContainer.innerHTML += `

<div
class="${cardClass}"

onclick='openPopup(
"${recipe.name}",
"${recipe.image}",
"${recipe.ingredients}",
"${recipe.steps}",
"${recipe.chef}"
)'

>

<img
src="https://crispybites.onrender.com/uploads/${recipe.image}"

onerror="this.src='fallback.svg'">

<div class="${inCardClass}">

<h4 class="N-name">
${recipe.name}
</h4>

<p class="chef-name">
By ${recipe.chef}
</p>

</div>

</div>

`;
    });

}
});