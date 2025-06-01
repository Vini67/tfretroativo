API RESTful de Cadastro de Clientes
Descrição
API simples para cadastro e consulta de clientes, com filtros por nome, cidade e UF. Desenvolvida com Node.js, Express e MySQL.

Tecnologias Utilizadas
Node.js (LTS)

Express.js

MySQL

Sequelize (se quiser usar ORM, senão mysql2)

Jest e Supertest para testes

dotenv para variáveis de ambiente

Pré-requisitos
Node.js instalado (https://nodejs.org/)

npm instalado (vem com Node.js) ou yarn

MySQL instalado e em execução

Instalação
bash
Copiar
git clone <URL_DO_REPOSITORIO>
cd <nome_do_repositorio>
npm install
Configuração do Banco de Dados
Crie o banco de dados no MySQL (pode usar linha de comando ou Workbench):

sql
Copiar
CREATE DATABASE tfretro;
Crie um arquivo .env na raiz do projeto com as seguintes variáveis (exemplo):

ini
Copiar
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=adimin
DB_NAME=tfretro
DB_PORT=3306
Ajuste seu arquivo index.js para usar essas variáveis (já preparado no código).

(Opcional) Execute scripts DDL para criar tabelas se necessário.

Como Executar a API
Para iniciar o servidor:

bash
Copiar
npm start
A API estará rodando em: http://localhost:3000

Documentação das Rotas
GET /clientes
Descrição: Retorna lista de clientes com filtros opcionais.

Query Parameters (opcionais):

nome: filtra clientes cujo nome contenha o valor.

cidade: filtra clientes cuja cidade contenha o valor.

uf: filtra clientes pelo estado (UF) exato.

Exemplo de requisição:

bash
curl "http://localhost:3000/clientes?nome=joao&uf=SP"
Resposta de sucesso (200):

json
Copiar
[
  {
    "id": 1,
    "nome": "João Silva",
    "cidade": "São Paulo",
    "uf": "SP"
  }
]
(Outras rotas - adapte conforme o que você criou)
Exemplo para POST /clientes

POST /clientes

Corpo da requisição (JSON):

json
Copiar
{
  "nome": "Maria",
  "cidade": "Rio de Janeiro",
  "uf": "RJ"
}
Resposta de sucesso (201):

json

{
  "message": "Cliente criado com sucesso",
  "clienteId": 2
}
Como Utilizar a API
Utilize ferramentas como Postman, Insomnia, ou curl para testar e consumir a API.

Para buscar clientes, use GET com filtros.

Para criar, atualizar ou deletar clientes, utilize os métodos POST, PUT e DELETE, respectivamente, com os endpoints correspondentes.

Observações
O projeto está configurado para conectar ao MySQL via variáveis de ambiente.

Inclui testes básicos com Jest e Supertest para garantir o funcionamento da rota GET /clientes.

Melhorias futuras podem incluir autenticação, paginação e validação avançada.

