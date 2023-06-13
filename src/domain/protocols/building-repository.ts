import { Building } from '../entities/building'

export interface BuildingRepository {
  add(building: Building): Promise<void>
  findBy(query: Partial<Building>): Promise<Building | null>
  fetch(): Promise<Building[]>
}
