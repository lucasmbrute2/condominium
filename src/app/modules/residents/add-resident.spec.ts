import { beforeEach, describe, expect, it } from 'vitest'

import { AddResident } from './add-resident'
import { InMemoryResidentRepository } from '@/src/infra/in-memory/resident-repository'
import { AppError } from '@/src/errors/global-error'
import { makeBuilding, makeResident } from '@/src/tests/factories/entities'
import { InMemoryBuildingRepository } from '@/src/infra/in-memory/building-repository'
import { Resident } from '@/src/domain/entities/resident'

let sut: AddResident
let inMemoryResidentRepository: InMemoryResidentRepository
let inMemoryBuildingRepository: InMemoryBuildingRepository

describe('Add Resident Use Case', () => {
  beforeEach(() => {
    inMemoryResidentRepository = new InMemoryResidentRepository()
    inMemoryBuildingRepository = new InMemoryBuildingRepository()
    sut = new AddResident(
      inMemoryResidentRepository,
      inMemoryBuildingRepository,
    )
  })

  it('Should throws if trynna add Resident that already exists', () => {
    expect(async () => {
      const resident = makeResident()
      await inMemoryResidentRepository.add(resident)
      await sut.execute(resident)
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should throws if building is not found', () => {
    expect(async () => {
      const resident = makeResident()
      await sut.execute(resident)
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should return a Resident on success', async () => {
    const building = makeBuilding()
    await inMemoryBuildingRepository.add(building)

    const resident = makeResident({
      buildingId: building.id,
    })

    const response = await sut.execute(resident)
    expect(response.resident).toHaveProperty('id')
    expect(response.resident).toBeInstanceOf(Resident)
  })
})
