📘 Novabook Tech Task

📌 Project Overview

This is a backend API for processing sales transactions and tax payments, calculating tax positions, and amending past sales. It uses Node.js, Express, TypeScript, Prisma (SQLite), and Jest for testing.

🚀 Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/gian-luca-weston/novabook-task
cd novabook-task

2️⃣ Install Dependencies

npm install

3️⃣ Setup the Database

Ensure SQLite is installed.

Apply Migrations:

npx prisma migrate dev --name init

(For Tests) Use a Test Database:

echo "DATABASE_URL='file:./test.db'" > .env.test

4️⃣ Start the Server

npm run dev

🧪 Running Tests

Run All Tests

npm test

Run Tests with Coverage Report

npm test --coverage


📊 Logging & Debugging

Logs are stored in logs/app.log

To see logs in real-time, run:

tail -f logs/app.log


📌 Additional Notes

SQLite & Primsa have been used as its a file based db and easiest for this purpose; in actuality postgres or a cloud db should be implemented.

Logs are stored in logs/app.log for ease of example in actuality a remote logging cloud service like CloudWatch could be used.

If working with a team I would configure ESLint and Prettier to ensure the code is standardised and readable to all engineers but it felt unneccessary here

