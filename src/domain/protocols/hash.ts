export interface Hasher {
  hash: (plaintext: string, salt: number) => Promise<string>
  compare: (plaitext: string, digest: string) => Promise<boolean>
}
