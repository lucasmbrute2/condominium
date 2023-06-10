import { describe, expect, it } from 'vitest'
import { Syndicate } from './syndicate'
import { makeSyndicate } from '@/src/tests/factories/syndicate'

describe('Syndicate entity', () => {
  it('Should be able to instance an Syndicate with correct values', () => {
    const sut = makeSyndicate()

    expect(sut).toBeInstanceOf(Syndicate)
    expect(sut).toEqual(
      expect.objectContaining({
        id: sut.id,
        name: sut.name,
        username: sut.username,
        password: sut.password,
      }),
    )
  })
})