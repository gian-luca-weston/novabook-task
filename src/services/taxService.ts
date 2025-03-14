import prisma from "./dbService"
import { Transaction, SaleEvent, TaxPaymentEvent } from "../models/transactions"
import logger from "../utils/logger"

export const calculateTaxPosition = async (date: string): Promise<number> => {
    logger.info(`Calculating tax position for ${date}`)

    const transactions = await prisma.transaction.findMany({
        where: { date: { lte: new Date(date) } },
        select: {
            id: true,
            eventType: true,
            date: true,
            invoiceId: true,
            items: true,
            amount: true,
        }
    });

    const typedTransactions: Transaction[] = transactions.map(t => {
        if (t.eventType === "SALES") {
            return {
                id: t.id,
                eventType: "SALES",
                date: t.date.toISOString(),
                invoiceId: t.invoiceId,
                items: t.items as SaleEvent["items"],
            } as SaleEvent;
        } else {
            return {
                id: t.id,
                eventType: "TAX_PAYMENT",
                date: t.date.toISOString(),
                amount: t.amount ?? 0,
            } as TaxPaymentEvent;
        }
    });

    let totalTaxOwed = 0
    let totalTaxPaid = 0

    typedTransactions.forEach((t) => {
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