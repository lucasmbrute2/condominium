import { randomUUID } from 'node:crypto'

interface ResidentProps {
  id?: string
  name: string
  email: string
  apartament: string
  cpf: string
  nonPayments?: number
  joinAt?: Date
  leftAt?: Date

  buildingId: string
  addressId: string
}

export class Resident {
  constructor(private props: ResidentProps) {
    const id = this.props.id || props.id || randomUUID()
    this.props = {
      addressId: props.addressId,
      apartament: props.apartament,
      buildingId: props.apartament,
      cpf: props.cpf,
      email: props.email,
      name: props.name,
      id,
    }
  }

  left() {
    this.props.leftAt = new Date()
  }

  get id(): string {
    return this.props.id
  }

  set name(name: string) {
    this.props.name = name
  }

  get name(): string {
    return this.props.name
  }

  set email(email: string) {
    this.props.email = email
  }

  get email(): string {
    return this.props.email
  }

  set apartament(apartament: string) {
    this.props.apartament = apartament
  }

  get apartament(): string {
    return this.props.apartament
  }

  set cpf(cpf: string) {
    this.props.cpf = cpf
  }

  get cpf(): string {
    return this.props.cpf
  }

  set nonPayments(nonPayments: number) {
    this.props.nonPayments = nonPayments
  }

  get nonPayments(): number {
    return this.props.nonPayments
  }

  get joinAt(): Date | undefined {
    return this.props.joinAt
  }

  get leftAt(): Date | undefined {
    return this.props.leftAt
  }

  set buildingId(buildingId: string) {
    this.props.buildingId = buildingId
  }

  get buildingId(): string {
    return this.props.buildingId
  }

  set addressId(addressId: string) {
    this.props.addressId = addressId
  }

  get addressId(): string {
    return this.props.addressId
  }
}
