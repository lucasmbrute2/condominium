import { Auth } from '@/src/domain/protocols'

export const makeAuthStub = (): Auth => {
  class AuthStub implements Auth {
    async encrypt(userId: string): Promise<string> {
      return Promise.resolve(userId)
    }

    async decrypt(ciphertext: string): Promise<string> {
      return Promise.resolve(ciphertext)
    }
  }

  return new AuthStub()
}
