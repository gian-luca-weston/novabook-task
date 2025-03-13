import storageService from "./storageService"
import { SaleAmendment, SaleEvent, Transaction } from "../models/transactions"

export const processAmendment = (amendment: SaleAmendment): void => {
    storageService.addAmendment(amendment)

    const transactions = storageService.getTransactions()

    const sale = transactions.find(
        (t) => t.eventType === "SALES" && t.invoiceId === amendment.invoiceId
    ) as SaleEvent | undefined

    if(sale) {
        const item = sale.items.find((i) => i.itemId === amendment.itemId)
        
        if(item) {
            item.cost = amendment.cost
            item.taxRate = amendment.taxRate
        } else {
            console.log(`Item ${amendment.itemId} not found in the invoice ${amendment.invoiceId}`)
        }
    }
}