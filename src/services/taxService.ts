import prisma from "./dbService"
import { Transaction, SaleEvent, TaxPaymentEvent } from "../models/transactions"
import logger from "../utils/logger"

export const calculateTaxPosition = async (date: string): Promise<number> => {
    logger.info(`Calculating tax position for ${date}`)

    const transactions: Transaction[] = await prisma.transaction.findMany({
        where: { date: { lte: new Date(date) } },
    })
    let totalTaxOwed = 0
    let totalTaxPaid = 0

    transactions.forEach((t) => {
        if (!t.date || !t.eventType) {
            logger.warn(`Skipping invalid transaction: ${JSON.stringify(t)}`)    
            return
        }

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

    const taxPosition = totalTaxOwed - totalTaxPaid
    logger.info(`Tax position for ${date}: ${taxPosition}`)
    return taxPosition
}