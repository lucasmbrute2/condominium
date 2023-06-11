import { Auth } from '@/src/domain/protocols'
import { env } from '@/src/main/config/env'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Auth {
  constructor(private readonly secret: string) {
    this.secret = secret
  }

  async encrypt(id: string): Promise<string> {
    return jwt.sign({}, this.secret, {
      expiresIn: env.EXPIRES_IN,
      subject: id,
    })
  }

  async decrypt(ciphertext: string): Promise<string> {
    return jwt.verify(ciphertext, this.secret) as any
  }
}
