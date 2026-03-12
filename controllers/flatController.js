const db = require("../db");

exports.createFlat = async (req, res) => {
  const { flat_number, flat_type, owner_id } = req.body;

  const result = await db.query(
    "INSERT INTO flats(flat_number,flat_type,owner_id) VALUES($1,$2,$3) RETURNING *",
    [flat_number, flat_type, owner_id]
  );

  res.json(result.rows[0]);
};

exports.getFlats = async (req, res) => {
  const result = await db.query(
    "SELECT flats.*, users.name AS owner FROM flats LEFT JOIN users ON users.id=flats.owner_id"
  );

  res.json(result.rows);
};

exports.updateFlat = async (req, res) => {
  const { flat_type } = req.body;

  const result = await db.query(
    "UPDATE flats SET flat_type=$1 WHERE id=$2 RETURNING *",
    [flat_type, req.params.id]
  );

  res.json(result.rows[0]);
};

exports.deleteFlat = async (req, res) => {
  await db.query(
    "UPDATE flats SET is_active=false WHERE id=$1",
    [req.params.id]
  );

  res.json({ message: "Flat soft deleted" });
};