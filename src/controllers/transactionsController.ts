import { Request, Response } from "express"
import { processTransaction } from "../services/transactionService"
import logger from "../utils/logger"

export const ingestTransaction = async (req: Request, res: Response) => {
    try {
        const transaction = req.body
        await processTransaction(transaction)
        logger.info(`Transaction received: ${JSON.stringify(transaction)}`)
        res.status(202).send()
    } catch (error) {
        logger.error(`Transaction error: ${error instanceof Error ? error.message : "Unknown error"}`);
        res.status(400).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
}