import { Transaction } from "../models/transactions"
import storageService from "./storageService"

export const processTransaction = (transaction: Transaction): void => {
    if(transaction.eventType !== "SALES" && transaction.eventType !== "TAX_PAYMENT") {
        throw new Error("Invalid eventType")
    }

    storageService.addTransaction(transaction)
}