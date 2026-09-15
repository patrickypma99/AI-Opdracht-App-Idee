const savedContacts = [

    {

        id: 1,
        name: "Sophie 🟢",
        age: 26,
        gender: "Vrouw",
        initials: "S",
        type: "Opgeslagen contact",
        points: 70,
        maxPoints: 100,
        voucherUnlocked: true
    },

    {
        id: 2,
        name: "Daan",
        age: 28,
        gender: "Man",
        initials: "D",
        type: "Opgeslagen contact",
        points: 100,
        maxPoints: 100,
        voucherUnlocked: false
    },

    {
        
        id: 3,
        name: "Patrick",
        age: 27,
        gender: "Man",
        initials: "P",
        type: "Opgeslagen contact",
        points: 89,
        maxPoints: 100,
        voucherUnlocked: true
    },

];


const platformContacts = [

    {
        id: 3,
        name: "Lisa",
        age: 25,
        gender: "Vrouw",
        initials: "L",
        type: "Platformcontact",
        points: 45,
        maxPoints: 100,
        voucherUnlocked: true
    },

    {
        id: 4,
        name: "Milan 🟢",
        age: 27,
        gender: "Man",
        initials: "M",
        type: "Platformcontact",
        points: 85,
        maxPoints: 100,
        voucherUnlocked: true
    }

];


let selectedContact = null;


/*
    Alle contacten samenvoegen.
*/

function getAllContacts() {

    return savedContacts.concat(platformContacts);

}


/*
    Contacten tonen.
*/

function displayContacts() {

    displayContactGroup(
        savedContacts,
        "savedContacts"
    );


    displayContactGroup(
        platformContacts,
        "platformContactList"
    );

}


function displayContactGroup(contacts, elementId) {

    const contactList = document.getElementById(elementId);

    contactList.innerHTML = "";


    if (contacts.length === 0) {

        contactList.innerHTML = `
            <div class="empty-message">
                Je hebt hier nog geen contacten.
            </div>
        `;

        return;
    }


    contacts.forEach(function(contact) {

        const percentage =
            (contact.points / contact.maxPoints) * 100;


        const contactCard = document.createElement("article");

        contactCard.classList.add("contact-card");


        contactCard.innerHTML = `

            <div class="contact-top">

                <div class="profile-picture">
                    ${contact.initials}
                </div>


                <div class="contact-info">

                    <h3>${contact.name}</h3>

                    <p>
                        Leeftijd: ${contact.age} jaar
                    </p>

                    <p>
                        Geslacht: ${contact.gender}
                    </p>

                    <span class="contact-type">
                        ${contact.type}
                    </span>

                </div>


                <div class="contact-actions">

                    <button
                        class="action-button call-button"
                        onclick="callContact('${contact.name}')"
                    >
                        📹 Videobellen
                    </button>

                    <button
                        class="action-button message-button"
                        onclick="openMessageModal('${contact.name}')"
                    >
                        💬 Bericht
                    </button>

                </div>

            </div>


            <div class="points-section">

                <div class="points-header">

                    <p>
                        Voucher-progressie
                    </p>

                    <p class="points-value">
                        ${contact.points} / ${contact.maxPoints} punten
                    </p>

                </div>


                <div class="progress-background">

                    <div
                        class="progress-bar"
                        style="width: ${percentage}%"
                    ></div>

                </div>


                <div class="voucher-status">

                    <p class="${contact.voucherUnlocked ? "unlocked" : "locked"}">

                        ${
                            contact.voucherUnlocked
                            ? "🔒 Nog " +
                              (contact.maxPoints - contact.points) +
                              " punten nodig"
                            : "🎟️ Voucher unlocked!" 
                        }

                    </p>


                    <button
                        class="unlock-button"
                        onclick="unlockVoucher(${contact.id})"
                        ${contact.voucherUnlocked ? "disabled" : ""}
                    >

                        ${
                            contact.voucherUnlocked
                            ? "Voucher locked"
                            : "Bekijk voucher"
                        }

                    </button>

                </div>

            </div>

        `;


        contactList.appendChild(contactCard);

    });

}


/*
    Overzicht bovenaan bijwerken.
*/

function updateOverview() {

    const allContacts = getAllContacts();


    document.getElementById("totalContacts").textContent =
        allContacts.length;


    document.getElementById("platformContacts").textContent =
        platformContacts.length;


    const unlockedCount = allContacts.filter(function(contact) {

        return contact.voucherUnlocked === true;

    }).length;


    document.getElementById("unlockedVouchers").textContent =
        unlockedCount;

}


/*
    Bellen.

    Dit opent voorlopig een eenvoudige melding.
    Later kan hier een echte videocall aan gekoppeld worden.
*/

function callContact(name) {

    alert(
        "Je belt nu met " +
        name +
        ".\n\n" +
        "In de volgende versie kunnen we hier een echte videocall openen."
    );

}


/*
    Bericht popup openen.
*/

function openMessageModal(name) {

    selectedContact = name;


    document.getElementById("messageTitle").textContent =
        "Bericht sturen naar " + name;


    document.getElementById("messageInput").value = "";


    document.getElementById("messageStatus").textContent = "";


    document.getElementById("messageModal").classList.remove("hidden");

}


/*
    Bericht popup sluiten.
*/

function closeMessageModal() {

    document.getElementById("messageModal").classList.add("hidden");

}


/*
    Bericht versturen.

    Dit is voorlopig een prototype.
*/

function sendMessage() {

    const message =
        document.getElementById("messageInput").value.trim();


    const messageStatus =
        document.getElementById("messageStatus");


    if (message === "") {

        messageStatus.textContent =
            "Typ eerst een bericht.";

        return;
    }


    messageStatus.textContent =
        "Je bericht aan " +
        selectedContact +
        " is verstuurd.";

}


/*
    Voucher unlocken.

    Een voucher wordt unlocked wanneer
    de gebruiker 100 punten heeft.
*/

function unlockVoucher(contactId) {

    const allContacts = getAllContacts();


    const contact = allContacts.find(function(contact) {

        return contact.id === contactId;

    });


    if (!contact) {
        return;
    }


    if (contact.points < contact.maxPoints) {

        const pointsLeft =
            contact.maxPoints - contact.points;


        alert(
            "Deze voucher is nog vergrendeld.\n" +
            "Je hebt nog " +
            pointsLeft +
            " punten nodig."
        );

        return;
    }


    contact.voucherUnlocked = true;


window.location.href = "vouchers.html";


    displayContacts();
    updateOverview();

}


/*
    Startpagina laden.
*/

displayContacts();
updateOverview();