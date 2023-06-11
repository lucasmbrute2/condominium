import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryBuildingRepository } from '@/src/infra/in-memory/building-repository'
import { makeBuilding } from '@/src/tests/factories/entities'
import { Building } from '@/src/domain/entities/building'
import { FetchBuilding } from './fetch-building-use-case'

let sut: FetchBuilding
let inMemoryBuildingRepository: InMemoryBuildingRepository

describe('Auth Syndicate Use Case', () => {
  beforeEach(() => {
    inMemoryBuildingRepository = new InMemoryBuildingRepository()
    sut = new FetchBuilding(inMemoryBuildingRepository)
  })

  it('Should return an array of Building on success', async () => {
    inMemoryBuildingRepository.add(makeBuilding())
    const { buildings } = await sut.execute()

    expect(buildings[0]).toBeInstanceOf(Building)
  })
})
