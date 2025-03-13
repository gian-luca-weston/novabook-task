import { SaleAmendment, Transaction } from "../models/transactions"

class storageService {
    private transactions: Transaction[] = []
    private amendments: SaleAmendment[] = []

    addTransaction(transaction: Transaction) {
        this.transactions.push(transaction)
    }

    addAmendment(amendment: SaleAmendment) {
        this.amendments.push(amendment);
    }

    getTransactions(): Transaction[] {
        return this.transactions
    }

    getAmmendmet(): SaleAmendment[] {
        return this.amendments
    }
}

export default new storageService()