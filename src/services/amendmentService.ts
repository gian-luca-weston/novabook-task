import storageService from "./storageService"
import { SaleAmendment, SaleEvent, Transaction } from "../models/transactions"
import logger from "../utils/logger"

export const processAmendment = (amendment: SaleAmendment): void => {
    logger.info(`Storing amendment: ${JSON.stringify(amendment)}`)
    storageService.addAmendment(amendment)

    const transactions = storageService.getTransactions()

    const sale = transactions.find(
        (t) => t.eventType === "SALES" && t.invoiceId === amendment.invoiceId
    ) as SaleEvent | undefined

    if(sale) {
        const item = sale.items.find((i) => i.itemId === amendment.itemId)
        
        if(item) {
            logger.info(`Applying amendment to item ${amendment.itemId} in invoice ${amendment.invoiceId}`)
            item.cost = amendment.cost
            item.taxRate = amendment.taxRate
        } else {
            logger.warn(`Item ${amendment.itemId} not found in invoice ${amendment.invoiceId}`)
        }
    }
}