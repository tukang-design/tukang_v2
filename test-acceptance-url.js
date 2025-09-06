// Simple test to generate a valid quote acceptance URL
const crypto = require("crypto");

function generateAcceptanceToken(submissionId) {
  const secret =
    process.env.QUOTE_ACCEPTANCE_SECRET || "tukang-quote-secret-2025";
  return crypto
    .createHash("sha256")
    .update(submissionId + secret)
    .digest("hex")
    .substring(0, 16);
}

// Use the submission ID from the server logs
const submissionId = "BK-MF7M4SYH-LJW03A"; // From the latest logs
const token = generateAcceptanceToken(submissionId);
const acceptanceUrl = `http://localhost:3000/api/quote/accept?id=${submissionId}&token=${token}`;

console.log("🔗 Test this URL in your browser:");
console.log(acceptanceUrl);
console.log("");
console.log("Expected result: Success page showing 'Quote Accepted!'");
console.log("If you get 404: Route file has syntax errors");
console.log("If you get 403: Token mismatch");
console.log("If you get 500: Database connection issue");
