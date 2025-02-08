// JavaScript to filter events based on the search query
function filterEvents() {
    const searchValue = document.getElementById("searchBar").value.toLowerCase();
    const rows = document.querySelectorAll(".row-box");

    rows.forEach(row => {
        const eventDate = row.querySelector(".event-date")?.textContent.toLowerCase();
        const eventName = row.querySelector(".event-name")?.textContent.toLowerCase();

        if (eventDate.includes(searchValue) || eventName.includes(searchValue)) {
            row.style.display = ""; // Show matching rows
        } else {
            row.style.display = "none"; // Hide non-matching rows
        }
    });
}


/* JavaScript to add dynamic href to each event row
document.addEventListener("DOMContentLoaded", () => {
    const rows = document.querySelectorAll(".row-box");
    rows.forEach(row => {
        const eventName = row.querySelector(".event-name")?.textContent.trim();
        if (eventName) {
            const encodedMessage = encodeURIComponent(`Hey, I want to buy tickets for ${eventName}`);
            const phone = "917715039001"; // Default WhatsApp number
            const href = `https://wa.me/${phone}?text=${encodedMessage}`;

            const anchor = document.createElement("a");
            anchor.href = href;
            anchor.className = "row-box";
            anchor.innerHTML = row.innerHTML;

            row.replaceWith(anchor); // Replace the original row with the anchor
        }
    });
});*/
