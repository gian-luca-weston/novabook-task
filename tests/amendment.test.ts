import request from "supertest"
import app from "../src/app"
import prisma from "../src/services/dbService"

describe("PATCH /sale", () => {
  beforeEach(async () => {
    await prisma.transaction.deleteMany()

    await prisma.transaction.create({
      data: {
        eventType: "SALES",
        date: "2024-02-22T17:29:39Z",
        invoiceId: "12345",
        items: [{ itemId: "abc", cost: 10000, taxRate: 0.2 }],
      },
    })
  })

  afterAll(async () => {
    await prisma.$disconnect();
  })

  it("should amend a sale successfully", async () => {
    const response = await request(app).patch("/sale").send({
      date: "2024-02-23T12:00:00Z",
      invoiceId: "12345",
      itemId: "abc",
      cost: 8000,
      taxRate: 0.15,
    })

    expect(response.status).toBe(202);

    const updatedTransaction = await prisma.transaction.findFirst({
      where: { invoiceId: "12345" },
    })

    expect(updatedTransaction).not.toBeNull();
    expect(updatedTransaction?.items).toEqual([
      { itemId: "abc", cost: 8000, taxRate: 0.15 },
    ])
  })

  it("should return 400 for missing required fields", async () => {
    const response = await request(app).patch("/sale").send({})

    expect(response.status).toBe(400)
  })
})
