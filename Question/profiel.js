/* =========================================
   PROFIELGEGEVENS
   ========================================= */

let interests = [
    "Koffie drinken",
    "Reizen",
    "Gaming"
];


/* =========================================
   VRAGEN VOOR HET ALGORITME
   ========================================= */

const questions = [

    {
        question: "Wat doe je het liefst in je vrije tijd?",

        answers: [
            "Sporten of actief bezig zijn",
            "Films en series kijken",
            "Gaming",
            "Koffie drinken en praten",
            "Reizen en nieuwe plekken ontdekken"
        ]
    },


    {
        question: "Hoe zou je jezelf omschrijven?",

        answers: [
            "Rustig en introvert",
            "Sociaal en extravert",
            "Een combinatie van beide",
            "Spontaan en avontuurlijk",
            "Creatief en nieuwsgierig"
        ]
    },


    {
        question: "Wat vind je belangrijk bij nieuwe mensen?",

        answers: [
            "Humor",
            "Eerlijkheid",
            "Gemeenschappelijke interesses",
            "Diepe gesprekken",
            "Samen nieuwe dingen proberen"
        ]
    },


    {
        question: "Welke activiteit zou je samen willen doen?",

        answers: [
            "Samen koffie drinken",
            "Naar de bioscoop",
            "Sporten",
            "Een bordspel spelen",
            "Een wandeling maken"
        ]
    },


    {
        question: "Wat zoek je vooral op dit platform?",

        answers: [
            "Nieuwe vrienden",
            "Iemand om activiteiten mee te doen",
            "Mensen met dezelfde interesses",
            "Gezellige gesprekken",
            "Nieuwe ervaringen"
        ]
    }

];


let currentQuestion = 0;

let answersGiven = [];



/* =========================================
   INTERESSES WEERGEVEN
   ========================================= */

function renderInterests() {

    const container = document.getElementById("interestsContainer");

    container.innerHTML = "";


    interests.forEach(function (interest, index) {

        const tag = document.createElement("div");

        tag.className = "interest-tag";


        const text = document.createElement("span");

        text.textContent = interest;


        const removeButton = document.createElement("button");

        removeButton.className = "remove-interest";

        removeButton.textContent = "×";

        removeButton.title = "Verwijder interesse";


        removeButton.onclick = function () {

            removeInterest(index);

        };


        tag.appendChild(text);

        tag.appendChild(removeButton);

        container.appendChild(tag);

    });

}



/* =========================================
   INTERESSE TOEVOEGEN
   ========================================= */

function addInterest() {

    const input = document.getElementById("interestInput");

    const newInterest = input.value.trim();


    if (newInterest === "") {

        alert("Vul eerst een interesse in.");

        return;

    }


    if (interests.includes(newInterest)) {

        alert("Deze interesse staat al in je profiel.");

        return;

    }


    interests.push(newInterest);

    input.value = "";

    renderInterests();

}



/* =========================================
   SUGGESTIE TOEVOEGEN
   ========================================= */

function addSuggestedInterest(interest) {

    if (interests.includes(interest)) {

        alert("Deze interesse staat al in je profiel.");

        return;

    }


    interests.push(interest);

    renderInterests();

}



/* =========================================
   INTERESSE VERWIJDEREN
   ========================================= */

function removeInterest(index) {

    interests.splice(index, 1);

    renderInterests();

}



/* =========================================
   ENTER GEBRUIKEN BIJ INTERESSE
   ========================================= */

document
    .getElementById("interestInput")
    .addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            event.preventDefault();

            addInterest();

        }

    });



/* =========================================
   VRAGEN WEERGEVEN
   ========================================= */

function renderQuestion() {

    const questionContainer =
        document.getElementById("questionContainer");


    const question = questions[currentQuestion];


    questionContainer.innerHTML = "";


    const questionBox = document.createElement("div");

    questionBox.className = "question-box";


    const questionTitle = document.createElement("h3");

    questionTitle.textContent = question.question;


    questionBox.appendChild(questionTitle);


    const answerOptions = document.createElement("div");

    answerOptions.className = "answer-options";


    question.answers.forEach(function (answer, index) {

        const answerButton = document.createElement("button");

        answerButton.type = "button";

        answerButton.className = "answer-option";

        answerButton.textContent = answer;


        if (answersGiven[currentQuestion] === answer) {

            answerButton.classList.add("selected");

        }


        answerButton.onclick = function () {

            selectAnswer(answer, answerButton);

        };


        answerOptions.appendChild(answerButton);

    });


    questionBox.appendChild(answerOptions);

    questionContainer.appendChild(questionBox);


    updateProgress();

    updateQuestionButtons();

}



/* =========================================
   ANTWOORD SELECTEREN
   ========================================= */

function selectAnswer(answer, selectedButton) {

    answersGiven[currentQuestion] = answer;


    const allButtons =
        document.querySelectorAll(".answer-option");


    allButtons.forEach(function (button) {

        button.classList.remove("selected");

    });


    selectedButton.classList.add("selected");

}



/* =========================================
   VOLGENDE VRAAG
   ========================================= */

function nextQuestion() {

    if (!answersGiven[currentQuestion]) {

        alert("Kies eerst een antwoord.");

        return;

    }


    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        renderQuestion();

    } else {

        finishQuestions();

    }

}



/* =========================================
   VORIGE VRAAG
   ========================================= */

function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        renderQuestion();

    }

}



/* =========================================
   VOORTGANG BIJWERKEN
   ========================================= */

function updateProgress() {

    const questionNumber = currentQuestion + 1;

    const totalQuestions = questions.length;


    const percentage =
        Math.round(
            (currentQuestion / totalQuestions) * 100
        );


    document.getElementById("progressText").textContent =
        "Vraag " + questionNumber + " van " + totalQuestions;


    document.getElementById("progressPercentage").textContent =
        percentage + "%";


    document.getElementById("progressFill").style.width =
        percentage + "%";

}



/* =========================================
   KNOPPEN BIJWERKEN
   ========================================= */

function updateQuestionButtons() {

    const previousButton =
        document.getElementById("previousQuestionButton");


    const nextButton =
        document.getElementById("nextQuestionButton");


    previousButton.disabled =
        currentQuestion === 0;


    if (currentQuestion === questions.length - 1) {

        nextButton.textContent = "Antwoorden afronden ✓";

    } else {

        nextButton.textContent = "Volgende →";

    }

}



/* =========================================
   VRAGEN AFRONDEN
   ========================================= */

function finishQuestions() {

    const progressFill =
        document.getElementById("progressFill");


    const progressPercentage =
        document.getElementById("progressPercentage");


    const progressText =
        document.getElementById("progressText");


    progressFill.style.width = "100%";

    progressPercentage.textContent = "100%";

    progressText.textContent = "Training afgerond";


    const result =
        document.getElementById("questionResult");


    result.style.display = "block";


    result.textContent =
        "Bedankt! Je antwoorden zijn verwerkt. " +
        "Het platform kan deze informatie gebruiken om " +
        "mensen te vinden met gemeenschappelijke interesses " +
        "en vergelijkbare eigenschappen.";


    document.getElementById("nextQuestionButton").disabled = true;

}



/* =========================================
   PROFIEL OPSLAAN
   ========================================= */

function saveProfile() {

    const naam =
        document.getElementById("naam").value.trim();


    const leeftijd =
        document.getElementById("leeftijd").value;


    const geslacht =
        document.getElementById("geslacht").value;


    const beschrijving =
        document.getElementById("beschrijving").value.trim();


    if (naam === "") {

        alert("Vul je naam in.");

        return;

    }


    if (leeftijd === "") {

        alert("Vul je leeftijd in.");

        return;

    }


    if (beschrijving === "") {

        alert("Schrijf eerst een korte beschrijving over jezelf.");

        return;

    }


    const profile = {

        naam: naam,

        leeftijd: leeftijd,

        geslacht: geslacht,

        beschrijving: beschrijving,

        interesses: interests,

        antwoorden: answersGiven

    };


    /*
       Tijdelijk opslaan in de browser.

       Later kan dit vervangen worden door
       een database of backend.
    */

    localStorage.setItem(
        "samenProfile",
        JSON.stringify(profile)
    );


    document.getElementById("saveMessage").textContent =
        "Je profiel is succesvol opgeslagen ✓";

}



/* =========================================
   PROFIEL LADEN
   ========================================= */

function loadProfile() {

    const savedProfile =
        localStorage.getItem("samenProfile");


    if (!savedProfile) {

        renderInterests();

        renderQuestion();

        return;

    }


    const profile =
        JSON.parse(savedProfile);


    document.getElementById("naam").value =
        profile.naam || "";


    document.getElementById("leeftijd").value =
        profile.leeftijd || "";


    document.getElementById("geslacht").value =
        profile.geslacht || "man";


    document.getElementById("beschrijving").value =
        profile.beschrijving || "";


    if (profile.interesses) {

        interests = profile.interesses;

    }


    if (profile.antwoorden) {

        answersGiven = profile.antwoorden;

    }


    renderInterests();

    renderQuestion();

}



/* =========================================
   START PAGINA
   ========================================= */

loadProfile();