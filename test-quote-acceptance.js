// Test quote acceptance flow
const crypto = require("crypto");

// Helper function to generate acceptance token (matching the server)
function generateAcceptanceToken(submissionId) {
  const secret =
    process.env.QUOTE_ACCEPTANCE_SECRET || "tukang-quote-secret-2025";
  return crypto
    .createHash("sha256")
    .update(submissionId + secret)
    .digest("hex")
    .substring(0, 16);
}

async function testQuoteAcceptance() {
  const baseUrl = "http://localhost:3001";

  console.log("🧪 Testing Quote Acceptance Flow...\n");

  // Step 1: Submit a test booking
  console.log("1️⃣ Submitting test booking...");

  const bookingData = {
    selectedGoals: [
      {
        id: "generate-leads",
        title: "Generate Leads",
        description: "Attract potential customers",
        price: 2500,
      },
    ],
    selectedFeatures: [
      {
        id: "seo-optimization",
        title: "SEO Optimization",
        description: "Improve search rankings",
        price: 500,
      },
    ],
    projectBrief: {
      businessName: "Test Business Inc",
      businessDescription: "A test business for quote acceptance testing",
    },
    contactInfo: {
      name: "Test User",
      email: "test@example.com",
      phone: "+1234567890",
    },
    selectedRegion: "MY",
    totalPrice: 3000,
  };

  try {
    const submitResponse = await fetch(`${baseUrl}/api/booking/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    if (!submitResponse.ok) {
      throw new Error(`Booking submission failed: ${submitResponse.status}`);
    }

    const submitResult = await submitResponse.json();
    console.log("✅ Booking submitted successfully!");
    console.log("📧 Submission ID:", submitResult.submissionId);

    // Step 2: Generate acceptance token
    console.log("\n2️⃣ Generating acceptance token...");
    const acceptanceToken = generateAcceptanceToken(submitResult.submissionId);
    console.log("🔑 Acceptance token:", acceptanceToken);

    // Step 3: Create acceptance URL
    const acceptanceUrl = `${baseUrl}/api/quote/accept?id=${submitResult.submissionId}&token=${acceptanceToken}`;
    console.log("🔗 Acceptance URL:", acceptanceUrl);

    // Step 4: Test the acceptance URL
    console.log("\n3️⃣ Testing acceptance URL...");

    const acceptResponse = await fetch(acceptanceUrl);
    console.log("📊 Response status:", acceptResponse.status);
    console.log(
      "📋 Response headers:",
      Object.fromEntries(acceptResponse.headers)
    );

    if (acceptResponse.ok) {
      const responseText = await acceptResponse.text();
      if (responseText.includes("Quote Accepted!")) {
        console.log("✅ Quote acceptance is working! Success page displayed.");
      } else {
        console.log(
          "⚠️  Response received but may not be the expected success page."
        );
      }
    } else {
      console.log(
        "❌ Quote acceptance failed with status:",
        acceptResponse.status
      );
      const errorText = await acceptResponse.text();
      console.log("Error:", errorText);
    }

    // Step 5: Test second acceptance (should show "already accepted")
    console.log(
      "\n4️⃣ Testing second acceptance (should show 'already accepted')..."
    );
    const secondResponse = await fetch(acceptanceUrl);
    console.log("📊 Second response status:", secondResponse.status);

    if (secondResponse.ok) {
      const secondText = await secondResponse.text();
      if (secondText.includes("Already Accepted")) {
        console.log(
          "✅ Second acceptance correctly shows 'already accepted' message."
        );
      }
    }
  } catch (error) {
    console.error("❌ Test failed:", error.message);

    // If booking submission fails, let's still test with a dummy ID
    console.log("\n🔄 Fallback: Testing with dummy data...");
    const dummyId = "BK-TEST-123";
    const dummyToken = generateAcceptanceToken(dummyId);
    const dummyUrl = `${baseUrl}/api/quote/accept?id=${dummyId}&token=${dummyToken}`;

    console.log("🔗 Dummy URL:", dummyUrl);

    try {
      const dummyResponse = await fetch(dummyUrl);
      console.log("📊 Dummy response status:", dummyResponse.status);

      if (dummyResponse.status === 404) {
        console.log(
          "❌ Getting 404 - this suggests the quote/accept route is not accessible"
        );
        console.log(
          "   Check if the file exists: app/api/quote/accept/route.js"
        );
      } else if (dummyResponse.status === 500) {
        console.log(
          "⚠️  Getting 500 - route exists but probably failing to find booking in database (expected for dummy data)"
        );
      }
    } catch (dummyError) {
      console.error("❌ Dummy test also failed:", dummyError.message);
    }
  }
}

// Run the test
testQuoteAcceptance();
