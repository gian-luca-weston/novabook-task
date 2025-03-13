import { Transaction, SaleEvent, TaxPaymentEvent } from "../models/transactions"
import storageService from "./storageService"
import logger from "../utils/logger"

export const processTransaction = (transaction: Transaction): void => {
    if(transaction.eventType !== "SALES" && transaction.eventType !== "TAX_PAYMENT") {
        logger.error(`Invalid transaction type`)
        throw new Error("Invalid eventType")
    }

    storageService.addTransaction(transaction)
    logger.info(`Transaction stored: ${JSON.stringify(transaction)}`)
}