import express from "express"
import { ingestTransaction } from "../controllers/transactionsController"

const router = express.Router()

router.post("/transactions", ingestTransaction)

export default router