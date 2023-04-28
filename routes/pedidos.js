const Produto = require("../database/produto");
const Cliente = require("../database/cliente");
const Pedido = require("../database/pedido");

const { Router } = require("express");

const router = Router();

router.get("/pedidos", async (req, res) => {
    try {
        const listaPedidos = await Pedido.findAll();
    res.json(listaPedidos)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu" });
    }
});

router.get("/pedidos/:id", async (req, res) => {
    try {
        const pedido = await Pedido.findByPk(req.params.id);
    res.json(pedido);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu" });
    }
});

router.get("/pedidos/produtos/:id", async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);
        res.json(produto);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu" });
    }
});

router.get("/pedidos/clientes/:id", async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        res.json(cliente);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu" });
    }
});




// Post
router.post("/pedidos", async (req, res) => {
    try {
      const pedidos = req.body;
      const pedidosCriados = await Pedido.bulkCreate(pedidos, { validate: true });
      res.status(201).json(pedidosCriados);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Um erro aconteceu" });
    }
  });
// Put

// Delete

router.delete("/pedidos/:id", async (req, res) => {
    try {
        const pedido = await Pedido.findByPk(req.params.id);
        if(!pedido){
            return res.status(404).json({ message: "Produto não encontrado" });
        }
        await pedido.destroy();
        res.json({ message: "Pedido removido." })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." })
    }
});

router.delete("/pedidos/clientes/:id", async (req, res) => {
    try {
        const pedido = await Pedido.findAll({ where: { clientesId: req.params.id } });
        if(pedido.length === 0) {
            return res.status(404).json({ message: "Pedidos não encontrados." });
        }
        await pedido.destroy({ where: { clientesId: req.params.id } });

        res.json({ message: "Pedidos removidos com sucesso." })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." })
    }
});

router.delete("/pedidos/produtos/:id", async (req, res) => {
    try {
        const pedido = await Pedido.findAll({ where: { produtosId: req.params.id } });
        if(pedido.length === 0) {
            return res.status(404).json({ message: "Pedidos não encontrados." });
        }
        await pedido.destroy({ where: { produtosId: req.params.id } });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

module.exports = router;