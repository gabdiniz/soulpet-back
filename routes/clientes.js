const { Cliente, schemaClienteEndereco, schemaCliente } = require("../database/cliente");
const customMessages = require("../joi/customMessages");
const { Endereco, schemaEndereco } = require("../database/endereco");
const { Pet } = require("../database/pet");

const { Router } = require("express");

// Criar o grupo de rotas (/clientes)
const router = Router();

// Definição de rotas
router.get("/clientes", async (req, res) => {
  // SELECT * FROM clientes;
  const listaClientes = await Cliente.findAll();
  res.json(listaClientes);
});

// /clientes/1, 2
router.get("/clientes/:id", async (req, res) => {
  // SELECT * FROM clientes WHERE id = 1;
  const cliente = await Cliente.findOne({
    where: { id: req.params.id },
    include: [Endereco], // trás junto os dados de endereço
  });

  if (cliente) {
    res.json(cliente);
  } else {
    res.status(404).json({ message: "Usuário não encontrado." });
  }
});

router.post("/clientes", async (req, res, next) => {
  // Coletar os dados do req.body
  try {
    const { nome, email, telefone, endereco } = req.body;
    const { error } = schemaClienteEndereco.validate({ nome, email, telefone, endereco }, { abortEarly: false, messages: customMessages })
    if (error) return res.status(400).json(error.details.map((detalhe) => detalhe.message));
    const novo = await Cliente.create(
      { nome, email, telefone, endereco },
      { include: [Endereco] }
    );
    // Dentro de 'novo' estará o o objeto criado
    res.status(201).json(novo);
  }
  catch (err) {
    next(err);
  }
});

// atualizar um cliente
router.put("/clientes/:id", async (req, res, next) => {
  // obter dados do corpo da requisão
  // obter identificação do cliente pelos parametros da rota
  try {
    const { nome, email, telefone, endereco } = req.body;
    const { id } = req.params;
    // buscar cliente pelo id passado
    const cliente = await Cliente.findOne({ where: { id } });
    // validar a existência desse cliente no banco de dados

    if (cliente) {
      // validar a existência desse do endereço passdo no corpo da requisição
      let { error } = schemaCliente.validate({ nome, email, telefone }, { abortEarly: false, messages: customMessages });
      if (error) {
        return res.status(400).json(error.details.map((detalhe) => detalhe.message))
      }
      if (endereco) {
        let { error } = schemaEndereco.validate({ endereco }, { abortEarly: false, messages: customMessages });
        if (error) {
          return res.status(400).json(error.details.map((detalhe) => detalhe.message));
        }
        await Endereco.update(endereco, { where: { clienteId: id } });
      }
      // atualizar o cliente com nome, email e telefone
      await cliente.update({ nome, email, telefone });
      res.status(200).json({ message: "Cliente editado." });
    } else {
      res.status(404).json({ message: "Cliente não encontrado." });
    }
  }
  catch (err) {
    next(err);
  }
});

// excluir um cliente
router.delete("/clientes/:id", async (req, res, next) => {
  // obter identificação do cliente pela rota
  // buscar cliente por id
  try {
    const { id } = req.params;
    const cliente = await Cliente.findOne({ where: { id } });
    if (cliente) {
      await cliente.destroy();
      res.status(200).json({ message: "Cliente removido." });
    } else {
      res.status(404).json({ message: "Cliente não encontrado." });
    }
  }
  catch (err) {
    next(err);
  }
});
//Esta rota deve responder com os dados do endereço do Cliente especificado pelo clienteId.
router.get("/clientes/:clienteId/endereco", async (req, res, next) => {
  const { clienteId } = req.params;

  try {
    const cliente = await Cliente.findByPk(clienteId, {
      include: [{ model: Endereco, as: "endereco" }],
    });

    if (!cliente) {
      res.status(404).json({ message: "Cliente não encontrado." });
      return;
    }

    res.json(cliente.endereco);
  }
  catch (err) {
    next(err);
  }
});
// Rota para listar os pets de um cliente
router.get("/clientes/:clienteId/pets", async (req, res, next) => {
  const clienteId = req.params.clienteId;

  try {
    // Procura pelo cliente
    const cliente = await Cliente.findByPk(clienteId);

    if (!cliente) {
      return res.status(404).json({ message: "Cliente não encontrado." });
    }

    // Procura por pets associados ao cliente
    const pets = await Pet.findAll({ where: { clienteId } });

    if (!pets || pets.length === 0) {
      return res.status(404).json({ message: "Nenhum pet encontrado para o cliente." });
    }

    res.json(pets);
  }
  catch (err) {
    next(err);
  }
});


module.exports = router;
