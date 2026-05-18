window.addEventListener("DOMContentLoaded", function(){


    const uploadBtn =
    document.getElementById("upload-btn");

    const imageBtn =
    document.getElementById("image-upload-btn");

    const imageInput =
    document.getElementById("image-input");

    const previewImage =
    document.getElementById("preview-image");



    // IMAGE PICKER
    imageBtn.addEventListener("click", function(){

        imageInput.click();

    });



    // IMAGE PREVIEW
    imageInput.addEventListener("change", function(event){

        const file =
        event.target.files[0];

        if(file){

            const imageURL =
            URL.createObjectURL(file);

            previewImage.src =
            imageURL;

        }

    });



    // UPLOAD RECIPE
    uploadBtn.addEventListener("click",
    async function(){

        const name =
        document.getElementById("food-name").value;

        const chef =
        document.getElementById("chef-name").value;

        const type =
        document.getElementById("food-type").value;

        const ingredients =
        document.getElementById("ingredients").value;

        const steps =
        document.getElementById("steps").value;


        const formData =
        new FormData();

        formData.append("name", name);

        formData.append("chef", chef);

        formData.append("type", type);

        formData.append("ingredients", ingredients);

        formData.append("steps", steps);

        formData.append(
            "image",
            imageInput.files[0]
        );


        const response =
        await fetch(
            "http://localhost:3000/recipes",
            {

                method:"POST",

                body:formData

            }
        );

        const data =
        await response.json();

        alert(data.message);

    });

});