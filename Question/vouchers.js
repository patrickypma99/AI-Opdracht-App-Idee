const vouchers = [
    {
        id: 1,
        person: "Sophie",
        age: 26,
        activity: "Samen koffie drinken",
        discount: 5,
        icon: "☕",
        code: "SAMEN-COFFEE-01",
        date: "14 september 2026"
    },

    {
        id: 2,
        person: "Daan",
        age: 28,
        activity: "Bowlen",
        discount: 10,
        icon: "🎳",
        code: "SAMEN-BOWLING-02",
        date: "10 september 2026"
    },

    {
        id: 3,
        person: "Lisa",
        age: 25,
        activity: "Naar de bioscoop",
        discount: 7.50,
        icon: "🎬",
        code: "SAMEN-MOVIE-03",
        date: "5 september 2026"
    }
];


let selectedPerson = "";
let selectedActivity = "";
let selectedTime = "";


function displayVouchers() {

    const voucherList = document.getElementById("voucherList");

    voucherList.innerHTML = "";


    if (vouchers.length === 0) {

        voucherList.innerHTML = `
            <div class="empty-message">
                Je hebt nog geen vouchers ontvangen.
                Ga samen op pad om vouchers te verdienen.
            </div>
        `;

        return;
    }


    vouchers.forEach(function(voucher) {

        const voucherCard = document.createElement("div");

        voucherCard.classList.add("voucher-card");


        voucherCard.innerHTML = `

            <div class="voucher-left">

                <div class="voucher-symbol">
                    ${voucher.icon}
                </div>

                <div>
                    <h3>${voucher.activity}</h3>

                    <p>
                        Gekregen met:
                        <strong>${voucher.person}</strong>
                        (${voucher.age} jaar)
                    </p>

                    <p>
                        Ontvangen op: ${voucher.date}
                    </p>

                    <p class="discount">
                        Korting: €${voucher.discount.toFixed(2)}
                    </p>
                </div>

            </div>


            <div class="voucher-actions">

                <span class="voucher-code">
                    ${voucher.code}
                </span>

                <button
                    class="primary-button"
                    onclick="openCalendar('${voucher.person}', '${voucher.activity}')"
                >
                    Plan een afspraak met deze persoon
                </button>

            </div>
        `;


        voucherList.appendChild(voucherCard);

    });

}


function updateOverview() {

    const voucherCount = document.getElementById("voucherCount");
    const totalDiscount = document.getElementById("totalDiscount");
    const connectionCount = document.getElementById("connectionCount");


    voucherCount.textContent = vouchers.length;


    const total = vouchers.reduce(function(sum, voucher) {

        return sum + voucher.discount;

    }, 0);


    totalDiscount.textContent = "€" + total.toFixed(2);


    const uniquePeople = new Set(
        vouchers.map(function(voucher) {
            return voucher.person;
        })
    );


    connectionCount.textContent = uniquePeople.size;

}


function openCalendar(person, activity) {

    selectedPerson = person;
    selectedActivity = activity;
    selectedTime = "";


    document.getElementById("calendarTitle").textContent =
        "Plan met " + person;


    document.getElementById("calendarDescription").textContent =
        "Je wilt samen met " + person +
        " de activiteit '" + activity +
        "' doen.";


    const suggestedDate = getSuggestedDate();


    document.getElementById("appointmentDate").value =
        suggestedDate;


    document.getElementById("calendarModal").classList.remove("hidden");


    document.querySelectorAll(".time-button").forEach(function(button) {

        button.classList.remove("selected");

    });


    document.getElementById("appointmentMessage").textContent = "";

}


function closeCalendar() {

    document.getElementById("calendarModal").classList.add("hidden");

}


function getSuggestedDate() {

    /*
        Dit is een eenvoudige fictieve beschikbaarheidsfunctie.

        In een echte app zouden de beschikbaarheden
        uit een database of agenda komen.
    */


    const today = new Date();


    const suggestedDate = new Date(today);

    suggestedDate.setDate(today.getDate() + 3);


    return suggestedDate.toISOString().split("T")[0];

}


function selectTime(button) {

    document.querySelectorAll(".time-button").forEach(function(timeButton) {

        timeButton.classList.remove("selected");

    });


    button.classList.add("selected");

    selectedTime = button.textContent;

}


function confirmAppointment() {

    const selectedDate =
        document.getElementById("appointmentDate").value;


    const appointmentMessage =
        document.getElementById("appointmentMessage");


    if (selectedDate === "") {

        appointmentMessage.textContent =
            "Kies eerst een datum.";

        return;
    }


    if (selectedTime === "") {

        appointmentMessage.textContent =
            "Kies eerst een tijdstip.";

        return;
    }


    appointmentMessage.textContent =
        "Afspraak gepland met " +
        selectedPerson +
        " op " +
        selectedDate +
        " om " +
        selectedTime +
        " voor " +
        selectedActivity +
        ".";

}


displayVouchers();
updateOverview();