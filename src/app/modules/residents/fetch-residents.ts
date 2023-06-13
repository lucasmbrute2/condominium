import { Resident } from '@/src/domain/entities/resident'
import { ResidentRepository } from '@/src/domain/protocols'

interface FetchResidentsResponse {
  residents: Resident[]
}

export class FetchResidents {
  constructor(private readonly residentRepository: ResidentRepository) {}

  async execute(): Promise<FetchResidentsResponse> {
    const residents = await this.residentRepository.fetch()
    return {
      residents,
    }
  }
}
