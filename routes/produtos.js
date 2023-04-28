const { Router } = require("express");
const { Op } = require("sequelize");
const Produto = require("../database/produto");
const { toDate } = require("date-fns-tz")

const router = Router();

router.get("/produtos", async (req, res) => {

    const { nome, preco, descricao, desconto, dataDesconto, categoria } = req.query;
    const where = {};

    if (nome) where.nome = { [Op.like]: `%${nome}` };
    if (preco) where.preco = preco;
    if (descricao) where.descricao = descricao;
    if (desconto) where.desconto = desconto;
    if (dataDesconto) where.dataDesconto = dataDesconto;
    if (categoria) where.categoria = categoria;

    try {
        const listaProdutos = await Produto.findAll({ where });
        res.json(listaProdutos);
    } catch (error) {
        res.status(500).json({ message: "Um erro aconteceu!" })
    }
});

router.get("/produtos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await Produto.findByPk(id);
        if (produto) {
            res.json(produto);
        } else {
            res.status(404).json({ message: "Produto não encontrado" })
        }
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

router.post("/produtos", async (req, res) => {

    const { nome, preco, descricao, desconto, dataDesconto, categoria } = req.body;
    const data = toDate(dataDesconto, 'yyyy-MM-dd', { timeZone: 'America/Sao_Paulo' });
    const dataAtual = toDate(new Date(), { timeZone: 'America/Sao_Paulo' });
    dataAtual.setHours(0, 0, 0, 0);

    if (categoria !== "higiene" && categoria !== "brinquedos" && categoria !== "conforto") {
        return res.status(400).json({ message: "Adicione uma categoria válida: higiene, brinquedos ou conforto." });
    }
    if (data < dataAtual) {
        return res.status(400).json({ message: "A data não pode ser anterior a data atual." });
    }
    if (desconto < 0 || desconto > 100) {
        return res.status(400).json({ message: "Aplique um desconto de 0 a 100%." });
    }
    try {
        const novo = await Produto.create(
            { nome, preco, descricao, desconto, dataDesconto, categoria },
        );
        res.status(201).json(novo);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

router.delete("/produtos/all", async (req, res) => {
    try {
        await Produto.destroy({ where: {} });
        res.json({ message: "Todos os produtos foram deletados!" })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu!" })
    }
});


router.delete("/produtos/:id", async (req, res) => {
    const produto = await Produto.findByPk(req.params.id);
    try {
        if (produto) {
            await Produto.destroy({ where: { id: req.params.id } })
            res.json({ message: "Produto removido com sucesso!" })
        } else {
            res.status(404).json({ message: "Produto não encontrado!" })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu!" });
    }
});

router.put("/produtos/:id", async (req, res) => {

    const { nome, preco, descricao, desconto, dataDesconto, categoria } = req.body;
    const { id } = req.params;

    try {
        const produto = await Produto.findOne({ where: { id } });
        const data = toDate(dataDesconto, 'yyyy-MM-dd', { timeZone: 'America/Sao_Paulo' });
        const dataAtual = toDate(new Date(), { timeZone: 'America/Sao_Paulo' });
        dataAtual.setHours(0, 0, 0, 0);

        if (produto) {
            if (categoria === "higiene" || categoria === "brinquedos" || categoria === "conforto") {

            } else {
                return res.status(400).json({ message: "Adicione uma categoria válida: higiene, brinquedos ou conforto." });
            }
            if (data < dataAtual || data > dataDesconto) {
                return res.status(400).json({ message: "A data não pode ser anterior a data atual." });
            }
            if (desconto < 0 || desconto > 100) {
                return res.status(400).json({ message: "Aplique um desconto de 0 a 100% ." });
            }
            await Produto.update(
                { nome, preco, descricao, desconto, dataDesconto, categoria },
                { where: { id: req.params.id } }
            );
            res.json({ message: "O produto foi editado." });
        } else {
            res.status(404).json({ message: "Produto não encontrado." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

module.exports = router;