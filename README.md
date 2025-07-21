# Teste NestJs

## Pré-requisitos

Antes de rodar o back-end, instale:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)

## Configuração Inicial

1. Clone o repositório
2. Copie o arquivo `.env.example` para `.env` e configure as variáveis conforme necessário.
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Construa o container do Docker:
   ```bash
   docker-compose up
   ```
4. Em outro terminal execute as migrations e atualizações necessárias:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```
   
A API pode ser executada localmente:

```bash
npm run start:dev
```

Acesse os endpoints e a documentação Swagger em:
```
http://localhost:3000/swagger
```

## Documentação e Informações Adicionais (Explicando minha linha de pensamento)
- **NestJS** (Optei por ter maior conhecimento visando produtividade)
- **Swagger** (Documentei com Swagger em arquivos .yaml para facilitar manutenção na documentação dividindo em arquivos únicos e evitar poluir o código com annotations do swagger)
- **Joi** (Optei por Joi para validações por ter maior conhecimento)
- **PostgreSQL** (Optei por um banco de dados relacional)
- **Prisma** (Por ter optado pelo Postgre considerei utilizar Prisma como ORM para facilitar Queries e pelo suporte que o Prisma tem para o Postgre)
- **EsLint** (Configurei EsLint para desativar exigências de prefixo em interfaces, tipo explícito em funções e módulos, proibir o uso de any exigindo tipos mais específicos e desativei verificação de estilo de quebra de linha)
- **Jest** (Por não ter muito conhecimento com testes unitários, parte que ando mais focado em aprender, contei com auxílio do copilot para entender como poderia criar com boas práticas testes unitários)
- **Arquitetura** (Utilizei de uma arquitetura muito comum dividindo em pastas com Dto, Service, Controller e Module. Para facilitar tanto manutenção quanto escalabilidade)
