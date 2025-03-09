// JavaScript to filter events based on the search query
function filterEvents() {
    const searchValue = document.getElementById("searchBar").value.toLowerCase();
    const rows = document.querySelectorAll(".row-box, .rows-box");

    rows.forEach(row => {
        const eventDate = row.querySelector(".event-date")?.textContent?.toLowerCase() || "";
        const eventName = row.querySelector(".event-name")?.textContent?.toLowerCase() || "";
        const otherName = row.querySelector(".name")?.textContent?.toLowerCase() || "";

        if (eventDate.includes(searchValue) || eventName.includes(searchValue) || otherName.includes(searchValue)) {
            row.style.display = ""; // Show matching rows
        } else {
            row.style.display = "none"; // Hide non-matching rows
        }
    });
}


document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("popup-modal");
    const popupBody = document.getElementById("popup-body");
    const closeBtn = document.querySelector(".close");

    document.querySelectorAll(".rows-box, .row-box").forEach(button => {
        button.addEventListener("click", function () {
            const fileToLoad = this.getAttribute("data-file");

            fetch(fileToLoad)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Failed to load file");
                    }
                    return response.text();
                })
                .then(data => {
                    // Create a temporary element to parse the fetched content
                    const tempDiv = document.createElement("div");
                    tempDiv.innerHTML = data;

                    // Fix relative image paths
                    tempDiv.querySelectorAll("img").forEach(img => {
                        const src = img.getAttribute("src");
                        if (src && !src.startsWith("http") && !src.startsWith("data:")) {
                            const basePath = fileToLoad.substring(0, fileToLoad.lastIndexOf("/") + 1);
                            img.src = basePath + src;
                        }
                    });

                    // Insert fixed content into popup
                    popupBody.innerHTML = tempDiv.innerHTML;
                    popup.style.display = "flex";
                })
                .catch(error => {
                    popupBody.innerHTML = "<p>Error loading details.</p>";
                    console.error("Error:", error);
                });
        });
    });

    closeBtn.addEventListener("click", function () {
        popup.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });
});






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
