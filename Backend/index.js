import express from "express";

const app = express();

app.get("/api/products", (req, res) => {
  const products = [
    {
      id: 1,
      name: "Galaxy S21",
      price: 899.99,
      imageUrl: "https://example.com/galaxy-s21.jpg",
    },
    {
      id: 2,
      name: "iPhone 13 Pro",
      price: 1099.99,
      imageUrl: "https://example.com/iphone-13-pro.jpg",
    },
    {
      id: 3,
      name: "Pixel 6",
      price: 799.99,
      imageUrl: "https://example.com/pixel-6.jpg",
    },
    {
      id: 4,
      name: "OnePlus 9",
      price: 749.99,
      imageUrl: "https://example.com/oneplus-9.jpg",
    },
    {
      id: 5,
      name: "Xperia 1 III",
      price: 1299.99,
      imageUrl: "https://example.com/xperia-1-iii.jpg",
    },
    {
      id: 6,
      name: "Mi 11 Ultra",
      price: 999.99,
      imageUrl: "https://example.com/mi-11-ultra.jpg",
    },
    {
      id: 7,
      name: "Galaxy Z Fold 3",
      price: 1799.99,
      imageUrl: "https://example.com/galaxy-z-fold-3.jpg",
    },
    {
      id: 8,
      name: "iPhone SE (2022)",
      price: 499.99,
      imageUrl: "https://example.com/iphone-se-2022.jpg",
    },
    {
      id: 9,
      name: "ROG Phone 5",
      price: 1199.99,
      imageUrl: "https://example.com/rog-phone-5.jpg",
    },
    {
      id: 10,
      name: "Redmi Note 11 Pro",
      price: 399.99,
      imageUrl: "https://example.com/redmi-note-11-pro.jpg",
    },
  ];

  if (req.query.search) {
    const filterProducts = products.filter((pro) =>
      pro.name.includes(req.query.search)
    );
    res.send(filterProducts);
    return;
  }
  setTimeout(() => {
    res.send(products);
  }, 3000);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Srever is running on", port);
});
