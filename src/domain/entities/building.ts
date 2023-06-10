import { randomUUID } from 'node:crypto'

interface BuildingProps {
  id?: string
  buildingNumber: number
  syndicateId: string
}

export class Building {
  constructor(private readonly props: BuildingProps) {
    const id = this.props.id || props.id || randomUUID()

    this.props = {
      id,
      ...props,
    }
  }

  get id(): string {
    return this.props.id
  }

  set buildingNumber(buildingNumber: number) {
    this.props.buildingNumber = buildingNumber
  }

  get buildingNumber(): number {
    return this.props.buildingNumber
  }

  set syndicateId(syndicateId: string) {
    this.props.syndicateId = syndicateId
  }

  get syndicateId(): string {
    return this.props.syndicateId
  }
}
