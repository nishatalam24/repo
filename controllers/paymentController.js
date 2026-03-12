const db = require("../db");

exports.createPayment = async (req, res) => {
  const { flat_id, monthly_record_id, amount, payment_mode } = req.body;

  const result = await db.query(
    "INSERT INTO payments(flat_id,monthly_record_id,amount,payment_mode) VALUES($1,$2,$3,$4) RETURNING *",
    [flat_id, monthly_record_id, amount, payment_mode]
  );

  await db.query(
    "UPDATE monthly_records SET status='PAID' WHERE id=$1",
    [monthly_record_id]
  );

  res.json(result.rows[0]);
};

exports.getPayments = async (req, res) => {
  const result = await db.query("SELECT * FROM payments");
  res.json(result.rows);
};

exports.getPaymentsByFlat = async (req, res) => {
  const result = await db.query(
    "SELECT * FROM payments WHERE flat_id=$1",
    [req.params.flatId]
  );

  res.json(result.rows);
};