const express = require("express");
const Member = require("../models/Member");
const { createMemberSchema, memberIdParamsSchema } = require("../validation/members");
const { validateBody, validateParams } = require("../middleware/validate");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.status(200).json(members);
  } catch (err) {
    next(err);
  }
});

router.post("/", validateBody(createMemberSchema), async (req, res, next) => {
  try {
    const member = await Member.create(req.body);
    res.status(201).json(member);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
