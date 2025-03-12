export interface SaleEvent {
    eventType: "SALES"
    date: string
    invoiceId: string
    items: [{
        itemId: string,
        cost: number,
        taxRate: number
        }]
}

export interface TaxPaymentEvent {
    eventType: "TAX_PAYMENT"
    date: string
    amount: number
}


export type Transaction = SaleEvent | TaxPaymentEvent