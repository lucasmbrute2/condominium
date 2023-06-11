import { InMemorySyndicateRepository } from '@/src/infra/in-memory/syndicate-repository'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AuthSyndicate } from './auth-syndicate'
import { Auth, Hasher } from '@/src/domain/protocols'
import { makeSyndicate } from '@/src/tests/factories/entities/syndicate'
import { makeHashStub, makeAuthStub } from '@/src/tests/factories/infra'

let sut: AuthSyndicate
let inMemorySyndicateRepository: InMemorySyndicateRepository
let authStub: Auth
let hasherStub: Hasher

describe('Auth Syndicate Use Case', () => {
  beforeEach(() => {
    inMemorySyndicateRepository = new InMemorySyndicateRepository()
    hasherStub = makeHashStub()
    authStub = makeAuthStub()
    sut = new AuthSyndicate(inMemorySyndicateRepository, hasherStub, authStub)
  })

  it('Should call Hasher Repository with correct values', async () => {
    const compareSpy = vi.spyOn(hasherStub, 'compare')

    const syndicate = makeSyndicate()
    const { username, password } = syndicate

    inMemorySyndicateRepository.Syndicates.push(syndicate)
    await sut.execute({
      username,
      password,
    })

    expect(compareSpy).toBeCalledWith(password, password)
  })

  it('Should call Auth Repository with correct values', async () => {
    const encryptSpy = vi.spyOn(authStub, 'encrypt')

    const syndicate = makeSyndicate()
    const { username, password, id } = syndicate

    inMemorySyndicateRepository.Syndicates.push(syndicate)
    await sut.execute({
      username,
      password,
    })

    expect(encryptSpy).toHaveBeenCalledWith(id)
  })
})
