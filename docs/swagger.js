// Importa a biblioteca swagger-jsdoc.
const swaggerJSDoc = require("swagger-jsdoc");

// Define as opções de configuração para o swagger-jsdoc.
const swaggerOptions = {
  // Define a estrutura básica do documento OpenAPI.
  definition: {
    openapi: "3.0.0", // Especifica a versão do OpenAPI.
    info: {
      title: "API do Departamento de Polícia", // Título da API.
      version: "1.0.0", // Versão da API.
      description:
        "API RESTful para gerenciamento de casos e agentes policiais.", // Descrição da API.
    },
    // Define os servidores onde a API está hospedada.
    servers: [
      {
        url: "http://localhost:3000", // URL do servidor de desenvolvimento.
        description: "Servidor de Desenvolvimento",
      },
    ],
    // Define as tags globais da API.
    tags: [
      {
        name: "Agentes",
        description: "API para gerenciamento de agentes",
      },
      {
        name: "Casos",
        description: "API para gerenciamento de casos policiais",
      },
    ],
  },
  // Especifica os arquivos que contêm os comentários de documentação da API.
  apis: ["./routes/*.js"], // Caminho para os arquivos de rotas.
};

// Gera a especificação OpenAPI com base nas opções definidas.
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Exporta a especificação gerada para ser usada em outros arquivos.
module.exports = swaggerSpec;
