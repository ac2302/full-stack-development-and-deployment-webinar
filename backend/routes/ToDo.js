const router = require("express").Router();
const User = require("../models/User");
const ToDo = require("../models/ToDo");
const authOnlyMiddleware = require("../middlewares/authOnly");

router.get("/", authOnlyMiddleware, async (req, res) => {
  try {
    let foundToDo = await ToDo.findOne({ user: req.user.id });

    if (!foundToDo) {
      foundToDo = new ToDo({ user: req.user.id });
      await foundToDo.save();
    }

    res.json({ data: foundToDo.items });
  } catch (err) {
    return res.status(500).json({ error: "something went wrong" });
  }
});

router.post("/", authOnlyMiddleware, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text)
      return res.status(400).json({ error: "text is required in body" });

    const foundToDo = await ToDo.findOne({ user: req.user.id });

    if (!foundToDo) return res.json({ data: [] });

    foundToDo.items.push({ text });

    await foundToDo.save();

    res.json({ data: foundToDo.items });
  } catch (err) {
    return res.status(500).json({ error: "something went wrong" });
  }
});

module.exports = router;
