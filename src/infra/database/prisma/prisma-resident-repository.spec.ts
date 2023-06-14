import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { makeBuilding, makeResident } from '@/src/tests/factories/entities'
import { prisma as client } from './lib/prisma'
import { PrismaResidentRepository } from './prisma-resident-repository'
import { PrismaBuildingRepository } from './prisma-building-repository'
import { Resident } from '@/src/domain/entities/resident'

// TO DO REFACTOR TO RESIDENT

let prismaBuildingRepository: PrismaBuildingRepository

const makeSut = (): PrismaResidentRepository => {
  return new PrismaResidentRepository()
}

describe('Resident Repository', () => {
  const prisma = client
  let schema: string

  beforeAll(() => {
    prismaBuildingRepository = new PrismaBuildingRepository()
    if (!process.env.DATABASE_URL) {
      throw new Error('Please provide a DATABASE_URL environment variable')
    }
    schema = randomUUID()
    const url = new URL(process.env.DATABASE_URL)
    url.searchParams.set('schema', schema)

    process.env.DATABASE_URL = url.toString()
    execSync('npx prisma migrate deploy')
  })

  afterAll(async () => {
    await prisma.$queryRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
    await prisma.$disconnect()
  })

  afterEach(async () => {
    await prisma.resident.deleteMany({})
    await prisma.building.deleteMany({})
  })

  // add()
  it('Should create and return a Resident on success', async () => {
    const sut = makeSut()
    const residentCreated = makeResident()

    await prismaBuildingRepository.add(
      makeBuilding({
        id: residentCreated.buildingId,
      }),
    )
    const resident = await sut.add(residentCreated)

    expect(resident).toBeTruthy()
    expect(resident).toHaveProperty('id')
  })

  // findBy()
  it('Shoud be able to find a Resident on success', async () => {
    const sut = makeSut()
    const resident = makeResident()

    await prismaBuildingRepository.add(
      makeBuilding({
        id: resident.buildingId,
      }),
    )
    await sut.add(resident)
    const residentFound = await sut.findBy({
      cpf: resident.cpf,
    })

    expect(residentFound).toBeInstanceOf(Resident)
  })

  // // fetch()
  // it('Should return an array of Residents on success', async () => {
  //   const sut = makeSut()
  //   const resident = makeResident()
  //   await sut.add(resident)

  //   const residents = await sut.fetch()
  //   expect(residents).toHaveLength(1)
  //   expect(residents[0]).toBeInstanceOf(resident)
  // })

  // save()
})
