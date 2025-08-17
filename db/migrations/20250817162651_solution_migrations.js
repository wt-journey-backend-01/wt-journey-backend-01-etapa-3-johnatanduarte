/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  // A função 'up' é executada quando aplicamos a migration.
  // Ela é responsável por criar as tabelas e fazer alterações no esquema do banco.
  return knex.schema
    .createTable("agentes", function (table) {
      // Cria a tabela 'agentes'.
      table.increments("id").primary(); // Chave primária auto-incrementável 'id'.
      table.string("nome", 255).notNullable(); // Coluna 'nome', não pode ser nula.
      table.date("dataDeIncorporacao").notNullable(); // Coluna 'dataDeIncorporacao'.
      table.string("cargo", 255).notNullable(); // Coluna 'cargo'.
    })
    .createTable("casos", function (table) {
      // Cria a tabela 'casos'.
      table.increments("id").primary(); // Chave primária auto-incrementável 'id'.
      table.string("titulo", 255).notNullable();
      table.text("descricao").notNullable(); // 'text' para descrições mais longas.
      table.string("status", 100).notNullable(); // 'aberto' ou 'solucionado'.

      // Chave estrangeira para a tabela 'agentes'.
      table
        .integer("agente_id")
        .unsigned() // Garante que o número seja positivo.
        .references("id") // Refere-se à coluna 'id'.
        .inTable("agentes") // Na tabela 'agentes'.
        .onDelete("SET NULL"); // Se um agente for deletado, o campo fica nulo.
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  // A função 'down' é executada quando revertemos a migration.
  // Ela deve desfazer o que a função 'up' fez, na ordem inversa.
  return knex.schema
    .dropTable("casos") // Primeiro deleta a tabela 'casos' por causa da chave estrangeira.
    .dropTable("agentes"); // Depois deleta a tabela 'agentes'.
};
