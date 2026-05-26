require("dotenv").config();
const connectDB = require("./config/db");
const Book = require("./models/Book");

const seedBooks = [
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Fiction",
    publicationYear: "2020",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help",
    publicationYear: "2018",
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    genre: "Sci-Fi",
    publicationYear: "1965",
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "History",
    publicationYear: "2011",
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Classic",
    publicationYear: "1949",
  },
  {
    title: "The Design of Everyday Things",
    author: "Don Norman",
    genre: "Design",
    publicationYear: "2013",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Classic",
    publicationYear: "1960",
  },
  {
    title: "Educated",
    author: "Tara Westover",
    genre: "Memoir",
    publicationYear: "2018",
  },
];

const seed = async () => {
  try {
    await connectDB();
    await Book.deleteMany({});
    await Book.insertMany(seedBooks);
    console.log("Seeded books:", seedBooks.length);
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

seed();
