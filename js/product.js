document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("productContainer");
  const searchInput = document.getElementById("searchInput");
  const categoryButtons = document.querySelectorAll(".category-filter button"); 
  const categoryLinks = document.querySelectorAll(".category-item"); 

  if (!container) return;

  let filteredProducts = [];

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const countEl = document.getElementById("cartCount");
    if (countEl) {
      countEl.textContent = cart.reduce((sum, i) => sum + i.qty, 0);
    }
  }

  function goToDetail(product) {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    window.location.href = "product-detail.html";
  }

  /*function goToDetail(product) {

  // ❌ If NOT logged in → show login popup
  if (!localStorage.getItem("user_id")) {

    // Save product temporarily
    localStorage.setItem("pendingProduct", JSON.stringify(product));

    // Open login popup
    if (typeof openAuth === "function") {
      openAuth();
    }

    return; // stop here
  }

  // ✅ If logged in → continue normally
  localStorage.setItem("selectedProduct", JSON.stringify(product));
  window.location.href = "product-detail.html";
}*/

  function render(list) {
    container.innerHTML = "";

    if (!list.length) {
      container.innerHTML = "<p>No products found</p>";
      return;
    }

    list.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        ${p.price ? `<p class="price">₹${p.price} / Kg</p>` : ""}
      `;

      card.onclick = () => goToDetail(p);
      container.appendChild(card);
    });
  }

  // READ URL PARAMETERS (ADDED)
 
  const params = new URLSearchParams(window.location.search);
  const urlCategory = params.get("category");
  const urlSearch = params.get("search");

  // WAIT until PRODUCTS exists
  const waitForProducts = setInterval(() => {
    if (typeof PRODUCTS !== "undefined" && PRODUCTS.length) {
      clearInterval(waitForProducts);

      filteredProducts = PRODUCTS;



      localStorage.setItem("products", JSON.stringify(PRODUCTS));




      

      // ✅ APPLY CATEGORY FROM URL
      if (urlCategory) {
        filteredProducts = PRODUCTS.filter(
          p => p.category.toLowerCase() === urlCategory.toLowerCase()
        );
      }

      // ✅ APPLY SEARCH FROM URL
      if (urlSearch) {
        searchInput.value = urlSearch;
        filteredProducts = filteredProducts.filter(
          p => p.name.toLowerCase().includes(urlSearch.toLowerCase())
        );
      }

      render(filteredProducts);
      updateCartCount();
    }
  }, 50);

  // ORIGINAL CATEGORY BUTTON 

  categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const cat = btn.dataset.category;

      filteredProducts = cat
        ? PRODUCTS.filter(p => p.category === cat)
        : PRODUCTS;

      render(filteredProducts);
    });
  });

  // ✅ CATEGORY LINK SUPPORT 

  categoryLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      const url = new URL(link.href);
      const cat = url.searchParams.get("category");

      filteredProducts = cat
        ? PRODUCTS.filter(p => p.category.toLowerCase() === cat.toLowerCase())
        : PRODUCTS;

      render(filteredProducts);

      history.pushState({}, "", `product.html?category=${encodeURIComponent(cat)}`);
    });
  });

  // ORIGINAL SEARCH LOGIC 
  
  searchInput.addEventListener("input", e => {
    const val = e.target.value.toLowerCase();
    render(
      filteredProducts.filter(p =>
        p.name.toLowerCase().includes(val)
      )
    );
  });

});
