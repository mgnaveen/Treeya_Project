document.addEventListener("DOMContentLoaded", () => {

  const imgEl = document.getElementById("img");
  const nameEl = document.getElementById("name");
  const descriptionEl = document.getElementById("description");
  const priceEl = document.getElementById("price");
  const qtyEl = document.getElementById("qty");
  const plusBtn = document.getElementById("plus");
  const minusBtn = document.getElementById("minus");
  const addCartBtn = document.getElementById("addCart");
  const cartIcon = document.getElementById("cartIcon");
  const cartCountEl = document.getElementById("cartCount");
  const weightSelect = document.getElementById("weightSelect");
  const product = JSON.parse(localStorage.getItem("selectedProduct"));

  if (!product) {
    alert("Product not found");
    window.location.href = "product.html";
    return;
  }

  imgEl.src = product.image;
  /* ===== PRODUCT IMAGE GALLERY ===== */

const productThumbs = document.getElementById("productThumbs");

// Support multiple images from product.images array
const productImages = product.images || [product.image];

productThumbs.innerHTML = "";

// Set first image
imgEl.src = productImages[0];

productImages.forEach((src, index) => {

  const thumb = document.createElement("img");
  thumb.src = src;
  thumb.className = "product-thumb";

  if (index === 0) thumb.classList.add("active");

  thumb.onclick = () => {
    imgEl.src = src;

    document
      .querySelectorAll(".product-thumb")
      .forEach(t => t.classList.remove("active"));

    thumb.classList.add("active");
  };

  productThumbs.appendChild(thumb);
});

const mainImageContainer = document.querySelector(".product-main-image");

mainImageContainer.addEventListener("mousemove", function (e) {

  const rect = mainImageContainer.getBoundingClientRect();

  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;

  imgEl.style.transformOrigin = `${x}% ${y}%`;
  imgEl.style.transform = "scale(2)";
});

mainImageContainer.addEventListener("mouseleave", function () {
  imgEl.style.transform = "scale(1)";
});


    nameEl.textContent = product.name;
    descriptionEl.textContent = product.description || "No description available.";

  const weights = product.category === "Snacks"
    ? [
        { w: 0.25, label: "250 g" },
        { w: 0.5, label: "500 g" },
        { w: 1, label: "1 Kg" }
      ]
    : [
        { w: 0.5, label: "½ Kg" },
        { w: 1, label: "1 Kg" },
        { w: 5, label: "5 Kg" }
      ];

  weightSelect.innerHTML = weights.map(w =>
    `<option value="${w.w}">
      ${w.label} – ₹${(product.price * w.w).toFixed(0)}
    </option>`
  ).join("");

  let selectedWeight = parseFloat(weights[0].w); 
  weightSelect.value = selectedWeight;

  const rightPriceEl = document.getElementById("rightPrice");

function updatePrice() {
  const finalPrice = (product.price * selectedWeight).toFixed(0);

  priceEl.textContent = `₹${finalPrice}`;

  if (rightPriceEl) {
    rightPriceEl.textContent = `₹${finalPrice}`;
  }
}


  updatePrice();

  weightSelect.addEventListener("change", () => {
    selectedWeight = parseFloat(weightSelect.value);
    updatePrice();
  });

  let qty = 1;
  qtyEl.textContent = qty;

  plusBtn.onclick = () => {
    qty++;
    qtyEl.textContent = qty;
  };

  minusBtn.onclick = () => {
    if (qty > 1) {
      qty--;
      qtyEl.textContent = qty;
    }
  };

  addCartBtn.onclick = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const itemPrice = product.price * selectedWeight;

    const existing = cart.find(
      i => i.name === product.name && i.weight === selectedWeight
    );

    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        name: product.name,
        category: product.category,
        image: product.image,
        weight: selectedWeight,
        price: itemPrice,
        qty: qty
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  };

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cartCountEl) {
      cartCountEl.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
    }
  }

  if (cartIcon) {
    cartIcon.onclick = () => {
      window.location.href = "cart.html";
    };
  }

  updateCartCount();
});




const productRecipes = {   
  
  "Barnyard (or) Kuthuravali Millet": [
    "assets/Millet Recipe/Barnyard (or) Kuthuravali Millet/Kuthuravali Millet 1.jpg",
    "assets/Millet Recipe/Barnyard (or) Kuthuravali Millet/Kuthuravali Millet 2.jpg",
    "assets/Millet Recipe/Barnyard (or) Kuthuravali Millet/Kuthuravali Millet 3.jpg",
    "assets/Millet Recipe/Barnyard (or) Kuthuravali Millet/Kuthuravali Millet 4.jpg",
    "assets/Millet Recipe/Barnyard (or) Kuthuravali Millet/Kuthuravali Millet 5.jpg"
  ],

  "Finger (or) Ragi Millet": [
    "assets/Millet Recipe/Finger (or) Ragi Millet/Ragi Millet 1.jpg",
    "assets/Millet Recipe/Finger (or) Ragi Millet/Ragi Millet 2.jpg",
    "assets/Millet Recipe/Finger (or) Ragi Millet/Ragi Millet 3.jpg",
    "assets/Millet Recipe/Finger (or) Ragi Millet/Ragi Millet 4.jpg",
    "assets/Millet Recipe/Finger (or) Ragi Millet/Ragi Millet 5.jpg"
  ],

  "Foxtail (or) Thinai Millet": [
    "assets/Millet Recipe/Foxtail (or) Thinai Millet/Thinai Millet 1.jpg",
    "assets/Millet Recipe/Foxtail (or) Thinai Millet/Thinai Millet 2.jpg",
    "assets/Millet Recipe/Foxtail (or) Thinai Millet/Thinai Millet 3.jpg",
    "assets/Millet Recipe/Foxtail (or) Thinai Millet/Thinai Millet 4.jpg",
    "assets/Millet Recipe/Foxtail (or) Thinai Millet/Thinai Millet 5.jpg"
  ],

  "Kodo (or) Varagu Millet": [
    "assets/Millet Recipe/Kodo (or) Varagu Millet/Varagu Millet 1.jpg",
    "assets/Millet Recipe/Kodo (or) Varagu Millet/Varagu Millet 2.jpg",
    "assets/Millet Recipe/Kodo (or) Varagu Millet/Varagu Millet 3.jpg",
    "assets/Millet Recipe/Kodo (or) Varagu Millet/Varagu Millet 4.jpg",
    "assets/Millet Recipe/Kodo (or) Varagu Millet/Varagu Millet 5.jpg"
  ],

  "Little (or) Saamai Millet": [
    "assets/Millet Recipe/Little (or) Saamai Millet/Saamai Millet 1.jpg",
    "assets/Millet Recipe/Little (or) Saamai Millet/Saamai Millet 2.jpg",
    "assets/Millet Recipe/Little (or) Saamai Millet/Saamai Millet 3.jpg",
    "assets/Millet Recipe/Little (or) Saamai Millet/Saamai Millet 4.jpg",
    "assets/Millet Recipe/Little (or) Saamai Millet/Saamai Millet 5.jpg"
  ],

  "Pearl (or) Kambu Millet": [
    "assets/Millet Recipe/Pearl (or) Kambu Millet/Kambu Millet 1.jpg",
    "assets/Millet Recipe/Pearl (or) Kambu Millet/Kambu Millet 2.jpg",
    "assets/Millet Recipe/Pearl (or) Kambu Millet/Kambu Millet 3.jpg",
    "assets/Millet Recipe/Pearl (or) Kambu Millet/Kambu Millet 4.jpg",
    "assets/Millet Recipe/Pearl (or) Kambu Millet/Kambu Millet 5.jpg"
  ],
  

  
  "Seera Samba Raw Rice": [
    "assets/Rice Recipe/Seeraga Samba/Seeraga Samba 1.jpg",
    "assets/Rice Recipe/Seeraga Samba/Seeraga Samba 2.jpg",
    "assets/Rice Recipe/Seeraga Samba/Seeraga Samba 3.jpg",
    "assets/Rice Recipe/Seeraga Samba/Seeraga Samba 4.jpg"
  ],

  "Rathasali": [
    "assets/Rice Recipe/Rathasali/Rathasali 1.jpg",
    "assets/Rice Recipe/Rathasali/Rathasali 2.jpg",
    "assets/Rice Recipe/Rathasali/Rathasali 3.jpg",
    "assets/Rice Recipe/Rathasali/Rathasali 4.jpg",
    "assets/Rice Recipe/Rathasali/Rathasali 5.jpg"
  ],

  "Illupaipoo Samba": [
    "assets/Rice Recipe/Illupaipoo Samba/Illupaipoo Samba 1.jpg",
    "assets/Rice Recipe/Illupaipoo Samba/Illupaipoo Samba 2.jpg",
    "assets/Rice Recipe/Illupaipoo Samba/Illupaipoo Samba 3.jpg",
    "assets/Rice Recipe/Illupaipoo Samba/Illupaipoo Samba 4.jpg"
  ],
  
  "Kerala Matta": [
    "assets/Rice Recipe/Kerala Matta/Kerala Matta 1.jpg",
    "assets/Rice Recipe/Kerala Matta/Kerala Matta 2.jpg",
    "assets/Rice Recipe/Kerala Matta/Kerala Matta 3.jpg",
    "assets/Rice Recipe/Kerala Matta/Kerala Matta 4.jpg",
  ],

  "Thanga Samba": [
    "assets/Rice Recipe/Thanga Samba/Thanga Samba 1.jpg",
    "assets/Rice Recipe/Thanga Samba/Thanga Samba 2.jpg",
    "assets/Rice Recipe/Thanga Samba/Thanga Samba 3.jpg",
    "assets/Rice Recipe/Thanga Samba/Thanga Samba 4.jpg",
  ],

  "Thooyamalli Boiled": [
    "assets/Rice Recipe/Thooyamalli Boiled/Thooyamalli Boiled 1.jpg",
    "assets/Rice Recipe/Thooyamalli Boiled/Thooyamalli Boiled 2.jpg",
    "assets/Rice Recipe/Thooyamalli Boiled/Thooyamalli Boiled 3.jpg",
    "assets/Rice Recipe/Thooyamalli Boiled/Thooyamalli Boiled 4.jpg",
  ],

  "Idly Rice": [
    "assets/Rice Recipe/Idly Rice/Idly Rice 1.jpg",
    "assets/Rice Recipe/Idly Rice/Idly Rice 2.jpg",
    "assets/Rice Recipe/Idly Rice/Idly Rice 3.jpg",
    "assets/Rice Recipe/Idly Rice/Idly Rice 4.jpg",
    "assets/Rice Recipe/Idly Rice/Idly Rice 5.jpg"
  ],
  
  "Navara Rice": [
    "assets/Rice Recipe/Navara Rice/Navara Rice 1.jpg",
    "assets/Rice Recipe/Navara Rice/Navara Rice 2.jpg",
    "assets/Rice Recipe/Navara Rice/Navara Rice 3.jpg",
    "assets/Rice Recipe/Navara Rice/Navara Rice 4.jpg",
    "assets/Rice Recipe/Navara Rice/Navara Rice 5.jpg"
  ], 

  "Kichali Samba": [
    "assets/Rice Recipe/Kichali Samba/Kichali Samba 1.jpg",
    "assets/Rice Recipe/Kichali Samba/Kichali Samba 1.jpg",
    "assets/Rice Recipe/Kichali Samba/Kichali Samba 1.jpg",
    "assets/Rice Recipe/Kichali Samba/Kichali Samba 1.jpg",
    "assets/Rice Recipe/Kichali Samba/Kichali Samba 1.jpg"
  ], 

  "Mapillai Samba Rice": [
    "assets/Rice Recipe/Mapillai Samba Rice/Mapillai Samba Rice 1.jpg",
    "assets/Rice Recipe/Mapillai Samba Rice/Mapillai Samba Rice 2.jpg",
    "assets/Rice Recipe/Mapillai Samba Rice/Mapillai Samba Rice 3.jpg",
    "assets/Rice Recipe/Mapillai Samba Rice/Mapillai Samba Rice 4.jpg",
    "assets/Rice Recipe/Mapillai Samba Rice/Mapillai Samba Rice 5.jpg"
  ], 

  "Black Kavuni Rice": [
    "assets/Rice Recipe/Black Kavuni Rice/Black Kavuni Rice 1.jpg",
    "assets/Rice Recipe/Black Kavuni Rice/Black Kavuni Rice 2.jpg",
    "assets/Rice Recipe/Black Kavuni Rice/Black Kavuni Rice 3.jpg",
    "assets/Rice Recipe/Black Kavuni Rice/Black Kavuni Rice 4.jpg",
    "assets/Rice Recipe/Black Kavuni Rice/Black Kavuni Rice 5.jpg"
  ], 

  "Ponni Boiled": [
    "assets/Rice Recipe/Ponni Boiled/Ponni Boiled 1.jpg",
    "assets/Rice Recipe/Ponni Boiled/Ponni Boiled 2.jpg",
    "assets/Rice Recipe/Ponni Boiled/Ponni Boiled 3.jpg",
    "assets/Rice Recipe/Ponni Boiled/Ponni Boiled 4.jpg",
    "assets/Rice Recipe/Ponni Boiled/Ponni Boiled 5.jpg"
  ], 

  "Ponni Raw Rice": [
    "assets/Rice Recipe/Ponni Raw Rice/Ponni Raw Rice 1.jpg",
    "assets/Rice Recipe/Ponni Raw Rice/Ponni Raw Rice 2.jpg",
    "assets/Rice Recipe/Ponni Raw Rice/Ponni Raw Rice 3.jpg",
    "assets/Rice Recipe/Ponni Raw Rice/Ponni Raw Rice 4.jpg",
    "assets/Rice Recipe/Ponni Raw Rice/Ponni Raw Rice 5.jpg"
  ],
  
  "Poongar Rice": [
    "assets/Rice Recipe/Poongar Rice/Poongar Rice 1.jpg",
    "assets/Rice Recipe/Poongar Rice/Poongar Rice 2.jpg",
    "assets/Rice Recipe/Poongar Rice/Poongar Rice 3.jpg",
    "assets/Rice Recipe/Poongar Rice/Poongar Rice 4.jpg",
    "assets/Rice Recipe/Poongar Rice/Poongar Rice 5.jpg"
  ], 

  "Karugu Kuruvai Rice": [
    "assets/Rice Recipe/Karugu Kuruvai Rice/Karugu Kuruvai Rice 1.jpg",
    "assets/Rice Recipe/Karugu Kuruvai Rice/Karugu Kuruvai Rice 2.jpg",
    "assets/Rice Recipe/Karugu Kuruvai Rice/Karugu Kuruvai Rice 3.jpg",
    "assets/Rice Recipe/Karugu Kuruvai Rice/Karugu Kuruvai Rice 4.jpg",
    "assets/Rice Recipe/Karugu Kuruvai Rice/Karugu Kuruvai Rice 5.jpg"
  ], 

  "Kullakar Rice": [
    "assets/Rice Recipe/Kullakar Rice/Kullakar Rice 1.jpg",
    "assets/Rice Recipe/Kullakar Rice/Kullakar Rice 2.jpg",
    "assets/Rice Recipe/Kullakar Rice/Kullakar Rice 3.jpg",
    "assets/Rice Recipe/Kullakar Rice/Kullakar Rice 4.jpg",
    "assets/Rice Recipe/Kullakar Rice/Kullakar Rice 5.jpg"
  ],

  "Red Rice": [
    "assets/Rice Recipe/Red Rice/Red Rice 1.jpg",
    "assets/Rice Recipe/Red Rice/Red Rice 2.jpg",
    "assets/Rice Recipe/Red Rice/Red Rice 3.jpg",
    "assets/Rice Recipe/Red Rice/Red Rice 4.jpg"
  ],

  "Kattu Yanam Rice": [
    "assets/Rice Recipe/Kattu Yanam Rice/Kattu Yanam Rice 1.jpg",
    "assets/Rice Recipe/Kattu Yanam Rice/Kattu Yanam Rice 2.jpg",
    "assets/Rice Recipe/Kattu Yanam Rice/Kattu Yanam Rice 3.jpg",
    "assets/Rice Recipe/Kattu Yanam Rice/Kattu Yanam Rice 4.jpg"
  ],

  "Swarna Masuri": [
    "assets/Rice Recipe/Swarna Masuri/Swarna Masuri 1.jpg",
    "assets/Rice Recipe/Swarna Masuri/Swarna Masuri 2.jpg",
    "assets/Rice Recipe/Swarna Masuri/Swarna Masuri 3.jpg",
    "assets/Rice Recipe/Swarna Masuri/Swarna Masuri 4.jpg"
  ],





  
  "Kambu Flour": [
    "assets/Flour Recipe/Kambu Flour/Kambu 1.jpg",
    "assets/Flour Recipe/Kambu Flour/Kambu 2.jpg",
    "assets/Flour Recipe/Kambu Flour/Kambu 3.jpg",
    "assets/Flour Recipe/Kambu Flour/Kambu 4.jpg",
    "assets/Flour Recipe/Kambu Flour/Kambu 5.jpg"
  ], 

  "Kavuni Flour": [
    "assets/Flour Recipe/Kavuni Flour/Kavuni  1.jpg",
    "assets/Flour Recipe/Kavuni Flour/Kavuni  2.jpg",
    "assets/Flour Recipe/Kavuni Flour/Kavuni  3.jpg",
    "assets/Flour Recipe/Kavuni Flour/Kavuni  4.jpg",
    "assets/Flour Recipe/Kavuni Flour/Kavuni  5.jpg"
  ],

  "Ragi Flour": [
    "assets/Flour Recipe/Ragi Flour/Ragi Flour 1.jpg",
    "assets/Flour Recipe/Ragi Flour/Ragi Flour 2.jpg",
    "assets/Flour Recipe/Ragi Flour/Ragi Flour 3.jpg",
    "assets/Flour Recipe/Ragi Flour/Ragi Flour 4.jpg"
  ], 
};

/* ========= PRODUCT BENEFITS ========= */

const productBenefits = {


  "Pearl (or) Kambu Millet": [
    "Rich in dietary fiber – supports digestion and gut health",
    "High in iron and magnesium – helps prevent anemia and improves bone strength",
    "Low glycemic index – aids in blood sugar control",
    "Gluten-free grain – suitable for people with gluten intolerance",
    "High antioxidant content – reduces inflammation and oxidative stress",
    "Supports heart health – helps lower cholesterol and regulate blood pressure" 
  ],

  "Finger (or) Ragi Millet": [
    "Rich in Calcium & Iron – Supports strong bones, teeth, and prevents anemia.",
    "High Dietary Fiber – Aids digestion, improves gut health, and promotes satiety.",
    "Low Glycemic Index – Helps regulate blood sugar levels; suitable for diabetics.",
    "Good Source of Plant Protein – Supports muscle health and overall body repair.",
    "Heart Health Support – Reduces bad cholesterol and improves cardiovascular health.",
    "Natural Antioxidants – Boost immunity and help combat inflammation and aging."    
  ],

  "Foxtail (or) Thinai Millet": [
    "Rich in dietary fiber, supports healthy digestion",
    "Low glycemic index, helps regulate blood sugar levels",
    "Good source of plant-based protein and essential amino acids",
    "High in antioxidants, reduces inflammation and oxidative stress",
    "Supports heart health by lowering bad cholesterol (LDL)",
    "Enhances immunity and overall metabolic health"   
  ],

  "Barnyard (or) Kuthuravali Millet": [
    "Rich in dietary fiber – supports digestion and gut health",
    "Low glycemic index – helps control blood sugar levels",
    "Good source of iron and minerals – supports energy and hemoglobin levels",
    "Gluten-free grain – suitable for people with gluten intolerance",
    "Aids in weight management – keeps you fuller for longer",
    "Supports heart health – helps reduce bad cholesterol (LDL)"   
  ],

  "Little (or) Saamai Millet": [
    "Rich in dietary fiber – supports digestion and gut health",
    "Low glycemic index – helps control blood sugar levels",
    "High in antioxidants – reduces oxidative stress",
    "Good source of iron and minerals – supports energy and immunity",
    "Naturally gluten-free – suitable for gluten sensitivity",
    "Supports heart health – helps manage cholesterol levels"    
  ],

  "Kodo (or) Varagu Millet": [
    "Rich in dietary fiber, supporting healthy digestion and gut health",
    "Low glycaemic index, helping in blood sugar control for diabetics",
    "Good source of antioxidants, aiding in reducing oxidative stress",
    "Naturally gluten-free, suitable for people with gluten intolerance",
    "Supports weight management by promoting satiety and metabolism",
    "Helps improve heart health by lowering bad cholesterol (LDL)" 
  ],





  "Black Kavuni Rice": [
    "Rich in anthocyanins and antioxidants", 
    "High in fiber for digestive health", 
    "Helps regulate blood sugar levels", 
    "Supports heart health and reduces cholesterol", 
    "Anti-inflammatory properties", 
    "Aid in weight management" 
  ],

  "Karugu Kuruvai Rice": [
    "Deep black color rich in antioxidants ",
    "Excellent source of magnesium",
    "Supports cardiovascular health",
    "Reduces inflammation",
    "Aids in detoxification ",
    "Improves bone density"
  ],

  "Kattu Yanam Rice": [
    "Rich in iron (prevents anemia)",
    "Contains essential minerals ",
    "High in fiber",
    "Promotes healthy digestion",
    "Boosts immunity ",
    "Traditional healing rice for strength"
  ], 

  "Kullakar Rice": [
    "Ancient heritage variety",
    "Rich in unique proteins",
    "Aids in tissue repair",
    "Supports muscle development",
    "Contains essential trace minerals",
    "Traditional strength-building grain"
  ],

  "Mapillai Samba Rice": [
    "Known as “Bridegroom’s Rice” for vitality",
    "Enhances energy and stamina",
    "Rich in iron and protein",
    "Supports sexual health and vitality",
    "Aids digestion",
    "Boosts overall strength"
  ],

  "Poongar Rice": [
    "Highest iron content among rice varieties",
    "Excellent for anemia prevention",
    "Rich in B vitamins",
    "Supports energy metabolism",
    "Enhances blood quality",
    "Traditional strength-building rice"  
  ],

  "Swarna Masuri": [
    "Light and easily digestible",
    "Rich in thiamine (Vitamin B1) and niacin",
    "Low in fat content",
    "Supports nervous system health",
    "Helps maintain blood pressure",
    "Contains essential amino acids"
  ],

  "Idly Rice": [
    "Ideal for fermentation (increases vitamin B)",
    "High in iron and phosphorus",
    "Supports energy production",
    "Promotes good digestion when fermented",
    "Low glycemic index",
    "Contains beneficial probiotics after fermentation"  
  ],

  "Red Rice": [
    "Rich in anthocyanins (red pigment)",
    "High in magnesium and manganese",
    "Aids in bone health and strength",
    "Natural stress reliever",
    "Anti-inflammatory properties",
    "Supports immune system"
  ],

  "Rathasali": [
    "Deep red heirloom variety",
    "Extremely high in antioxidants",
    "Rich in flavonoids",
    "Anti-inflammatory",
    "Supports heart health",
    "Anti-diabetic properties"
  ],

  "Kichali Samba": [
    "Small grain, easily digestible",
    "Rich in iron and minerals",
    "Good for lactation",
    "Aids in post-delivery recovery",
    "High nutritional density",
    "Traditional postpartum food"
  ],

  "Navara Rice": [
    "Ancient medicinal rice",
    "Used in Ayurvedic treatments",
    "High in antioxidants",
    "Anti-inflammatory properties",
    "Supports skin health",
    "Enhances immunity"
    ],
  

  "Thooyamalli Boiled": [
    "Pre-boiled retains nutrients",
    "High in minerals from hull",
    "Aids in calcium absorption",
    "Supports bone health",
    "Better nutrient bioavailability",
    "Helps regulate digestion"
  ],

  "Ponni Boiled": [
    "Medium grain, versatile variety",
    "Easier digestion after boiling",
    "Contains retained minerals",
    "Promotes gut health",
    "Light and suitable for daily use",
    "Affordable and nutritious"
  ],

  "Kerala Matta": [
    "Short grain, sticky when cooked",
    "High in resistant starch",
    "Supports gut bacteria",
    "Low glycemic index",
    "Contains fiber and minerals",
    "Unique aromatic properties" 
  ],

  "Thanga Samba": [
    "Golden/brown variety",
    "Rich in antioxidants",
    "Contains essential minerals",
    "Anti-aging properties",
    "Aids circulation",
    "Balances body heat" 
  ],

  "Illupaipoo Samba": [
    "Aromatic heritage variety",
    "High in essential oils",
    "Aid digestion naturally",
    "Possesses cooling properties",
    "Rich flavor and nutrients",
    "Traditional medicinal rice"  
  ],

  "Seera Samba Raw Rice": [
    "Finest fragrant rice variety",
    "Contains aromatic essential oils",
    "Aid in digestion",
    "Natural flavor without additives",
    "Contains beneficial minerals",
    "Premium nutritional profile"  
  ],

  "Ponni Raw Rice": [
    "Medium grain, versatile variety",
    "Easier digestion after boiling",
    "Contains retained minerals",
    "Promotes gut health",
    "Light and suitable for daily use",
    "Affordable and nutritious"
  ],





  "Kambu Flour": [
    "Rich in dietary fiber – supports digestion and gut health",
    "High in iron and magnesium – helps prevent anemia and improves bone strength",
    "Low glycemic index – aids in blood sugar control",
    "Gluten-free grain – suitable for people with gluten intolerance",
    "High antioxidant content – reduces inflammation and oxidative stress",
    "Supports heart health – helps lower cholesterol and regulate blood pressure"
  ],

  "Kavuni Flour": [
    "Rich in anthocyanins and antioxidants", 
    "High in fiber for digestive health", 
    "Helps regulate blood sugar levels", 
    "Supports heart health and reduces cholesterol", 
    "Anti-inflammatory properties", 
    "Aid in weight management"
  ],

  "Ragi Flour": [
    "Rich in Calcium & Iron – Supports strong bones, teeth, and prevents anemia.",
    "High Dietary Fiber – Aids digestion, improves gut health, and promotes satiety.",
    "Low Glycemic Index – Helps regulate blood sugar levels; suitable for diabetics.",
    "Good Source of Plant Protein – Supports muscle health and overall body repair.",
    "Heart Health Support – Reduces bad cholesterol and improves cardiovascular health.",
    "Natural Antioxidants – Boost immunity and help combat inflammation and aging."
  ],

};



const recipeSection = document.getElementById("recipeSection");
const recipeMainImg = document.getElementById("recipeMainImg");
const recipeThumbs = document.getElementById("recipeThumbs");

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeModal = document.getElementById("closeModal");

const productName =
  JSON.parse(localStorage.getItem("selectedProduct"))?.name?.trim() || "";

console.log("Selected Product:", productName);

const recipes = productRecipes[productName];

if (!recipes || recipes.length === 0) {

  recipeSection.style.display = "none";
} else {
  recipeThumbs.innerHTML = "";

  recipeMainImg.src = recipes[0];

  recipes.forEach((src, index) => {
    const thumb = document.createElement("img");
    thumb.src = src;
    thumb.className = "recipe-thumb";
    if (index === 0) thumb.classList.add("active");

    thumb.onclick = () => {
      recipeMainImg.src = src;
      document
        .querySelectorAll(".recipe-thumb")
        .forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
    };

    recipeThumbs.appendChild(thumb);
  });
}


recipeMainImg.onclick = () => {
  modal.classList.add("show");
  modalImg.src = recipeMainImg.src;
};

closeModal.onclick = () => modal.classList.remove("show");

modal.onclick = e => {
  if (e.target === modal) modal.classList.remove("show");
};


/* ========= LOAD BENEFITS ========= */

const benefitList = document.getElementById("benefitList");

if (benefitList) {

  const benefits = productBenefits[productName];

  if (!benefits || benefits.length === 0) {

    benefitList.innerHTML = "<li>No benefits available.</li>";

  } else {

    benefitList.innerHTML = benefits
      .map(item => `<li>${item}</li>`)
      .join("");

  }
}




/* ========= UNIVERSAL RELATED PRODUCTS (FIXED) ========= */

const relatedSection = document.getElementById("relatedSection");
const relatedContainer = document.getElementById("relatedContainer");
const relatedTitle = document.getElementById("relatedTitle");

const currentProduct =
  JSON.parse(localStorage.getItem("selectedProduct"));

const allProducts =
  JSON.parse(localStorage.getItem("products"));

if (!currentProduct || !allProducts) {
  relatedSection.style.display = "none";
} else {

  // normalize category (VERY IMPORTANT)
  const normalize = str =>
    str?.toLowerCase().replace(/\s+/g, "").replace(/s$/, "");

  const currentCategory = normalize(currentProduct.category);

  const relatedItems = allProducts.filter(p =>
    normalize(p.category) === currentCategory &&
    p.name !== currentProduct.name
  );

  if (relatedItems.length === 0) {
    relatedSection.style.display = "none";
  } else {

    // dynamic title
    relatedTitle.textContent =
      `More ${currentProduct.category}`;

    relatedItems.forEach(item => {
      const card = document.createElement("div");
      card.className = "related-card";

      card.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <p>${item.name}</p>
        ${item.price ? `<span>₹${item.price}</span>` : ""}
      `;

      card.onclick = () => {
        localStorage.setItem(
          "selectedProduct",
          JSON.stringify(item)
        );
        window.location.reload();
      };

      relatedContainer.appendChild(card);
    });
  }
}


/* ========= SEARCH FROM PRODUCT DETAIL PAGE ========= */

const headerSearch = document.getElementById("searchInput");

if (headerSearch) {

  headerSearch.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

      const searchValue = headerSearch.value
        .toLowerCase()
        .trim();

      if (!searchValue) return;

      const allProducts =
        JSON.parse(localStorage.getItem("products")) || [];

      const foundProduct = allProducts.find(p =>
        p.name.toLowerCase().includes(searchValue)
      );

      if (foundProduct) {

        localStorage.setItem(
          "selectedProduct",
          JSON.stringify(foundProduct)
        );

        window.location.reload(); // reload detail page

      } else {
        alert("Product not found");
      }

    }

  });

}
