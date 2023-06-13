import { Building } from '@/src/domain/entities/building'
import { makeSyndicate } from './syndicate'

export const makeBuilding = (override?: Partial<Building>): Building => {
  const { id: syndicateId } = makeSyndicate()

  return new Building({
    buildingNumber: Math.floor(Math.random() * 1000),
    syndicateId,
    ...override,
  })
}
