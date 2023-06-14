import { Building } from '@/src/domain/entities/building'
import { BuildingRepository, XORBuldingNumberId } from '@/src/domain/protocols'
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

  async findBy(query: XORBuldingNumberId): Promise<Building> {
    const building = await prisma.building.findUnique({
      where: query,
    })

    if (!building) return null
    return PrismaBuildingMapper.toDomain(building)
  }

  async fetch(): Promise<Building[]> {
    const buildings = await prisma.building.findMany({})
    return buildings.map(PrismaBuildingMapper.toDomain)
  }
}
