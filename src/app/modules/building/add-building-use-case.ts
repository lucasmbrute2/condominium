import { BuildingRepository } from '@/src/domain/protocols'
import { AppError } from '@/src/errors/global-error'

interface AddBuildingProps {
  buildingNumber: number
}

export class AddBuilding {
  constructor(private readonly buildingRepository: BuildingRepository) {}
  async execute({ buildingNumber }: AddBuildingProps) {
    const building = await this.buildingRepository.findByNumber(buildingNumber)
    if (building) throw new AppError('Building already exists', 409)
  }
}
