// Test email link generation and validation
const crypto = require("crypto");

function generateAcceptanceToken(submissionId) {
  const secret =
    process.env.QUOTE_ACCEPTANCE_SECRET || "tukang-quote-secret-2025";
  return crypto
    .createHmac("sha256", secret)
    .update(submissionId)
    .digest("hex")
    .substring(0, 16);
}

async function testEmailLinks() {
  console.log("🧪 Testing Email Link Generation and Validation...\n");

  // Test with a real-looking submission ID
  const submissionId = "BK-ABC123-XYZ789";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://tukang.design";

  console.log("📋 Test Configuration:");
  console.log("  Base URL:", baseUrl);
  console.log("  Submission ID:", submissionId);

  // Generate token
  const token = generateAcceptanceToken(submissionId);
  console.log("  Generated Token:", token);

  // Create acceptance link (exactly as in booking submit route)
  const acceptanceLink = `${baseUrl}/api/quote/accept?id=${submissionId}&token=${token}`;
  console.log("  Acceptance Link:", acceptanceLink);

  // Test different URL formats that email clients might create
  const testUrls = [
    acceptanceLink, // Original
    acceptanceLink.replace("&", "&amp;"), // HTML entity encoding
    acceptanceLink.replace("https://", "http://"), // Protocol downgrade
    acceptanceLink + "/", // Trailing slash
    acceptanceLink.replace("?", "/?"), // Extra slash
  ];

  console.log("\n🔗 Testing different URL formats:");

  for (let i = 0; i < testUrls.length; i++) {
    const testUrl = testUrls[i];
    console.log(`\n${i + 1}. Testing: ${testUrl}`);

    try {
      // Test if localhost:3000 is running
      const localUrl = testUrl.replace(baseUrl, "http://localhost:3000");
      console.log(`   Local URL: ${localUrl}`);

      const response = await fetch(localUrl);
      console.log(`   Status: ${response.status} ${response.statusText}`);

      if (response.status === 200) {
        console.log("   ✅ SUCCESS - Link works!");
      } else {
        console.log("   ❌ FAILED - Non-200 status");
      }
    } catch (error) {
      console.log(`   ❌ ERROR: ${error.message}`);
    }
  }

  console.log("\n📧 Email Link Troubleshooting Tips:");
  console.log("1. Check if email client is modifying URLs");
  console.log("2. Test copying the link directly from email vs clicking");
  console.log("3. Check if email is being sent with correct baseURL");
  console.log("4. Verify production environment has the route deployed");
}

// Run the test
testEmailLinks().catch(console.error);
