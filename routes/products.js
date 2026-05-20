const router = require("express").Router();
const Product = require("../models/Product");

// Seed data (runs only if DB empty)
router.get("/seed", async (req, res) => {
  await Product.deleteMany();

  await Product.insertMany([
    {
      name: "Milk",
      price: 50,
      category: "Dairy",
      stock: 10,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-dEE3xvtZaj0WoHd0jmiMU7_V8aduyV-ejw&s"
    },
    {
      name: "Rice",
      price: 80,
      category: "Grains",
      stock: 20,
      image: "https://images.immediate.co.uk/production/volatile/sites/30/2013/05/rice-a941d59.jpg?quality=90&resize=708,643"
    },
    {
      name: "Apple",
      price: 100,
      category: "Fruits",
      stock: 15,
      image: "https://www.collinsdictionary.com/images/full/apple_158989157.jpg"
    }
  ]);

  res.send("Products with images added!");
});


// Get products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

module.exports = router;