const casosRepository = require("../repositories/casosRepository");
const { z } = require("zod");

// (O schema do Zod continua o mesmo)
const casoSchema = z.object({
  titulo: z.string(),
  descricao: z.string(),
  status: z.enum(["aberto", "solucionado"]),
  agente_id: z.number().int().positive(),
});

const getAllCasos = async (req, res) => {
  try {
    const todosCasos = await casosRepository.findAll();
    res.status(200).json(todosCasos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar casos." });
  }
};

const getCasoById = async (req, res) => {
  try {
    const id = req.params.id;
    const caso = await casosRepository.findById(id);
    if (caso) {
      res.status(200).json(caso);
    } else {
      res.status(404).json({ message: "Caso não encontrado." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar caso." });
  }
};

const createCaso = async (req, res) => {
  try {
    const novoCasoData = casoSchema.parse(req.body);
    const casoCriado = await casosRepository.create(novoCasoData);
    res.status(201).json(casoCriado);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Dados inválidos.", errors: error.errors });
    }
    res.status(500).json({ message: "Erro ao criar caso." });
  }
};

const updateCaso = async (req, res) => {
  try {
    if (req.body.id) {
      return res.status(400).json({ message: "Não é permitido alterar o ID." });
    }
    const casoData = casoSchema.parse(req.body);
    const id = req.params.id;
    const casoAtualizado = await casosRepository.update(id, casoData);
    if (casoAtualizado) {
      res.status(200).json(casoAtualizado);
    } else {
      res.status(404).json({ message: "Caso não encontrado." });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Dados inválidos.", errors: error.errors });
    }
    res.status(500).json({ message: "Erro ao atualizar caso." });
  }
};

const patchCaso = async (req, res) => {
  try {
    if (req.body.id) {
      return res.status(400).json({ message: "Não é permitido alterar o ID." });
    }
    const casoData = casoSchema.partial().parse(req.body);
    const id = req.params.id;
    const casoAtualizado = await casosRepository.update(id, casoData);
    if (casoAtualizado) {
      res.status(200).json(casoAtualizado);
    } else {
      res.status(404).json({ message: "Caso não encontrado." });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Dados inválidos.", errors: error.errors });
    }
    res.status(500).json({ message: "Erro ao atualizar caso." });
  }
};

const deleteCaso = async (req, res) => {
  try {
    const id = req.params.id;
    const sucesso = await casosRepository.remove(id);
    if (sucesso) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Caso não encontrado." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar caso." });
  }
};

module.exports = {
  getAllCasos,
  getCasoById,
  createCaso,
  updateCaso,
  patchCaso,
  deleteCaso,
};
