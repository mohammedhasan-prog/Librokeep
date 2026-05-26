const { z } = require("zod");

const objectIdSchema = z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ID");

const createBookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  genre: z.string().min(1, "Genre is required"),
  publicationYear: z.union([
    z.string().min(1, "Publication year is required"),
    z.number(),
  ]),
});

const updateBookSchema = createBookSchema;

const patchBookSchema = z
  .object({
    title: z.string().min(1).optional(),
    author: z.string().min(1).optional(),
    genre: z.string().min(1).optional(),
    publicationYear: z.union([z.string().min(1), z.number()]).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });

const bookIdParamsSchema = z.object({
  id: objectIdSchema,
});

const booksQuerySchema = z.object({
  title: z.string().min(1).max(100).optional(),
  author: z.string().min(1).max(100).optional(),
  genre: z.string().min(1).max(100).optional(),
});

module.exports = {
  createBookSchema,
  updateBookSchema,
  patchBookSchema,
  bookIdParamsSchema,
  booksQuerySchema,
};
