import prisma from "./dbService"
import { SaleAmendment, SaleEvent, Transaction } from "../models/transactions"
import logger from "../utils/logger"

export const processAmendment = async (amendment: SaleAmendment): Promise<void> => {
    logger.info(`Storing amendment: ${JSON.stringify(amendment)}`)
    await prisma.saleAmendment.create({ data: amendment })

    const sale = await prisma.transaction.findFirst({
        where: { eventType: "SALES", invoiceId: amendment.invoiceId },
    });

    if (sale && sale.items) {
        const updatedItems = sale.items.map((item: any) =>
            item.itemId === amendment.itemId ? { ...item, cost: amendment.cost, taxRate: amendment.taxRate } : item
        );

        await prisma.transaction.update({
            where: { id: sale.id },
            data: { items: updatedItems },
        });
        
        logger.info(`Applied amendment to invoice ${amendment.invoiceId}`)
    } else {
        logger.warn(`Sale not found for invoice ${amendment.invoiceId}`)
    }
}