document.addEventListener("DOMContentLoaded", () => {

  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function getTotalQty() {
    return getCart().reduce((sum, item) => sum + item.qty, 0);
  }

  /* ---------- HEADER CART COUNT (ALL PAGES) ---------- */
  const headerCartCountEl = document.getElementById("cartCount");
  if (headerCartCountEl) {
    headerCartCountEl.textContent = getTotalQty();
  }

  /* ---------- CART PAGE ELEMENTS ---------- */
  const cartItemsEl = document.getElementById("cartItems");
  const emptyCartEl = document.getElementById("emptyCart");
  const cartCountTextEl = document.getElementById("cartCountText");
  const subTotalEl = document.getElementById("subTotal");
  const discountEl = document.getElementById("discount");
  const grandTotalEl = document.getElementById("grandTotal");
  const checkoutBtn = document.getElementById("checkoutBtn");

  if (!cartItemsEl) return;

  /* ---------- RENDER CART ---------- */
  function renderCart() {
    const cart = getCart();
    cartItemsEl.innerHTML = "";

    if (cartCountTextEl) {
      cartCountTextEl.textContent = getTotalQty();
    }

    if (cart.length === 0) {
      emptyCartEl.classList.remove("hidden");

      subTotalEl.textContent = "0.00";
      discountEl.textContent = "0.00";
      grandTotalEl.textContent = "0.00";

      if (headerCartCountEl) headerCartCountEl.textContent = "0";
      return;
    } else {
      emptyCartEl.classList.add("hidden");
    }

    let subTotal = 0;

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.qty;
      subTotal += itemTotal;

      const row = document.createElement("div");
      row.className = "cart-item";

      row.innerHTML = `
        <img src="${item.image}" class="cart-img">

        <div class="cart-details">
          <h4>${item.name}</h4>
          <p>${item.weight} Kg</p>
          <p>₹${item.price} × ${item.qty}</p>
          <p><strong>₹${itemTotal.toFixed(2)}</strong></p>

          <div class="qty-box">
            <button class="minus">−</button>
            <span>${item.qty}</span>
            <button class="plus">+</button>
          </div>

          <button class="remove">Remove</button>
        </div>
      `;

      row.querySelector(".plus").onclick = () => {
        item.qty++;
        saveCart(cart);
        renderCart();
        if (headerCartCountEl) headerCartCountEl.textContent = getTotalQty();
      };

      row.querySelector(".minus").onclick = () => {
        if (item.qty > 1) {
          item.qty--;
        } else {
          cart.splice(index, 1);
        }
        saveCart(cart);
        renderCart();
        if (headerCartCountEl) headerCartCountEl.textContent = getTotalQty();
      };

      row.querySelector(".remove").onclick = () => {
        cart.splice(index, 1);
        saveCart(cart);
        renderCart();
        if (headerCartCountEl) headerCartCountEl.textContent = getTotalQty();
      };

      cartItemsEl.appendChild(row);
    });

    const discount = subTotal * 0.01;
    const grandTotal = subTotal - discount;

    subTotalEl.textContent = subTotal.toFixed(2);
    discountEl.textContent = discount.toFixed(2);
    grandTotalEl.textContent = grandTotal.toFixed(2);
  }

  /* ---------- CHECKOUT ---------- */
  if (checkoutBtn) {
    checkoutBtn.onclick = () => {
      const cart = getCart();
      window.location.href = cart.length === 0
        ? "product.html"
        : "checkout.html";
    };
  }

  renderCart();
});
