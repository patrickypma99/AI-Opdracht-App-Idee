let selectedCategory = "alle";


function filterCategory(category, button) {

    selectedCategory = category;


    // Alle categorie buttons resetten

    const buttons =
        document.querySelectorAll(".category");

    buttons.forEach(function(button) {

        button.classList.remove("active");

    });


    // Geselecteerde categorie actief maken

    button.classList.add("active");


    filterActivities();

}



function filterActivities() {

    const searchInput =
        document.getElementById("searchInput");

    const search =
        searchInput.value.toLowerCase();


    const activities =
        document.querySelectorAll(".activity-card");


    let visibleActivities = 0;


    activities.forEach(function(activity) {

        const category =
            activity.dataset.category;

        const name =
            activity.dataset.name;


        const categoryMatch =
            selectedCategory === "alle" ||
            category === selectedCategory;


        const searchMatch =
            name.includes(search);


        if (categoryMatch && searchMatch) {

            activity.style.display = "flex";

            visibleActivities++;

        }

        else {

            activity.style.display = "none";

        }

    });


    document.getElementById("resultCount").textContent =
        visibleActivities + " activiteiten";

}



function viewActivity(name) {

    alert(
        "Je hebt gekozen voor: " +
        name
    );

}

