import { Invoices } from '@/src/domain/entities/Invoices'

export const makeInvoices = (override?: Partial<Invoices>): Invoices => {
  return new Invoices({
    amount: 1,
    month: 1,
    residentId: 'any-id',
    ...override,
  })
}
