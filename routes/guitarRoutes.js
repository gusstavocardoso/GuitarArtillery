const express = require("express");
const { v4: uuidv4 } = require("uuid"); // Para gerar IDs únicos
const router = express.Router();

// Armazenamento em memória
let guitars = [];

// Criar uma nova guitarra
router.post("/", (req, res) => {
  const { marca, modelo, ano, cor } = req.body;
  const newGuitar = { id: uuidv4(), marca, modelo, ano, cor }; // Gerar ID único
  guitars.push(newGuitar);
  res.status(201).json(newGuitar);
});

// Listar todas as guitarras
router.get("/", (req, res) => {
  res.json(guitars);
});

// Buscar guitarra por ID
router.get("/:id", (req, res) => {
  const guitar = guitars.find((g) => g.id === req.params.id);
  if (!guitar)
    return res.status(404).json({ message: "Guitarra não encontrada" });
  res.json(guitar);
});

// Atualizar guitarra por ID
router.put("/:id", (req, res) => {
  const { marca, modelo, ano, cor } = req.body;
  const guitar = guitars.find((g) => g.id === req.params.id);
  if (!guitar)
    return res.status(404).json({ message: "Guitarra não encontrada" });

  guitar.marca = marca || guitar.marca;
  guitar.modelo = modelo || guitar.modelo;
  guitar.ano = ano || guitar.ano;
  guitar.cor = cor || guitar.cor;

  res.json(guitar);
});

// Deletar guitarra por ID
router.delete("/:id", (req, res) => {
  const guitarIndex = guitars.findIndex((g) => g.id === req.params.id);
  if (guitarIndex === -1)
    return res.status(404).json({ message: "Guitarra não encontrada" });

  guitars.splice(guitarIndex, 1);
  res.json({ message: "Guitarra removida" });
});

module.exports = router;
