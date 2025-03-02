# AdotaPet API

AdotaPet API é uma aplicação backend robusta desenvolvida em TypeScript que utiliza Express, TypeORM e JWT para gerenciar usuários (abrigos e adotantes), pets e processos de adoção. O projeto adota uma arquitetura organizada e escalável, utilizando conceitos como Entities, DTOs, Enums, Interfaces, Middlewares e tipagens personalizadas.

## 🚀 Tecnologias Utilizadas

- **TypeScript** – Linguagem com tipagem estática para maior robustez e manutenção
- **Express** – Framework web minimalista para criação de APIs REST
- **TypeORM** – ORM para interação com o banco de dados via Entities
- **SQLite/MySQL** – Bancos de dados utilizados para persistência dos dados
- **JWT (JSON Web Token)** – Autenticação e autorização via tokens
- **Class-Validator & Class-Transformer** – Validação e transformação de dados através de DTOs
- **express-async-errors** – Eliminação de blocos try/catch desnecessários
- **Middlewares Personalizados** – Tratamento de erros, autenticação , validação das requisições e queries
- **Enums e Interfaces** – Padronização de valores e definição de contratos do sistema
- **Tipagens Personalizadas** – Extensão do objeto Request do Express para incluir informações do token JWT
- **Decorators Customizados** – Validação de celular e senha via DTOs

## 📁 Estrutura do Projeto

A estrutura atual do diretório `src` está organizada da seguinte forma:

```
src/
├── config           # Configurações gerais da aplicação (ex.: conexão com o banco de dados)
├── constants        # Constantes utilizadas em diversas partes do projeto
├── controller       # Controllers que gerenciam a lógica de negócio e as rotas
├── decorators       # Decorators customizados para validação
├── dto              # Data Transfer Objects para validação e transferência de dados
├── entities         # Entidades do TypeORM que mapeiam as tabelas do banco de dados
├── enum             # Enumerações para padronização de valores (ex.: Especie, Porte, etc)
├── error            # Tratamento e definição de erros customizados
├── interface        # Interfaces que definem contratos para controllers, etc.
├── middleware       # Middlewares para autenticação, validação e tratamento de erros
├── migrations       # Migrações do banco de dados
├── repository       # Repositórios para acesso e manipulação dos dados
│   └── interfaces   # Interfaces específicas dos repositórios
├── routes           # Definição das rotas da API
├── types            # Tipagens personalizadas (ex.: extensão do Express Request para JWT)
└── utils            # Funções utilitárias (ex.: hashing de senhas, validação de dados)
```

## ✨ Melhorias Recentes

- **Tratamento de Erros Aprimorado**:

  - Middleware de erros melhorado para capturar erros do SQLite, MySQL e TypeORM
  - Detalhes sensíveis dos erros exibidos apenas em ambiente de desenvolvimento

- **Validações Customizadas**:

  - Decorators personalizados para validação de celular e senha via DTOs
  - Hooks beforeInsert para criptografia de senha
  - Middleware de validação utilizando overloads com union types discriminados

- **Melhorias de Performance**:

  - Suporte a busca por queryParams aceitando arrays de valores
  - Otimização das consultas SQL geradas pelo repositório
  - Eliminação de blocos try/catch desnecessários com express-async-errors

- **Tipagem Melhorada**:
  - Aprimoramento na tipagem de objetos request (params, query e body) e response body
  - Middleware para validar QueryParams que são Enums

## 🔧 Configuração e Execução

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Passos para Rodar o Projeto

1. **Clone o Repositório**

   ```bash
   git clone https://github.com/seu-usuario/adotapet-api.git
   cd adotapet-api
   ```

2. **Instale as Dependências**

   ```bash
   npm install
   ```

3. **Configuração do Ambiente**

   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   ```env
   PORT=3000
   TABELA_ADOTANTE=adotante
   JWT_SECRET_KEY=seu_segredo_jwt
   USUARIO_ALIAS=usuario
   NODE_ENV=development
   ```

   Ajuste os valores conforme necessário para o seu ambiente.

4. **Compilar o Projeto**

   ```bash
   npm run build
   ```

5. **Executar a Aplicação**

   ```bash
   npm start
   ```

   A API estará disponível em [http://localhost:3000](http://localhost:3000).

## 📚 Documentação da API

A documentação interativa da API (OpenAPI/Swagger) está disponível na rota:

```
http://localhost:3000/api-docs
```

Esta documentação inclui todos os endpoints, parâmetros, modelos e exemplos de requisições.

### Endpoints Principais

A API oferece os seguintes endpoints principais:

- **Autenticação**: `/usuarios/login`
- **Usuários**: `/usuarios/adotante`, `/usuarios/abrigo`, `/usuarios/{id}`
- **Adotantes**: `/adotantes`, `/adotantes/{id}`, `/adotantes/{adotanteId}/pets`
- **Abrigos**: `/abrigos`, `/abrigos/{id}`, `/abrigos/{id}/pets`
- **Pets**: `/pets`, `/pets/search`, `/pets/{id}`

Para mais detalhes, consulte a documentação completa da API.

## 🔐 Autenticação e Autorização

O sistema utiliza JWT para autenticação e controle de acesso. Após o login, o token recebido deve ser incluído no header `Authorization` como Bearer token em todas as requisições protegidas.

Para permitir que o token JWT seja propagado em todas as requisições, o objeto `Request` do Express foi estendido com tipagens personalizadas:

```typescript
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userEmail?: string;
    }
  }
}
```
