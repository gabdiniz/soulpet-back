const { Cliente } = require("../database/cliente");
const { Pet, schemaPet } = require("../database/pet");
const customMessages = require("../joi/customMessages");

const { Router } = require("express");

// Criar o grupo de rotas (/pets)
const router = Router();

router.get("/pets", async (req, res) => {
  const listaPets = await Pet.findAll();
  res.json(listaPets);
});

router.get("/pets/:id", async (req, res) => {
  const { id } = req.params;

  const pet = await Pet.findByPk(id);
  if (pet) {
    res.json(pet);
  } else {
    res.status(404).json({ message: "Pet não encontrado." });
  }
});

router.post("/pets", async (req, res, next) => {
  const { nome, tipo, porte, dataNasc, clienteId, imagemUrl } = req.body;

  try {
    const { error } = schemaPet.validate({ nome, tipo, porte, dataNasc, clienteId, imagemUrl }, { abortEarly: false, messages: customMessages });
    if (error) return res.status(400).json(error.details.map(datalhe => datalhe.message))
    const cliente = await Cliente.findByPk(clienteId);
    if (cliente) {
      const pet = await Pet.create({ nome, tipo, porte, dataNasc, clienteId, imagemUrl });
      res.status(201).json(pet);
    } else {
      res.status(404).json({ message: "Cliente não encontrado." });
    }
  }
  catch (err) {
    next(err);
  }
});

router.put("/pets/:id", async (req, res, next) => {
  // Esses são os dados que virão no corpo JSON
  const { nome, tipo, dataNasc, porte, imagemUrl } = req.body;

  // É necessário checar a existência do Pet
  // SELECT * FROM pets WHERE id = "req.params.id";
  const pet = await Pet.findByPk(req.params.id);

  // se pet é null => não existe o pet com o id
  try {
    if (pet) {
      // IMPORTANTE: Indicar qual o pet a ser atualizado
      // 1º Arg: Dados novos, 2º Arg: Where
      const { error } = schemaPet.validate({ nome, tipo, porte, dataNasc, clienteId: pet.clienteId, imagemUrl }, { abortEarly: false, messages: customMessages });
      if (error) return res.status(400).json(error.details.map(datalhe => datalhe.message))
      await Pet.update(
        { nome, tipo, dataNasc, porte, imagemUrl },
        { where: { id: req.params.id } } // WHERE id = "req.params.id"
      );
      // await pet.update({ nome, tipo, dataNasc, porte });
      res.json({ message: "O pet foi editado." });
    } else {
      // caso o id seja inválido, a resposta ao cliente será essa
      res.status(404).json({ message: "O pet não foi encontrado." });
    }
  }
  catch (err) {
    next(err);
  }
});

router.delete("/pets/:id", async (req, res, next) => {
  // Precisamos checar se o pet existe antes de apagar
  const pet = await Pet.findByPk(req.params.id);

  try {
    if (pet) {
      // pet existe, podemos apagar
      await pet.destroy();
      res.json({ message: "O pet foi removido." });
    } else {
      res.status(404).json({ message: "O pet não foi encontrado" });
    }
  }
  catch (err) {
    next(err);
  }
});

module.exports = router;
