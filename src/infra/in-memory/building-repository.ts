import { Building } from '@/src/domain/entities/building'
import { BuildingRepository } from '@/src/domain/protocols'

export class InMemoryBuildingRepository implements BuildingRepository {
  public readonly Buildings: Building[] = []

  async add(building: Building): Promise<void> {
    this.Buildings.push(building)
  }

  async findBy(query: Partial<Building>): Promise<Building> {
    const queryKeys = Object.keys(query)

    for (let i = 0; i < queryKeys.length; i++) {
      const building = this.Buildings.find((building) => building[queryKeys[i]])
      if (building) return building
    }

    return null
  }

  async fetch(): Promise<Building[]> {
    return this.Buildings
  }
}
