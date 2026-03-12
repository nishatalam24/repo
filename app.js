const express = require("express");
const app = express();

app.use(express.json());

app.use("/users", require("./routes/userRoutes"));
app.use("/flats", require("./routes/flatRoutes"));
app.use("/subscriptions", require("./routes/subscriptionRoutes"));
app.use("/records", require("./routes/monthlyRecordRoutes"));
app.use("/payments", require("./routes/paymentRoutes"));
app.use("/auth", require("./routes/authRoutes"));
app.listen(3000, () => {
  console.log("Server running on port 3000");
});