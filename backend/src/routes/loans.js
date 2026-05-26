const express = require("express");
const Loan = require("../models/Loan");
const { createLoanSchema, loanIdParamsSchema } = require("../validation/loans");
const { validateBody, validateParams } = require("../middleware/validate");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const loans = await Loan.find()
      .populate("book")
      .populate("member")
      .sort({ createdAt: -1 });
    res.status(200).json(loans);
  } catch (err) {
    next(err);
  }
});

router.post("/", validateBody(createLoanSchema), async (req, res, next) => {
  try {
    const loan = await Loan.create(req.body);
    res.status(201).json(loan);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
