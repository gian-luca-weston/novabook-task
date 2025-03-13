import { Request, Response } from "express"
import { calculateTaxPosition } from "../services/taxService"

export const getTaxPosition = (req: Request, res: Response): void => {
    try {
        const date = req.query.date as string

        if(!date) {
            res.status(400).json({ error: "Missing required query parameter: date" })
        }

        const taxPosition = calculateTaxPosition(date)
        res.status(200).json({ date, taxPosition })

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message })
        } else {
            res.status(500).json({ error: "An unexpected error occured" })
        }
    }
}
