import { Transaction, SaleEvent, TaxPaymentEvent } from "../models/transactions"
import prisma from "./dbService"
import logger from "../utils/logger"

export const processTransaction = async (transaction: Transaction): Promise<void> => {
    if(transaction.eventType !== "SALES" && transaction.eventType !== "TAX_PAYMENT") {
        logger.error(`Invalid transaction type`)
        throw new Error("Invalid eventType")
    }

    await prisma.transaction.create({ data: transaction })
    logger.info(`Transaction stored: ${JSON.stringify(transaction)}`)
}