const pool = require("./db");
const bcrypt = require("bcrypt");

async function seedAdmin() {
  try {

    const email = "nishatalam.it@gmail.com";
    const password = "Admin@123";

    const check = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (check.rows.length > 0) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users(name,email,password,role)
       VALUES($1,$2,$3,$4)`,
      ["Admin", email, hashedPassword, "ADMIN"]
    );

    console.log("Admin created successfully");
    console.log("Email:", email);
    console.log("Password:", password);

    process.exit();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedAdmin();