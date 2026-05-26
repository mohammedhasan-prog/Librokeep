const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
require("dotenv").config();

const connectDB = require("./config/db");
const booksRouter = require("./routes/books");
const membersRouter = require("./routes/members");
const loansRouter = require("./routes/loans");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/books", booksRouter);
app.use("/api/members", membersRouter);
app.use("/api/loans", loansRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

// Connect to DB immediately for serverless cache, but also handle local listening
connectDB()
  .then(() => {
    // Only listen on a port if we are NOT in a Vercel serverless environment
    if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    }
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
  });

// Export the app for Vercel Serverless Functions
module.exports = app;
