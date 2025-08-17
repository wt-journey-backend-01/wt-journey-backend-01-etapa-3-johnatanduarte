# Instruções de Configuração do Projeto

Este guia descreve os passos para configurar e rodar o ambiente de desenvolvimento.

## 1. Subir o Banco de Dados com Docker

Certifique-se de que você tem o Docker e o Docker Compose instalados em sua máquina.

1.  Navegue até a raiz do projeto pelo terminal.
2.  Execute o seguinte comando para iniciar o container do PostgreSQL em segundo plano:

    ```bash
    docker-compose up -d
    ```

3.  Para verificar se o container está rodando, use o comando:
    ```bash
    docker ps
    ```
    Você deverá ver um container com o nome `policia_db_container` na lista.

## 2. Executar Migrations

As migrations são responsáveis por criar e atualizar o esquema do seu banco de dados.

_Para executar as migrations mais recentes, rode:_

```bash
npx knex migrate:latest
```

## 3. Rodar Seeds

Os seeds são usados para popular o banco de dados com dados iniciais para teste e desenvolvimento.

_Para executar todos os arquivos de seed, rode:_

```bash
npx knex seed:run
```
