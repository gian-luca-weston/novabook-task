import { Transaction } from "../models/transactions"

class storageService {
    private transactions: Transaction[] = []

    addTransaction(transaction: Transaction) {
        this.transactions.push(transaction)
    }

    getTransactions(): Transaction[] {
        return this.transactions
    }
}

export default new storageService()