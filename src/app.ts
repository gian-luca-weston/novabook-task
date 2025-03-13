import express from "express";
import transactionRoute from './routes/transactionRoute'
import taxRoute from './routes/taxRoute'
import amendmentRoute from './routes/amendmentRoute'
import logger from "./utils/logger";

const app = express()

app.use(express.json())

app.use(transactionRoute)
app.use(taxRoute)
app.use(amendmentRoute)

export default app;