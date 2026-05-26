require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Book = require("./models/Book");
const Member = require("./models/Member");
const Loan = require("./models/Loan");

const generateBooks = () => {
  const books = [];
  const genres = ["Fiction", "Non-fiction", "Sci-Fi", "History", "Biography", "Classic", "Self-Help", "Design", "Memoir", "Fantasy"];
  const firstNames = ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles", "Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];
  const adjs = ["Midnight", "Atomic", "Everyday", "Silent", "Hidden", "Dark", "Bright", "Lost", "Forgotten", "Secret", "Golden", "Crimson", "Last", "First", "Infinite", "Broken", "Fallen", "Rising", "Frozen", "Burning"];
  const nouns = ["Library", "Habits", "Things", "Spring", "Figures", "Sun", "Moon", "Star", "Sea", "Mountain", "Forest", "Desert", "City", "Castle", "King", "Queen", "Knight", "Dragon", "Sword", "Shield"];

  for (let i = 0; i < 50; i++) {
    const genre = genres[Math.floor(Math.random() * genres.length)];
    const author = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    const title = `The ${adjs[Math.floor(Math.random() * adjs.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
    const year = (Math.floor(Math.random() * (2024 - 1900)) + 1900).toString();
    const coverImage = `https://picsum.photos/seed/book${i + 1}/400/600`;

    books.push({
      title,
      author,
      genre,
      publicationYear: year,
      coverImage
    });
  }
  return books;
};

const generateMembers = () => {
  const members = [];
  const firstNames = ["Emily", "Jacob", "Michael", "Sarah", "Matthew", "Jessica", "Christopher", "Ashley", "Daniel", "Amanda"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];
  
  for (let i = 0; i < 50; i++) {
    const name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]} ${i}`;
    members.push({
      name,
      email: `member${i}@example.com`,
      role: "Member",
    });
  }
  return members;
};

const generateLoans = (bookIds, memberIds) => {
  const loans = [];
  const statuses = ["Borrowed", "Returned", "Overdue"];
  
  for (let i = 0; i < 20; i++) {
    const book = bookIds[Math.floor(Math.random() * bookIds.length)];
    const member = memberIds[Math.floor(Math.random() * memberIds.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + (Math.floor(Math.random() * 30) - 15)); // between 15 days ago and 15 days future
    
    loans.push({
      book,
      member,
      status,
      dueDate,
    });
  }
  return loans;
};

const seed = async () => {
  try {
    await connectDB();
    
    await Loan.deleteMany({});
    await Member.deleteMany({});
    await Book.deleteMany({});
    
    const booksData = generateBooks();
    const insertedBooks = await Book.insertMany(booksData);
    
    const membersData = generateMembers();
    const insertedMembers = await Member.insertMany(membersData);
    
    const bookIds = insertedBooks.map(b => b._id);
    const memberIds = insertedMembers.map(m => m._id);
    
    const loansData = generateLoans(bookIds, memberIds);
    await Loan.insertMany(loansData);
    
    console.log(`Seeded ${insertedBooks.length} books, ${insertedMembers.length} members, ${loansData.length} loans.`);
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

seed();
