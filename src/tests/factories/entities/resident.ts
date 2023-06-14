import { Resident } from '@/src/domain/entities/resident'
import { randomUUID } from 'node:crypto'

export const makeResident = (override?: Partial<Resident>) => {
  return new Resident({
    id: randomUUID(),
    name: 'any-name',
    email: 'any-email',
    cpf: 'any-cpf',
    address: {
      city: 'any-city',
      country: 'any-country',
      locality: 'any-locality',
      number: 'any-number',
      postal_code: 'any-postal-code',
      region: 'any-region',
      region_code: 'any-region-code',
      street: 'any-street',
    },
    apartament: 101,
    buildingId: 'any-id',
    phone: {
      area: 1,
      countryCode: 1,
      number: 1,
      type: 'BUSINESS',
    },
    ...override,
  })
}
