# AdotaPet API

AdotaPet API é uma aplicação backend desenvolvida em TypeScript que utiliza Express, TypeORM e JWT para gerenciar usuários, adotantes, pets e seus relacionamentos. O projeto adota uma arquitetura organizada e escalável, utilizando conceitos como Entities, DTOs, Enums, Interfaces, Middlewares e tipagens personalizadas.

## Tecnologias Utilizadas

- **TypeScript** – Linguagem com tipagem estática para maior robustez e manutenção.
- **Express** – Framework web minimalista para criação de APIs REST.
- **TypeORM** – ORM para interação com o banco de dados via Entities.
- **SQLite** – Banco de dados utilizado para persistência dos dados.
- **JWT (JSON Web Token)** – Autenticação e autorização via tokens.
- **Class-Validator & Class-Transformer** – Validação e transformação de dados através de DTOs.
- **Middlewares** – Tratamento de erros, autenticação e validação das requisições.
- **Enums e Interfaces** – Padronização de valores e definição de contratos do sistema.
- **Tipagens Personalizadas** – Extensão do objeto Request do Express para incluir informações do token JWT.

## Estrutura do Projeto

A estrutura do diretório `src` é organizada da seguinte forma:

```
src/
├── config           # Configurações gerais da aplicação (ex.: conexão com o banco de dados)
├── constants        # Constantes utilizadas em diversas partes do projeto
├── controller       # Controllers que gerenciam a lógica de negócio e as rotas
├── db               # Arquivos relacionados ao banco de dados
├── dto              # Data Transfer Objects para validação e transferência de dados
├── entities         # Entidades do TypeORM que mapeiam as tabelas do banco de dados
├── enum             # Enumerações para padronização de valores (ex.: Especie, Porte)
├── error            # Tratamento e definição de erros customizados
├── interface        # Interfaces que definem contratos para controllers, etc.
├── middleware       # Middlewares para autenticação, validação e tratamento de erros
├── repository       # Repositórios para acesso e manipulação dos dados
│   └── interfaces   # Interfaces específicas dos repositórios
├── routes           # Definição das rotas da API
├── types            # Tipagens personalizadas (ex.: extensão do Express Request para JWT)
└── utils            # Funções utilitárias (ex.: hashing de senhas, validação de dados)
```

## Configuração e Execução

### Pré-requisitos

- Node.js (versão 12 ou superior)
- npm ou yarn

### Passos para Rodar o Projeto

1. **Clone o Repositório**

   ```bash
   git clone https://github.com/235471/TypeScript-TypeORM.git
   cd TypeScript-TypeORM
   ```

2. **Instale as Dependências**

   ```bash
   npm install
   ```

3. **Configuração do Ambiente**

   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   ```env
   PORT=sua_porta
   TABELA_ADOTANTE=nome_tabela
   JWT_SECRET_KEY=your_secret_key
   USUARIO_ALIAS=usuario
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

## Documentação da API

A documentação interativa da API (Swagger/OpenAPI) foi gerada automaticamente e pode ser acessada na rota:

```
http://localhost:3000/api-docs
```

Esta documentação inclui todos os endpoints, parâmetros e modelos utilizados na API.

## Extensão dos Tipos do Express

Para permitir que o token JWT seja propagado em todas as requisições, o objeto `Request` do Express foi estendido com tipagens personalizadas. Veja o exemplo abaixo:

```typescript
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userEmail?: string;
    }
  }
}
```

Esta configuração possibilita que, após a autenticação, as informações do usuário sejam acessadas facilmente em qualquer rota.
