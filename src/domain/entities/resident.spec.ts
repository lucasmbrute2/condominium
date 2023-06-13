import { describe, expect, it } from 'vitest'
import { Resident } from './resident'
import { makeResident } from '@/src/tests/factories/entities'

describe('Resident entity', () => {
  it('Should be able to instance an Resident with correct values', () => {
    const sut = makeResident()

    expect(sut).toBeInstanceOf(Resident)
    expect(sut).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        cpf: expect.any(String),
        apartament: expect.any(Number),
        buildingId: expect.any(String),
        phone: expect.objectContaining({
          area: expect.any(Number),
        }),
        address: expect.objectContaining({
          city: expect.any(String),
        }),
      }),
    )
  })
})
