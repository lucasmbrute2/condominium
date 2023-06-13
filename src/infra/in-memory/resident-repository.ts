import { Resident } from '@/src/domain/entities/resident'
import { ResidentRepository } from '@/src/domain/protocols'

export class InMemoryResidentRepository implements ResidentRepository {
  public readonly Resident: Resident[] = []

  async add(resident: Resident): Promise<void> {
    this.Resident.push(resident)
  }

  async findBy(query: Partial<Resident>): Promise<Resident | null> {
    const queryKeys = Object.keys(query)

    for (let i = 0; i < queryKeys.length; i++) {
      const building = this.Resident.find((building) => building[queryKeys[i]])
      if (building) return building
    }

    return null
  }

  async fetch(): Promise<Resident[]> {
    return this.Resident
  }

  async save(data: Resident): Promise<void> {
    const residentIndex = this.Resident.findIndex(
      (resident) => resident === data,
    )

    this.Resident[residentIndex] = data
  }
}
