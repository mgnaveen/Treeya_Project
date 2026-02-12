let PRODUCTS = [];

fetch("data/product.json")
  .then(res => res.json())
  .then(data => {
    PRODUCTS = data;
  })
  .catch(err => console.error("Failed to load products", err));