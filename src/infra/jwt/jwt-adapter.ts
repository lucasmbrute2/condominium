import { Auth } from '@/src/domain/protocols'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Auth {
  constructor(private readonly secret: string) {
    this.secret = secret
  }

  async encrypt(id: string): Promise<string> {
    return jwt.sign({}, this.secret, {
      expiresIn: '7d',
      subject: id,
    })
  }

  async decrypt(ciphertext: string): Promise<string> {
    return jwt.verify(ciphertext, this.secret) as any
  }
}
