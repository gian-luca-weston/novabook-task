import request from "supertest"
import app from "../src/app"
import prisma from "../src/services/dbService"

describe("GET /tax-position", () => {
    beforeEach(async () => {
        await prisma.transaction.deleteMany()
        await prisma.transaction.create({
            data: {
                eventType: "SALES",
                date: new Date("2024-02-22T17:29:39Z").toISOString(),
                invoiceId: "12345",
                items: [{ itemId: "abc", cost: 10000, taxRate: 0.2 }],
              }
        })
    })

    afterAll(async () => {
        await prisma.$disconnect();
    })

    it("should return the correct tax position", async () => {
        const response = await request(app).get("/tax-position?date=2024-02-22T17:59:59Z");
        expect(response.status).toBe(200);
        expect(response.body.taxPosition).toBe(2000);
    })
})