const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Product = require("./models/Product")
const User = require("./models/User");
const Cart = require("./models/Cart");
const products = require("./data/products")

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

// Function to seed the data

const seedData = async () => {
    try {
        await Product.deleteMany(); // Delete all the product from product collection
        await User.deleteMany(); // Delete all the User from User Collection
        await Cart.deleteMany();

        // Create a default admin user
        const createUser = await User.create({
            name: "Admin User", 
            email: "admin@example.com",
            password: "123456",
            role: "admin",
        })

        //  Assign the default user ID to each product
        const userID = createUser._id;

        const sampleProducts = products.map((product) => {
            return {...product, user: userID };
        })

        // Insert the products into the database

        await Product.insertMany(sampleProducts);

        console.log("Product Data Seeded Successfully")
        process.exit();
    } catch (err) {
        console.error("Error seeding the data:", err);
        process.exit(1);
    }
}

seedData();