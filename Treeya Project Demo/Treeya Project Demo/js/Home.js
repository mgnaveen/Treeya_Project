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

    slides[index].classList.add("active");
    dots[index].classList.add("active");
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
                        `../HTML/product.html?search=${encodeURIComponent(q)}`;
                }
            }
        });
    }

});




document.addEventListener("DOMContentLoaded", () => {

    const loginBtn = document.getElementById("loginBtn");
    const openSignup = document.getElementById("openSignup");

    const loginPanel = document.getElementById("loginPanel");
    const signupPanel = document.getElementById("signupPanel");
    const overlay = document.getElementById("loginOverlay");

    const closeLogin = document.getElementById("closeLogin");
    const closeSignup = document.getElementById("closeSignup");

    if (!loginPanel || !signupPanel || !overlay) return;


    loginBtn?.addEventListener("click", (e) => {
        e.preventDefault();
        loginPanel.classList.add("active");
        signupPanel.classList.remove("active");
        overlay.classList.add("active");
    });


    openSignup?.addEventListener("click", (e) => {
        e.preventDefault();
        loginPanel.classList.remove("active");
        signupPanel.classList.add("active");
        overlay.classList.add("active");
    });


    function closeAll() {
        loginPanel.classList.remove("active");
        signupPanel.classList.remove("active");
        overlay.classList.remove("active");
    }

    closeLogin?.addEventListener("click", closeAll);
    closeSignup?.addEventListener("click", closeAll);
    overlay?.addEventListener("click", closeAll);

    loginPanel.addEventListener("click", e => e.stopPropagation());
    signupPanel.addEventListener("click", e => e.stopPropagation());

});




document.addEventListener("DOMContentLoaded", () => {

    const cartIcon = document.getElementById("cartIcon");

    cartIcon?.addEventListener("click", () => {
        window.location.href = "../HTML/cart.html";
    });

});




document.addEventListener("DOMContentLoaded", () => {

    const cartCountEl = document.getElementById("cartCount");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartCount() {
        const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
        if (cartCountEl) cartCountEl.textContent = totalQty;
    }

    updateCartCount();
});



document.addEventListener("DOMContentLoaded", () => {
    const footerLogin = document.getElementById("loginTriggerFooter");
    const headerLogin = document.getElementById("loginBtn");

    if (footerLogin && headerLogin) {
        footerLogin.addEventListener("click", (e) => {
            e.preventDefault();
            headerLogin.click();   // 🔥 trigger popup
        });
    }
});


/* ===============================
   Chatbot Elements
================================ */
const chatToggle = document.getElementById("chatToggle");
const chatbot = document.getElementById("chatbot");
const closeChat = document.getElementById("closeChat");
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBody = document.getElementById("chatBody");

/* ===============================
   Open Chat
================================ */
chatToggle.onclick = () => {
    chatbot.style.display = "flex";

    // Disable slider interaction when chat is open
    const slider = document.querySelector(".offer-slider");
    if (slider) {
        slider.style.pointerEvents = "none";
    }
};

/* ===============================
   Close Chat
================================ */
closeChat.onclick = () => {
    chatbot.style.display = "none";

    // Enable slider interaction when chat is closed
    const slider = document.querySelector(".offer-slider");
    if (slider) {
        slider.style.pointerEvents = "auto";
    }
};

/* ===============================
   Send Message
================================ */
sendBtn.onclick = sendMessage;

userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});

/* ===============================
   Send Message Function
================================ */
function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, "user-message");
    userInput.value = "";

    setTimeout(() => {
        botReply(message);
    }, 800);
}

/* ===============================
   Add Message to Chat
================================ */
function addMessage(text, className) {
    const msg = document.createElement("div");
    msg.className = className;
    msg.innerText = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
}

/* ===============================
   Bot Reply Logic
================================ */
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

document.addEventListener("DOMContentLoaded", () => {
    const adminNav = document.getElementById("adminNav");

    if (localStorage.getItem("adminLogged") === "true") {
        adminNav.style.display = "inline-block";
    } else {
        adminNav.style.display = "none";
    }
});