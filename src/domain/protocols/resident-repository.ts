import { Resident } from '../entities/resident'

export interface FindBy {
  cpf: string
  email: string
}

export interface ResidentRepository {
  add(resident: Resident): Promise<void>
  findBy({ cpf, email }: FindBy): Promise<Resident | null>
  fetch(): Promise<Resident[]>
}
