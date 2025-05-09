require('dotenv').config();
const express = require("express");
const app = express();

app.use(express.json());
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/customers", require("./routes/customerRoutes"));
app.use("/api/leads", require("./routes/leadRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/activity", require("./routes/activityRoutes"));
const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
