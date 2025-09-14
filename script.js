let cart = [];
function orderNow(itemName, price) {
  cart.push({ item: itemName, price: price });
  updateCartCount();
  alert(`${itemName} added to cart!`);
}

function updateCartCount() {
  document.getElementById("cart-count").innerText = cart.length;
}
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
const searchBox = document.getElementById("searchBox");
const homeSection = document.getElementById("homeSection");
const allSections = document.querySelectorAll("section:not(.search-results)");
const cards = document.querySelectorAll(".cards");
let resultsSection = document.createElement("section");
resultsSection.className = "search-results";
resultsSection.style.display = "none";
resultsSection.innerHTML = `<h2>Search Results</h2><div class="cards-container"></div>`;
homeSection.insertAdjacentElement("afterend", resultsSection);

const resultsContainer = resultsSection.querySelector(".cards-container");
searchBox.addEventListener("input", () => {
  let query = searchBox.value.toLowerCase().trim();
  resultsContainer.innerHTML = "";

  if (query.length > 0) {
    allSections.forEach(sec => sec.style.display = "none");
    resultsSection.style.display = "block";

    let matches = 0;
    cards.forEach(card => {
      let name = card.querySelector("h3").innerText.toLowerCase();
      let desc = card.querySelector("p").innerText.toLowerCase();

      if (name.includes(query) || desc.includes(query)) {
        let clonedCard = card.cloneNode(true);
        let btn = clonedCard.querySelector("button");
        let priceText = clonedCard.querySelector("h5").innerText;
        let price = parseInt(priceText.replace(/[^\d]/g, ""));
        btn.addEventListener("click", () => orderNow(name, price));

        resultsContainer.appendChild(clonedCard);
        matches++;
      }
    });

    if (matches === 0) {
      resultsContainer.innerHTML =
        `<p style="text-align:center;color:#ff5722;font-weight:bold;margin-top:20px;">😞 No items found!</p>`;
    }
  } else {
  allSections.forEach(sec => sec.style.removeProperty("display"));
  resultsSection.style.display="none";
}
});
document.querySelectorAll(".cards").forEach(card => {
  let name = card.querySelector("h3").innerText;
  let priceText = card.querySelector("h5").innerText;
  let price = parseInt(priceText.replace(/[^\d]/g, ""));

  let button = card.querySelector("button");
  button.addEventListener("click", () => {
    orderNow(name, price);
  });
});
function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("active");
}
