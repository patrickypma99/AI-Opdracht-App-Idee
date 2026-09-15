const settingsForm = document.getElementById("settingsForm");
const saveMessage = document.getElementById("saveMessage");

settingsForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const selectedInterests = [];

    const interestCheckboxes = document.querySelectorAll(
        'input[name="interests"]:checked'
    );

    interestCheckboxes.forEach(function(checkbox) {
        selectedInterests.push(checkbox.value);
    });

    const gender = document.querySelector(
        'input[name="gender"]:checked'
    ).value;

    const minAge = Number(
        document.getElementById("minAge").value
    );

    const maxAge = Number(
        document.getElementById("maxAge").value
    );

    const location = document.getElementById("location").value;

    const distance = Number(
        document.getElementById("distance").value
    );

    if (minAge > maxAge) {
        saveMessage.textContent =
            "De minimumleeftijd mag niet hoger zijn dan de maximumleeftijd.";

        return;
    }

    const settings = {
        interests: selectedInterests,
        gender: gender,
        minAge: minAge,
        maxAge: maxAge,
        location: location,
        distance: distance
    };

    localStorage.setItem(
        "matchingSettings",
        JSON.stringify(settings)
    );

    saveMessage.textContent =
        "Je voorkeuren zijn opgeslagen!";
});