import { Syndicate } from '@/src/domain/entities/syndicate'

export const makeSyndicate = (override?: Partial<Syndicate>): Syndicate => {
  return new Syndicate({
    name: 'any-name',
    password: 'any-password',
    username: 'any-username',
    ...override,
  })
}
