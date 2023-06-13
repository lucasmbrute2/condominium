import { Building } from '@/src/domain/entities/building'
import { Building as RawBuilding } from '@prisma/client'

export class PrismaBuildingMapper {
  static toPrisma(building: Building): RawBuilding {
    return {
      buildingNumber: building.buildingNumber,
      id: building.id,
    }
  }

  static toDomain(rawBuilding: RawBuilding): Building {
    return new Building({
      id: rawBuilding.id,
      buildingNumber: rawBuilding.buildingNumber,
    })
  }
}
