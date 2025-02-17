import bcrypt from 'bcryptjs';

export async function verificarSenha(senha: string, hash: string): Promise<boolean> {
  const isMatch = await bcrypt.compare(senha, hash);
  return isMatch;
}
