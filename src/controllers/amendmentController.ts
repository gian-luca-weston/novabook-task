import { Request, Response } from "express"
import { processAmendment } from "../services/amendmentService"

export const amendSale = (req: Request, res: Response): void => {
  try {
    const amendment = req.body

    if (!amendment.date || !amendment.invoiceId || !amendment.itemId || amendment.cost == null || amendment.taxRate == null) {
      res.status(400).json({ error: "Missing required fields" })
      return
    }

    processAmendment(amendment)
    res.status(202).send()

  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" })
  }
};
