import { Phone, Address } from '@/src/@types'
import { Resident } from '@/src/domain/entities/Resident'
import { BuildingRepository, ResidentRepository } from '@/src/domain/protocols'
import { AppError } from '@/src/errors/global-error'

interface AddResidentResponse {
  resident: Resident
}

interface AddResidentProps {
  name: string
  email: string
  apartament: number
  cpf: string
  buildingId: string
  phone: Phone
  address: Address
}

export class AddResident {
  constructor(
    private readonly residentRepository: ResidentRepository,
    private readonly buildingRepository: BuildingRepository,
  ) {}

  async execute(props: AddResidentProps): Promise<AddResidentResponse> {
    const { cpf, email, address, apartament, name, phone, buildingId } = props

    const hasResident = await this.residentRepository.findBy({
      cpf,
      email,
    })
    if (hasResident) throw new AppError('Resident already exists', 409)

    const building = await this.buildingRepository.findBy({
      id: buildingId,
    })
    if (!building) throw new AppError('Building not found', 404)

    const resident = new Resident({
      address,
      apartament,
      buildingId,
      cpf,
      email,
      name,
      phone,
    })
    await this.residentRepository.add(resident)

    return {
      resident,
    }
  }
}
