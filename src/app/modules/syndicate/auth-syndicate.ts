import { Syndicate } from '@/src/domain/entities/syndicate'
import { Auth, Hasher, SyndicateRepository } from '@/src/domain/protocols'
import { AppError } from '@/src/errors/global-error'

interface AuthSyndicateProps {
  username: string
  password: string
}

interface AuthSyndicateResponse {
  token: string
  syndicate: Syndicate
}

export class AuthSyndicate {
  constructor(
    private readonly syndicateRepository: SyndicateRepository,
    private readonly hasher: Hasher,
    private readonly auth: Auth,
  ) {}

  async execute({
    password,
    username,
  }: AuthSyndicateProps): Promise<AuthSyndicateResponse> {
    const syndicate = await this.syndicateRepository.findByUsername(username)

    if (!syndicate) throw new AppError('Syndicate not found', 404)

    const isPasswordCorrect = await this.hasher.compare(
      password,
      syndicate?.password,
    )
    if (!isPasswordCorrect) throw new AppError('Invalid credentials', 409)

    const token = await this.auth.encrypt(syndicate.id)

    return {
      token,
      syndicate,
    }
  }
}
