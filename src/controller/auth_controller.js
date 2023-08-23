const Admin = require("../mongoDB/models/Admin");
const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
require('dotenv').config();

module.exports.register = async (req, res) => {
    const { username, password } = req.body;
    const existing_user = await Admin.findOne({ username });
    if (existing_user) {
        return res.status(400).json({ message: "Username already exists" });
    }
    const user = await Admin.create(req.body);
    res.status(201).json({ message: "User registered successfully" });
};

module.exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await Admin.findOne({ username });
    if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
    }
    const is_password_valid = await user.comparePassword(password);
    if (!is_password_valid) {
        return res.status(401).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    user.token = token;
    await user.save();
    res.json({ token });
};

module.exports.logout = async (req, res) => {
    req.user.token = null;
    await req.user.save();
    res.json({ message: `User ${req.user} logged out successfull` })
};

module.exports.getCurrent = async (req, res) => {
    res.json({ message: `current user - ${req.user.username} ` });
}
