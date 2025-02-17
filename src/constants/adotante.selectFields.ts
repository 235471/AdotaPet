export const AdotanteFields = {
  tableName: process.env.TABELA_ADOTANTE || 'adotantes', // Utilizando variável de ambiente para nome da tabela
  alias: 'adotante',
  selectFields: [
    'adotante.id',
    'adotante.nome',
    'adotante.email',
    'adotante.celular',
    'adotante.endereco',
    'endereco.cidade',
    'endereco.estado',
  ],
  selectFieldsWithSenha: [
    'adotante.id',
    'adotante.nome',
    'adotante.email',
    'adotante.senha',
    'adotante.celular',
    'adotante.endereco',
    'endereco.cidade',
    'endereco.estado',
  ],
  joinRelations: [
    { relation: 'adotante.pets', alias: 'pet' }, // Relação com pets
    { relation: 'adotante.endereco', alias: 'endereco' } // Relação com endereco
  ],
};