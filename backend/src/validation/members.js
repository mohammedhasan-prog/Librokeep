const { z } = require("zod");

const objectIdSchema = z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ID");

const createMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  role: z.enum(["Member", "Librarian"]).optional(),
});

const memberIdParamsSchema = z.object({
  id: objectIdSchema,
});

module.exports = {
  createMemberSchema,
  memberIdParamsSchema,
};
