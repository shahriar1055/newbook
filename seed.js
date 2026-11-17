const mongoose = require("mongoose");
const Book = require("./models/Book");
require("dotenv").config();

const books = [
    {
        title: "The Alchemist",
        author: "Paulo Coelho",
        price: 500
    },
    {
        title: "Atomic Habits",
        author: "James Clear",
        price: 650
    },
    {
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        price: 550
    },
    {
        title: "The Psychology of Money",
        author: "Morgan Housel",
        price: 600
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected!");

        await Book.deleteMany();

        await Book.insertMany(books);

        console.log("Books inserted successfully!");

        await mongoose.connection.close();
    } catch (error) {
        console.log("Seed failed:");
        console.log(error.message);
    }
}

seedDatabase();