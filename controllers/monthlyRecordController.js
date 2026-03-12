const db = require("../db");

exports.createRecord = async (req, res) => {
  const { flat_id, month, amount } = req.body;

  const result = await db.query(
    "INSERT INTO monthly_records(flat_id,month,amount) VALUES($1,$2,$3) RETURNING *",
    [flat_id, month, amount]
  );

  res.json(result.rows[0]);
};

exports.getRecords = async (req, res) => {
  const result = await db.query("SELECT * FROM monthly_records");
  res.json(result.rows);
};

exports.markPaid = async (req, res) => {
  const result = await db.query(
    "UPDATE monthly_records SET status='PAID' WHERE id=$1 RETURNING *",
    [req.params.id]
  );

  res.json(result.rows[0]);
};