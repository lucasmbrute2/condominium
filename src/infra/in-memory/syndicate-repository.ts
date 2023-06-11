import { Syndicate } from '@/src/domain/entities/syndicate'
import { SyndicateRepository } from '@/src/domain/protocols'

export class InMemorySyndicateRepository implements SyndicateRepository {
  public readonly Syndicates: Syndicate[] = []

  async findByUsername(username: string): Promise<Syndicate | null> {
    const syndicate = this.Syndicates.find(
      (syndicate) => syndicate.username === username,
    )

    if (!syndicate) return null
    return syndicate
  }
}
