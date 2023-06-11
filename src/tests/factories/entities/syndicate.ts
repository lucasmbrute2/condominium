import { Syndicate } from '@/src/domain/entities/syndicate'

export const makeSyndicateProps = () => ({
  username: 'any-username',
  password: 'any-password',
})

export const makeSyndicate = (override?: Partial<Syndicate>): Syndicate => {
  return new Syndicate({
    name: 'any-name',
    ...makeSyndicateProps(),
    ...override,
  })
}
