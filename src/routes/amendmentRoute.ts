import express from "express"
import { amendSale } from "../controllers/amendmentController"

const router = express.Router()

router.patch("/sale", amendSale)

export default router
