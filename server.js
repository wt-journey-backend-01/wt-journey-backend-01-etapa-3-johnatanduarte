// Importa o framework Express.
const express = require("express");
// Cria uma instância do aplicativo Express.
const app = express();
// Define a porta em que o servidor irá rodar.
const port = 3000;

// Importa as bibliotecas do Swagger para servir a documentação.
const swaggerUi = require("swagger-ui-express");
// Importa a configuração do Swagger que criamos.
const swaggerSpec = require("./docs/swagger");

// Importa os arquivos de rotas da aplicação.
const agentesRoutes = require("./routes/agentesRoutes");
const casosRoutes = require("./routes/casosRoutes");

// Middleware para permitir que o Express entenda requisições com corpo em JSON.
app.use(express.json());

// Rota para servir a documentação interativa do Swagger UI.
// O swaggerUi.serve prepara a interface.
// O swaggerUi.setup(swaggerSpec) usa nossa configuração para gerar a página.
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Monta as rotas de agentes e casos no caminho base '/'.
app.use(agentesRoutes);
app.use(casosRoutes);

// Inicia o servidor e o faz escutar na porta definida.
app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
  // Adiciona uma mensagem no console para facilitar o acesso à documentação.
  console.log(
    `Documentação da API disponível em http://localhost:${port}/docs`
  );
});
