require('dotenv').config();
const express = require("express");
const app = express();

app.use(express.json());

app.use('/api', require('./routes'));

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
