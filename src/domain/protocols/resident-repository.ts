import { Resident } from '../entities/resident'

export type QueryResidentKeys =
  | {
      email: string
      id?: never
      cpf?: never
    }
  | {
      cpf: string
      id?: never
      email?: never
    }
  | {
      id: string
      cpf?: never
      email?: never
    }

export interface ResidentRepository {
  add(resident: Resident): Promise<Resident>
  findBy(query: QueryResidentKeys): Promise<Resident | null>
  fetch(): Promise<Resident[]>
  save(data: Resident): Promise<void>
}
