// Importa o framework Express.
const express = require("express");
// Cria um novo objeto de roteador do Express.
const router = express.Router();

// Importa o controlador de agentes.
const agentesController = require("../controllers/agentesController");

/**
 * Define as rotas para o recurso de Agentes.
 * A responsabilidade dele é mapear uma URL e um método HTTP (GET, POST, etc.)
 * para uma função específica do controlador.
 */

// Rota para listar todos os agentes.
router.get("/agentes", agentesController.getAllAgentes);

// Rota para buscar um agente por ID.
router.get("/agentes/:id", agentesController.getAgenteById);

// Rota para criar um novo agente.
router.post("/agentes", agentesController.createAgente);

// Rota para atualizar um agente existente.
router.put("/agentes/:id", agentesController.updateAgente);

// Rota para atualizar parcialmente um agente.
router.patch("/agentes/:id", agentesController.patchAgente);

// Rota para remover um agente.
router.delete("/agentes/:id", agentesController.deleteAgente);

// Exporta o roteador para ser usado no arquivo principal do servidor.
module.exports = router;
