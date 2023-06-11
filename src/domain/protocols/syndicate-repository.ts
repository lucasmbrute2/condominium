import { Syndicate } from '../entities/syndicate'

export interface SyndicateRepository {
  findByUsername(username: string): Promise<Syndicate | null>
}
