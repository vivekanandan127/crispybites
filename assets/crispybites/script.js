window.addEventListener("DOMContentLoaded", function(){
fetch("http://localhost:3000/recipes")

.then(response => response.json())

.then(data => {

    const nonVegContainer =
        document.getElementById("recipe-container");

    const vegContainer =
        document.getElementById("veg-container");

    data.forEach(recipes => {

        if(recipes.type === "Non Veg"){

            nonVegContainer.innerHTML += `

            <div class="card"onclick="openPopup('${recipes.name}', '${recipes.image}', '${recipes.ingredients}', '${recipes.steps}','${recipes.chef}')"
>

                <img src="http://localhost:3000/uploads/${recipes.image}">

                <div class="in-card">

                    <h4 class="N-name">
                        ${recipes.name}
                    </h4>
                    <p class="chef-name">
                        By ${recipes.chef}
                    </p>

                </div>

            </div>

            `;

        }

        else if(recipes.type === "Veg"){

            vegContainer.innerHTML += `

            <div class="vg-card" onclick="openPopup('${recipes.name}', '${recipes.image}', '${recipes.ingredients}', '${recipes.steps}','${recipes.chef}')"
>

                <img src="http://localhost:3000/uploads/${recipes.image}">

                <div class="vg-in-card">

                    <h4 class="N-name">
                        ${recipes.name}
                    </h4>
                    <p class="chef-name">
                        By ${recipes.chef}
                    </p>

                </div>

            </div>

            `;

        }

    });
    //nveg
    const search =
        document.getElementById("search");
        console.log(search);
    search.addEventListener("keyup", function(){
        
        console.log("Search wwwworking");
        const value =
            search.value.toLowerCase();

        const nonvegcards =
            document.querySelectorAll(".card");
        const vegcards =
            document.querySelectorAll(".vg-card");
            let nonVegFound = false;
            let vegFound = false;

        nonvegcards.forEach(card => {
            
            const title =
                card.querySelector(".N-name")
                .textContent
                .toLowerCase();

            if(title.includes(value)){

                card.style.display = "";
                    nonVegFound = true;
                }
            else{

                card.style.display = "none";

            }
            

        });
        //veg
        vegcards.forEach(card => {
            
            const title =
                card.querySelector(".N-name")
                .textContent
                .toLowerCase();

            if(title.includes(value)){

                card.style.display = "";
                    vegFound = true;
                }
            else{

                card.style.display = "none";
            }
        });
        //n v results
        const noResults =
        document.getElementById("no-results");

        if(nonVegFound || value === ""){

            noResults.style.display = "none";

        }

        else{

            noResults.style.display = "block";

        }
        // v results
        const vgnoResults =
            document.getElementById("veg-no-results");

        if(vegFound || value === ""){

            vgnoResults.style.display = "none";

        }

        else{

            vgnoResults.style.display = "block";

        }

    });

});
});
function openPopup(
    name,
    image,
    ingredients,
    steps,
    chef
){

    document.getElementById("popup")
        .style.display = "flex";

    document.getElementById("popup-title")
        .textContent = name;

document.getElementById("popup-image")
.src =
`http://localhost:3000/uploads/${image}`;
const ingredientList =
ingredients
.split(",")
.map(item => {

    item = item.trim();

    return `
        <li>
            ${item.charAt(0).toUpperCase() + item.slice(1)}
        </li>
    `;

});

document.getElementById("popup-ingredients")
.innerHTML =
`
<b>Ingredients:</b>

<ul class="popup-list">
    ${ingredientList.join("")}
</ul>
`;

const stepsList =
steps
.split(",")
.map(item => {

    item = item.trim();

    return `
        <li>
            ${item.charAt(0).toUpperCase() + item.slice(1)}
        </li>
    `;

});

document.getElementById("popup-steps")
.innerHTML =
`
<b>Steps:</b>

<ul class="popup-list">
    ${stepsList.join("")}
</ul>
`;
    document.getElementById("popup-chef")
        .textContent =
        "Chef: " + chef;
}
document.getElementById("close-btn")
.addEventListener("click", function(){

    document.getElementById("popup")
        .style.display = "none";

});
window.addEventListener("click", function(event){

    const popup =
    document.getElementById("popup");

    if(event.target === popup){

        popup.style.display = "none";

    }

});