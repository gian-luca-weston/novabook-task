import { Request, Response } from "express"
import { calculateTaxPosition } from "../services/taxService"
import logger from "../utils/logger"

export const getTaxPosition = async (req: Request, res: Response): Promise<void> => {
    try {
        const date = req.query.date as string

        if(!date) {
            logger.warn("Tax position query missing date parameter");
            res.status(400).json({ error: "Missing required query parameter: date" })
        }
        
        const taxPosition = await calculateTaxPosition(date)
        logger.info(`Calculated tax position for ${date}: ${taxPosition}`)
        res.status(200).json({ date, taxPosition })
    } catch (error) {
        logger.error(`Tax position error: ${error instanceof Error ? error.message : "Unknown error"}`);
        res.status(500).json({ error: error instanceof Error ? error.message : "An unexpected error occurred" });
      }
}
