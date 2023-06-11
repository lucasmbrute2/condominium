export interface Auth {
  encrypt(userId: string): Promise<string>
  decrypt(ciphertext: string): Promise<string>
}
