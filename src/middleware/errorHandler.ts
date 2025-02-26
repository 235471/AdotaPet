import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { CustomError } from '../error/customError';
import { QueryFailedError, EntityNotFoundError, TypeORMError } from 'typeorm';

// Error handling middleware
export const errorHandler: ErrorRequestHandler = (
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  // Log do erro para depuração
  console.error('Error details:', err);

  // Verificar se é um erro personalizado
  if (err instanceof CustomError) {
    res.status(err.code || 500).json({
      message: err.message,
      code: err.code,
      details: err.details,
    });
    return;
  }

  // Erros específicos do TypeORM
  if (err instanceof QueryFailedError) {
    // Erro de query SQL falhou
    const errorCode = extractErrorCode(err);
    res.status(400).json({
      message: 'Falha na operação de banco de dados',
      code: errorCode,
      details:
        process.env.NODE_ENV === 'development'
          ? {
              query: err.query,
              parameters: err.parameters,
              message: err.message,
              driverError: err.driverError,
            }
          : undefined,
    });
    return;
  }

  if (err instanceof EntityNotFoundError) {
    // Entidade não encontrada
    res.status(404).json({
      message: 'Recurso não encontrado',
      code: 404,
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
    return;
  }

  if (err instanceof TypeORMError) {
    // Outros erros do TypeORM
    res.status(500).json({
      message: 'Erro nas operações de banco de dados',
      code: 500,
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
    return;
  }

  // Verificar se é um erro conhecido do Node.js
  if (err instanceof Error) {
    const nodeError = err as Error & { code?: string; errno?: number };

    // Erros de rede ou sistema
    if (nodeError.code === 'ECONNREFUSED' || nodeError.code === 'ETIMEDOUT') {
      res.status(503).json({
        message: 'Serviço temporariamente indisponível',
        code: 503,
        details: process.env.NODE_ENV === 'development' ? nodeError.message : undefined,
      });
      return;
    }

    // Outros erros com mensagem
    res.status(500).json({
      message: 'Erro interno do servidor',
      code: 500,
      details: process.env.NODE_ENV === 'development' ? nodeError.message : undefined,
    });
    return;
  }

  // Para erros completamente desconhecidos
  res.status(500).json({
    message: 'Erro interno não identificado',
    code: 500,
    details: process.env.NODE_ENV === 'development' ? String(err) : undefined,
  });
};

// Função auxiliar para extrair códigos de erro de diferentes drivers
function extractErrorCode(err: QueryFailedError): number {
  if ('code' in err.driverError) {
    const driverError = err.driverError as { code: string | number };
    if (typeof driverError.code === 'number') {
      return driverError.code;
    }
    if (driverError.code === 'ER_DUP_ENTRY') return 409; // Conflito
    if (driverError.code === 'ER_NO_REFERENCED_ROW') return 400; // Referência inválida
    
    // Adicionando lógica para SQLite
    if (driverError.code === 'SQLITE_CONSTRAINT') return 400; // Violação de restrição (ex: chave única)
    if (driverError.code === 'SQLITE_BUSY') return 503; // Banco de dados ocupado
    if (driverError.code === 'SQLITE_ERROR') return 400; // Erro genérico de SQL
  }
  if ('errno' in err.driverError) {
    const driverError = err.driverError as { errno: number };
    if (driverError.errno === 1062) return 409; // MySQL duplicate entry
    if (driverError.errno === 1452) return 400; // MySQL foreign key constraint fails
  }
  return 400; // Default bad request
}
