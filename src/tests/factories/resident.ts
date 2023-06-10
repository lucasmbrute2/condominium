import { Resident } from '@/src/domain/entities/resident'
import { randomUUID } from 'node:crypto'

export const makeResident = (override?: Partial<Resident>) => {
  return new Resident({
    id: randomUUID(),
    name: 'any-name',
    email: 'any-email',
    cpf: 'any-cpf',
    addressId: 'any-id',
    apartament: '101',
    buildingId: 'any-id',
    ...override,
  })
}
