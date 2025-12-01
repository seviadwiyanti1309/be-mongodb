const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TokenBlacklist = require("../models/TokenBlacklist");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // cek email
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    res.json({ message: "Registrasi berhasil", user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // cek user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email tidak ditemukan" });
    }

    // cek password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Password salah" });
    }

    // buat token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login berhasil",
      token,
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//Fungsi Logout Baru 
exports.logout = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(400).json({ message: "Token tidak ditemukan" });
        }

        const decoded = jwt.decode(token);

        if (!decoded || decoded.exp) {
            return res.status(400).json({ message: "Token tidak valid" });
        }

        //simpan token ke blacklist
        await TokenBlacklist.create({
            token,
            expiresAt: new Date(decoded.exp * 1000),
        });

        res.json({ message: "Logout berhasil" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
