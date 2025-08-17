/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deleta TODOS os registros existentes na tabela 'casos'.
  await knex("casos").del();

  // Insere os registros iniciais de casos, referenciando os IDs dos agentes.
  await knex("casos").insert([
    {
      titulo: "Homicídio no Bairro União",
      descricao:
        "Disparos foram reportados às 22:33 do dia 10/07/2007, resultando na morte da vítima.",
      status: "aberto",
      agente_id: 1, // ID do Delegado Rommel Carneiro
    },
    {
      titulo: "Furto de Veículo",
      descricao: "Um carro modelo sedan foi furtado na madrugada de hoje.",
      status: "aberto",
      agente_id: 2, // ID do Inspetor John Doe
    },
    {
      titulo: "Caso Arquivado 01",
      descricao: "Caso antigo de roubo de joias, solucionado em 2010.",
      status: "solucionado",
      agente_id: 1, // ID do Delegado Rommel Carneiro
    },
  ]);
};
