import { ResidentRepository } from '@/src/domain/protocols'
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

  async findBy(query: Partial<Resident>): Promise<Resident> {
    throw new Error('Method not implemented.')
  }

  async fetch(): Promise<Resident[]> {
    throw new Error('Method not implemented.')
  }

  async save(data: Resident): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

// TO DO REFACTOR TO RESIDENT
