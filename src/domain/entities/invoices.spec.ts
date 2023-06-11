import { describe, expect, it } from 'vitest'
import { Invoices } from './Invoices'
import { makeInvoices } from '@/src/tests/factories/entities'

describe('Invoices entity', () => {
  it('Should be able to instance an Invoices with correct values', () => {
    const sut = makeInvoices()

    expect(sut).toBeInstanceOf(Invoices)
    expect(sut).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        month: expect.any(Number),
        amount: expect.any(Number),
        isPaid: expect.any(Boolean),
        residentId: expect.any(String),
      }),
    )
  })
})
