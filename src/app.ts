import express from "express";
import transactionRoute from './routes/transactionRoute'
import taxRoute from './routes/taxRoute'

const app = express()

app.use(express.json())

app.use(transactionRoute)
app.use(taxRoute)

export default app;