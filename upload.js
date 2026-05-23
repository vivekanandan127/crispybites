import {
    auth,
    onAuthStateChanged
}
from "./firebase.js";


let currentUser = null;


// WAIT FOR AUTH
onAuthStateChanged(auth, function(user){

    if(!user){

        alert("Login first 😭🔥");

        window.location.href =
        "index.html";

        return;

    }

    currentUser = user;

});



window.addEventListener(
"DOMContentLoaded",

function(){

    const uploadBtn =
    document.getElementById(
        "upload-btn"
    );


    const imageBtn =
    document.getElementById(
        "image-upload-btn"
    );


    const imageInput =
    document.getElementById(
        "image-input"
    );


    const previewImage =
    document.getElementById(
        "preview-image"
    );



    // IMAGE PICKER
    imageBtn.addEventListener(

        "click",

        function(){

            imageInput.click();

    });



    // IMAGE PREVIEW
    imageInput.addEventListener(

        "change",

        function(event){

            const file =
            event.target.files[0];

            if(file){

                previewImage.src =
                URL.createObjectURL(file);

            }

    });




    // UPLOAD RECIPE
    uploadBtn.addEventListener(

        "click",

        async function(){

            try{


                // USER CHECK
                if(!currentUser){

                    alert(
                        "User not loaded 😭🔥"
                    );

                    return;

                }



                // IMAGE CHECK
                if(!imageInput.files[0]){

                    alert(
                        "Select image first 😭🔥"
                    );

                    return;

                }



                // INPUT VALUES
                const name =
                document.getElementById(
                    "food-name"
                ).value;


                const chef =
                document.getElementById(
                    "chef-name"
                ).value;


                const type =
                document.getElementById(
                    "food-type"
                ).value;

                const eatingTime =
document.getElementById(
    "eating-time"
).value;
                const ingredients =
                document.getElementById(
                    "ingredients"
                ).value;


                const steps =
                document.getElementById(
                    "steps"
                ).value;



                // FORMDATA
                const formData =
                new FormData();


                formData.append(
                    "name",
                    name
                );

                formData.append(
                    "chef",
                    chef
                );

                formData.append(
                    "type",
                    type
                );

                formData.append(
    "eatingTime",
    eatingTime
);
                formData.append(
                    "ingredients",
                    ingredients
                );

                formData.append(
                    "steps",
                    steps
                );



                // OWNER DATA
                formData.append(
                    "userId",
                    currentUser.uid
                );

                formData.append(
                    "userName",
                    currentUser.displayName
                );

                formData.append(
                    "userPhoto",
                    currentUser.photoURL
                );



                // IMAGE
                formData.append(
                    "image",
                    imageInput.files[0]
                );


                // DEBUG
                console.log(
                    [...formData.entries()]
                );



                // FETCH
                const response =
                await fetch(

                    "https://crispybites.onrender.com/recipes",

                    {
                        method:"POST",
                        body:formData
                    }

                );



 const text =
await response.text();

console.log(text);

alert(text);



            }

            catch(error){

                console.log(error);
                alert(
                    "Upload failed 😭 🔥"
                );
            }

    });

});