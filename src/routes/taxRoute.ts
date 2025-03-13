import express, { Request, Response } from "express"
import { getTaxPosition } from "../controllers/taxController"

const router = express.Router()

router.get("/tax-position", getTaxPosition)

export default router