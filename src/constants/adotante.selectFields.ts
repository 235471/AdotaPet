export const AdotanteFields = {
  tableName: process.env.TABELA_ADOTANTE || "adotantes", // Utilizando variável de ambiente para nome da tabela
  alias: "adotante",
  selectFields: [
    "adotante.id",
    "usuario.nome",
    "usuario.email",
    "usuario.celular",
    "adotante.endereco",
    "endereco.cidade",
    "endereco.estado",
  ],
  selectFieldsWithSenha: [
    "adotante.id",
    "usuario.nome",
    "usuario.email",
    "usuario.senha",
    "usuario.celular",
    "adotante.endereco",
    "endereco.cidade",
    "endereco.estado",
  ],
  joinRelations: [
    { relation: "adotante.pets", alias: "pet" }, // Relação com pets
    { relation: "adotante.endereco", alias: "endereco" }, // Relação com endereco
    { relation: "adotante.usuario", alias: "usuario" }, // Relação com usuario
  ],
};
