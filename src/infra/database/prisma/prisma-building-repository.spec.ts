import { BuildingRepository } from '@/src/domain/protocols'
import { PrismaClient } from '@prisma/client'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { PrismaBuildingRepository } from './prisma-building-repository'
import { makeBuilding } from '@/src/tests/factories/entities'

const makeSut = (): BuildingRepository => {
  return new PrismaBuildingRepository()
}

describe('Building Repository', () => {
  const prisma = new PrismaClient()
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

  beforeEach(async () => {
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
  it('', () => {})

  // fetch()
  it('', () => {})
})
