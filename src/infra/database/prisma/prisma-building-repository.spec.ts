import { BuildingRepository } from '@/src/domain/protocols'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { PrismaBuildingRepository } from './prisma-building-repository'
import { makeBuilding } from '@/src/tests/factories/entities'
import { Building } from '@/src/domain/entities/building'
import { prisma as client } from './lib/prisma'

const makeSut = (): BuildingRepository => {
  return new PrismaBuildingRepository()
}

describe('Building Repository', () => {
  const prisma = client
  let schema: string

  beforeAll(() => {
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
    await prisma.building.deleteMany({})
  })

  // add()
  it('Should create and return a Building on success', async () => {
    const sut = makeSut()
    const building = await sut.add(makeBuilding())
    expect(building).toBeTruthy()
    expect(building).toHaveProperty('id')
  })

  // findBy()
  it('Shoud be able to find a Bulding on success', async () => {
    const sut = makeSut()
    const building = makeBuilding()
    await sut.add(building)

    const buildingFound = await sut.findBy({
      buildingNumber: building.buildingNumber,
    })

    expect(buildingFound).toBeInstanceOf(Building)
  })

  // fetch()
  it('Should return an array of Buildings on success', async () => {
    const sut = makeSut()
    const building = makeBuilding()
    await sut.add(building)

    const buildings = await sut.fetch()
    expect(buildings).toHaveLength(1)
    expect(buildings[0]).toBeInstanceOf(Building)
    // reset DB before
  })
})
