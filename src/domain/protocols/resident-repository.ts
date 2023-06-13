import { Resident } from '../entities/resident'

export interface ResidentRepository {
  add(resident: Resident): Promise<void>
  findBy(query: Partial<Resident>): Promise<Resident | null>
  fetch(): Promise<Resident[]>
  save(data: Resident): Promise<void>
}
