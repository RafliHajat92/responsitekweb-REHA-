const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors()); // Mengizinkan akses dari frontend (React)
app.use(express.json()); // Untuk parsing JSON dari request body

// Membaca data dari users.json
const getUsers = () => {
  const data = fs.readFileSync("./data/users.json");
  return JSON.parse(data);
};

// API untuk login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const users = getUsers();
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    res.status(200).json({ message: "Login berhasil!" });
  } else {
    res.status(401).json({ message: "Username atau password salah!" });
  }
});

// API untuk registrasi
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  const users = getUsers();

  // Mengecek jika username sudah terdaftar
  if (users.some((u) => u.username === username)) {
    return res.status(400).json({ message: "Username sudah terdaftar!" });
  }

  // Menambahkan pengguna baru
  const newUser = { username, password };
  users.push(newUser);

  // Menyimpan data kembali ke users.json
  fs.writeFileSync("./data/users.json", JSON.stringify(users, null, 2));

  res.status(201).json({ message: "Registrasi berhasil!" });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
