const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authOnlyMiddleware = require("../middlewares/authOnly");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const foundUser = await User.findOne({ email });
  if (foundUser) {
    return res.status(400).json({ error: "Email already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = new User({
    email,
    passwordHash,
  });

  await newUser.save();

  const token = jwt.sign(
    {
      id: newUser._id,
    },
    process.env.JWT_SECRET
  );

  res.json({
    token,
    user: {
      id: newUser._id,
      email: newUser.email,
    },
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    return res.status(400).json({ error: "User does not Exist" });
  }

  const validPassword = await bcrypt.compare(password, foundUser.passwordHash);
  if (!validPassword) {
    return res.status(400).json({ error: "Invalid password" });
  }

  const token = jwt.sign(
    {
      id: foundUser._id,
    },
    process.env.JWT_SECRET
  );

  res.json({
    token,
    user: {
      id: foundUser._id,
      email: foundUser.email,
    },
  });
});

router.get("/self", authOnlyMiddleware, async (req, res) => {
  res.json({
    user: req.user,
  });
});

module.exports = router;
