import { Building } from '@/src/domain/entities/building'
import { BuildingRepository } from '@/src/domain/protocols'

interface FetchBuildingResponse {
  buildings: Building[]
}
export class FetchBuilding {
  constructor(private readonly buildingRepository: BuildingRepository) {}

  async execute(): Promise<FetchBuildingResponse> {
    const buildings = await this.buildingRepository.fetch()
    return {
      buildings,
    }
  }
}
