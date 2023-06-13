import { Building } from '@/src/domain/entities/building'
import { BuildingRepository } from '@/src/domain/protocols'
import { AppError } from '@/src/errors/global-error'

interface AddBuildingProps {
  buildingNumber: number
}

interface AddBuildingResponse {
  building: Building
}

export class AddBuilding {
  constructor(private readonly buildingRepository: BuildingRepository) {}
  async execute({
    buildingNumber,
  }: AddBuildingProps): Promise<AddBuildingResponse> {
    const hasBuilding = await this.buildingRepository.findBy({
      buildingNumber,
    })

    if (hasBuilding) throw new AppError('Building already exists', 409)

    const building = new Building({
      buildingNumber,
    })

    await this.buildingRepository.add(building)
    return {
      building,
    }
  }
}
