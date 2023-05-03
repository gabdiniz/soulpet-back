const { Router } = require("express");
const { Agendamento, schemaAgendamento } = require("../database/agendamento");
const customMessages = require("../joi/customMessages");

const router = Router();

router.get("/agendamentos", async (req, res) => {
    try {
        const listaAgendamento = await Agendamento.findAll();
        res.json(listaAgendamento)
    } catch (err) {
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

router.get("/agendamentos/:id", async (req, res) => {
    try {
        const agendamento = await Agendamento.findByPk(req.params.id);
        if (agendamento) {
            res.json(agendamento)
        }
        else {
            res.status(404).json({ message: "Agendamentos não encontrado." });
        }
    }
    catch (e) {
        res.status(500).json({ message: "Um erro aconteceu." });
    }
})


router.post("/agendamentos", async (req, res) => {
    try {
        const { petId, servicoId, dataAgendada, realizada } = req.body;
        const { error } = schemaAgendamento.validate({ petId, servicoId, dataAgendada, realizada }, { abortEarly: false, messages: customMessages });
        if (error) return res.status(400).json(error.details.map(detalhe => detalhe.message));
        const novoAgendamento = await Agendamento.create(
            { petId, servicoId, dataAgendada, realizada }
        );
        res.status(201).json(novoAgendamento);
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

router.put("/agendamentos/:id", async (req, res) => {
    try {
        const { petId, servicoId, dataAgendada, realizada } = req.body;
        const agendamento = await Agendamento.findByPk(req.params.id);
        const { error } = schemaAgendamento.validate({ petId, servicoId, dataAgendada, realizada }, { abortEarly: false, messages: customMessages });
        if (error) return res.status(400).json(error.details.map(detalhe => detalhe.message));
        if (agendamento) {
            await agendamento.update({ petId, servicoId, dataAgendada, realizada });
            res.status(200).json({ message: "Agendamento editado." });
        } else {
            res.status(404).json({ message: "Agendamento não encontrado." });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Um erro aconteceu." });
    }
})

router.delete("/agendamentos/all", async (req, res) => {
    try {
        await Agendamento.destroy({ where: {} });
        res.json({ message: "Todos os Agendamentos foram deletados." })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." })
    }
})

router.delete("/agendamentos/:id", async (req, res) => {
    const agendamento = await Agendamento.findOne({ where: { id: req.params.id } });
    try {
        if (agendamento) {
            await Agendamento.destroy({ where: { id: req.params.id } })
            res.json({ message: "Agendamento deletado com sucesso." })
        } else {
            res.status(404).json({ message: "Agendamento não encontrado." })
        }
    } catch (err) {
        res.status(500).json({ message: "Um erro aconteceu." })
    }
})


module.exports = router;