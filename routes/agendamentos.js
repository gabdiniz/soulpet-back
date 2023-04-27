const { Router } = require("express");
const Agendamento = require("../database/agendamento");


const router = Router();

router.get("/agendamentos", async (req,res) => {    
    try{
    const listaAgendamento = await Agendamento.findAll();
    res.json(listaAgendamento)
    } catch (err) {
        res.status(500).json({message:"Um erro aconteceu!"})
    }
});

router.post("/agendamentos", async (req, res) => {
    const { petId, servicoId, dataAgendada, realizada } = req.body;
    try{
        const novoAgendamento = await Agendamento.create(
            { petId, servicoId, dataAgendada, realizada }
        );
        res.status(201).json(novoAgendamento);
    } 
    catch {
        res.status(500).json({message:"Um erro aconteceu!"});
    }
});


module.exports = router;