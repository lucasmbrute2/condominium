import { Building } from '@/src/domain/entities/building'
import { BuildingRepository } from '@/src/domain/protocols'
import { prisma } from './lib/prisma'
import { PrismaBuildingMapper } from './mappers/building-mapper'

export class PrismaBuildingRepository implements BuildingRepository {
  async add(data: Building): Promise<Building | null> {
    const building = await prisma.building.create({
      data: PrismaBuildingMapper.toPrisma(data),
    })

    if (!building) return null
    return PrismaBuildingMapper.toDomain(building)
  }

  async findBy(query: Partial<Building>): Promise<Building> {
    throw new Error('Method not implemented.')
  }

  async fetch(): Promise<Building[]> {
    throw new Error('Method not implemented.')
  }
}
