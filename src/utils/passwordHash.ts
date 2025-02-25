import bcrypt from "bcryptjs";

export async function criarHashSenha(senha: string): Promise<string> {
  const saltRounds = 10; // Número de rounds de sal, geralmente 10 é suficiente
  const hash = await bcrypt.hash(senha, saltRounds);
  return hash;
}
