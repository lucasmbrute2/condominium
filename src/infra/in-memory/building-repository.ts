import { Building } from '@/src/domain/entities/building'
import { BuildingRepository, XORBuldingNumberId } from '@/src/domain/protocols'

export class InMemoryBuildingRepository implements BuildingRepository {
  public readonly Buildings: Building[] = []

  async add(building: Building): Promise<Building | null> {
    this.Buildings.push(building)
    return building
  }

  async findBy(query: XORBuldingNumberId): Promise<Building> {
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
