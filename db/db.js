// Importa o arquivo de configuração do Knex.
const knexConfig = require("../knexfile");
// Importa a biblioteca Knex.
const knex = require("knex");

// Determina o ambiente atual (development por padrão).
const nodeEnv = process.env.NODE_ENV || "development";
// Seleciona a configuração correta do knexfile com base no ambiente.
const config = knexConfig[nodeEnv];

// Cria e exporta a instância do Knex, que será usada para fazer queries.
const db = knex(config);

module.exports = db;
