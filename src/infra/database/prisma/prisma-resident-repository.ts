import { QueryResidentKeys, ResidentRepository } from '@/src/domain/protocols'
import { prisma } from './lib/prisma'
import { Resident } from '@/src/domain/entities/resident'
import { PrismaResidentMapper } from './mappers/resident-mapper'

export class PrismaResidentRepository implements ResidentRepository {
  async add(data: Resident): Promise<Resident> {
    const resident = await prisma.resident.create({
      data: PrismaResidentMapper.toPrisma(data),
      include: {
        address: true,
        Phone: true,
      },
    })

    return PrismaResidentMapper.toDomain(resident)
  }

  async findBy(query: QueryResidentKeys): Promise<Resident> {
    const resident = await prisma.resident.findUnique({
      where: query,
    })
    return PrismaResidentMapper.toDomain(resident)
  }

  async fetch(): Promise<Resident[]> {
    const residents = await prisma.resident.findMany()
    return residents.map(PrismaResidentMapper.toDomain)
  }

  async save(data: Resident): Promise<void> {
    await prisma.resident.update({
      data: PrismaResidentMapper.toPrisma(data),
      where: {
        id: data.id,
      },
    })
  }
}
