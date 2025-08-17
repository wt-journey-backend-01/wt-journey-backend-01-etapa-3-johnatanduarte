/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deleta TODOS os registros existentes nas tabelas, na ordem inversa da criação.
  await knex("casos").del();
  await knex("agentes").del();

  // Insere novos registros na tabela 'agentes'.
  // Usamos .returning('id') para obter os IDs dos agentes inseridos.
  const agentesIds = await knex("agentes")
    .insert([
      {
        nome: "Rommel Carneiro",
        dataDeIncorporacao: "1992-10-04",
        cargo: "Delegado",
      },
      { nome: "John Doe", dataDeIncorporacao: "2020-01-15", cargo: "Inspetor" },
    ])
    .returning("id");

  // Converte o array de objetos de ID para um array simples de IDs.
  const [agente1Id, agente2Id] = agentesIds.map((row) => row.id);

  // Insere novos registros na tabela 'casos', usando os IDs dos agentes.
  await knex("casos").insert([
    {
      titulo: "Homicídio no Bairro União",
      descricao:
        "Disparos foram reportados às 22:33 do dia 10/07/2007, resultando na morte da vítima.",
      status: "aberto",
      agente_id: agente1Id,
    },
    {
      titulo: "Furto de Veículo",
      descricao: "Um carro modelo sedan foi furtado na madrugada de hoje.",
      status: "aberto",
      agente_id: agente2Id,
    },
    {
      titulo: "Caso Arquivado 01",
      descricao: "Caso antigo de roubo de joias, solucionado em 2010.",
      status: "solucionado",
      agente_id: agente1Id,
    },
  ]);
};
