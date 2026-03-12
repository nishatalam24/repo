const db = require("../db");

exports.createPlan = async (req, res) => {
  const { flat_type, monthly_amount } = req.body;

  const result = await db.query(
    "INSERT INTO subscription_plans(flat_type,monthly_amount) VALUES($1,$2) RETURNING *",
    [flat_type, monthly_amount]
  );

  res.json(result.rows[0]);
};

exports.getPlans = async (req, res) => {
  const result = await db.query("SELECT * FROM subscription_plans");
  res.json(result.rows);
};

exports.updatePlan = async (req, res) => {
  const { monthly_amount } = req.body;

  const result = await db.query(
    "UPDATE subscription_plans SET monthly_amount=$1 WHERE id=$2 RETURNING *",
    [monthly_amount, req.params.id]
  );

  res.json(result.rows[0]);
};

exports.deletePlan = async (req, res) => {
  await db.query(
    "DELETE FROM subscription_plans WHERE id=$1",
    [req.params.id]
  );

  res.json({ message: "Plan deleted" });
};