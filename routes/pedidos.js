const { Produto } = require("../database/produto");
const { Cliente } = require("../database/cliente");
const { Pedido, schemaPedidos, schemaPedido } = require("../database/pedido");
const customMessages = require("../joi/customMessages");

const { Router } = require("express");

const router = Router();

router.get("/pedidos", async (req, res, next) => {
    try {
        const listaPedidos = await Pedido.findAll();
        res.json(listaPedidos)
    }
    catch (err) {
        next(err);
    }
});

router.get("/pedidos/:id", async (req, res, next) => {
    try {
        const pedido = await Pedido.findByPk(req.params.id);
        res.json(pedido);
    }
    catch (err) {
        next(err);
    }
});

router.get("/pedidos/produtos/:id", async (req, res, next) => {
    try {
        const produto = await Produto.findByPk(req.params.id);
        res.json(produto);
    }
    catch (err) {
        next(err);
    }
});

router.get("/pedidos/clientes/:id", async (req, res, next) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        res.json(cliente);
    }
    catch (err) {
        next(err);
    }
});

// Post
router.post("/pedidos", async (req, res, next) => {
    try {
        const pedidos = req.body;
        const { error } = schemaPedidos.validate(pedidos, { abortEarly: false, messages: customMessages });
        if (error) return res.status(400).json(error.details.map(detalhe => detalhe.message));
        const pedidosCriados = await Pedido.bulkCreate(pedidos, { validate: true });
        res.status(201).json(pedidosCriados);
    }
    catch (err) {
        next(err);
    }
});

// Put
router.put("/pedidos/:id", async (req, res, next) => {
    try {
        const { codigo, quantidade, clienteId, produtoId } = req.body;
        const { id } = req.params;
        const { error } = schemaPedido.validate({ codigo, quantidade, clienteId, produtoId }, { abortEarly: false, messages: customMessages });
        if (error) return res.status(400).json(error.details.map(detalhe => detalhe.message));
        const pedido = await Pedido.findByPk(id);

        if (pedido) {
            await Pedido.update(
                { codigo, quantidade, clienteId, produtoId },
                { where: { id: req.params.id } }
            );
            await pedido.save();
            res.json({ message: "O pedido foi editado." });
        } else {
            res.status(404).json({ message: "Pedido não encontrado." });
        }
    }
    catch (err) {
        next(err);
    }
});

// Delete

router.delete("/pedidos/:id", async (req, res, next) => {
    try {
        const pedido = await Pedido.findByPk(req.params.id);
        if (!pedido) {
            return res.status(404).json({ message: "Pedido não encontrado" });
        }
        await pedido.destroy();
        res.json({ message: "Pedido removido." });
    }
    catch (err) {
        next(err);
    }
});

router.delete("/pedidos/clientes/:id", async (req, res, next) => {
    try {
        const pedido = await Pedido.findAll({ where: { clientesId: req.params.id } });
        if (pedido.length === 0) {
            return res.status(404).json({ message: "Pedidos não encontrados." });
        }
        await pedido.destroy({ where: { clientesId: req.params.id } });

        res.json({ message: "Pedidos removidos com sucesso." });
    }
    catch (err) {
        next(err);
    }
});

router.delete("/pedidos/produtos/:id", async (req, res, next) => {
    try {
        const pedido = await Pedido.findAll({ where: { produtosId: req.params.id } });
        if (pedido.length === 0) {
            return res.status(404).json({ message: "Pedidos não encontrados." });
        }
        await pedido.destroy({ where: { produtosId: req.params.id } });
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;