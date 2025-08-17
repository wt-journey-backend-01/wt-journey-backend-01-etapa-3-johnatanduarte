// Importa o framework Express.
const express = require("express");
// Cria um novo objeto de roteador do Express.
const router = express.Router();

// Importa o controlador de casos.
const casosController = require("../controllers/casosController");

/**
 * Define as rotas para o recurso de Casos.
 */

// Mapeia a requisição GET para a rota '/casos' para a função getAllCasos do controlador.
router.get("/casos", casosController.getAllCasos);

// Rota para buscar um caso específico por ID.
router.get("/casos/:id", casosController.getCasoById);

// Rota para criar um novo caso.
router.post("/casos", casosController.createCaso);

// Rota para atualizar um caso por completo.
router.put("/casos/:id", casosController.updateCaso);

// Rota para atualizar um caso parcialmente.
router.patch("/casos/:id", casosController.patchCaso);

// Rota para remover um caso.
router.delete("/casos/:id", casosController.deleteCaso);

// Exporta o roteador para ser usado no arquivo principal do servidor.
module.exports = router;
