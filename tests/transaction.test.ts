import request from "supertest"
import app from "../src/app"
import prisma from "../src/services/dbService"

describe("POST /transactions", () => {
  beforeEach(async () => {
    await prisma.transaction.deleteMany()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it("should store a SALES transaction successfully", async () => {
    const response = await request(app).post("/transactions").send({
      eventType: "SALES",
      date: "2024-02-22T17:29:39Z",
      invoiceId: "12345",
      items: [{ itemId: "abc", cost: 10000, taxRate: 0.2 }],
    })

    expect(response.status).toBe(202)

    const transaction = await prisma.transaction.findFirst({
      where: { invoiceId: "12345" },
    })

    expect(transaction).not.toBeNull();
    expect(transaction?.eventType).toBe("SALES");
  })

  it("should store a TAX_PAYMENT transaction successfully", async () => {
    const response = await request(app).post("/transactions").send({
      eventType: "TAX_PAYMENT",
      date: "2024-02-22T17:29:39Z",
      amount: 5000,
    })

    expect(response.status).toBe(202);

    const transaction = await prisma.transaction.findFirst({
      where: { eventType: "TAX_PAYMENT" },
    })

    expect(transaction).not.toBeNull()
    expect(transaction?.amount).toBe(5000)
  });

  it("should return 400 for invalid transactions", async () => {
    const response = await request(app).post("/transactions").send({
      eventType: "INVALID_TYPE",
    })

    expect(response.status).toBe(400)
  })
})
