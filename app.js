const express = require("express");
const bodyParser = require("body-parser");
const guitarRoutes = require("./routes/guitarRoutes");

const app = express();
app.use(bodyParser.json());

// Rotas
app.use("/guitars", guitarRoutes);

// Servidor rodando na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
