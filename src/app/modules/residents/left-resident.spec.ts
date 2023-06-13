import { InMemoryResidentRepository } from '@/src/infra/in-memory/resident-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { LeftResidents } from './left-resident'
import { AppError } from '@/src/errors/global-error'
import { makeResident } from '@/src/tests/factories/entities'

let sut: LeftResidents
let inMemoryResidentRepository: InMemoryResidentRepository

describe('Fetch Residents Use Case', () => {
  beforeEach(() => {
    inMemoryResidentRepository = new InMemoryResidentRepository()
    sut = new LeftResidents(inMemoryResidentRepository)
  })

  it('Should throws if Resident is not found', async () => {
    expect(async () => {
      await sut.execute({
        residentId: 'wrong-id',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should update field leftAt in Resident', async () => {
    const resident = makeResident()
    inMemoryResidentRepository.add(resident)

    await sut.execute({
      residentId: resident.id,
    })

    expect(resident.leftAt).toBeTruthy()
  })
})
