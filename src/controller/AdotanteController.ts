import { NextFunction, Request, Response } from 'express';
import { AdotanteRepository } from '../repository/AdotanteRepository';
import { AdotanteEntity } from '../entities/AdotanteEntity';
import { PetEntity } from '../entities/PetEntity';
import { PetRepository } from '../repository/PetRepository';
import { adocaoPetsDto } from '../dto/adocaoPets.dto';
import { EnderecoDto } from '../dto/endereco.dto';

import {
  TipoRequestBodyEndereco,
  TipoRequestParamsAdotante,
  TipoRequestParamsEndereco,
  TipoResponseBodyAdotante,
  TipoResponseBodyAdotantes,
  TipoResponseBodyAdotaPet,
  TipoResponseBodyEndereco,
} from '../types/tipoAdotante';
import { AdotanteDTOFormatted } from '../dto/adotante.dto';
import { listAdotanteAbrigo } from '../utils/listAdotanteAbrigo';
import { adotanteRep } from '../constants/repository';
import { updateEndereco } from '../utils/updateEndereco';
import { IAdotanteController } from '../interface/IAdotanteController';

export class AdotanteController implements IAdotanteController {
  constructor(
    private repository: AdotanteRepository,
    private petRepository: PetRepository
  ) {}

  async listAdotante(
    req: Request<unknown, unknown, unknown>,
    res: Response<TipoResponseBodyAdotantes>,
    next: NextFunction
  ): Promise<void> {
    const listAdotante = await listAdotanteAbrigo(adotanteRep);
    res.status(200).json(listAdotante);
  }

  async adotaPet(
    req: Request<TipoRequestParamsAdotante, unknown, TipoResponseBodyAdotante>,
    res: Response<TipoResponseBodyAdotaPet>,
    next: NextFunction
  ): Promise<void> {
    const adotanteId: number = parseInt(req.params.adotanteId, 10);
    const { petIds }: adocaoPetsDto = req.body;

    const adotante: AdotanteDTOFormatted = await this.repository.findById(adotanteId);
    const result = await this.petRepository.listarPetAdocao(petIds);

    const pets: PetEntity[] = Array.isArray(result) ? result : result.pets;
    const errors: string[] = Array.isArray(result) ? [] : result.errors;
    const petsAdotados = await this.repository.adotarPet(adotante as AdotanteEntity, pets);

    if (errors.length > 0) {
      res.status(207).json({
        data: [
          {
            message:
              'Operação parcialmente bem-sucedida: alguns pets foram adotados, outros não encontrados.',
            pets: petsAdotados,
            errors: errors,
          },
        ],
      });
    } else {
      res.status(200).json({
        data: [
          {
            message: 'Pets adotados com sucesso!',
            pets: petsAdotados,
          },
        ],
      });
    }
  }

  async updateEndereco(
    req: Request<TipoRequestParamsEndereco, unknown, TipoRequestBodyEndereco>,
    res: Response<TipoResponseBodyEndereco>,
    next: NextFunction
  ): Promise<void> {
    const id: number = parseInt(req.params.id, 10);
    const endereco: EnderecoDto = req.body;
    const adotanteUpdated = await updateEndereco(id, endereco, adotanteRep);
    res.status(200).json(adotanteUpdated);
  }
}
