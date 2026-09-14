function searchProfiles() {

    const searchInput = document.getElementById("searchInput");

    const searchText = searchInput.value.toLowerCase();

    const profiles = document.querySelectorAll(".profile-card");

    let visibleProfiles = 0;


    profiles.forEach(function(profile) {

        const searchableText = profile.dataset.search;

        if (searchableText.includes(searchText)) {

            profile.style.display = "flex";

            visibleProfiles++;

        } else {

            profile.style.display = "none";

        }

    });


    document.getElementById("resultCount").textContent =
        visibleProfiles + " personen";

}


function sendCallRequest(name) {

    alert(
        "Je belverzoek naar " +
        name +
        " is verstuurd!"
    );

}