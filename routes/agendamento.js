

const { Router } = require("express");
const Agendamento = require("../database/agendamento");
const router = Router();


router.get("/agendamentos", async (req,res) => {
    const listaAgendamento = await Agendamento.findAll();
    
    try{
    res.json(listaAgendamento)
    } catch (err) {
        res.status(500).json({message:"Um erro aconteceu!"})
    }
})