import { randomUUID } from 'node:crypto'

interface InvoicesProps {
  id?: string
  month: number
  amount: number
  isPaid?: Boolean
  residentId: string
}

export class Invoices {
  constructor(private readonly props: InvoicesProps) {
    const id = this.props.id || props.id || randomUUID()

    this.props = {
      ...props,
      id,
      isPaid: props.isPaid ?? false,
    }
  }

  pay() {
    this.props.isPaid = true
  }

  get id(): string {
    return this.props.id
  }

  set month(month: number) {
    this.props.month = month
  }

  get month(): number {
    return this.props.month
  }

  set amount(amount: number) {
    this.props.amount = amount
  }

  get amount(): number {
    return this.props.amount
  }

  get isPaid(): Boolean {
    return this.props.isPaid
  }

  set residentId(residentId: string) {
    this.props.residentId = residentId
  }

  get residentId(): string {
    return this.props.residentId
  }
}
