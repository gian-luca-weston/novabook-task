import { Request, Response } from "express"
import { processAmendment } from "../services/amendmentService"
import logger from "../utils/logger"

export const amendSale = (req: Request, res: Response): void => {
  try {
    const amendment = req.body

    if (!amendment.date || !amendment.invoiceId || !amendment.itemId || amendment.cost == null || amendment.taxRate == null) {
      logger.warn("Amendment request missing required fields")
      res.status(400).json({ error: "Missing required fields" })
      return
    }

    logger.info(`Processing amendment: ${JSON.stringify(amendment)}`)
    processAmendment(amendment)
    res.status(202).send()
  } catch (error) {
    logger.error(`Amendment error: ${error instanceof Error ? error.message : "Unknown error"}`)
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" })
  }
};
