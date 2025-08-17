// Importa a instância do Knex configurada para o banco de dados.
const db = require("../db/db");

// Define o nome da tabela para evitar repetição de strings.
const TabelaAgentes = "agentes";

/**
 * Repositório para operações de dados dos Agentes, agora usando Knex.js.
 */

// Retorna todos os agentes do banco de dados.
const findAll = () => {
  return db(TabelaAgentes).select("*");
};

// Encontra um agente pelo seu ID.
const findById = (id) => {
  // .where({ id }) é um atalho para .where('id', '=', id)
  // .first() retorna o primeiro resultado encontrado, ou undefined.
  return db(TabelaAgentes).where({ id }).first();
};

// Cria um novo agente.
const create = async (agenteData) => {
  // .insert() insere os dados e .returning('*') retorna todos os campos do registro inserido.
  const [agenteCriado] = await db(TabelaAgentes)
    .insert(agenteData)
    .returning("*");
  return agenteCriado;
};

// Atualiza um agente existente.
const update = async (id, agenteData) => {
  const [agenteAtualizado] = await db(TabelaAgentes)
    .where({ id })
    .update(agenteData)
    .returning("*");
  return agenteAtualizado;
};

// Remove um agente do banco de dados.
const remove = (id) => {
  // .del() ou .delete() remove o registro.
  return db(TabelaAgentes).where({ id }).del();
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
