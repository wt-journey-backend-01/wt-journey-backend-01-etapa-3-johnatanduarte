/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deleta TODOS os registros existentes na tabela 'agentes'.
  await knex("agentes").del();

  // Insere os registros iniciais de agentes.
  await knex("agentes").insert([
    {
      id: 1,
      nome: "Rommel Carneiro",
      dataDeIncorporacao: "1992-10-04",
      cargo: "Delegado",
    },
    {
      id: 2,
      nome: "John Doe",
      dataDeIncorporacao: "2020-01-15",
      cargo: "Inspetor",
    },
  ]);
};
