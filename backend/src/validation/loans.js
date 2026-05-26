const { z } = require("zod");

const objectIdSchema = z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ID");

const createLoanSchema = z.object({
  book: objectIdSchema,
  member: objectIdSchema,
  dueDate: z.string().datetime().or(z.date()),
  status: z.enum(["Borrowed", "Returned", "Overdue"]).optional(),
});

const loanIdParamsSchema = z.object({
  id: objectIdSchema,
});

module.exports = {
  createLoanSchema,
  loanIdParamsSchema,
};
