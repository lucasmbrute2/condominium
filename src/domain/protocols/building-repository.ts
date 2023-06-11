import { Building } from '../entities/building'

export interface BuildingRepository {
  add(building: Building): Promise<void>
  findByNumber(buildingNumber: number): Promise<Building | null>
  fetch(): Promise<Building[]>
}
