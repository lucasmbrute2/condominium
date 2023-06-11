import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AddBuilding } from './add-building-use-case'
import { InMemoryBuildingRepository } from '@/src/infra/in-memory/building-repository'
import { makeBuilding } from '@/src/tests/factories/entities'
import { AppError } from '@/src/errors/global-error'

let sut: AddBuilding
let inMemoryBuildingRepository: InMemoryBuildingRepository

describe('Auth Syndicate Use Case', () => {
  beforeEach(() => {
    inMemoryBuildingRepository = new InMemoryBuildingRepository()
    sut = new AddBuilding(inMemoryBuildingRepository)
  })

  it('Shoudl throws if buildingNumber is already registered', () => {
    expect(async () => {
      const building = makeBuilding()
      inMemoryBuildingRepository.add(building)
      await sut.execute({
        buildingNumber: building.buildingNumber,
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
