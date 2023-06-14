import { Resident, ResidentProps } from '@/src/domain/entities/resident'
import { Address, Phone, Resident as RawResident } from '@prisma/client'
import { randomUUID } from 'crypto'

type PhoneWithoutResidentId = Omit<Phone, 'residentId'>

interface ResidentRelationsForPrisma {
  address: {
    create: Address
  }
  Phone: {
    create: PhoneWithoutResidentId[]
  }
  building: {
    connect: {
      id: string
    }
  }
}

interface ResidentRelations {
  address?: Address
  Phone?: Phone[]
}

type ResidentWithoutAddressId = Omit<RawResident, 'addressId'>
type ResidentWithoutAddressAndBuldingId = Omit<
  RawResident,
  'addressId' | 'buildingId'
>
type ResidentWithRelations = ResidentWithoutAddressId & ResidentRelations
type ResidentWithRelationsWithoutBuildingId =
  ResidentWithoutAddressAndBuldingId & ResidentRelationsForPrisma

export class PrismaResidentMapper {
  static toPrisma(resident: Resident): ResidentWithRelationsWithoutBuildingId {
    const {
      address,
      apartament,
      cpf,
      email,
      id: residentId,
      leftAt,
      joinAt,
      name,
      nonPayments,
      phone,
      buildingId,
    } = resident

    const {
      city,
      country,
      locality,
      number,
      postal_code,
      region_code,
      street,
      complement,
      region,
    } = address

    const { area, countryCode, number: phoneNumber, type } = phone

    return {
      id: residentId,
      name,
      email,
      apartament,
      cpf,
      nonPayments,
      joinAt: joinAt ?? new Date(),
      leftAt: leftAt ?? null,
      building: {
        connect: {
          id: buildingId,
        },
      },
      address: {
        create: {
          id: randomUUID(),
          street,
          number,
          complement: complement ?? null,
          city,
          region,
          region_code,
          country,
          locality,
          postalCode: postal_code,
        },
      },
      Phone: {
        create: [
          {
            id: randomUUID(),
            countryCode,
            area,
            number: phoneNumber,
            type,
          },
        ],
      },
    }
  }

  static toDomain(rawResident: ResidentWithRelations): Resident {
    const {
      apartament,
      Phone,
      buildingId,
      address,
      cpf,
      email,
      id,
      joinAt,
      leftAt,
      name,
      nonPayments,
    } = rawResident

    const residentProps: ResidentProps = {
      buildingId,
      apartament,
      cpf,
      email,
      name,
      joinAt,
      leftAt,
      nonPayments,
      id,
    }

    if (rawResident.address) {
      residentProps.address = {
        ...address,
        postal_code: address.postalCode,
      }
    }

    if (rawResident?.Phone?.length) {
      const { area, countryCode, number: phoneNumber, type } = Phone[0]
      residentProps.phone = {
        area,
        countryCode,
        number: phoneNumber,
        type,
        id: randomUUID(),
      }
    }

    return new Resident(residentProps)
  }
}
