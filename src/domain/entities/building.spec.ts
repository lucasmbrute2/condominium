import { describe, expect, it } from 'vitest'
import { Building } from './building'
import { makeBuilding } from '@/src/tests/factories/building'

describe('Building entity', () => {
  it('Should be able to instance an Building with correct values', () => {
    const sut = makeBuilding()

    expect(sut).toBeInstanceOf(Building)
    expect(sut).toEqual(
      expect.objectContaining({
        id: sut.id,
        buildingNumber: sut.buildingNumber,
        syndicateId: sut.syndicateId,
      }),
    )
  })
})