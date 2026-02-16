/* ======================================
   SLIDER
====================================== */

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const slider = document.querySelector(".offer-slider");

let currentIndex = 0;
let sliderInterval;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[index]?.classList.add("active");
    dots[index]?.classList.add("active");
}

function startSlider() {
    sliderInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }, 4000);
}

function stopSlider() {
    clearInterval(sliderInterval);
}

if (slider) {
    slider.addEventListener("mouseenter", stopSlider);
    slider.addEventListener("mouseleave", startSlider);
}

nextBtn?.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
});

prevBtn?.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
});

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        currentIndex = index;
        showSlide(currentIndex);
    });
});

slides.forEach(slide => {
    slide.addEventListener("click", () => {
        const link = slide.getAttribute("data-link");
        if (link) window.location.href = link;
    });
});

startSlider();


/* ======================================
   PHONE OTP AUTH SYSTEM (FIXED)
====================================== */

const BASE_URL = "http://localhost:8000";

const loginBtn = document.getElementById("loginBtn");
const footerLogin = document.getElementById("loginTriggerFooter");

const authOverlay = document.getElementById("authOverlay");
const authPanel = document.getElementById("authPanel");

const phoneInput = document.getElementById("phoneInput");
const otpInput = document.getElementById("otpInput");
const otpSection = document.getElementById("otpSection");

function openAuth() {
    authOverlay.style.display = "block";
    authPanel.style.display = "block";
    setTimeout(() => authPanel.classList.add("active"), 10);
}

function closeAuth() {
    authOverlay.style.display = "none";
    authPanel.style.display = "none";
    authPanel.classList.remove("active");
}

/* Open Login Popup */
loginBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    openAuth();
});

footerLogin?.addEventListener("click", (e) => {
    e.preventDefault();
    openAuth();
});

/* Close */
document.getElementById("closeAuth")?.addEventListener("click", closeAuth);
authOverlay?.addEventListener("click", closeAuth);

/* Send OTP */
document.getElementById("sendOtpBtn")?.addEventListener("click", async () => {
    const phone = phoneInput.value.trim();

    if (!/^[6-9]\d{9}$/.test(phone)) {
        return alert("Enter valid 10-digit mobile number");
    }

    try {
        await fetch(`${BASE_URL}/send-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone })
        });

        otpSection.style.display = "block";
        alert("OTP Sent ✅");
    } catch (err) {
        alert("Server Error ❌");
    }
});

/* Verify OTP */
document.getElementById("verifyOtpBtn")?.addEventListener("click", async () => {
    const phone = phoneInput.value.trim();
    const otp = otpInput.value.trim();

    if (!otp) return alert("Enter OTP");

    try {
        const response = await fetch(`${BASE_URL}/verify-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone, otp })
        });

        const data = await response.json();

        if (data.success) {
    localStorage.setItem("user_id", data.user_id);
    localStorage.setItem("user_phone", phone);

    loginBtn.innerText = phone.slice(-4);
    closeAuth();

    alert("Login Successful ✅");

    // 🔥 Check if product was pending
    const pending = localStorage.getItem("pendingProduct");

    if (pending) {
        localStorage.removeItem("pendingProduct");
        localStorage.setItem("selectedProduct", pending);
        window.location.href = "product-detail.html";
    }
}
 else {
            alert("Invalid OTP ❌");
        }

    } catch (err) {
        alert("Verification Failed ❌");
    }
});

/* Restore Login After Refresh */
document.addEventListener("DOMContentLoaded", () => {
    const savedPhone = localStorage.getItem("user_phone");
    if (savedPhone && loginBtn) {
        loginBtn.innerText = savedPhone.slice(-4);
    }
});


/* ======================================
   PROTECT PRODUCT CLICK (MANDATORY LOGIN)
====================================== */

/*document.querySelectorAll(".product-section").forEach(item => {
    item.addEventListener("click", function (e) {
        if (!localStorage.getItem("user_id")) {
            e.preventDefault();
            openAuth();
        }
    });
});
*/

/* ======================================
   SEARCH
====================================== */

document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("searchInput");
    const products = document.querySelectorAll(".product-card");

    if (searchInput) {

        searchInput.addEventListener("input", () => {
            const value = searchInput.value.toLowerCase().trim();

            products.forEach(product => {
                product.style.display =
                    product.textContent.toLowerCase().includes(value)
                        ? "block"
                        : "none";
            });
        });

        searchInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const q = searchInput.value.trim();
                if (q) {
                    window.location.href =
                        `product.html?search=${encodeURIComponent(q)}`;
                }
            }
        });
    }
});


/* ======================================
   CART PROTECTION
====================================== */

document.getElementById("cartIcon")?.addEventListener("click", () => {
    window.location.href = "cart.html";
});

/*document.getElementById("cartIcon")?.addEventListener("click", () => {
    if (!localStorage.getItem("user_id")) {
        openAuth();
    } else {
        window.location.href = "cart.html";
    }
});*/


/* ======================================
   CART COUNT
====================================== */

document.addEventListener("DOMContentLoaded", () => {
    const cartCountEl = document.getElementById("cartCount");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartCount() {
        const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
        if (cartCountEl) cartCountEl.textContent = totalQty;
    }

    updateCartCount();
});


/* ======================================
   CHATBOT
====================================== */

const chatToggle = document.getElementById("chatToggle");
const chatbot = document.getElementById("chatbot");
const closeChat = document.getElementById("closeChat");
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBody = document.getElementById("chatBody");

if (chatToggle && chatbot && closeChat && sendBtn && userInput && chatBody) {

    chatToggle.onclick = () => {
        chatbot.style.display = "flex";
    };

    closeChat.onclick = () => {
        chatbot.style.display = "none";
    };

    sendBtn.onclick = sendMessage;

    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });
}

function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, "user-message");
    userInput.value = "";

    setTimeout(() => {
        botReply(message);
    }, 800);
}

function addMessage(text, className) {
    const msg = document.createElement("div");
    msg.className = className;
    msg.innerText = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function botReply(userMsg) {
    let reply = "Sorry, I didn't understand that.";

    userMsg = userMsg.toLowerCase();

    if (userMsg.includes("hello") || userMsg.includes("hi")) {
        reply = "Hello! 😊 How can I assist you today?";
    }
    else if (userMsg.includes("price")) {
        reply = "Our pricing details are available on the Products page.";
    }
    else if (userMsg.includes("contact")) {
        reply = "You can contact us at support@example.com 📧";
    }
    else if (userMsg.includes("order")) {
        reply = "Please share your order ID so I can help you.";
    }
    else if (userMsg.includes("refund")) {
        reply = "Refunds are processed within 5–7 business days.";
    }

    addMessage(reply, "bot-message");
}
