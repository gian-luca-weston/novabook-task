import storageService from "./storageService"
import { Transaction, SaleEvent, TaxPaymentEvent } from "../models/transactions"

export const calculateTaxPosition = (date: string): number => {
    const transactions: Transaction[] = storageService.getTransactions()
    let totalTaxOwed = 0
    let totalTaxPaid = 0

    transactions.forEach((t) => {
        if (!t.date || !t.eventType) return

        if (new Date(t.date) <= new Date(date)) {
            if (t.eventType === "SALES") {
                (t as SaleEvent).items.forEach((item) => {
                    totalTaxOwed += item.cost * item.taxRate
                })            
            } else if (t.eventType === "TAX_PAYMENT") {
                totalTaxPaid += (t as TaxPaymentEvent).amount
            }
        }
    })

    return totalTaxOwed - totalTaxPaid
}