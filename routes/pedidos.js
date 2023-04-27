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


module.exports = router;