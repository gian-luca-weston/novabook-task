import { Request, Response } from "express"
import { processTransaction } from "../services/transactionService"

export const ingestTransaction = (req: Request, res: Response) => {
    try {
        const transaction = req.body
        processTransaction(transaction)
        res.status(202).send()
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message })
        } else {
            res.status(400).json({ error: "An unknown error occured" })
        }
    }
}