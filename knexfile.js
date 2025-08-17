// Carrega as variáveis de ambiente do arquivo .env
require("dotenv").config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  // Configuração para o ambiente de desenvolvimento
  development: {
    client: "pg", // Especifica o cliente de banco de dados (PostgreSQL)
    connection: {
      host: "127.0.0.1", // Endereço do banco de dados (localhost)
      port: 5432, // Porta do PostgreSQL
      user: process.env.POSTGRES_USER, // Usuário do banco (do .env)
      password: process.env.POSTGRES_PASSWORD, // Senha do banco
      database: process.env.POSTGRES_DB, // Nome do banco
    },
    migrations: {
      directory: "./db/migrations", // Pasta onde as migrations serão criadas
    },
    seeds: {
      directory: "./db/seeds", // Pasta onde os seeds serão criados
    },
  },
  // Configuração para ambiente de Integração Contínua (CI)
  ci: {
    client: "pg",
    connection: {
      host: "postgres", // Em CI, o host é o nome do serviço do Docker
      port: 5432,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};
