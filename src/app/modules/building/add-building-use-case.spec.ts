import { beforeEach, describe, expect, it } from 'vitest'
import { AddBuilding } from './add-building-use-case'
import { InMemoryBuildingRepository } from '@/src/infra/in-memory/building-repository'
import { makeBuilding } from '@/src/tests/factories/entities'
import { AppError } from '@/src/errors/global-error'
import { Building } from '@/src/domain/entities/building'

let sut: AddBuilding
let inMemoryBuildingRepository: InMemoryBuildingRepository

describe('Auth Syndicate Use Case', () => {
  beforeEach(() => {
    inMemoryBuildingRepository = new InMemoryBuildingRepository()
    sut = new AddBuilding(inMemoryBuildingRepository)
  })

  it('Should throws if buildingNumber is already registered', () => {
    expect(async () => {
      const building = makeBuilding()
      inMemoryBuildingRepository.add(building)
      await sut.execute({
        buildingNumber: building.buildingNumber,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should return a building on success', async () => {
    const { buildingNumber } = makeBuilding()
    const { building } = await sut.execute({
      buildingNumber,
    })

    expect(building).toBeInstanceOf(Building)
    expect(building).toHaveProperty('id')
  })
})
