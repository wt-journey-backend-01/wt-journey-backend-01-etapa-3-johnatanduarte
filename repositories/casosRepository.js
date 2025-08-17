// Importa a instância do Knex configurada para o banco de dados.
const db = require("../db/db");

// Define o nome da tabela.
const TabelaCasos = "casos";

/**
 * Repositório para operações de dados dos Casos, agora usando Knex.js.
 */

// Retorna todos os casos do banco de dados.
const findAll = () => {
  return db(TabelaCasos).select("*");
};

// Encontra um caso pelo seu ID.
const findById = (id) => {
  return db(TabelaCasos).where({ id }).first();
};

// Cria um novo caso.
const create = async (casoData) => {
  const [casoCriado] = await db(TabelaCasos).insert(casoData).returning("*");
  return casoCriado;
};

// Atualiza um caso existente.
const update = async (id, casoData) => {
  const [casoAtualizado] = await db(TabelaCasos)
    .where({ id })
    .update(casoData)
    .returning("*");
  return casoAtualizado;
};

// Remove um caso do banco de dados.
const remove = (id) => {
  return db(TabelaCasos).where({ id }).del();
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
