const db = require("../models");
const bcrypt = require("bcryptjs");
const logActivity = require("../utils/logActivity");

exports.getAllUsers = async (req, res) => {
  const users = await db.User.findAll({
    attributes: { exclude: ["password"] },
  });
  res.json(users);
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await db.User.findOne({ where: { email } });

    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });
    await logActivity({
      userId: req.user.id, // assuming req.user is set via auth middleware
      action: "create",
      targetType: "User",
      targetId: user.id,
      description: `Created user "${user.name}"`,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
