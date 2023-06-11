import { InMemorySyndicateRepository } from '@/src/infra/in-memory/syndicate-repository'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AuthSyndicate } from './auth-syndicate'
import { Auth, Hasher } from '@/src/domain/protocols'
import {
  makeSyndicate,
  makeSyndicateProps,
} from '@/src/tests/factories/entities'
import { makeHashStub, makeAuthStub } from '@/src/tests/factories/infra'
import { AppError } from '@/src/errors/global-error'
import { Syndicate } from '@/src/domain/entities/syndicate'

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

  it('Should throw Error if Syndicates it not found', () => {
    expect(async () => {
      await sut.execute(makeSyndicateProps())
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should throw if compare password fails', () => {
    expect(async () => {
      vi.spyOn(hasherStub, 'compare').mockReturnValueOnce(
        Promise.resolve(false),
      )

      const syndicate = makeSyndicate()
      const { username, password } = syndicate

      inMemorySyndicateRepository.Syndicates.push(syndicate)
      await sut.execute({
        username,
        password,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should return token and Syndicate on success', async () => {
    const syndicate = makeSyndicate()
    const { username, password } = syndicate

    inMemorySyndicateRepository.Syndicates.push(syndicate)
    const response = await sut.execute({
      username,
      password,
    })

    expect(response.syndicate).toBeInstanceOf(Syndicate)
    expect(response.token).toBeTruthy()
  })
})
