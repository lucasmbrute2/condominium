import { InMemoryResidentRepository } from '@/src/infra/in-memory/resident-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchResidents } from './fetch-residents'
import { makeResident } from '@/src/tests/factories/entities'
import { Resident } from '@/src/domain/entities/resident'

let sut: FetchResidents
let inMemoryResidentRepository: InMemoryResidentRepository

describe('Fetch Residents Use Case', () => {
  beforeEach(() => {
    inMemoryResidentRepository = new InMemoryResidentRepository()
    sut = new FetchResidents(inMemoryResidentRepository)
  })

  it('Should be able to return Residents on success', async () => {
    const resident = makeResident()
    await inMemoryResidentRepository.add(resident)
    const { residents } = await sut.execute()
    expect(residents).toHaveLength(1)
    expect(residents[0]).toBeInstanceOf(Resident)
  })
})
