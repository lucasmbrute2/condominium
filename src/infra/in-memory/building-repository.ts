import { Building } from '@/src/domain/entities/building'
import { BuildingRepository } from '@/src/domain/protocols'

export class InMemoryBuildingRepository implements BuildingRepository {
  public readonly Buildings: Building[] = []

  async add(building: Building): Promise<void> {
    this.Buildings.push(building)
  }

  async findByNumber(buildingNumber: number): Promise<Building> {
    const building = this.Buildings.find(
      (building) => building.buildingNumber === buildingNumber,
    )

    if (!building) return null
    return building
  }

  async fetch(): Promise<Building[]> {
    return this.Buildings
  }
}
