const agentesRepository = require("../repositories/agentesRepository");
const { z } = require("zod");

// (O schema do Zod continua o mesmo)
const agenteSchema = z.object({
  nome: z.string({ required_error: "O campo 'nome' é obrigatório." }),
  dataDeIncorporacao: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "O formato da data deve ser YYYY-MM-DD.",
    }),
  cargo: z.string({ required_error: "O campo 'cargo' é obrigatório." }),
});

// Todas as funções do controlador agora são 'async' para usar 'await'.
const getAllAgentes = async (req, res) => {
  try {
    const todosAgentes = await agentesRepository.findAll();
    res.status(200).json(todosAgentes);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar agentes." });
  }
};

const getAgenteById = async (req, res) => {
  try {
    const id = req.params.id;
    const agente = await agentesRepository.findById(id);
    if (agente) {
      res.status(200).json(agente);
    } else {
      res.status(404).json({ message: "Agente não encontrado." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar agente." });
  }
};

const createAgente = async (req, res) => {
  try {
    const novoAgenteData = agenteSchema.parse(req.body);
    const agenteCriado = await agentesRepository.create(novoAgenteData);
    res.status(201).json(agenteCriado);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Dados inválidos.", errors: error.errors });
    }
    res.status(500).json({ message: "Erro ao criar agente." });
  }
};

const updateAgente = async (req, res) => {
  try {
    if (req.body.id) {
      return res.status(400).json({ message: "Não é permitido alterar o ID." });
    }
    const agenteData = agenteSchema.parse(req.body);
    const id = req.params.id;
    const agenteAtualizado = await agentesRepository.update(id, agenteData);
    if (agenteAtualizado) {
      res.status(200).json(agenteAtualizado);
    } else {
      res.status(404).json({ message: "Agente não encontrado." });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Dados inválidos.", errors: error.errors });
    }
    res.status(500).json({ message: "Erro ao atualizar agente." });
  }
};

const patchAgente = async (req, res) => {
  try {
    if (req.body.id) {
      return res.status(400).json({ message: "Não é permitido alterar o ID." });
    }
    const agenteData = agenteSchema.partial().parse(req.body);
    const id = req.params.id;
    const agenteAtualizado = await agentesRepository.update(id, agenteData);
    if (agenteAtualizado) {
      res.status(200).json(agenteAtualizado);
    } else {
      res.status(404).json({ message: "Agente não encontrado." });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Dados inválidos.", errors: error.errors });
    }
    res.status(500).json({ message: "Erro ao atualizar agente." });
  }
};

const deleteAgente = async (req, res) => {
  try {
    const id = req.params.id;
    const sucesso = await agentesRepository.remove(id);
    if (sucesso) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Agente não encontrado." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar agente." });
  }
};

module.exports = {
  getAllAgentes,
  getAgenteById,
  createAgente,
  updateAgente,
  patchAgente,
  deleteAgente,
};
