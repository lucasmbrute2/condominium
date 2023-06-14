import { Building } from '../entities/building'

export type XORBuldingNumberId =
  | {
      buildingNumber: number
      id?: never
    }
  | {
      buildingNumber?: never
      id: string
    }

export interface BuildingRepository {
  add(building: Building): Promise<Building | null>
  findBy(query: XORBuldingNumberId): Promise<Building | null>
  fetch(): Promise<Building[]>
}
