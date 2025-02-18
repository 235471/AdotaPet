import { NextFunction, Request, Response } from 'express';
import { AdotanteRepository } from '../repository/AdotanteRepository';
import { AdotanteEntity } from '../entities/AdotanteEntity';
import { PetEntity } from '../entities/PetEntity';
import { PetRepository } from '../repository/PetRepository';
import { adocaoPetsDto } from '../dto/adocaoPets.dto';
import { EnderecoDto } from '../dto/endereco.dto';
import { AdotanteDTOFormatted } from '../dto/adotante.dto';

export class AdotanteController {
  constructor(
    private repository: AdotanteRepository,
    private petRepository: PetRepository
  ) {}

  async listAdotante(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const listAdotante = await this.repository.listAdotanteSemSenha();
      res.status(200).json(listAdotante);
    } catch (err) {
      next(err);
    }
  }

  async adotaPet(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const adotanteId: number = parseInt(req.params.adotanteId, 10);
      const { petIds }: adocaoPetsDto = req.body as adocaoPetsDto;

      const adotante: AdotanteDTOFormatted = await this.repository.findById(adotanteId);
      const result = await this.petRepository.listarPetAdocao(petIds);

      const pets: PetEntity[] = Array.isArray(result) ? result : result.pets;
      const errors: string[] = Array.isArray(result) ? [] : result.errors;
      const petsAdotados = await this.repository.adotarPet(
        adotante as unknown as AdotanteEntity,
        pets
      );

      if (errors.length > 0) {
        res.status(207).json({
          message:
            'Operação parcialmente bem-sucedida: alguns pets foram adotados, outros não encontrados.',
          petsAdotados: petsAdotados,
          erros: errors,
        });
      } else {
        res.status(200).json({ message: 'Pets adotados com sucesso!', petsAdotados: petsAdotados });
      }
    } catch (err) {
      console.error('Erro ao adotar pet', err);
      next(err);
    }
  }

  async deleteAdotante(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: number = parseInt(req.params.id, 10);
      await this.repository.deleteAdotante(id);
      res.status(204).json();
    } catch (err) {
      next(err);
    }
  }

  async updateEndereco(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: number = parseInt(req.params.id, 10);
      const endereco: EnderecoDto = req.body as EnderecoDto;
      const adotanteUpdated = await this.repository.updateEndereco(id, endereco);
      res.status(200).json(adotanteUpdated);
    } catch (err) {
      next(err);
    }
  }
}
