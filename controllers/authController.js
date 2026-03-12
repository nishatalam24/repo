const db = require("../db");

exports.login = async (req, res) => {
  const { email, name } = req.body;

  try {

    let user = await db.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (user.rows.length === 0) {

      user = await db.query(
        `INSERT INTO users(name,email,role)
         VALUES($1,$2,'USER')
         RETURNING *`,
        [name, email]
      );

    }

    res.json({
      message: "Login success",
      user: user.rows[0]
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};