// script.js

// Example: Handling a search filter for product list
document.addEventListener("DOMContentLoaded", () => {
  const searchBox = document.getElementById("searchBox");
  const allergyFilter = document.getElementById("allergyFilter");
  const productGrid = document.getElementById("productGrid");

  if (searchBox && allergyFilter && productGrid) {
    searchBox.addEventListener("input", filterProducts);
    allergyFilter.addEventListener("change", filterProducts);
  }

  function filterProducts() {
    const searchTerm = searchBox.value.toLowerCase();
    const selectedAllergy = allergyFilter.value;
    const productCards = productGrid.getElementsByClassName("product-card");

    for (let i = 0; i < productCards.length; i++) {
      const card = productCards[i];
      const title = card.querySelector("h3").innerText.toLowerCase();
      // For simplicity, let's assume allergies are in the text for demonstration
      const productDetails = card.querySelector("p").innerText.toLowerCase();

      if (
        (searchTerm === "" || title.includes(searchTerm)) &&
        (selectedAllergy === "" || productDetails.includes(selectedAllergy))
      ) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    }
  }
});
