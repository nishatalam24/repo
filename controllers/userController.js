const db = require("../db");

exports.createUser = async (req, res) => {
  const { name, email, phone, role } = req.body;

  const result = await db.query(
    "INSERT INTO users(name,email,phone,role) VALUES($1,$2,$3,$4) RETURNING *",
    [name, email, phone, role]
  );

  res.json(result.rows[0]);
};

exports.getUsers = async (req, res) => {
  const result = await db.query("SELECT * FROM users");
  res.json(result.rows);
};

exports.getUserById = async (req, res) => {
  const result = await db.query("SELECT * FROM users WHERE id=$1", [
    req.params.id
  ]);

  res.json(result.rows[0]);
};

exports.updateUser = async (req, res) => {
  const { name, phone } = req.body;

  const result = await db.query(
    "UPDATE users SET name=$1, phone=$2 WHERE id=$3 RETURNING *",
    [name, phone, req.params.id]
  );

  res.json(result.rows[0]);
};

exports.deleteUser = async (req, res) => {
  await db.query("DELETE FROM users WHERE id=$1", [req.params.id]);
  res.json({ message: "User deleted" });
};