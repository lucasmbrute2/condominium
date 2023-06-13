import { Resident } from '@/src/domain/entities/resident'
import { FindBy, ResidentRepository } from '@/src/domain/protocols'

export class InMemoryResidentRepository implements ResidentRepository {
  public readonly Resident: Resident[] = []

  async add(resident: Resident): Promise<void> {
    this.Resident.push(resident)
  }

  async findBy({ cpf, email }: FindBy): Promise<Resident | null> {
    const resident = this.Resident.find(
      (resident) => resident.cpf === cpf || resident.email === email,
    )

    if (!resident) return null
    return resident
  }
}
