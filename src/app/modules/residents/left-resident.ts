import { ResidentRepository } from '@/src/domain/protocols'
import { AppError } from '@/src/errors/global-error'

interface LeftResidentsProps {
  residentId: string
}

type LeftResidentsResponse = void

export class LeftResidents {
  constructor(private readonly residentRepository: ResidentRepository) {}

  async execute({
    residentId,
  }: LeftResidentsProps): Promise<LeftResidentsResponse> {
    const resident = await this.residentRepository.findBy({
      id: residentId,
    })
    if (!resident) throw new AppError('Resident not found', 404)

    resident.left()
    await this.residentRepository.save(resident)
  }
}
