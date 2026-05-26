const express = require("express");
const Book = require("../models/Book");
const {
  createBookSchema,
  updateBookSchema,
  patchBookSchema,
  bookIdParamsSchema,
  booksQuerySchema,
} = require("../validation/books");
const {
  validateBody,
  validateParams,
  validateQuery,
} = require("../middleware/validate");

const router = express.Router();

router.get("/", validateQuery(booksQuerySchema), async (req, res, next) => {
  try {
    const { title, author, genre } = req.query;
    const filter = {};

    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }

    if (author) {
      filter.author = { $regex: author, $options: "i" };
    }

    if (genre) {
      filter.genre = { $regex: genre, $options: "i" };
    }

    const books = await Book.find(filter).sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
});

router.get(
  "/:id",
  validateParams(bookIdParamsSchema),
  async (req, res, next) => {
    try {
      const book = await Book.findById(req.params.id);

      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      res.status(200).json(book);
    } catch (err) {
      next(err);
    }
  }
);

router.post("/", validateBody(createBookSchema), async (req, res, next) => {
  try {
    const book = await Book.create(req.body);

    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:id",
  validateParams(bookIdParamsSchema),
  validateBody(updateBookSchema),
  async (req, res, next) => {
  try {
    const updated = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
}
);

router.patch(
  "/:id",
  validateParams(bookIdParamsSchema),
  validateBody(patchBookSchema),
  async (req, res, next) => {
  try {
    const updated = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
}
);

router.delete(
  "/:id",
  validateParams(bookIdParamsSchema),
  async (req, res, next) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
);

module.exports = router;
