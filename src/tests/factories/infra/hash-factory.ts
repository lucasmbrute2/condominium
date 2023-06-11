import { Hasher } from '@/src/domain/protocols'

export const makeHashStub = (): Hasher => {
  class HashStub implements Hasher {
    async hash(plaintext: string, salt: number): Promise<string> {
      return Promise.resolve(plaintext)
    }

    async compare(plaitext: string, digest: string): Promise<boolean> {
      return Promise.resolve(true)
    }
  }

  return new HashStub()
}
