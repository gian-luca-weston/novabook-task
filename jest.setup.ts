import prisma from "./src/services/dbService"
import { execSync } from "child_process"

beforeAll(async () => {
  console.log("Applying migrations to test database...")
  execSync("npx prisma migrate reset --force", { stdio: "inherit" })
})

beforeEach(async () => {
  await prisma.transaction.deleteMany()
  await prisma.saleAmendment.deleteMany()
});

afterAll(async () => {
  await prisma.$disconnect();
});
